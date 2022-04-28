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
    const errInfo = typeof err === 'string' ? err.split(':') : '';
    if (errInfo.length > 1) {
        const code = errInfo[1].trim();

        return ErrorMap[code] ?? err;
    }
    return err;
}


export function h5GetError(error) {
    return (
        error.data?.message ??
        error.message ??
        error.reason ??
        JSON.stringify(error)
    );
}
