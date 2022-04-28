import * as ethers from 'ethers';
import { Erc20Abi } from '../abi/Erc20';
import { createdProvider } from '@/untiles';
import {
    AFKBNBLPTokenAbi,
    AFKLPAddress,
    BNBPoolAddress,
} from '../abi/StakingPool';
const signer = createdProvider();

const BNBContract = new ethers.Contract(
    BNBPoolAddress,
    AFKBNBLPTokenAbi,
    signer
);

/**
 *
 * @param amount //质押数量
 * @returns
 * 用户质押
 */
export async function deposit(amount: number) {
    return new Promise((resolve, reject) => {
        BNBContract.deposit(amount)
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

export interface withdrawProp {
    to: string; // 用户赎回后token转移地址
    amount: ethers.BigNumber; // 用户赎回数量
}

// 用户赎回
export async function withdraw({ to, amount }: withdrawProp) {
    return new Promise((resolve, reject) => {
        BNBContract.withdraw(to, amount)
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

/**
 *
 * @param account //用户地址
 * @returns
 * 用户质押权重
 */
export async function getPoint(account: string) {
    return new Promise((resolve, reject) => {
        BNBContract.getPoint(account)
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
 * 用户收益余额
 */
export async function getRewards(account: string) {
    return new Promise((resolve, reject) => {
        BNBContract.getRewards(account)
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
 * 用户总质押数量
 */
export async function _stakingAmount(account: string) {
    return new Promise((resolve, reject) => {
        BNBContract._stakingAmount(account)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function approveErc20(Erc20Amount: string) {
    const erc20Contract = new ethers.Contract(AFKLPAddress, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .approve(BNBPoolAddress, Erc20Amount)
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
