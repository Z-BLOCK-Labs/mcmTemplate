import * as ethers from 'ethers';
import { AccessProxyAbi } from "../abi/AccessProxy";
import CONFIG from "@config/index";
// import { checkWallet } from '../../utilsMethod';
import { createdProvider } from '@/untiles';

const signer = createdProvider();

export const isBorrower = async (AccountAddress: string) => {
    const proxyContract = new ethers.Contract(
      CONFIG.AccessProxyAddress,
      AccessProxyAbi,
      signer
    );
    const res = await proxyContract._borrower(AccountAddress);
    return res;
};
