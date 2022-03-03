import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

// import { ConfigProvider } from 'antd';
// import tr_TR from 'antd/lib/locale/tr_TR';

import App from "./App";
import { Spin } from "antd";

ReactDOM.render(
  <Suspense fallback={<Spin className="center-spin" />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
