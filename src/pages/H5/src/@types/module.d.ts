declare module '*.svg';
declare module '*.png';
declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}
declare interface Window {
    ethereum?: any
}
