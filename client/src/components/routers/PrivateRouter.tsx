import React, { FunctionComponent } from "react";
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

        if (!userState.isTeacher) history.push("/home");
        return <Component {...props} />;
};

export default ProtectedRouter;
