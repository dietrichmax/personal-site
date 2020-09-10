import ReactGA from "react-ga";

export const useAnalytics = () => {
  return {
    init: (trackingId) => {
      ReactGA.initialize(trackingId);
    },
    trackPageViewed: (path) => {
      if (path) {
        return ReactGA.pageview(path);
      }
      return ReactGA.pageview(
        window.location.pathname + window.location.search
      );
    },
    trackEvent: (params) => {
      ReactGA.event(params);
    }
  };
};