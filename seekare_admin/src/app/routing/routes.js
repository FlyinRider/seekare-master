import React from "react";
import { Redirect } from "react-router-dom";
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
  {
    path: "/admin",
    key: "admin_redirect",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: () => <Redirect to="/admin/dashboard" />,
  },
  {
    path: "/admin/dashboard",
    key: "admin_dashboard",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("../main/admin/dashboard"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/questions",
    key: "admin_questions",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/questions"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/karepages",
    key: "admin_karepages",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/karepages"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/searchkeywords",
    key: "admin_keywords",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/searchkeywords"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/questions/:questionID",
    key: "admin_question_detail",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(
      () => import("./../main/admin/questions/QuestionDetail"),
      {
        fallback: <Loader />,
      }
    ),
  },
  {
    path: "/admin/users",
    key: "admin_users",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/users"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/users/:userID",
    key: "admin_user_detail",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/users/UserDetail"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/tags",
    key: "admin_tags",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/tags"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/roles",
    key: "admin_roles",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/roles"), {
      fallback: <Loader />,
    }),
  },
  {
    path: "/admin/emailservice",
    key: "admin_roles",
    auth: authRoles.admin,
    exact: true,
    layout: "admin",
    component: loadable(() => import("./../main/admin/emailservice"), {
      fallback: <Loader />,
    }),
  },
  
];

export default routes;
