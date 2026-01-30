"use client";

import { useState, useEffect } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
      applyCookiePreferences(savedPreferences);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Here you would initialize analytics/marketing scripts based on preferences
    // For now, we just store the preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    if (prefs.marketing) {
      // Initialize marketing scripts
      // Example: gtag('consent', 'update', { ad_storage: 'granted' });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setShowSettings(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setIsVisible(false);
    applyCookiePreferences(prefs);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
    >
      <div className="container-custom max-w-6xl">
        {!showSettings ? (
          <>
            <div className="mb-4">
              <h3 id="cookie-banner-title" className="text-lg font-semibold text-secondary mb-2">
                Pliki cookies
              </h3>
              <p className="text-gray-700 text-sm">
                Ta strona używa plików cookies, aby zapewnić najlepsze doświadczenie. Niezbędne
                pliki cookies są zawsze włączone. Możesz zarządzać preferencjami dotyczącymi
                innych plików cookies w ustawieniach.{" "}
                <a
                  href="/polityka-cookies"
                  className="text-primary hover:text-primary-dark underline focus:outline-none focus:ring-0 rounded"
                  onClick={(e) => (e.currentTarget as HTMLAnchorElement).blur()}
                >
                  Dowiedz się więcej
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={(e) => {
                  handleAcceptAll();
                  (e.currentTarget as HTMLButtonElement).blur();
                }}
                className="btn-primary text-sm focus:outline-none focus:ring-0"
                aria-label="Akceptuj wszystkie pliki cookies"
              >
                Akceptuj wszystkie
              </button>
              <button
                type="button"
                onClick={(e) => {
                  handleRejectAll();
                  (e.currentTarget as HTMLButtonElement).blur();
                }}
                className="btn-secondary text-sm focus:outline-none focus:ring-0"
                aria-label="Odrzuć wszystkie oprócz niezbędnych"
              >
                Odrzuć
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setShowSettings(true);
                  (e.currentTarget as HTMLButtonElement).blur();
                }}
                className="px-4 py-2 text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0 text-sm"
                aria-label="Otwórz ustawienia plików cookies"
              >
                Ustawienia
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Ustawienia plików cookies
              </h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary mb-1">Niezbędne</h4>
                    <p className="text-sm text-gray-700">
                      Te pliki cookies są niezbędne do działania strony i nie można ich wyłączyć.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="ml-4"
                    aria-label="Niezbędne pliki cookies (zawsze włączone)"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary mb-1">Analityczne</h4>
                    <p className="text-sm text-gray-700">
                      Te pliki cookies pomagają nam zrozumieć, jak użytkownicy korzystają ze strony.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="ml-4"
                    aria-label="Analityczne pliki cookies"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary mb-1">Marketingowe</h4>
                    <p className="text-sm text-gray-700">
                      Te pliki cookies są używane do wyświetlania reklam i śledzenia skuteczności
                      kampanii.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="ml-4"
                    aria-label="Marketingowe pliki cookies"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={(e) => {
                  handleSaveSettings();
                  (e.currentTarget as HTMLButtonElement).blur();
                }}
                className="btn-primary text-sm focus:outline-none focus:ring-0"
                aria-label="Zapisz ustawienia plików cookies"
              >
                Zapisz ustawienia
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setShowSettings(false);
                  (e.currentTarget as HTMLButtonElement).blur();
                }}
                className="px-4 py-2 text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0 text-sm"
                aria-label="Anuluj i wróć"
              >
                Anuluj
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
