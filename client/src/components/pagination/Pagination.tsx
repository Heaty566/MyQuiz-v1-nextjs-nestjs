import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { isNumeric } from "../../helpers/number.helper";

export interface PaginationProps {
        pageSize: number;
        amount: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({ pageSize = 5, amount = 0 }) => {
        const history = useHistory();
        const [currentPage, setCurrentPage] = useState<string>("1");
        const [path, setPath] = useState("");
        const [pages, setPages] = useState(0);

        useEffect(() => {
                const paths = history.location.pathname.split("/");
                setCurrentPage(paths[paths.length - 1]);
                paths.length = paths.length - 1;
                setPath(paths.join("/"));
        }, [history, path]);

        const handleOnChangePage = useCallback(
                (index: number) => {
                        setCurrentPage(String(index));
                        history.push(`${path}/${index}`);
                },
                [history, path]
        );

        useEffect(() => {
                setPages(Math.ceil(amount / pageSize));
        }, [amount, pageSize]);

        useEffect(() => {
                if (
                        (Number(currentPage) <= 0 && Boolean(path.length)) ||
                        (!isNumeric(currentPage) && Boolean(path.length))
                )
                        handleOnChangePage(1);

                if (Number(currentPage) > pages && Boolean(path.length) && pages) handleOnChangePage(pages);
        }, [currentPage, history, path, pages, handleOnChangePage]);

        if (pages === 1) return null;

        return (
                <div className="pagination">
                        {Boolean(pages) && (
                                <button className="pagination__indicator" onClick={() => handleOnChangePage(1)}>
                                        1
                                </button>
                        )}
                        {Array.apply(null, Array(pages)).map((_, index) => {
                                const className =
                                        "pagination__indicator" +
                                        (Number(currentPage) === index + 1 ? " pagination__indicator--active " : "");
                                if (index > Number(currentPage) + 4) return null;
                                if (index < Number(currentPage) - 4) return null;
                                if (index === 0 || index === pages - 1) return null;

                                return (
                                        <button
                                                key={index}
                                                className={className}
                                                onClick={() => handleOnChangePage(index + 1)}
                                        >
                                                {index + 1}
                                        </button>
                                );
                        })}
                        {Boolean(pages) && (
                                <button className="pagination__indicator" onClick={() => handleOnChangePage(pages)}>
                                        {pages}
                                </button>
                        )}
                </div>
        );
};

export default Pagination;
