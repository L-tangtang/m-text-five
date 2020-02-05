import axios from 'axios';

export default (url, data, method) => {
    let configData = {};
    configData.url = url;
    configData.method = method;
    let type = method === 'get' ? 'params' : 'data';
    configData[type] = data;
    configData.headers = {
        authorToken: localStorage.getItem('token'),
    };
    return axios(configData).catch(error => {
        if (error.response && error.response.status === 404) {
            alert('接口不存在');
            return;
        }
        if (error.response && error.response.status === 500) {
            alert('服务器错误');
            return;
        }
    });
};
