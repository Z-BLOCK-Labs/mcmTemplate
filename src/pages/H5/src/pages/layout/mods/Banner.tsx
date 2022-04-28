import React, { useEffect, useState } from 'react';
import { getBannerPicture, Banner as BannerType } from '@/server';

import useFetch from '@/server/hooks/useFetch';
import '../styles/Banner.css';
import bannerImg from '../../../static/img/banner.jpeg';

function Banner() {
    const [data, , , setError] = useFetch<BannerType[], {}>(
        getBannerPicture,
        {}
    );
    const [url, setBannerImg] = useState(bannerImg);

    useEffect(() => {
        if (data && data[0]?.url) {
            setBannerImg(data[0].url);
        } else {
            setError(() => {
                console.log('get banner img error');
            });
        }
    }, [data]);

    return (
        <div className="banner errorImgBg">
            <img src={url} alt="banner" />
        </div>
    );
}
export default Banner;
