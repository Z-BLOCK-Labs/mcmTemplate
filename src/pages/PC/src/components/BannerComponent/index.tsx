import React from "react";
import { Banner } from "./style";

export interface IProps {
  imgSrc: string;
  title: string;
  titleContent: string;
  boxContent: string;
}
export default function BannerComponent({
  title,
  titleContent,
  imgSrc,
  boxContent,
}: IProps) {
  return (
    <>
      <Banner>
        <div className="GridBackground">
          <div className="Title">
            <h1>{title}</h1>
            <p>{titleContent}</p>
          </div>
          <img src={imgSrc} />
          <div className="box">
            <p>{boxContent}</p>
          </div>
        </div>
      </Banner>
    </>
  );
}
