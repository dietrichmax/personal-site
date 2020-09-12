import ReactGA from "react-ga";

export const useAnalytics = () => {
  return {
    init: (trackingId) => {
      if (window.location.href.includes("gis-netzwerk.com")) {
        ReactGA.initialize(trackingId);
        ReactGA.set({ anonymizeIp: true });
      } else {
        console.log("GA initization disabled in development-mode")
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
      } else {
        console.log("Tracking pageviews disabled in development-mode")
      }
    },
    trackEvent: (params) => {
      if (window.location.href.includes("gis-netzwerk.com")) {
        ReactGA.event(params);
      } else {
        console.log("Tracking events disabled in development-mode")
      }
    }
  };
};
