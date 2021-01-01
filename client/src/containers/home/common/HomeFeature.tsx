import * as React from "react";
import { Link } from "react-router-dom";

export interface HomeFeatureProps {}

const HomeFeature: React.FunctionComponent<HomeFeatureProps> = () => {
        return (
                <section className="home__feature">
                        <h1 className="feature__title">Select You Favorite Subject</h1>

                        <div className="feature__col">
                                <Link to="/quiz/search/learn/language/1" className="feature__card f--e feature__card-1">
                                        <span>Language</span>
                                        <span className="icon__wrapper icon-8">
                                                <img src="./asset/icons/home/book.svg" alt="" className="icon" />
                                        </span>
                                </Link>
                                <Link to="/quiz/search/exam/science/1" className="feature__card f--e feature__card-2">
                                        <span>Science</span>
                                        <span className="icon__wrapper icon-8">
                                                <img src="./asset/icons/home/science.svg" alt="" className="icon" />
                                        </span>
                                </Link>
                                <Link to="/quiz/search/exam/music/1" className="feature__card f--e feature__card-3">
                                        <span>Music</span>
                                        <span className="icon__wrapper icon-8">
                                                <img src="./asset/icons/home/music.svg" alt="" className="icon" />
                                        </span>
                                </Link>
                        </div>
                        <div className="feature__col">
                                <Link to="/quiz/search/exam/math/1" className="feature__card f--e feature__card-1">
                                        <span>Math</span>
                                        <span className="icon__wrapper icon-8">
                                                <img src="./asset/icons/home/calculator.svg" alt="" className="icon" />
                                        </span>
                                </Link>
                                <Link to="/quiz/search/exam/social/1" className="feature__card f--e feature__card-2">
                                        <span>
                                                <span>Social</span>
                                                <span>science</span>
                                        </span>
                                        <span className="icon__wrapper icon-8">
                                                <img
                                                        src="./asset/icons/home/social-science.svg"
                                                        alt=""
                                                        className="icon"
                                                />
                                        </span>
                                </Link>
                                <Link to="/quiz/search/exam/all/1" className="feature__card  f--e feature__card-3">
                                        <span>Other</span>
                                        <span className="icon__wrapper icon-8">
                                                <img src="./asset/icons/home/other.svg" alt="" className="icon" />
                                        </span>
                                </Link>
                        </div>
                </section>
        );
};

export default HomeFeature;
