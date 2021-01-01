import { useEffect, useState } from "react";

export function useDebounce(value: any, deplay: number) {
        const [debouceValue, setDebouceValue] = useState(value);
        useEffect(() => {
                const handler = setTimeout(() => {
                        setDebouceValue(value);
                }, deplay);

                return () => {
                        clearTimeout(handler);
                };
        }, [value, deplay]);

        return debouceValue;
}
