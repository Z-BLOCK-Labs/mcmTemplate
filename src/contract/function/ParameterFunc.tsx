import * as ethers from 'ethers';
import { ParameterAddress, ParameterAbi } from '../abi/Parameter';
import { createdProvider } from '@/untiles';
const signer = createdProvider();

export const getAllParameter = async () => {
    const parameterContract = new ethers.Contract(
        ParameterAddress,
        ParameterAbi,
        signer
    );

    const res = await parameterContract.getAllParameter();
    return res;
};
