import ReactGA from "react-ga";
import Cookie from 'js-cookie'

export const useAnalytics = () => {
  return {
    init: (trackingId) => {
      if (Cookie.get('consentGiven')) {
        console.log("consent given")
        if (window.location.href.includes("gis-netzwerk.com")) {
          ReactGA.initialize(trackingId);
          ReactGA.set({ anonymizeIp: true });
        } else {
          console.log("GA initization disabled in development-mode")
        }
      } else {
        console.log("consent not given")
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
