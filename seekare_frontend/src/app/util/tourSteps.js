export const tourSteps = [
  {
    content: "Welcome! Let's get started!",
    target: ".welcome-post",
    disableBeacon: true,
    placement: "top",
    disableOverlay: true,
    showProgress:'true'
  },
  {
    content: "Welcome to SeeKare! This is what we're about",
    target: ".welcome-here",
    disableBeacon: true,
    textAlign: "center",
    spotlightPadding: 20,
    showSkipButton: false,
    placement: "top",
  },
  {
    content: "Our site is divided into two main sections... the KareBook",
    target: ".kareBook",
    disableBeacon: true,
    placement: "right",
  },
  {
    content: "...and the KarePost",
    target: ".karePost",
    disableBeacon: true,
    placement: "left",
  },
  {
    content:
      "Search the KarePosts to find community sourced questions and answers. You can also create your own post if you don't see your question listed!",
    target: ".search-question",
    disableBeacon: true,
    placement: "left",
  },
  {
    content:
      "You can also create your own KarePost if you don't see your question listed!",
    target: ".karePostAddBtn",
    disableBeacon: true,
  },
  {
    content:
      "Search the KareBook to view physician reviewed collection of the top-rated KarePosts",
    target: ".kareBook-searchBar",
    placement: "right",
    disableBeacon: true,
  },
  {
    content: "Sign up or Login to get started",
    target: ".rightSideHeader",
    disableBeacon: true,
  },
];

export const responsiveSteps = [
  {
    content: "Welcome to SeeKare! This is what we're about",
    target: ".welcome-responsive",
    disableBeacon: true,
    textAlign: "center",
    disableOverlayClose: true,
    spotlightClicks: true,
    spotlightPadding: 20,
    showSkipButton: false,
  },
  {
    content: "Our site is divided into two main sections... the KareBook",
    target: ".kareBook-responsive",
    disableBeacon: true,
  },
  {
    content: "...and the KarePost",
    target: ".karePost-responsive",
    disableBeacon: true,
  },
  {
    content: "Sign up or Login to get started",
    target: ".rightSideHeader",
    disableBeacon: true,
  },
];
