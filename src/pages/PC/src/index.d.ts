declare module '*.svg';
declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}
