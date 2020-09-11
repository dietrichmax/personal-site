import ReactGA from "react-ga";

export const useAnalytics = () => {
  return {
    init: (trackingId) => {
      if (!window.location.href.includes("localhost")) {
        ReactGA.initialize(trackingId);
        ReactGA.set({ anonymizeIp: true });
      } else {
        console.log("Tracking disabled in development-mode")
      }
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
