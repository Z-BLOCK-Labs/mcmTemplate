import styled from "styled-components";

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(32, 33, 53, 0.7);
  z-index: 100;
  .windowBox {
    position: fixed;
    top: 50%;
    left: 50%;
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 200;
  }
  .LoadingWindow {
    position: relative;
    width: 45vw;
    height: 45vw;
    background: #30314a;
    border: 0.5602vw solid #2f5fff;
    border-radius: 3.3612vw;
  }

  .LoadingWindow img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10vw;
    margin-left: -10vw;
    width: 20vw;
    height: 20vw;
  }
`;
