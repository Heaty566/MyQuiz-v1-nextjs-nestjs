import React, { FunctionComponent } from "react";
import "../../styles/pages/_login.scss";
import LoginScence from "./Login.scene";

export interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
        return <LoginScence />;
};

export default Login;
