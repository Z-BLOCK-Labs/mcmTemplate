declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}
declare interface Window {
    ethereum?: any;
}
