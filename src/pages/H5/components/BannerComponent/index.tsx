import React from 'react';
import { Banner } from './style';
import banner from './banner.png';
export default function BannerComponent() {
    return (
        <>
            <Banner>
                <div className="GridBackground">
                    <div className="Title">
                        <h1>AFK Pools</h1>
                        <p>
                            Stake your AFK get, veAFK at 1:1 and earn rewards.
                        </p>
                    </div>
                    <img src={banner} />
                    <div className="box">
                        <p>AFK Pools</p>
                    </div>
                </div>
            </Banner>
        </>
    );
}
