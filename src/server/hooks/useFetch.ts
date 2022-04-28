import { useState, useEffect } from 'react';

/**
 * @param getFunction 发送请求的函数
 * @param params 参数
 * @param initRes 初始化值
 * @param execute 是否立即执行请求函数
 */

// R, P支持泛型
function UseFetch<R, P>(
    getFunction: any,
    params: P,
    initRes?: R,
    execute: boolean = true
): [
    R,
    boolean,
    (params?: Partial<P>) => void,
    (fn?: (err: any) => void) => void
] {
    type ErrorFunction = ((fn?: (err: any) => void) => void) | null;
    const [res, setRes] = useState(initRes as R);
    const [fetching, setFetch] = useState(false);
    const [failed, setFailed] = useState<ErrorFunction>(null);

    // 参数也许并不是每次都完整需要 Partial<P>
    const fetchData: (params?: Partial<P>) => void = async (params?: any) => {
        if (fetching) return;
        setFetch(true);
        try {
            setRes(await getFunction(params));
            setFetch(false);
        } catch (err: any) {
            console.info(`useFetch with Error: ${err}`);
            setFetch(false);
            failed && failed(err);
        }
    };

    const setError: ErrorFunction = (fn) => fn && setFailed(fn);

    // 首次执行只请求一次
    useEffect(() => {
        execute && fetchData(params);
    }, []);

    /**
     * res 返回的数据
     * fetching 是否在请求中
     * fetchData 手动再次触发请求
     * setError 当发生请求错误时，需要执行的回掉函数
     */
    return [res, fetching, fetchData, setError];
}

const useFetch = UseFetch;

export default useFetch;
