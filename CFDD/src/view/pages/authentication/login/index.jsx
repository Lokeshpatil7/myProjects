import React from "react";

import loginbg1 from "../../../../assets/images/pages/login/login_bg1.png";
import loginbg2 from "../../../../assets/images/pages/login/login_bg2.png";
import loginbg from "../../../../assets/images/pages/login/login_bg3.png";
// import SuccessModal from '../../../modals/SuccessModal'
import "./login.css";

import LoginForm from "./login_form";

export default function Login() {
  return (
    <div className="ml-auto">
      {/* <SuccessModal primaryAction='addeddd' secondaryAction='helloooooo'/> */}
      <img alt="bg1" src={loginbg} className="login_bg" />
      <img alt="bg2" src={loginbg1} className="login_bg1" />
      <img alt="bg3" src={loginbg2} className="login_bg2" />
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
