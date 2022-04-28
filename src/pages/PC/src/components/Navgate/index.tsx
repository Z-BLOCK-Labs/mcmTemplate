import React, { useState } from 'react';
import './index.less';
import logo from '../../assets/pc-img/LOGO@2x.png';
import Wallet from '../wallet/index';

const Index = () => {
    const [account, SetAccount] = useState('');
    const [isConnect, setIsConnect] = useState(false);

    const changeAccount = (val: any) => {
        SetAccount(val);
    };

    function connect() {
        setIsConnect(true);
    }
    return (
        <div className="line">
            <div className="top">
                <div className="top_box">
                    <div className="top_box_logo">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="top_box_content">
                    <a href="">Pool</a>
                    {/* <p>.</p> */}
                </div>
                <div className="contect_btn">
                    {account ? (
                        <button>{account}</button>
                    ) : (
                        <button onClick={connect}>Connect</button>
                    )}
                </div>
            </div>
            <Wallet
                get={(val: any) => changeAccount(val)}
                connectWallet={isConnect}
                account={account}
            ></Wallet>
        </div>
    );
};

export default Index;
