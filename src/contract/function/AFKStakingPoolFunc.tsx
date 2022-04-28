import * as ethers from 'ethers';
import { createdProvider } from '@/untiles';
import { AFKGovAbi, AFKAddress, AFKGovAddress } from '../abi/StakingPool';
import { Erc20Abi } from '@/contract/abi/Erc20';
import { Toast } from 'antd-mobile';

const signer = createdProvider();

const AFKContract = new ethers.Contract(AFKGovAddress, AFKGovAbi, signer);
/**
 *
 * @param amount //质押数量
 * @returns
 */
export async function deposit(amount: string) {
    return new Promise((resolve, reject) => {
        AFKContract.deposit(amount)
            .then((result: any) => {
                result
                    .wait()
                    .then((res: any) => {
                        resolve(res);
                    })
                    .catch((e: any) => {
                        reject(e);
                    });
            })
            .catch((error: any) => {
                Toast.show(JSON.stringify(error));
                reject(error);
            });
    });
}

export interface withdrawProp {
    to: string; // 用户赎回后token转移地址
    amount: ethers.BigNumber; // 用户赎回数量
}
export async function withdraw({ to, amount }: withdrawProp) {
    return new Promise((resolve, reject) => {
        AFKContract.withdraw(to, amount)
            .then((result: any) => {
                result
                    .wait()
                    .then((res: any) => {
                        resolve(res);
                    })
                    .catch((e: any) => {
                        reject(e);
                    });
            })
            .catch((error: any) => {
                Toast.show(JSON.stringify(error));
                reject(error);
            });
    });
}

/**
 *
 * @param account //用户地址
 * @returns
 */
export async function getPoint(account: string) {
    return new Promise((resolve, reject) => {
        AFKContract.getPoint(account)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

/**
 *
 * @param account //用户地址
 * @returns
 */
export async function getRewards(account: string) {
    return new Promise((resolve, reject) => {
        AFKContract.getRewards(account)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

/**
 *
 * @param account //用户地址
 * @returns
 */
export async function _stakingAmount(account: string) {
    return new Promise((resolve, reject) => {
        AFKContract._stakingAmount(account)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function approveErc20(Erc20Amount: string) {
    const erc20Contract = new ethers.Contract(AFKAddress, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .approve(AFKGovAddress, Erc20Amount)
            .then((result: any) => {
                result
                    .wait()
                    .then((res: any) => {
                        resolve(res);
                    })
                    .catch((e: any) => {
                        reject(e);
                    });
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}
