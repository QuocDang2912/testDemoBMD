import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Select,
  Slider,
  Button,
  Row,
  Col,
  Pagination,
  Spin,
  Typography,
} from "antd";
import ProductService from "../../../../services/ProductService";
import CategoryService from "../../../../services/CategoryService";
import ProductItem from "../../../../components/ProductItem";

const { Title } = Typography;

interface Product {
  id: number;
  name: string;
  slug: string;
  finalPrice: number;
  total_qty: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const PAGE_SIZE = 4;

const ProductCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [nameCategory, setNameCategory] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);

  // Lọc và sắp xếp
  const [filter, setFilter] = useState({ minPrice: 0, maxPrice: 10000000 });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    document.title = nameCategory || "Sản phẩm";
  }, [nameCategory]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ProductService.productCategory(id);
        // console.log("🚀 ~ fetchData ~ res:", res)
        const cateData = res?.data?.productCategories?.[0];
        setNameCategory(cateData?.name || "");
        setAllProducts(cateData?.products || []);

        const cateRes = await CategoryService.index();
        setCategory(cateRes?.data?.productCategories || []);
      } catch (error) {
        console.error("🚀 ~ fetchData error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    let result = [...allProducts];

    // Lọc theo khoảng giá (chuyển giá sang số để tránh lỗi)
    result = result.filter((p) => {
      const price = Number(p.finalPrice) || 0;
      return price >= filter.minPrice && price <= filter.maxPrice;
    });

    // Sắp xếp
    result.sort((a, b) => {
      const priceA = Number(a.finalPrice) || 0;
      const priceB = Number(b.finalPrice) || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [allProducts, filter, sortOrder]);


  // Tính toán sản phẩm hiển thị
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: <Link to="/" className="text-blue-600">Trang chủ</Link> },
            { title: "Sản phẩm theo danh mục" },
          ]}
        />

        <Row gutter={[16, 16]} className="mt-6">
          {/* Sidebar */}
          <Col xs={24} md={6}>
            <Card title="Lọc sản phẩm" className="shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Khoảng giá:</p>
                  <Slider
                    range
                    min={0}
                    max={10000000}
                    step={100000}
                    value={[filter.minPrice, filter.maxPrice]}
                    onChange={(values: [number, number]) =>
                      setFilter({ minPrice: values[0], maxPrice: values[1] })
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{filter.minPrice.toLocaleString()}đ</span>
                    <span>{filter.maxPrice.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button
                  type="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentPage(1)}
                >
                  Áp dụng lọc
                </Button>
              </div>
            </Card>

            <Card title="Danh mục sản phẩm" className="shadow-sm mt-4">
              <ul className="space-y-2">
                {category.map((cate) => (
                  <li key={cate.id}>
                    <Link
                      to={`/productcategory/${cate.slug}/${cate.id}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {cate.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>

          {/* Main content */}
          <Col xs={24} md={18}>
            <Card className="shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="!mb-0 text-blue-700">
                  {nameCategory}
                </Title>

                <div className="flex items-center gap-4">
                  <Select
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    style={{ width: 150 }}
                    options={[
                      { label: "Giá tăng dần", value: "asc" },
                      { label: "Giá giảm dần", value: "desc" },
                    ]}
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-10">
                  <Spin size="large" />
                </div>
              ) : paginatedProducts.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {paginatedProducts.map((product) => (
                    <Col xs={24} sm={12} md={6} key={product.id}>
                      <ProductItem
                        products={product}
                        totalSum={product.total_qty}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center text-gray-600 mt-6">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <Pagination
                  current={currentPage}
                  total={filteredProducts.length}
                  pageSize={PAGE_SIZE}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductCategory;
