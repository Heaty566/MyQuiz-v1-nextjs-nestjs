import React, { FunctionComponent } from "react";

export interface LoginScenceProps {}

const LoginScene: FunctionComponent<LoginScenceProps> = () => {
        return (
                <div className="login fade-in f--s">
                        <h2 className="login__title">Log in to Your MyQuiz!</h2>
                        <a className="login__google f--s" href={`${process.env.REACT_APP_SERVER_URL}/auth/google`}>
                                <span className="icon__wrapper icon--6">
                                        <img src="/asset/icons/common/google.svg" alt="" className="icon" />
                                </span>
                                <span>Contine with Google</span>
                        </a>
                </div>
        );
};

export default LoginScene;
