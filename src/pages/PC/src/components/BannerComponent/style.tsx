import styled from 'styled-components';

export const Banner = styled.div`
    position: relative;
    margin: 0 auto;
    margin-top: 57px;
    width: 1072px;
    height: 180px;
    border-radius: 32px;
    background: #3a5ef7;
    box-shadow: 0 1px 15px 3px rgb(69 104 251 / 60%);
    .GridBackground {
        box-sizing: border-box;
        position: relative;
        padding: 25px 44px;
        height: inherit;
        background: -webkit-linear-gradient(top, transparent 40px, #4b6cf6 41px),
            -webkit-linear-gradient(left, transparent 40px, #4b6cf6 41px);
        background-size: 41px 41px;
        border-radius: 32px;
        .Title {
            text-align: left;
            h1 {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 38px;
                font-family: HYBaManTi;
                font-weight: normal;
                color: #ffffff;
            }
            p {
                font-size: 18px;
                font-family: Gill Sans;
                font-weight: 400;
                color: #ffffff;
                line-height: 22px;
            }
        }
        img {
            position: absolute;
            right: 136px;
            top: 11px;
            width: 107px;
            height: 128px;
            z-index: 1;
        }
        .box {
            position: absolute;
            bottom: 25px;
            right: 58px;
            padding-left: 52px;
            box-sizing: border-box;
            width: 171px;
            height: 61px;
            background: #87a3ff;
            border-radius: 16px;
            p {
                font-size: 20px;
                font-family: Gill Sans;
                font-weight: 600;
                font-style: italic;
                color: #ffffff;
                line-height: 61px;
            }
        }
    }
`;
