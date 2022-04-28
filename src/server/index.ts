import { RequestUtils } from './request';
import { createdProvider } from '@/untiles';
const signer = createdProvider();
const requestUtils = new RequestUtils();

// 获取Banner
export interface Banner {
    id: number;
    createdTime: string;
    updatedTime: string;
    type: 'banner';
    url: string;
}
export async function getBannerPicture() {
    return requestUtils.get<Banner[]>({
        url: '/common/getPictures',
        params: {
            type: 'banner',
        },
    });
}


