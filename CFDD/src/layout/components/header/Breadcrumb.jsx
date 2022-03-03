import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PagesRoutes from "../../../router/routes/Pages";

export default function Breadcrumb({ collapsed }) {
  const [title, setTitle] = useState("");
  let history = useHistory();
  history.listen((location, action) => {
    const tt = PagesRoutes.find((nav) => nav.id === location.pathname)?.id;
    setTitle(tt);
  });
  return (
    <div 
    style={{ fontWeight: "bold", 
    visibility: window.innerWidth < 547 && !collapsed && 'hidden'}}>
      {PagesRoutes.find((nav) => nav.id === title)?.title}
    </div>
  );
}
