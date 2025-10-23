

import httpAxios from "../Api/httpAxios";

const CategoryServie = {
   index: () => {
        return httpAxios.get(`customer/productCategory?limit=4`);
    },
}
export default CategoryServie;