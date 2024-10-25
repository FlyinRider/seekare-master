import React from "react";
import loadable from "@loadable/component";

import authRoles from "app/config/authRole.config";
import Loader from "app/main/layouts/ClientLayout/Loader";

const routes = [
  {
    path: "/",
    key: "home",
    auth: authRoles.guest,
    exact: true,
    layout: "client",
    component: loadable(() => import("./../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
  // {
  //   path: "/terms",
  //   key: "terms",
  //   auth: authRoles.guest,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/terms/Terms"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/plan",
  //   key: "plan",
  //   auth: authRoles.guest,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/plan"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/questions",
  //   key: "questions",
  //   auth: authRoles.guest,
  //   exact: true,
  //   layout: "client",
  //   component: loadable(() => import("./../main/questions/Questions"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/questions/triage",
  //   key: "questions_triage",
  //   auth: authRoles.triage,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/questions/Triage"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/questions/md",
  //   key: "questions_assigned_to_md",
  //   auth: authRoles.md,
  //   exact: true,
  //   layout: "client",
  //   component: loadable(() => import("./../main/questions/MD"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/questions/:questionID/show",
  //   key: "questions_detail",
  //   auth: authRoles.guest,
  //   exact: true,
  //   layout: "client",
  //   component: loadable(() => import("./../main/questions/ShowQuestion"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/questions/ask",
  //   key: "questions_ask",
  //   auth: authRoles.guest,
  //   exact: true,
  //   layout: "client",
  //   component: loadable(() => import("./../main/questions/Ask"), {
  //     fallback: <Loader />,
  //   }),
  // },
  {
    path: "/profile",
    key: "profile",
    auth: authRoles.user,
    exact: false,
    layout: "client",
    component: loadable(() => import("./../main/profile"), {
      fallback: <Loader />,
    }),
  },
  // {
  //   path: "/about",
  //   key: "about",
  //   auth: authRoles.guest,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/about"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/contact",
  //   key: "contact",
  //   auth: authRoles.guest,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/contact"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/privacy",
  //   key: "privacy",
  //   auth: authRoles.guest,
  //   exact: true,
  //   layout: "client",
  //   component: loadable(() => import("./../main/privacy"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/privacy/california",
  //   key: "privacy",
  //   auth: authRoles.guest,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/privacy/california"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/subscription/success",
  //   key: "subscription_success",
  //   auth: authRoles.user,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/subscription/Success"), {
  //     fallback: <Loader />,
  //   }),
  // },
  // {
  //   path: "/subscription/failed",
  //   key: "subscription_failed",
  //   auth: authRoles.user,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/subscription/Failed"), {
  //     fallback: <Loader />,
  //   }),
  // },
  {
    path: "/pwdchange",
    key: "pwdchange",
    auth: authRoles.user,
    exact: false,
    layout: "client",
    component: loadable(() => import("./../main/pwdchange"), {
      fallback: <Loader />,
    }),
  },
  // {
  //   path: "/coming-soon",
  //   key: "coming-soon",
  //   auth: authRoles.user,
  //   exact: false,
  //   layout: "client",
  //   component: loadable(() => import("./../main/comingSoon"), {
  //     fallback: <Loader />,
  //   }),
  // },
  {
    path: "/wiki/:bookId/:bookTitle",
    key: "wiki",
    auth: authRoles.user,
    exact: true,
    layout: "client",
    component: loadable(() => import("../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/wiki",
    key: "wiki",
    auth: authRoles.user,
    exact: true,
    layout: "client",
    component: loadable(() => import("../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/wiki/question/ask",
    key: "wiki",
    auth: authRoles.guest,
    exact: true,
    layout: "client",
    component: loadable(() => import("../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/wiki/search",
    key: "wiki",
    auth: authRoles.user,
    exact: true,
    layout: "client",
    component: loadable(() => import("../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/wiki/question/:questionID/:questionTitle/show",
    key: "wiki",
    auth: authRoles.user,
    exact: false,
    layout: "client",
    component: loadable(() => import("../main/wiki/WikiHome"), {
      fallback: <Loader />,
    }),
  },
];

export default routes;
