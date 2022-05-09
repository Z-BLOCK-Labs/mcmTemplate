import styled from "styled-components";
import connectImg from "../../src/static/img/button.png";

export const ConnectButton = styled.button`
  position: absolute;
  top: 1.5vw;
  right: 16.4649vw;
  width: 28.339vw;
  height: 10.7167vw;
  font-size: 2.9056vw;
  font-family: HYBaManTi;
  font-weight: normal;
  color: #ffffff;
  border-radius: 4.3584vw;
  background: url(${connectImg}) no-repeat;
  background-position: 50% 50%;
  background-size: 100% 100%;
  border: 0;
  cursor: pointer;
  hover {
    transform: translateY(0.6053vw);
    transition: all 0.4s ease;
    box-shadow: none;
  }
`;
