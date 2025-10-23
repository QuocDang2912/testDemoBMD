import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Card, Button, InputNumber, Typography, Spin, Row, Col } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductService from "../../../../services/ProductService";

import ProductItem from "../../../../components/ProductItem";
import { cartStore } from "../../../../Store/cartStore";

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  slug: string;
  finalPrice: number;
  pricesale?: number | null;
  description?: string;
  detail?: string;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productOther, setProductOther] = useState<Product[]>([]);
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.show(id);
        console.log("🚀 ~ fetchProduct:", res);
        setProduct(res.data);
        // setProductOther(res.product_other);
        // if (res.product) {
        //   document.title = res.product.name;
        // }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const  {id ,name,finalPrice,image }= product!
      const dataProduct ={
         id ,name,finalPrice,image , count :+qty
      }
    cartStore.addToCart(dataProduct)
    toast.success("Thêm vào giỏ hàng thành công!"); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-600">
        Không tìm thấy sản phẩm
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: <Link to="/" className="text-blue-600">Trang chủ</Link> },
            { title: "Chi tiết sản phẩm" },
            { title: product.name },
          ]}
        />

        {/* Main content */}
        <Row gutter={[32, 32]} className="mt-6">
          <Col xs={24} md={10}>
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-md w-full h-[450px] object-contain bg-white"
            />
          </Col>

          <Col xs={24} md={14}>
            <Card className="shadow-md">
              <Title level={3} className="!text-blue-700">{product.name}</Title>

              <div className="flex items-center gap-3 mt-3">
                  <span className="text-red-500 text-2xl font-semibold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.finalPrice)}
                  </span>
              </div>
              <form onSubmit={handleAddToCart} className="mt-5 flex items-center gap-4">
                <InputNumber
                  min={1}
                  // max={product.total_qty}
                  value={qty}
                  onChange={(value) => setQty(value ?? 1)}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  // disabled={product.total_qty === 0}
                >
                 Thêm vào giỏ hàng
                  {/* {product.total_qty === 0 ? "Đã hết hàng" : "Thêm vào giỏ hàng"} */}
                </Button>
              </form>
            </Card>
          </Col>
        </Row>

        {/* Product detail */}
        <Card className="mt-10 shadow-md">
          <Title level={4} className="!text-blue-700">Chi tiết sản phẩm</Title>
          <Paragraph className="text-gray-700 whitespace-pre-line">
            {product.description || "Đang cập nhật..."}
          </Paragraph>
        </Card>

        {/* Other products */}
        <div className="mt-10">
          <Title level={4} className="!text-blue-700 mb-4">
            Sản phẩm khác
          </Title>
           {productOther.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productOther.map((p, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <ProductItem
                    products={p}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Không có sản phẩm khác.</p>
          )}
        </div>
      </div>
    </div>
  );
}
