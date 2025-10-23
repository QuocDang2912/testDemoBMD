

import httpAxios from "../Api/httpAxios";

const BannerServie = {
    index: () => {
        return httpAxios.get(`customer/banner?limit=2`);
    },
}
export default BannerServie;