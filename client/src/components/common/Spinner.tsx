import * as React from "react";

import styled, { keyframes } from "styled-components";
const RotateAnimation = keyframes`
        0% {
                transform: rotate(0deg);
        }
        100% {
                transform: rotate(360deg);
        }
`;

const Spinner = styled.svg`
        animation: ${RotateAnimation} 1s infinite linear;
`;

const SpinnerIcon: React.FunctionComponent<{ height: string; width: string }> = ({ height = "50", width = "50" }) => {
        return (
                <Spinner width={width} height={height} viewBox={`0 0 24 24`} fill="none">
                        <path
                                d="M24 12C24 14.5342 23.1977 17.0033 21.7082 19.0534C20.2187 21.1036 18.1183 22.6296 15.7082 23.4127C13.2981 24.1958 10.7019 24.1958 8.2918 23.4127C5.88167 22.6296 3.78133 21.1036 2.2918 19.0534C0.802259 17.0033 -2.21542e-07 14.5342 0 12C2.21543e-07 9.46585 0.80226 6.99675 2.2918 4.94658C3.78133 2.8964 5.88168 1.37042 8.2918 0.587321C10.7019 -0.195774 13.2981 -0.195774 15.7082 0.587322L14.9666 2.86986C13.0385 2.24338 10.9615 2.24338 9.03344 2.86986C7.10534 3.49633 5.42507 4.71712 4.23344 6.35726C3.04181 7.9974 2.4 9.97268 2.4 12C2.4 14.0273 3.04181 16.0026 4.23344 17.6427C5.42507 19.2829 7.10534 20.5037 9.03344 21.1301C10.9615 21.7566 13.0385 21.7566 14.9666 21.1301C16.8947 20.5037 18.5749 19.2829 19.7666 17.6427C20.9582 16.0026 21.6 14.0273 21.6 12H24Z"
                                fill="#2196F3"
                        />
                </Spinner>
        );
};

export default SpinnerIcon;
