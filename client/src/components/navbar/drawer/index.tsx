import * as React from "react";
import BtnLinkIcon from "../../btn/BtnLinkIcon";
import "../../../styles/components/_drawer.scss";

import { UserState } from "../../../reducers/user.reducer";

export interface DrawerProps {
        isActive: boolean;
        handleOnClick: Function;
        userState: UserState;
        handleOnLogout: Function;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({ isActive, handleOnClick, userState, handleOnLogout }) => {
        const { isLogin, isTeacher } = userState;
        const classNameDrawer = "drawer " + (isActive ? "drawer--active" : "");
        const classNameMask = "drawer__mask " + (isActive ? "drawer__mask--active" : "");

        const AuthBtn = (
                <React.Fragment>
                        <BtnLinkIcon url="/user/login" label="Log in" iconName="login.svg" />
                        <BtnLinkIcon url="/user/login" label="Sign up" iconName="profile.svg" />
                </React.Fragment>
        );

        const UserBtn = (
                <React.Fragment>
                        <BtnLinkIcon url="/user/profile" label="Profile" iconName="profile.svg" />
                </React.Fragment>
        );

        return (
                <React.Fragment>
                        <div className={classNameDrawer}>
                                {isLogin ? UserBtn : AuthBtn}
                                <BtnLinkIcon url="/quiz/search/all/1" label="Find quiz" iconName="find.svg" />
                                <BtnLinkIcon url="/quiz/new" label="Add new quiz" iconName="plus.svg" />

                                {isTeacher ? (
                                        <BtnLinkIcon url="/quiz/new" label="Create an exam" iconName="exam.svg" />
                                ) : (
                                        <BtnLinkIcon
                                                url="/quiz/search/exam/all/1"
                                                label="Take an exam"
                                                iconName="exam.svg"
                                        />
                                )}

                                <BtnLinkIcon
                                        url="#"
                                        directUrl="https://www.facebook.com/Heaty566"
                                        label="Help center"
                                        iconName="help.svg"
                                />

                                {isLogin && (
                                        <button className="btn btn__icon f--c" onClick={() => handleOnLogout()}>
                                                <span className="icon__wrapper icon--3">
                                                        <img
                                                                src="/asset/icons/common/login.svg"
                                                                alt=""
                                                                className="icon"
                                                        />
                                                </span>
                                                <span>Log out</span>
                                        </button>
                                )}
                        </div>

                        <div className={classNameMask} onClick={() => handleOnClick()}></div>
                </React.Fragment>
        );
};

export default Drawer;
