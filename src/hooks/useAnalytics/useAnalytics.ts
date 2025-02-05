import { useMemo, useState } from 'react';
import PiwikReactRouter from 'piwik-react-router';
import Cookies from 'cookies-js';

const CONSENT_KEY = 'consent';
const BANNER_CLOSED_KEY = 'banner-closed';

const getBooleanCookie = (key: string) => Cookies.get(key) === 'true';

export const useAnalytics = () => {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(
    getBooleanCookie(CONSENT_KEY),
  );
  const [shouldShowCookieBanner, setShouldShowCookieBanner] = useState(
    getBooleanCookie(BANNER_CLOSED_KEY),
  );

  const onBannerClose = (cookiesAccepted: boolean) => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    Cookies.set(CONSENT_KEY, cookiesAccepted, {
      expires: expiryDate,
    });
    Cookies.set(BANNER_CLOSED_KEY, true, {
      expires: expiryDate,
    });

    setAreCookiesAccepted(cookiesAccepted);
    setShouldShowCookieBanner(true);
  };

  const piwik = useMemo(
    () =>
      areCookiesAccepted
        ? PiwikReactRouter({
            url: 'analytics.legiec.info',
            siteId: 3,
            updateDocumentTitle: false,
            trackErrors: true,
            injectScript: areCookiesAccepted,
          })
        : null,
    [areCookiesAccepted],
  );

  return { piwik, shouldShowCookieBanner, onBannerClose };
};
