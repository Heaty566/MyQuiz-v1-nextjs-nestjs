import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import { selectUser, userAction } from "../../reducers/user.reducer";
import { store } from "../../reducers";
import NavbarScene from "./Navbar.scene";

export interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
        const [isActiveMenu, setActiveMenu] = React.useState(false);
        const history = useHistory();
        const location = useLocation();
        const userState = useSelector(selectUser);

        const handleOnLogout = useCallback(() => {
                store.dispatch({ type: userAction.logoutUser.type });
                history.push("/home");
        }, [history]);

        useEffect(() => {
                setActiveMenu(false);
        }, [location.pathname]);

        return (
                <NavbarScene
                        isActiveMenu={isActiveMenu}
                        onActiveMenu={() => setActiveMenu(!isActiveMenu)}
                        onLogoutUser={handleOnLogout}
                        userState={userState}
                />
        );
};

export default Navbar;
