import React from 'react';
import { DotLoading } from 'antd-mobile';

interface Iprop {
    contractLoading: boolean;
    children: React.ReactNode;
}

const MDotLoading: React.FC<Iprop> = ({ contractLoading, children }) => {
    return <div>{contractLoading ? <DotLoading /> : children}</div>;
};

export default MDotLoading;
