import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
export interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
        return (
                <footer className="footer">
                        <div className="footer__container--top">
                                <div className="footer__col">
                                        <h4 className="col__title">Subjects</h4>
                                        <ul className="col__list">
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/math/1" className="col__link">
                                                                Math
                                                        </Link>
                                                </li>

                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/science/1" className="col__link">
                                                                Science
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/music/1" className="col__link">
                                                                Music
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/language/1" className="col__link">
                                                                Language
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/social/1" className="col__link">
                                                                Social Sicence
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/all/1" className="col__link">
                                                                Other
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>
                                <div className="footer__col">
                                        <h3 className="col__title">Features</h3>
                                        <ul className="col__list">
                                                <li className="col__item">
                                                        <Link to="/quiz/new" className="col__link">
                                                                Create Quiz
                                                        </Link>
                                                </li>

                                                <li className="col__item">
                                                        <Link to="/quiz/search/exam/all/1" className="col__link">
                                                                Take Exam
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="/quiz/search/learn/all/1" className="col__link">
                                                                Flash Card
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Cross Platform
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>
                                <div className="footer__col">
                                        <h3 className="col__title">Contact</h3>
                                        <ul className="col__list">
                                                <li className="col__item">
                                                        <a
                                                                href="https://github.com/Heaty566/myquiz-server"
                                                                className="col__link"
                                                        >
                                                                Github
                                                        </a>
                                                </li>

                                                <li className="col__item">
                                                        <a
                                                                href="https://www.facebook.com/Heaty566"
                                                                className="col__link"
                                                        >
                                                                Facebook
                                                        </a>
                                                </li>
                                                <li className="col__item">
                                                        <a href="mailto: heaty566@gmail.com" className="col__link">
                                                                Gmail
                                                        </a>
                                                </li>
                                        </ul>
                                </div>
                                <div className="footer__col">
                                        <h3 className="col__title">Member</h3>
                                        <ul className="col__list">
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Pham Vinh Nhan
                                                        </Link>
                                                </li>

                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Truong Cong Chinh
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Vo Tuan Khanh
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Luong Ngoc Son
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Pham Phu Quy
                                                        </Link>
                                                </li>
                                                <li className="col__item">
                                                        <Link to="#" className="col__link">
                                                                Tran Hoang Phong
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>
                        </div>
                        <div className="footer__container--bottom">
                                <a className="footer__link" href="https://heaty566.io/">
                                        <span>DEVELOPED BY HEATY566</span>
                                        <span>Copyright © 2020 Haley Pham</span>
                                </a>
                        </div>
                </footer>
        );
};

export default Footer;
