import React, { FunctionComponent, useCallback, useEffect } from "react";
import { SearchQuizItem } from "../../reducers/quiz.reducer";
import { convertTime } from "../../helpers/time.helper";
import "../../styles/pages/_quiz-search.scss";
import { Link, useHistory } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebouce";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { apiSelector } from "../../reducers/api.reducer";

export interface TakeQuizSceneProps {
        quizzes: SearchQuizItem[];
        amount: number;
        register: Function;
}

const SearchQuizScene: FunctionComponent<TakeQuizSceneProps> = ({ quizzes, amount }) => {
        const params = useParams<{ type: string; name: string; page: string }>();
        const { register, watch } = useForm({ defaultValues: { search: "" } });
        const watcher = watch("search");
        const history = useHistory();
        const apiState = useSelector(apiSelector);
        const searchDebouce = useDebounce(watcher, 1000);

        const callApi = useCallback(
                (value: string) => {
                        history.push(`/quiz/search/${apiState.type}/${watcher}/1`);
                },
                [apiState.type, history, watcher]
        );

        useEffect(() => {
                if (searchDebouce && watcher) callApi(searchDebouce);
        }, [searchDebouce, callApi, watcher]);

        const NotFound = () => {
                return (
                        <div className="quiz-search-not-found f--c">
                                <h3>Your quiz doesn't exist, Please try different name</h3>
                        </div>
                );
        };

        const Quzzies = () => {
                return (
                        <div className="quiz-search__container">
                                {quizzes.map((item) => {
                                        return (
                                                <Link
                                                        to={`/quiz/${item._id}/${params.type}`}
                                                        key={item._id}
                                                        className="card card__bg"
                                                >
                                                        <h3 className="card__title">{item.name}</h3>
                                                        <div className="card__body">
                                                                <p className="card__text">{item.questions} Questions</p>
                                                                <p className="card__text"> {convertTime(item.time)}</p>
                                                        </div>
                                                </Link>
                                        );
                                })}
                        </div>
                );
        };

        const LearnOrExam = () => {
                if (params.type === "exam") return <h2>Please select one to take exam</h2>;
                return <h2>Chooise your favorite subject</h2>;
        };

        return (
                <div className="quiz-search">
                        <div className="quiz-search__wrapper f--c">
                                {LearnOrExam()}
                                <div className="quiz-search__box f--b">
                                        <span className="icon__wapper search__icon">
                                                <img className="icon" src="/asset/icons/common/find-white.svg" alt="" />
                                        </span>
                                        <input
                                                className="search__input"
                                                placeholder="Enter quiz name"
                                                name="search"
                                                autoComplete="off"
                                                ref={(ref) => register(ref)}
                                        />
                                </div>
                        </div>

                        {quizzes.length ? Quzzies() : NotFound()}
                        <div className="quiz-search--bottom">
                                <Pagination pageSize={12} amount={amount} />
                        </div>
                </div>
        );
};

export default SearchQuizScene;
