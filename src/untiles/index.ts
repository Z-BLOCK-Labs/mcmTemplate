import { Toast } from 'antd-mobile';
import { BigNumber, ethers } from 'ethers';
import qs from 'qs';
export function dateFormat(str: string) {
    const dateee = new Date(str).toJSON();
    const date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
    return date;
}
export function dayFormat(str: string) {
    const dateee = new Date(str).toJSON();
    const date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
    const T = date.substring(0, 10);
    return T;
}
export function PageTotal(len: number) {
    return Math.ceil(len / 10);
}
export function formatTime(dataStr: string, divider: string) {
    try {
        const date = new Date(dataStr);
        const arr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        return arr.join(divider);
    } catch (e) {
        console.log('---time is invalid');
    }
}

export function TranferAmount(val: string) {
    const transferResult = ethers.utils.parseEther(val);
    return transferResult;
}

export function BalanceToValue(value: any) {
    // tranfer bignumer type
    const num = parseFloat(ethers.utils.formatEther(value));
    // const num = 0.2345;
    if (Math.round(num) === num) {
        // if num is interger
        return num + '.0000';
    } else {
        const result = Math.floor(num * 10000) / 10000;
        const resArr = String(result).split('.');
        if (resArr[1]) {
            if (resArr[1].length !== 4) {
                const decimal = resArr[1] ? resArr[1].padEnd(4, '0') : +'0000';
                return resArr[0] + '.' + decimal;
            }
            return result;
        } else {
            // 没有小数点后的处理
            return resArr[0] + '.' + '0000';
        }
    }
}

// 将账户地址格式化为前六后四
export function filter(val: any) {
    const len = val.length;
    return val.substring(0, 6) + '...' + val.substring(len - 4, len);
}

export function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    }

    const r = Number(a % b);

    return gcd(b, r);
}

const ErrorMap: Record<string, string> = {
    '100': 'Aggregator: only borrower or access ccount or admin',
    '101': 'Aggregator: only factory',
    '102': 'Aggregator: only borrower',
    '103': 'Aggregator: only access account',
    '104': 'Aggregator: only admin',
    '501': 'Aggregator: the share is too large or too small',
    '502': 'Aggregator: the rasing is over',
    '503': 'Aggregator: assets and amounts length mismatch',
    '504': 'Aggregator: the amount exceeds the maximum limit',
    '505': 'Aggregator: the raising is successful or not over yet',
    '506': 'Aggregator: caller did not deposit assets or not borrower',
    '507': 'Aggregator: the raising is failed or not over yet',
    '508': 'Aggregator: invalid erc721 address',
    '509': 'Aggregator: borrow period is finished',
    '510': 'Aggregator: the aggregator is over',
    '511': 'Aggregator: not distribution time',
    '512': 'Aggregator: invalid caller',
    '513': 'Aggregator: the borrow period is not over',
    '514': 'Aggregator: invalid token',
    '515': 'Aggregator: invalid spender',
    '516': 'Aggregator: protocol rate values should be inside the bounds',
    '517': 'Aggregator: the amount value should be in the required range',
    '518': 'Aggregator: the amount value should be in the required range',
    '519': 'Aggregator: the raising period is not over',
    '520': 'Aggregator: borrower can not be lender',
};

export function fotmatErrorMsg(err: string) {
    const errInfo = err.split(':');
    if (errInfo.length > 1) {
        const code = errInfo[1].trim();

        return ErrorMap[code] ?? err;
    }
    return err;
}

function gys(x: number, y: number) {
    let max, min, temp;
    max = Math.max(x, y);
    min = Math.min(x, y);
    if (x === 0 || y === 0) {
        return max;
    }
    while (max % min) {
        temp = max % min;
        max = min;
        min = temp;
    }
    return min;
}

export function arrGbs(arr: number[]) {
    if (!arr.length) {
        return 0;
    }
    let midNum = arr[0];
    for (let i = 1; i < arr.length; i++) {
        midNum = gys(arr[i], midNum);
    }
    return midNum;
}
export function formatAssets(assets: { item: any; amount: number }[]) {
    const strs: string[] = [];
    assets.forEach((asset) => {
        if (asset.item) {
            strs.push(`${asset.amount}${asset.item.name}`);
        }
    });
    return strs.join('-');
}
export function formatRewards(rewards: any) {
    return rewards.map((item: any) => item.name).join('-') + 'Tokens';
}

export const changeJsonList = (arr = [], changeName: string) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return [];
    }
    arr.map((item: any) => {
        item[changeName] = JSON.parse(item[changeName]);
    });
    return arr;
};

export const isNullObj = (obj = {}) => JSON.stringify(obj) === '{}';

export const changeSelectList = (arr = [], names: any = []) => {
    arr.map((item: any) => {
        item.id = item[names[0]];
        item.value = item[names[1]];
    });
    return arr;
};

export function checkWallet() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum,
            'any'
        );
        // signer = provider.getSigner();
        return provider.getSigner();
    }
    return null;
}

export function createdProvider() {
    let signer: ethers.providers.Provider | ethers.Signer | undefined;
    signer = checkWallet();
    return signer;
}

export function getSearch(location) {
    return qs.parse(location.search.split('?')[1]);
}

export function getLocalAccount() {
    return window.localStorage.getItem('userAddress');
}

export function checkNumber(val: any) {
    const pattern3 = new RegExp('[0-9]+'); // number
      const reg1 = /0*([1-9]\d*|0\.\d+)/;

      if (pattern3.test(val)) {
          return val
              .replace(/^\D*(\d*(?:\.\d{0,1000})?).*$/g, '$1')
              .replace(reg1, '$1');
      } else {
          Toast.show('please input number.');
      }
}
