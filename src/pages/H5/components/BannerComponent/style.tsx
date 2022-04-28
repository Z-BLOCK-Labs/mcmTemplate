import styled from 'styled-components';

export const Banner = styled.div`
    position: relative;
    margin: 0 auto;
    margin-bottom: 13.0751vw;
    width: 90.5569vw;
    height: 50.4843vw;
    background: #3a5ef7;
    box-shadow: 0vw 0.3632vw 5.4479vw 0.1211vw rgba(69, 104, 251, 0.6);
    border-radius: 7.7482vw;
    .GridBackground {
        box-sizing: border-box;
        position: relative;
        padding: 7.1429vw 7.6271vw 4.9637vw 5.8111vw;
        height: inherit;
        background: -webkit-linear-gradient(
                top,
                transparent 8.5vw,
                #4164f7 3.9637vw
            ),
            -webkit-linear-gradient(left, transparent 9vw, #4164f7 0.9637vw);
        background-size: 9.4vw 8.9vw;
        border-radius: 7.7482vw;
        .Title {
            text-align: left;
            h1 {
                margin-top: 0;
                margin-bottom: 4.2373vw;
                font-size: 6.5375vw;
                font-family: HYBaManTi;
                font-weight: normal;
                color: #ffffff;
                line-height: 8.4746vw;
            }
            p {
                font-size: 2.9056vw;
                font-family: Gill Sans;
                font-weight: 400;
                color: #ffffff;
                line-height: 2.6634vw;
            }
        }
        img {
            position: absolute;
            right: 21.5496vw;
            width: 15.9806vw;
            height: 19.2494vw;
            z-index: 1;
        }
        .box {
            position: absolute;
            bottom: 4.9637vw;
            right: 7.6271vw;
            width: 26.9976vw;
            height: 8.5956vw;
            background: #8ca2f8;
            border-radius: 1.937vw;
            p {
                font-size: 3.1477vw;
                font-family: Gill Sans;
                font-weight: 600;
                font-style: italic;
                color: #ffffff;
                line-height: 8.4746vw;
            }
        }
    }
`;
