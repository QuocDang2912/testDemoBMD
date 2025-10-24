

import httpAxios from "../Api/httpAxios";

const OrderServie = {
    store: (data:any) => {
        return httpAxios.post(`customer/order`,data);
    },
    checkStore: (data:any) => {
        return httpAxios.post(`customer/order/estimate`,data);
    },
    show:() => {
       return httpAxios.get(`customer/order`);
    },
    cancel:(id:number) => {
       return httpAxios.patch(`customer/order/${id}/cancel`);
    }
    
}
export default OrderServie;