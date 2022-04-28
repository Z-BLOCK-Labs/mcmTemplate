import React, { useContext, useEffect, useState } from 'react';
import * as ethers from 'ethers';
import { MyContext } from '../../../static/js/context-manager';
import { Toast } from 'antd-mobile';
import { isBorrower } from '@/contract/function/AccessProxyFunc';
// import { isBorrower } from '../../../contract/function/AccessProxyFunc';
function Connect() {
    const AddressData = useContext(MyContext);
    const issueFlagData = useContext(MyContext);
    const [chains_, setChains] = useState('');
    const supportedChainIds = ['0x61', '0x38'];

    let provider: ethers.ethers.providers.Web3Provider;
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    } else {
        Toast.show('Connect failed: Please install wallet first.');
    }

    function handleChainChanged(chainId: any) {
        if (supportedChainIds.includes(chainId)) {
            AddNetWork(chainId);
            setChains(chainId);
        } else {
            Toast.show("this chain hasn't been supported yet.");
        }
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
            AddressData.setAddress('');
            setChains('');
        } else {
            // 检测账户切换后更新账户地址
            AddressData.setAddress(accounts[0]);
            getChain();
            identifyBorrower(accounts[0]);
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
            Toast.show('Connect failed: Please install wallet first.');
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

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            getAccount();
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

    // 将账户地址格式化为前六后四
    function filter(val: any) {
        if (val !== '' && val !== undefined) {
            const len = val.length;
            return val.substring(0, 6) + '...' + val.substring(len - 4, len);
        }
    }

    // add network
    function AddNetWork(val: any) {
        window.ethereum
            .request({
                // 切换网络时有切换网络提示框，但没有增加网络的功能
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: val }],
            })
            .then(() => {
                setChains(val);
            })
            .catch((error: any) => {
                // 如果是4902错误（钱包内没有当前切换的网络），则触发增加该网络的请求；
                if (error.code === 4902) {
                    window.ethereum
                        .request({
                            // 切换网络时无网络提示框，但有增加网络的功能
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x61',
                                    chainName: 'Binance Smart Chain Testnet',
                                    rpcUrls: [
                                        'https://data-seed-prebsc-1-s1.binance.org:8545',
                                    ],
                                },
                                {
                                    chainId: '0x38',
                                    chainName: 'Binance Smart Chain Mainnet',
                                    rpcUrls: [
                                        'https://bsc-dataseed1.binance.org',
                                    ],
                                },
                            ],
                        })
                        .then(() => {
                            setChains(val);
                        })
                        .catch((error: any) => {
                            if (error.code === 4001) {
                                Toast.show(
                                    'You reject to add network...,it will effects your trade after.'
                                );
                            } else {
                                Toast.show(
                                    'Metamask version too low,please update it first!'
                                );
                            }
                        });
                } else {
                    // 打印出非网络不存在的报错情况
                    console.log('switch network error：' + error.message);
                }
            });
    }

    // identify user
    const identifyBorrower = async (AccountAddress: string) => {
        try {
            const res = await isBorrower(AccountAddress);
            issueFlagData.setIssueFlag(res);
        } catch (error) {
            issueFlagData.setIssueFlag(false);
        }
    };

    return (
        <div className="main">
            <button onClick={getAccount}>
                {AddressData.address === ''
                    ? 'Connect'
                    : filter(AddressData.address)}
            </button>
        </div>
    );
}
export default React.memo(Connect);
