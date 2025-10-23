import httpAxios from "../Api/httpAxios";

const DiscountcodeService = {
    //lấy ra danh sách 
    index: () => {
        return httpAxios.get("customer/couponCampaign/available");
    },
};
export default DiscountcodeService;