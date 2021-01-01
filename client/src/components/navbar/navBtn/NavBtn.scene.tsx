import React, { FunctionComponent } from "react";

import BtnLink from "../../btn/BtnLink";
import { Link } from "react-router-dom";
import { UserState } from "../../../reducers/user.reducer";
import { QuizState } from "../../../reducers/quiz.reducer";
import { RequestState } from "../../../reducers/api.reducer";

export interface NavBtnProps {
        register: Function;
        quizState: QuizState;
        apiState: RequestState;
        userState: UserState;
        watcher: string;
        handleOnEnter: Function;
        handleOnClickMenu: Function;
}

const NavBtnScene: FunctionComponent<NavBtnProps> = ({
        register,
        quizState,
        apiState,
        userState,
        watcher,
        handleOnEnter,
        handleOnClickMenu,
}) => {
        const GroupBtn = (
                <React.Fragment>
                        <Link to="/user/login" className="navbtn__btn">
                                Log in
                        </Link>
                        <BtnLink label="Sign Up" url="/user/login" />
                </React.Fragment>
        );

        const UserBtn = (
                <div className="navbtn__user f--c" onClick={() => handleOnClickMenu()}>
                        <div className="user__avatar">
                                <img src="/asset/images/avatar.png" alt="" />
                        </div>
                        <div className="user__btn">
                                <span></span>
                                <span></span>
                                <span></span>
                        </div>
                </div>
        );

        const SearchResult = () => {
                if (apiState.isLoading) {
                        return (
                                <li className="search__result__item">
                                        <span className="search__result__link">Search ...</span>
                                </li>
                        );
                }

                if (!quizState.searchQuizzes.length && watcher) {
                        return (
                                <li className="search__result__item">
                                        <a className="search__result__link" href="#/">
                                                Not found
                                        </a>
                                </li>
                        );
                }

                return quizState.searchQuizzes.slice(0, 10).map((item) => {
                        return (
                                <li className="search__result__item" key={item._id}>
                                        <a
                                                className="search__result__link"
                                                href={`/quiz/search/${apiState.type}/${item.name}/1`}
                                        >
                                                {item.name}
                                        </a>
                                </li>
                        );
                });
        };

        return (
                <div className="navbtn">
                        <div className="navbtn__search">
                                <span className="icon__wrapper icon--3">
                                        <img src="/asset/icons/common/find-white.svg" alt="" className="icon" />
                                </span>
                                <input
                                        type="text"
                                        className="navbtn__search__box"
                                        placeholder="Search..."
                                        name="search"
                                        autoComplete="off"
                                        ref={(ref) => register(ref)}
                                        onKeyDown={(event) => handleOnEnter(event)}
                                />
                                <ul className="navbtn__search__result">{SearchResult()}</ul>
                        </div>
                        {userState.isLogin ? UserBtn : GroupBtn}
                </div>
        );
};

export default NavBtnScene;
