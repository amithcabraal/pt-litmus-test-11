import { useState, useEffect } from 'react';

const WELCOME_SHOWN_KEY = 'pt-welcome-shown';

export const useWelcomeDialog = () => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasShownWelcome) {
      setIsWelcomeOpen(true);
    }
  }, []);

  const closeWelcome = () => {
    setIsWelcomeOpen(false);
    localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
  };

  return {
    isWelcomeOpen,
    closeWelcome,
    showWelcome: () => setIsWelcomeOpen(true)
  };
};