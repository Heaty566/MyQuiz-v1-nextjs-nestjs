import React, { FunctionComponent } from "react";
import BtnLink from "../../components/btn/BtnLink";
import HomeTopAnimation from "./common/HomeAnimation.icon";

import { HomeDesProps } from "./common/HomeDes";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export interface HomeScenceProps extends HomeDesProps {}

const HomeDes = React.lazy(() => import("./common/HomeDes"));
const HomeFeature = React.lazy(() => import("./common/HomeFeature"));

const HomeScene: FunctionComponent<HomeScenceProps> = ({ desRef, className }) => {
        return (
                <div className="home f--c fade-in">
                        <h1 className="home__title">
                                <span className="home__title--main">
                                        Create your online quizzes, and exams for free
                                </span>
                                <span className="home__title--sub">
                                        You bring the brains, we’ll bring everything else
                                </span>
                        </h1>
                        <BtnLink label="Getting start" url="/quiz/search/learn/all/1" size="lg" />
                        <HomeTopAnimation />

                        <React.Suspense fallback={<LoadingSpinner />}>
                                <HomeFeature />
                                <HomeDes className={className} desRef={desRef} />
                        </React.Suspense>
                </div>
        );
};

export default HomeScene;
