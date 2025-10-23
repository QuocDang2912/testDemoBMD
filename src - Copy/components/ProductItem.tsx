import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { BsCartPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { cartStore } from "../Store/cartStore";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  finalPrice: number;
}


interface ProductItemProps {
  products: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({
  products,
}) => {

  const handleClickToCart = (e: React.MouseEvent) => {
    e.preventDefault();
      const  {id ,name,finalPrice,image }= products 
      const dataProduct ={
         id ,name,finalPrice,image , count :1
      }
      cartStore.addToCart(dataProduct)
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const formattedPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <Card
      hoverable
      cover={
        <div className="relative w-full h-[300px] overflow-hidden rounded-md">
          <Link to={`/product_detail/${products.id}`}>
            <img
              src={products.image}
              alt={products.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
      }
      className="shadow-md border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <Link to={`/product_detail/${products.id}`}>{products.name}</Link>
        </h3>

        <div className="flex items-center justify-center space-x-2">
            <span className="text-blue-600 font-bold text-base">
              {formattedPrice(products.finalPrice)}
            </span>
        </div>

        <Button
          type="primary"
          size="middle"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2"
          onClick={ handleClickToCart}
          // disabled={totalSum === "0"}
        >
          <BsCartPlus className="text-lg" />
          Thêm vào giỏ hàng
        </Button>
      </div>
    </Card>
  );
};

export default ProductItem;
