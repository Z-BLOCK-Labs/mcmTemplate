import * as ethers from "ethers";
import { createdProvider } from "@/untiles";
import { getAllParameter } from "./function/ParameterFunc";
import { isBorrower } from "./function/AccessProxyFunc";
import { Erc20Abi } from "./abi/Erc20";
const signer = createdProvider();

// 获取余额
export async function getBalance(
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

/**
 * 质押
 * @param rewardAddress //合约地址
 * @param abi //合约abi
 * @param amount //质押数量
 * @returns
 */
export async function deposit(
  rewardAddress: string,
  abi: string,
  amount: ethers.BigNumber
) {
  return new Promise((resolve, reject) => {
    new ethers.Contract(rewardAddress, abi, signer)
      .deposit(amount)
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
 * 赎回
 * @param rewardAddress //合约地址
 * @param abi //合约abi
 * @param to //用户赎回后token转移地址
 * @param amount // 用户赎回数量
 * @returns
 */
export async function withdraw(
  rewardAddress: string,
  abi: string,
  to: string,
  amount: ethers.BigNumber
) {
  return new Promise((resolve, reject) => {
    new ethers.Contract(rewardAddress, abi, signer)
      .withdraw(to, amount)
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
 * @param rewardAddress //合约地址
 * @param abi //合约abi
 * @param account //用户地址
 * @returns
 */
export async function getPoint(
  rewardAddress: string,
  abi: string,
  account: string
) {
  return new Promise((resolve, reject) => {
    new ethers.Contract(rewardAddress, abi, signer)
      .getPoint(account)
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
 * @param rewardAddress //合约地址
 * @param abi //合约abi
 * @param account //用户地址
 * @returns
 */
export async function getRewards(
  rewardAddress: string,
  abi: string,
  account: string
) {
  return new Promise((resolve, reject) => {
    new ethers.Contract(rewardAddress, abi, signer)
      .getRewards(account)
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
 * @param rewardAddress //合约地址
 * @param abi //合约abi
 * @param account //用户地址
 * @returns
 */
export async function _stakingAmount(
  rewardAddress: string,
  abi: string,
  account: string
) {
  return new Promise((resolve, reject) => {
    new ethers.Contract(rewardAddress, abi, signer)
      ._stakingAmount(account)
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

export { getAllParameter, isBorrower };
