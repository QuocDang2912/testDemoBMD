import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export default function BrowseOurCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.index();
        setCategories(res.data.productCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
        Danh mục sản phẩm 
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cate) => (
          <Link key={cate.id} to={`/productcategory/${cate.slug}/${cate.id}`}>
            <Card
              hoverable
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              cover={
                <img
                  src={cate.icon}
                  alt={cate.name}
                  className="h-[240px] w-full object-cover"
                />
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                  {cate.name}
                </h3>
                <p className="text-gray-500 text-sm">{cate.slug}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
