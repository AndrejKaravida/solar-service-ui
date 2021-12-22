import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
