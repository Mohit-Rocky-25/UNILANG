import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import NativeLanguageScreen from "@/components/onboarding/NativeLanguageScreen";
import TargetLanguagesScreen from "@/components/onboarding/TargetLanguagesScreen";
import InterestsScreen from "@/components/onboarding/InterestsScreen";
import QuizScreen from "@/components/onboarding/QuizScreen";
import SummaryScreen from "@/components/onboarding/SummaryScreen";
import ProgressDots from "@/components/onboarding/ProgressDots";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    nativeLanguage: "",
    targetLanguages: [],
    interests: [],
    level: "beginner",
    quizScore: 0,
  });

  const handleToggleTarget = (code) => {
    setData(prev => ({
      ...prev,
      targetLanguages: prev.targetLanguages.includes(code)
        ? prev.targetLanguages.filter(c => c !== code)
        : [...prev.targetLanguages, code]
    }));
  };

  const handleToggleInterest = (id) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const handleQuizComplete = (level, score) => {
    setData(prev => ({ ...prev, level, quizScore: score }));
    setStep(5);
  };

  const handleFinish = () => {
    const tempUser = JSON.parse(localStorage.getItem("unilang_temp_user") || "{}");
    localStorage.setItem("unilang_profile", JSON.stringify({
      ...tempUser,
      native_language: data.nativeLanguage,
      target_languages: data.targetLanguages,
      interests: data.interests,
      level: data.level,
      onboarding_complete: true,
      xp_points: tempUser.xp_points || 0,
      streak_count: tempUser.streak_count || 1,
      name: tempUser.name || "Learner",
    }));
    localStorage.removeItem("unilang_temp_user");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeScreen key="welcome" onNext={() => setStep(1)} />}
        {step === 1 && (
          <NativeLanguageScreen
            key="native"
            selected={data.nativeLanguage}
            onSelect={(code) => setData(prev => ({ ...prev, nativeLanguage: code }))}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <TargetLanguagesScreen
            key="target"
            nativeLanguage={data.nativeLanguage}
            selected={data.targetLanguages}
            onToggle={handleToggleTarget}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <InterestsScreen
            key="interests"
            selected={data.interests}
            onToggle={handleToggleInterest}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <QuizScreen
            key="quiz"
            targetLanguages={data.targetLanguages}
            onComplete={handleQuizComplete}
            onBack={() => setStep(3)}
          />
        )}
        {step === 5 && (
          <SummaryScreen
            key="summary"
            data={data}
            onFinish={handleFinish}
          />
        )}
      </AnimatePresence>
      {step > 0 && step < 5 && <ProgressDots total={5} current={step - 1} />}
    </div>
  );
}