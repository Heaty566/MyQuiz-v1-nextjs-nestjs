import React, { FunctionComponent, useState } from "react";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import LoadingSpinner from "./LoadingSpinner";

export interface ImageLazyProps extends LazyLoadImageProps {}

const ImageLazy: FunctionComponent<ImageLazyProps> = ({ ...props }) => {
        const [loading, setLoading] = useState(true);

        return (
                <React.Fragment>
                        <LazyLoadImage
                                style={{
                                        height: loading ? "0px" : "100%",
                                        width: loading ? "0px" : "100%",
                                        opacity: loading ? "0" : "1",
                                        transition: "0.4s",
                                }}
                                {...props}
                                onLoad={() => {
                                        setLoading(false);
                                }}
                        />

                        {loading && <LoadingSpinner />}
                </React.Fragment>
        );
};

export default ImageLazy;
