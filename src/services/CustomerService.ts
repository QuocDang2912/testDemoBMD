

import httpAxios from "../Api/httpAxios";

const CustomerServie = {

    profile: () => {
        return httpAxios.get(`customer/auth/profile`);
    },
    store: (data:any) => {
        return httpAxios.post(`customer/auth/register`, data);
    },
    login: (data:any) => {
        return httpAxios.post(`customer/auth/login`, data);
    },
    changePass: (data:any) => {
        return httpAxios.post(`customer/auth/password/update`, data);
    },
}
export default CustomerServie;