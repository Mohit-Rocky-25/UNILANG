# UniLang REST API Gateway Documentation

The UniLang API gateway is built on **Fastify 4**, **TypeScript**, **Zod** schema validation, and **Prisma ORM** with deterministic failover and offline-ready mock provider abstractions.

**Base URL**: `http://localhost:5000` (configurable via `PORT` & `HOST`)

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/register`
Creates a new user account with hashed password (`bcryptjs`, 10 rounds), default preferences, starter statistics, and issues JWT access and refresh tokens.

- **Request Body**:
  ```json
  {
    "email": "learner@example.com",
    "password": "SecurePassword123!",
    "displayName": "Language Learner",
    "interfaceLang": "en",
    "targetLang": "es"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "user": {
      "id": "uuid-v4",
      "email": "learner@example.com",
      "displayName": "Language Learner",
      "preference": { "targetLang": "es", "cefrLevel": "A1" }
    },
    "accessToken": "eyJhbGciOi..."
  }
  ```

---

### `POST /api/auth/login`
Authenticates user credentials and sets HttpOnly refresh cookie.
- **Request Body**:
  ```json
  {
    "email": "demo@unilang.app",
    "password": "demo1234"
  }
  ```
- **Response `200 OK`**: Returns user profile, preferences, lifetime stats, and JWT Bearer token.

---

### `GET /api/auth/me`
Returns current authenticated user session, preferences, equipped streak freezes, and study statistics.
- **Headers**: `Authorization: Bearer <accessToken>`
- **Response `200 OK`**: User profile object.

---

## 2. Curriculum & Lessons (`/api/lessons`)

### `GET /api/lessons`
Fetches structured CEFR A1–B1 learning paths, lessons, and multi-modal exercise schemas.
- **Query Params**: `?lang=es&cefr=A1`
- **Response `200 OK`**:
  ```json
  {
    "lessons": [
      {
        "id": "es-a1-01",
        "title": "¡Hola! Greetings & Introductions",
        "xpReward": 20,
        "sequenceOrder": 1,
        "exercises": [
          {
            "id": "ex-01",
            "type": "multi_choice",
            "prompt": "How do you say 'Good morning' in Spanish?",
            "answerData": {
              "options": ["Buenas noches", "Buenos días", "Hola", "Adiós"],
              "correct": "Buenos días",
              "explanation": "'Buenos días' is standard morning greeting."
            }
          }
        ]
      }
    ]
  }
  ```

---

## 3. User Progress (`/api/user/progress`)

### `POST /api/user/progress`
Records completed exercise/lesson score and awards XP.
- **Request Body**:
  ```json
  {
    "lessonId": "es-a1-01",
    "score": 100,
    "xpEarned": 25
  }
  ```
- **Response `200 OK`**: Updated progress status and current user total XP.

---

## 4. Spaced Repetition Vocabulary (`/api/vocabulary`)

### `GET /api/vocabulary`
Returns user's saved vocabulary cards, review queue, tags, and SuperMemo SM-2 intervals.

### `POST /api/vocabulary`
Adds a new term to the user's personal SRS deck (from Culture, Translator, Reading, or AI chat).
- **Request Body**:
  ```json
  {
    "langCode": "es",
    "term": "la sobremesa",
    "meaning": "after-dinner conversation",
    "phonetic": "soh-breh-MEH-sah",
    "deck": "Culture",
    "tags": ["#Culture", "#Dining"]
  }
  ```

### `POST /api/vocabulary/:id/review`
Submits an SM-2 rating (1 to 4) and recalculates ease factor, next interval, and due date.
- **Request Body**:
  ```json
  {
    "rating": 4
  }
  ```
- **Response `200 OK`**: Updated card with `easeFactor`, `intervalDays`, and next `dueDate`.

---

## 5. AI Conversation & Grammar Coach (`/api/ai`)

### `POST /api/ai/turn`
Generates conversational roleplay turns with CEFR register adaptation and optional grammar feedback drawer.
- **Request Body**:
  ```json
  {
    "scenario": "ordering_cafe",
    "cefrLevel": "A2",
    "targetLang": "es",
    "message": "Quisiera un café con leche y una tostada, por favor.",
    "history": []
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "reply": "¡Por supuesto! ¿La tostada la prefiere con tomate o con mermelada?",
    "translation": "Of course! Do you prefer the toast with tomato or jam?",
    "corrections": [],
    "fluencyScore": 94
  }
  ```

### `POST /api/ai/grammar`
Parses sentence syntax, verb conjugations, and provides parts-of-speech token breakdowns.

---

## 6. Translation Gateway (`/api/translate`)

### `POST /api/translate`
Multi-provider translation with automatic failover (Lingva -> LibreTranslate -> Mock deterministic fallback) and formality support.
- **Request Body**:
  ```json
  {
    "text": "Could you help me find the train station?",
    "sourceLang": "en",
    "targetLang": "es",
    "formality": "formal"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "translatedText": "¿Podría usted ayudarme a encontrar la estación de tren?",
    "sourceLang": "en",
    "targetLang": "es",
    "formality": "formal",
    "provider": "lingva"
  }
  ```

