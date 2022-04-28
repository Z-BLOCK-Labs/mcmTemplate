import React from "react";
import loadingImg from "../../../static/img/loading.gif";
import "../styles/Loading.css"

function LoadingWindow() {
    return (
        <div className="Layer">
            <div className="windowBox" >
                <div className="LoadingWindow">
                    <img src={loadingImg} />
                </div>
            </div>
        </div>
    )
}
export default LoadingWindow