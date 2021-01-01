import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers";
import { getUser } from "./actions/user.action";
import Cookies from "js-cookie";
import "./services/http";

const token = Cookies.get("token");

if (token) store.dispatch(getUser({}));
ReactDOM.render(
        <React.StrictMode>
                <BrowserRouter>
                        <Provider store={store}>
                                <App />
                        </Provider>
                </BrowserRouter>
        </React.StrictMode>,
        document.getElementById("root")
);
