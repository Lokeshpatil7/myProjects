// import { Home, Graph, Document, People, Paper } from "react-iconly";
import dashboard from "../assets/images/sidebar/dashboard.svg";
import org from "../assets/images/sidebar/org.svg";
import centralrepo from "../assets/images/sidebar/centralrepo.svg";
import utility from "../assets/images/sidebar/utility.svg";
import additional from "../assets/images/sidebar/additional.svg";
import master from "../assets/images/sidebar/master.svg";
import onboarding from "../assets/images/sidebar/onboarding.svg";
import complianceRepository from "../view/main/complianceRepository";

const main = [
  {
    id: "dashboard",
    title: <main className="sidebar-title">Dashboard</main>,
    icon: <img className="sidebar-icons" alt="" src={dashboard} />,
    navLink: "/dashboard",
    role: "SUPER_ADMIN",
  },
  // {
  //   id: "group",
  //   title: "Group",
  //   icon: <Home set="curved" className="remix-icon" />,
  //   navLink: "/group",
  // },
  {
    id: "organizations",
    title: <main className="sidebar-title">Organizations</main>,
    icon: <img className="sidebar-icons" alt="" src={org} />,
    navLink: "/organizations",
    role: "SUPER_ADMIN",
  },
  {
    id: "centralRepository",
    title: <main className="sidebar-title">Central repository</main>,
    icon: <img className="sidebar-icons" alt="" src={centralrepo} />,
    navLink: "/central-repository",
    role: "SUPER_ADMIN",
  },
  {
    id: "utility",
    title: <main className="sidebar-title">Utility</main>,
    icon: <img className="sidebar-icons" alt="" src={utility} />,
    navLink: "/utility",
    role: "SUPER_ADMIN",
  },
  {
    id: "additionalServices",
    title: <main className="sidebar-title">Additional services</main>,
    icon: <img className="sidebar-icons" alt="" src={additional} />,
    navLink: "/additional-services",
    role: "SUPER_ADMIN",
  },

  {
    id: "Master",
    title: <main>Master</main>,
    icon: <img className="sidebar-icons" alt="" src={master} />,
    navLink: "/master",
    role: "SUPER_ADMIN",
  },
  {
    id: "Onboarding",
    title: <main>Onboarding</main>,
    icon: <img className="sidebar-icons" alt="" src={onboarding} />,
    navLink: "/onboarding",
    role: "SUPER_ADMIN",
  },
  {
    id: "Onboarding-unit",
    title: <main>Onboarding</main>,
    icon: <img className="sidebar-icons" alt="" src={onboarding} />,
    navLink: "/onboarding-unit",
    role: "ENTITY_ADMIN",
  },
  {
    id: "Compliance Repository",
    title: <main>Compliance Repository</main>,
    icon: <img className="sidebar-icons" alt="" src={centralrepo} />,
    navLink: "/compliance-repository",
    role: "ENTITY_ADMIN",
  },
  {
    id: "User Compliance Repository",
    title: <main>Compliance Repo</main>,
    icon: <img className="sidebar-icons" alt="" src={centralrepo} />,
    navLink: "/user-compliance-repository",
    role: "L1",
  },
];

export default main;
