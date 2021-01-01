import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import "./styles/main.scss";

import LoadingSpinner from "./components/common/LoadingSpinner";
import LoadingPage from "./components/common/LoadingPage";
// import PrivateRouter from "./components/routers/PrivateRouter";
import ProtectedRouter from "./components/routers/ProtectedRouter";
import ProtectAuthRouter from "./components/routers/ProtectedAuthRouter";
import { apiAction } from "./reducers/api.reducer";
import { store } from "./reducers";

const Footer = React.lazy(() => import("./containers/footer"));

const Profile = React.lazy(() => import("./containers/profile"));
const Login = React.lazy(() => import("./containers/login"));
const Home = React.lazy(() => import("./containers/home"));
const Navbar = React.lazy(() => import("./containers/navbar"));
const CreateNewQuiz = React.lazy(() => import("./containers/createNewQuiz"));
const TakeQuiz = React.lazy(() => import("./containers/takeQuiz"));
const TakeExam = React.lazy(() => import("./containers/takeExam"));
const SearchQuiz = React.lazy(() => import("./containers/searchQuiz"));
export interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
        const location = useLocation();

        useEffect(() => {
                window.scrollTo(0, 0);
                store.dispatch({ type: apiAction.refreshApi.type });
        }, [location.pathname]);

        return (
                <div className="App typography">
                        <Suspense fallback={<LoadingPage />}>
                                <Navbar />
                                <main className="container">
                                        <Switch>
                                                <Route path="/home" component={Home} />
                                                <ProtectAuthRouter path="/user/login" Component={Login} />
                                                <ProtectAuthRouter path="/user/register" Component={Login} />
                                                <ProtectedRouter path="/user/profile" Component={Profile} />
                                                <ProtectedRouter path="/quiz/new" exact Component={CreateNewQuiz} />
                                                <Route path="/quiz/search/:type/:name/:page" component={SearchQuiz} />
                                                <Redirect
                                                        path="/quiz/search/:type/:name"
                                                        to="/quiz/search/learn/:name/1"
                                                />

                                                <Route path="/quiz/:quizId/learn" component={TakeQuiz} />
                                                <Route path="/quiz/:quizId/exam" component={TakeExam} />
                                                <Redirect path="/quiz/:quizId" to="/quiz/:quizId/exam" />
                                                <Redirect from="/" to="/home" />
                                        </Switch>
                                </main>
                                <Suspense fallback={<LoadingSpinner />}>
                                        <Footer />
                                </Suspense>
                        </Suspense>
                </div>
        );
};

export default App;
