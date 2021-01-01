import React, { FunctionComponent, useEffect } from "react";
import { selectUser } from "../../reducers/user.reducer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export interface ProtectedRouterProps {
        Component: FunctionComponent;
        [name: string]: any;
}

const ProtectedRouter: FunctionComponent<ProtectedRouterProps> = ({ Component, ...props }) => {
        const userState = useSelector(selectUser);
        const history = useHistory();

        useEffect(() => {
                if (!userState.isLogin) history.push("/user/login");
        }, [history, userState.isLogin]);

        return <Component {...props} />;
};

export default ProtectedRouter;
