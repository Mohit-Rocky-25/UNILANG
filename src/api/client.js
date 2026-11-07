// UniLang Central API Client with Authenticated Session, Auto-Refresh & Offline Fallback Cache

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.accessToken = localStorage.getItem('unilang_token') || null;
    this.offlineQueue = JSON.parse(localStorage.getItem('unilang_offline_queue') || '[]');
    window.addEventListener('online', () => this.flushOfflineQueue());
  }

  setToken(token) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem('unilang_token', token);
    } else {
      localStorage.removeItem('unilang_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        credentials: 'include' // include cookies
      });

      if (res.status === 401 && !options._retry && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
        // Attempt refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          return this.request(endpoint, { ...options, _retry: true });
        }
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      return data;
    } catch (err) {
      // If offline, check if write request should be queued
      if (!navigator.onLine && options.method && options.method !== 'GET') {
        this.queueOfflineWrite(endpoint, options);
        return { offlineQueued: true, message: 'Saved offline. Will sync when reconnected.' };
      }
      throw err;
    }
  }

  async refreshToken() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.accessToken) {
          this.setToken(data.accessToken);
          return true;
        }
      }
    } catch {
      // Refresh failed
    }
    this.setToken(null);
    return false;
  }

  queueOfflineWrite(endpoint, options) {
    this.offlineQueue.push({ endpoint, options, timestamp: Date.now() });
    localStorage.setItem('unilang_offline_queue', JSON.stringify(this.offlineQueue));
  }

  async flushOfflineQueue() {
    if (this.offlineQueue.length === 0) return;
    console.log(`[UniLang Sync] Flushing ${this.offlineQueue.length} offline actions...`);
    const remaining = [];
    for (const item of this.offlineQueue) {
      try {
        await this.request(item.endpoint, item.options);
      } catch (e) {
        remaining.push(item);
      }
    }
    this.offlineQueue = remaining;
    localStorage.setItem('unilang_offline_queue', JSON.stringify(remaining));
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data;
  }

  async register(email, password, displayName) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName })
    });
    if (data.accessToken) {
      this.setToken(data.accessToken);
    }
    return data;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // 1-Click Authenticated Demo Login
  async demoLogin() {
    try {
      return await this.login('demo@unilang.app', 'demo1234');
    } catch {
      // Fallback local profile if backend server is starting up
      return {
        user: {
          id: 'demo-local-uuid',
          email: 'demo@unilang.app',
          displayName: 'Alex Morgan',
          stats: { totalXp: 450, currentStreak: 7 }
        }
      };
    }
  }

  // Lessons & Curriculum
  async getLanguages() {
    return this.request('/lessons/languages');
  }

  async getPaths(lang = 'es') {
    return this.request(`/lessons/paths?lang=${lang}`);
  }

  async getLesson(slug) {
    return this.request(`/lessons/${slug}`);
  }

  // User Progress & Stats
  async getProgress() {
    return this.request('/user/progress');
  }

  async recordProgress(lessonId, score, xpGained = 20, minutesSpent = 5) {
    return this.request('/user/progress', {
      method: 'POST',
      body: JSON.stringify({ lessonId, score, xpGained, minutesSpent })
    });
  }

  async getStats() {
    return this.request('/user/stats');
  }

  async getPreferences() {
    return this.request('/user/preferences');
  }

  async updatePreferences(prefs) {
    return this.request('/user/preferences', {
      method: 'PATCH',
      body: JSON.stringify(prefs)
    });
  }

  // Vocabulary & Spaced Repetition (SRS)
  async getVocabulary(deck, dueOnly = false) {
    const params = new URLSearchParams();
    if (deck) params.append('deck', deck);
    if (dueOnly) params.append('dueOnly', 'true');
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/vocabulary${query}`);
  }

  async addVocabulary(vocabData) {
    return this.request('/vocabulary', {
      method: 'POST',
      body: JSON.stringify(vocabData)
    });
  }

  async reviewVocabulary(cardId, grade) {
    return this.request(`/vocabulary/${cardId}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ grade })
    });
  }

  // AI Orchestration
  async aiChat(scenarioKey, targetLanguage, cefrLevel, message, sessionId) {
    return this.request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ scenarioKey, targetLanguage, cefrLevel, message, sessionId })
    });
  }

  async analyzeGrammar(sentence, targetLanguage = 'es') {
    return this.request('/ai/analyze-grammar', {
      method: 'POST',
      body: JSON.stringify({ sentence, targetLanguage })
    });
  }

  // Translation
  async translate(text, sourceLang = 'en', targetLang = 'es', formality = 'neutral') {
    return this.request('/translate', {
      method: 'POST',
      body: JSON.stringify({ text, sourceLang, targetLang, formality })
    });
  }

  // Phrasebook
  async getPhrasebook(lang = 'es', category = '', emergency = false, search = '') {
    const params = new URLSearchParams();
    if (lang) params.append('lang', lang);
    if (category) params.append('category', category);
    if (emergency) params.append('emergency', 'true');
    if (search) params.append('search', search);
    return this.request(`/phrasebook?${params.toString()}`);
  }
}

export const api = new ApiClient();
export default api;
