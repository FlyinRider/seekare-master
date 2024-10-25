export const tourSteps = [
  {
    content: "Welcome to SeeKare! This is what we're about",
    target: '.welcome',
    disableBeacon: true,
    textAlign: 'center',
    disableOverlayClose: true,
    spotlightClicks: true,
    spotlightPadding: 20,
    showSkipButton: false,
  },
  {
    content: 'Our site is divided into two main sections... the KareBook',
    target: '.kareBook',
    disableBeacon: true,
    placement: 'right',
  },
  {
    content: '...and the KarePost',
    target: '.karePost',
    disableBeacon: true,
    placement: 'left',
  },
  {
    content:
      "Search the KarePosts to find community sourced questions and answers. You can also create your own post if you don't see your question listed!",
    target: '.search-question',
    disableBeacon: true,
    placement: 'left',
  },
  {
    content:
      "You can also create your own KarePost if you don't see your question listed!",
    target: '.karePostAddBtn',
    disableBeacon: true,
  },
  {
    content:
      "Search the KareBook to view physician reviewed collection of the top-rated KarePosts",
    target: ".kareBook-searchBar",
    disableBeacon: true,
    placement: "right",
  },
  {
    content: 'Sign up or Login to get started',
    target: '.rightSideHeader',
    disableBeacon: true,
  },
];
