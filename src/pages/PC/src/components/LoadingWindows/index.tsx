import React from 'react';
import './index.less';
import loading from '../../assets/pc-img/loding.gif';

export default function index(props: any) {
    return (
        <div className="LoadOpen">
            <div className="LoadMask">
                <div className="Load_alert_box">
                    <div className="Load_alert_box_img">
                        <img src={loading} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
