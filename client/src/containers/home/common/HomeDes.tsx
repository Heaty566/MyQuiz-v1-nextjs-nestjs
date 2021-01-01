import * as React from "react";
import ImageLazy from "../../../components/common/ImageLazy";

export type DesRef = [
        React.RefObject<HTMLDivElement>,
        React.RefObject<HTMLDivElement>,
        React.RefObject<HTMLDivElement>
];

export type DesClassName = [string, string, string];

export interface HomeDesProps {
        className: DesClassName;
        desRef: React.RefObject<DesRef>;
}

const HomeDes: React.FunctionComponent<HomeDesProps> = ({ className, desRef }) => {
        if (desRef.current)
                return (
                        <section className="description f--c">
                                <h1 className="description__title">Why MyQuiz is the best option?</h1>
                                <div className={className[0]} ref={desRef.current[0]}>
                                        <div className="col__img f--c">
                                                <ImageLazy src="/asset/icons/home/home-description-1.svg" alt="" />
                                        </div>
                                        <div className="col__content">
                                                <h1 className="content__title">Study from every where, every time</h1>
                                                <p className="content__text">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                        quae ab illo inventore veritatis et quasi architecto beatae
                                                        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                                        voluptas sit aspernatur aut odit aut fugit, sed quia
                                                        consequuntur magni dolores eos qui ratione voluptatem sequi
                                                        nesciunt.
                                                </p>
                                        </div>
                                </div>
                                <div className={className[1]} ref={desRef.current[1]}>
                                        <div className="col__content">
                                                <h1 className="content__title">Remember everything fast and longer</h1>
                                                <p className="content__text">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                        quae ab illo inventore veritatis et quasi architecto beatae
                                                        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                                        voluptas sit aspernatur aut odit aut fugit, sed quia
                                                        consequuntur magni dolores eos qui ratione voluptatem sequi
                                                        nesciunt.
                                                </p>
                                        </div>
                                        <div className="col__img f--c">
                                                <ImageLazy src="/asset/icons/home/home-description-2.svg" alt="" />
                                        </div>
                                </div>
                                <div className={className[2]} ref={desRef.current[2]}>
                                        <div className="col__img f--c">
                                                <ImageLazy src="/asset/icons/home/home-description-3.svg" alt="" />
                                        </div>
                                        <div className="col__content">
                                                <h1 className="content__title"> Create Your Own Test quickly</h1>
                                                <p className="content__text">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                                        quae ab illo inventore veritatis et quasi architecto beatae
                                                        vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                                        voluptas sit aspernatur aut odit aut fugit, sed quia
                                                        consequuntur magni dolores eos qui ratione voluptatem sequi
                                                        nesciunt.
                                                </p>
                                        </div>
                                </div>
                        </section>
                );

        return null;
};

export default HomeDes;
