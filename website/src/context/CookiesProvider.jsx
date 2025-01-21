import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';

const CookiesContext = createContext();

const COOKIE_CATEGORIES = {
  necessary: {
    id: 'necessary',
    name: 'Nezbytné',
    description: 'Nutné pro fungování webu',
    required: true,
    cookies: ['session_id', 'csrf_token'],
    providers: ['První skupina']
  },
  functional: {
    id: 'functional',
    name: 'Funkční',
    description: 'Vylepšují funkcionalitu webu',
    required: false,
    cookies: ['language', 'theme'],
    providers: ['První skupina']
  },
  analytics: {
    id: 'analytics',
    name: 'Analytické',
    description: 'Měření návštěvnosti',
    required: false,
    cookies: ['_ga', '_gid'],
    providers: ['Google Analytics']
  },
  marketing: {
    id: 'marketing',
    name: 'Marketingové',
    description: 'Cílená reklama',
    required: false,
    cookies: ['_fbp', 'ads'],
    providers: ['Google Ads', 'Facebook']
  }
};

const defaultPreferences = Object.keys(COOKIE_CATEGORIES).reduce((acc, key) => ({
  ...acc,
  [key]: COOKIE_CATEGORIES[key].required
}), {});

const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000; // 6 months

export function CookiesProvider({ children }) {
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [lastConsentDate, setLastConsentDate] = useState(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  useEffect(() => {
    const savedPreferences = Cookies.get('cookiePreferences');
    const savedConsentDate = Cookies.get('cookieConsentDate');

    if (savedPreferences && savedConsentDate) {
      const parsedPreferences = JSON.parse(savedPreferences);
      const consentDate = new Date(savedConsentDate);
      const now = new Date();

      if (now.getTime() - consentDate.getTime() < CONSENT_DURATION) {
        setPreferences(parsedPreferences);
        setHasConsented(true);
        setShowBanner(false);
        setLastConsentDate(consentDate);
      } else {
        resetPreferences();
      }
    }
  }, []);

  useEffect(() => {
    if (hasConsented) {
      Cookies.set('cookiePreferences', JSON.stringify(preferences), { expires: 180 });
      Cookies.set('cookieConsentDate', lastConsentDate.toISOString(), { expires: 180 });
    }
  }, [preferences, hasConsented, lastConsentDate]);

  const acceptAllCookies = () => {
    const allAccepted = Object.keys(COOKIE_CATEGORIES).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    setLastConsentDate(new Date());
  };

  const rejectAllCookies = () => {
    setPreferences(defaultPreferences);
    setHasConsented(true);
    setShowBanner(false);
    setLastConsentDate(new Date());
  };

  const savePreferences = (selectedPreferences) => {
    setPreferences({
      ...defaultPreferences,
      ...selectedPreferences
    });
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
    setLastConsentDate(new Date());
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    setHasConsented(false);
    setShowBanner(true);
    setLastConsentDate(null);
    Cookies.remove('cookiePreferences');
    Cookies.remove('cookieConsentDate');
  };

  const value = useMemo(() => ({
    preferences,
    hasConsented,
    showBanner,
    showPreferencesModal,
    lastConsentDate,
    COOKIE_CATEGORIES,
    acceptAllCookies,
    rejectAllCookies,
    savePreferences,
    resetPreferences,
    setShowPreferencesModal
  }), [preferences, hasConsented, showBanner, showPreferencesModal, lastConsentDate]);

  return (
    <CookiesContext.Provider value={value}>
      {children}
    </CookiesContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookiesContext);
  if (!context) {
    throw new Error('useCookies must be used within CookiesProvider');
  }
  return context;
}