import * as ethers from 'ethers';
import { AccessProxyAddress, AccessProxyAbi } from '../abi/AccessProxy';
// import { checkWallet } from '../../utilsMethod';
import { createdProvider } from '@/untiles';

const signer = createdProvider();

export const isBorrower = async (AccountAddress: string) => {
    const proxyContract = new ethers.Contract(
        AccessProxyAddress,
        AccessProxyAbi,
        signer
    );
    const res = await proxyContract._borrower(AccountAddress);
    return res;
};
