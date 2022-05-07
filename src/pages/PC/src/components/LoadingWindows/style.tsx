import styled from "styled-components";
export const Loading = styled.div`
  ::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    background-color: rgb(19, 19, 19);
    opacity: 0.6;
  }
  .LoadMask {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
  }
  .Load_alert_box {
    width: 224px;
    height: 224px;
    background: #30314a;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #2f5fff;
    border-radius: 12px;
    box-shadow: #2f5fff;
    z-index: 9;
    img {
        width: 106px;
        height: 106px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
            height: 100%;
        }
    }
`;
