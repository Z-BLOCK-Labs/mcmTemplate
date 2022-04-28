import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import * as ethers from 'ethers';
import { MyContext } from '../../untiles/context';
import { createdProvider } from '@/untiles';
export default function index(props: any) {
    const { get, account } = props;

    //   const [balance, setBalance] = useState('');

    const contextData = useContext(MyContext);
    const [address, setAddress] = useState('');
    const [chains_, setChains] = useState('');
    const supportedChainIds = ['0x1', '0x3', '0x4', '0x5', '0x2a', '0x61'];

    let provider:
        | ethers.ethers.providers.WebSocketProvider
        | ethers.ethers.providers.Web3Provider;
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    }

    // 将账户地址格式化为前六后四
    function filter(val: any) {
        const len = val.length;
        return val.substring(0, 6) + '...' + val.substring(len - 4, len);
    }

    function handleChainChanged(chainId: any) {
        if (supportedChainIds.includes(chainId)) {
            setChains(chainId);
            console.log(chains_);
        } else {
            alert("this chain hasn't been supported yet.");
        }
        // provider.send("eth_requestAccounts", [])
        //     .then((result) => {
        //         // getBalance(result[0]);
        //     })
        //     .catch((error) => {
        //         // If the request fails, the Promise will reject with an error.
        //         alert(error.message)
        //     });
    }

    // 获取chainId (ethers)
    function getChain() {
        provider
            .getNetwork()
            .then((result: { chainId: any }) => {
                const a = result.chainId;
                // 将十进制结果转换为十六进制字符串
                const result_ = '0x' + a.toString(16);
                handleChainChanged(result_);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
    // 检测用户是否锁定了账户
    function handleAccountsChanged(accounts: any) {
        if (accounts?.length === 0) {
            setAddress('');
            setChains('');
            get('');
            // setBalance('')
        } else {
            // 检测账户切换后更新账户地址
            setAddress(accounts[0]);
            getChain();
            get(filter(accounts[0]));
            contextData.setAddress_(accounts[0]);
            // 获取账户余额
            // getBalance(accounts[0]);
            // window.location.reload();
            const userAdress = window.localStorage.getItem('userAddress');
            if (!accounts[0]) return;
            if (!userAdress) {
                window.localStorage.setItem('userAddress', accounts[0]);
            } else {
                if (userAdress !== accounts[0]) {
                    window.localStorage.setItem('userAddress', accounts[0]);
                    window.location.reload();
                }
            }
        }
    }

    // 获取账户地址 (ethers)
    function getAccount() {
        if (typeof window.ethereum === 'undefined') {
            alert('please install Metamsk.');
        } else {
            provider
                .send('eth_requestAccounts', [])
                .then(handleAccountsChanged)
                .catch((error: any) => {
                    // If the request fails, the Promise will reject with an error.
                    console.log(error.message);
                });
        }
    }

    useLayoutEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            getAccount();
        } else {
            alert('Download the Wallet,please');
        }
    }, []);
    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', (result: any) => {
                handleChainChanged(result);
            });
            return () => {
                window.ethereum.removeListener('chainChanged', getChain);
                window.ethereum.removeListener(
                    'accountsChanged',
                    handleAccountsChanged
                );
            };
        }
    }, []);
    // 监听父组件的contnectButton事件
    useEffect(() => {
        if (props.connectWallet) {
            getAccount();
        }
    });

    // function AddNetWork(val: any) {
    //     window.ethereum.request({
    //         // 切换网络时有切换网络提示框，但没有增加网络的功能
    //         method: 'wallet_switchEthereumChain',
    //         params: [{ chainId: val }],
    //     }).then(() => {
    //         setChains(val);
    //     }).catch((error: any) => {
    //         // 如果是4902错误（钱包内没有当前切换的网络），则触发增加该网络的请求；
    //         if (error.code === 4902) {
    //             window.ethereum.request({
    //                 // 切换网络时无网络提示框，但有增加网络的功能
    //                 method: 'wallet_addEthereumChain',
    //                 params: [
    //                     {
    //                         chainId: '0x61',
    //                         chainName: 'Binance Smart Chain Testnet',
    //                         rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    //                     },
    //                     {
    //                         chainId: '0x38',
    //                         chainName: 'Binance Smart Chain Mainnet',
    //                         rpcUrls: ['https://bsc-dataseed1.binance.org'],
    //                     },
    //                 ],
    //             }).then(() => {
    //                 setChains(val);
    //             }).catch((error: any) => {
    //                 if (error.code === 4001) {
    //                     alert("You reject to add network...,it will effects your trade after.")
    //                 } else {
    //                     alert("Metamask version too low,please update it first!")
    //                 }
    //             });
    //         } else {  // 打印出非网络不存在的报错情况
    //             console.log("switch network error：" + error.message);
    //         }
    //     })
    // }
    // function choooseNet(event: any) {
    //     AddNetWork(event.target.value);
    //     event.preventDefault();
    // }

    // function getBalance(val: any) {
    //     provider.getBalance(val).then((result) => {
    //         // 余额是 BigNumber (in wei)，所以需要把余额格式化为 ether 字符串
    //         const etherString = ethers.utils.formatEther(result);
    //         setBalance(etherString)
    //     });
    // }
    return (
        <div></div>
        //     <div className="main">
        //     <button onClick={getAccount}> {address == '' ? 'connect' : filter(address)}</button>
        //     <p>address: {address}</p>
        //     <p>balance: {balance}</p>
        //     <p>chain: {chains_}</p>
        //     <select id="NetworkList" onChange={choooseNet} value={chains_}>
        //         <option value="0x1">main</option>
        //         <option value="0x61">BSC Testnet</option>
        //         <option value="0x3">Ropsten</option>
        //         <option value="0x4">Rinkeby</option>
        //         <option value="0x5">Goerli</option>
        //         <option value="0x2a">Kovan</option>
        //     </select>
        // </div>
    );
}
