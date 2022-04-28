import * as ethers from 'ethers';
import { Erc20Abi, VeAFKAddress } from '../abi/Erc20';
import { createdProvider } from '@/untiles';
import { AFKAddress, AFKLPAddress } from '../abi/StakingPool';
const signer = createdProvider();

export async function balance(
    accountAddress: string,
    rewardAddress: string,
    abi: string
) {
    const erc20Contract = new ethers.Contract(rewardAddress, abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .balanceOf(accountAddress)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function getAFKBalance(accountAddress: string) {
    const erc20Contract = new ethers.Contract(AFKAddress, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .balanceOf(accountAddress)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function getVeAFKBalance(accountAddress: string) {
    const erc20Contract = new ethers.Contract(VeAFKAddress, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .balanceOf(accountAddress)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function getBNBBalance(accountAddress: string) {
    const erc20Contract = new ethers.Contract(AFKLPAddress, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .balanceOf(accountAddress)
            .then((result: any) => {
                resolve(result);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

export async function approveErc20(
    accountAddress: string,
    Erc20Address: string,
    to: string,
    Erc20Amount: string
) {
    const erc20Contract = new ethers.Contract(Erc20Address, Erc20Abi, signer);
    return new Promise((resolve, reject) => {
        erc20Contract
            .approve(to, Erc20Amount, { from: accountAddress })
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
