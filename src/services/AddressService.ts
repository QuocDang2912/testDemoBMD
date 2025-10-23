import httpAxios from "../Api/httpAxios";

const addressServie = {
    city: () => {
        return httpAxios.get(`customer/city`);
    },
    district: (code:number) => {
        return httpAxios.get(`customer/district?parentCode=${code}`);
    },
    ward: (code:number) => {
        return httpAxios.get(`customer/ward?parentCode=${code}`);
    },
}
export default addressServie;