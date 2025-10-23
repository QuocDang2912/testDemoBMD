

import httpAxios from "../Api/httpAxios";

const ProductServie = {
   index: () => {
        return httpAxios.get(`customer/product?limit=8`);
    },
    productCategory: (id:number) => {
        return httpAxios.get(`customer/productCategory/highlight?productCategoryId=${id}`);
    },
    show: (id:string) => {
        return httpAxios.get(`customer/product/${id}`);
    },
}
export default ProductServie;