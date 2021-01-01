import { useRef, useState, useEffect, RefObject, useCallback } from "react";

export function useIntersection<T extends HTMLElement>(offset: number = 400): [RefObject<T>, boolean] {
        const myRef = useRef<T>(null);
        const [isIntersect, setIntersect] = useState(false);

        const handleOnIntersection = useCallback(() => {
                const clientHieght = window.pageYOffset;

                let elementHieght = 0;

                if (myRef.current) {
                        elementHieght = myRef.current.offsetTop - myRef.current.offsetHeight - offset;
                }

                if (clientHieght > elementHieght) {
                        setIntersect(true);
                }
        }, [offset]);

        useEffect(() => {
                window.addEventListener("scroll", handleOnIntersection);

                return () => {
                        window.removeEventListener("scroll", handleOnIntersection);
                };
        }, [handleOnIntersection]);

        useEffect(() => {
                if (isIntersect) window.removeEventListener("scroll", handleOnIntersection);
        }, [isIntersect, handleOnIntersection]);

        return [myRef, isIntersect];
}
