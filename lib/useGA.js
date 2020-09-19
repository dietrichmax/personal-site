import ReactGA from "react-ga";
import Cookie from 'js-cookie'

export const useAnalytics = () => {
  return {
    init: (trackingId) => {
        if (window.location.href.includes("gis-netzwerk.com")) {
          ReactGA.initialize(trackingId);
          ReactGA.set({ anonymizeIp: true });
        }
    },
    trackPageViewed: (path) => {
      if (window.location.href.includes("gis-netzwerk.com")) {
        if (path) {
          return ReactGA.pageview(path);
        }
        return ReactGA.pageview(
          window.location.pathname + window.location.search
        );
      }
    },
    trackEvent: (params) => {
      if (window.location.href.includes("gis-netzwerk.com")) {
        ReactGA.event(params);
      }
    }
  };
};
