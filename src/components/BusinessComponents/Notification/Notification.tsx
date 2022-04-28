import { notification } from 'antd';
import './Notification.less';

const defaultInfo: any = ['success', 'error', 'warning', 'info'];
const defaultMessage: any = [
    'Request Success!',
    'Request failed, Please check the network or try again!',
];

const openNotification = (type: Array<number> = [0, 0], description = '') => {
    notification.open({
        type: defaultInfo[type[0]],
        message: defaultMessage[type[1]],
        className: 'customNotifi',
        description,
    });
};

export default openNotification;
