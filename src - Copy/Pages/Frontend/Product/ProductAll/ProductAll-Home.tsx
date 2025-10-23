import { useEffect, useState } from "react";
import { Spin, Row, Col } from "antd";
import ProductItem from "../../../../components/ProductItem";
import ProductServie from "../../../../services/ProductService";



interface products {
  id: number;
  name: string;
  image: string;
  slug: string;
  finalPrice: number;
}


export default function ProductAll() {
  const [products, setProducts] = useState<products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductServie.index();
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);








  return (
    <section className="py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
        Tất cả sản phẩm
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={12} sm={8} md={6} lg={6} key={product.id}>
              <ProductItem
                products={product}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* {!loading && (
        <div className="text-center mt-8">
          <Link to="/productall">
            <Button
              type="primary"
              size="large"
              className="transition-all"
              style={{
                backgroundColor:  "#006BA1" ,
                color: "white",
              }}
            >
              Xem thêm
            </Button>
          </Link>
        </div>
      )} */}

    </section>
  );
}
