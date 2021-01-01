import React, { useState, useRef, useCallback, useEffect, FunctionComponent } from "react";

import { useIntersection } from "../../hooks/useIntersection";
import "../../styles/pages/_home.scss";
import HomeScene from "./Home.scene";
import { DesClassName, DesRef } from "./common/HomeDes";

const Home: FunctionComponent<{}> = () => {
        const [ref1, isPassRef1] = useIntersection<HTMLDivElement>();
        const [ref2, isPassRef2] = useIntersection<HTMLDivElement>();
        const [ref3, isPassRef3] = useIntersection<HTMLDivElement>();
        const desRef = useRef<DesRef>([ref1, ref2, ref3]);

        const [desClassName, setDesClassName] = useState<DesClassName>([
                "description__col fade--left",
                "description__col fade--right",
                "description__col fade--left",
        ]);

        const changeName = useCallback(
                (index: number) => {
                        if (!desClassName[index].includes("description--appear")) {
                                const className: DesClassName = [desClassName[0], desClassName[1], desClassName[2]];

                                className[index] += " description--appear";
                                setDesClassName(className);
                        }
                },
                [desClassName]
        );

        useEffect(() => {
                if (isPassRef1) changeName(0);
                if (isPassRef2) changeName(1);
                if (isPassRef3) changeName(2);
        }, [isPassRef1, isPassRef2, changeName, isPassRef3]);

        return <HomeScene desRef={desRef} className={desClassName} />;
};

export default Home;
