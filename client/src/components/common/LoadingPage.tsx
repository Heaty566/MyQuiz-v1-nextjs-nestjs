import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
`;

export interface LoadingPageProps {}

const LoadingPage: React.SFC<LoadingPageProps> = () => {
        return (
                <Container>
                        <div className="page__loading"></div>;
                </Container>
        );
};

export default LoadingPage;
