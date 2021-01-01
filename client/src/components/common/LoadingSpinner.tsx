import * as React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const SpinnerContainer = styled.div`
        width: "100%";
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
`;
export interface LoadingSpinnerProps {}

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = () => {
        return (
                <SpinnerContainer>
                        <Spinner height="40" width="40" />
                </SpinnerContainer>
        );
};

export default LoadingSpinner;
