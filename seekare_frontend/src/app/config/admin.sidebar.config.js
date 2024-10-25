import React from "react";
import { BiHome, BiUser, BiQuestionMark } from "react-icons/bi";
import {
  RiAdminLine,
  RiPriceTagFill,
  RiQuestionAnswerFill,
} from "react-icons/ri";

const sidebarConfig = [
  {
    icon: <BiHome />,
    title: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <BiUser />,
    title: "User Management",
    link: "/admin/users",
  },
  {
    icon: <RiQuestionAnswerFill />,
    title: "Questions",
    link: "/admin/questions",
  },
  {
    icon: <RiQuestionAnswerFill />,
    title: "KarePages",
    link: "/admin/karepages",
  },
  {
    icon: <RiPriceTagFill />,
    title: "Tags",
    link: "/admin/tags",
  },
  {
    icon: <BiQuestionMark />,
    title: "Question Analysis",
    link: "/admin/searchkeywords",
  },
  {
    icon: <RiAdminLine />,
    title: "Roles",
    link: "/admin/roles",
  },
];

export default sidebarConfig;
