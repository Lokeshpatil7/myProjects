import main from "./main";

const currentUserRole = sessionStorage.getItem("currentUserRole") || "";
const navigation = [...main.filter((route) => route.role === currentUserRole)];

export default navigation;
