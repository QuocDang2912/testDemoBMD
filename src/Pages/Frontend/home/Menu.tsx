import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CategoryService from "../../../services/CategoryService";

interface Category {
  id: number;
  name: string;
  slug: string;
}

// interface Brand {
//   id: number;
//   name: string;
//   slug: string;
// }

// interface Topic {
//   id: number;
//   name: string;
//   slug: string;
// }

const MenuHeader: React.FC = () => {
  const [category, setCategory] = useState<Category[]>([]);
  // const [brand, setBrand] = useState<Brand[]>([]);
  // const [topic, setTopic] = useState<Topic[]>([]);
  //  setTopic([])
  // const brand: Brand[] = [];
  // const topic: Topic[] = [];
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await CategoryService.index();
        setCategory(res.data.productCategories || []);
        // const fetchBrand = await BrandService.index();
        // const fetchTopic = await TopicServie.index();
        // setCategory(res.category);
        // setBrand(fetchBrand.brands);
        // setTopic(fetchTopic.topics);
      } catch (error) {
        console.log("🚀 ~ fetch ~ error:", error);
      }
    };
    fetch();
  }, []);

  const categoryMenu = (
    <Menu>
      {category.map((cate) => (
        <Menu.Item key={cate.id}>
          <Link to={`/productcategory/${cate.slug}/${cate.id}`}>{cate.name}</Link>
        </Menu.Item>
      ))}
      <Menu.Divider />
      {/* <Menu.Item>
        <Link to="/productall">Tất cả sản phẩm</Link>
      </Menu.Item> */}
    </Menu>
  );

  // const brandMenu = (
  //   <Menu>
  //     {brand.map((b) => (
  //       <Menu.Item key={b.id}>
  //         <Link to={`/productbrand/${b.slug}`}>{b.name}</Link>
  //       </Menu.Item>
  //     ))}
  //     <Menu.Divider />
  //     <Menu.Item>
  //       <Link to="/productall">Tất cả sản phẩm</Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  // const topicMenu = (
  //   <Menu>
  //     {topic.map((t) => (
  //       <Menu.Item key={t.id}>
  //         <Link to={`/posttopic/${t.slug}`}>{t.name}</Link>
  //       </Menu.Item>
  //     ))}
  //     <Menu.Divider />
  //     <Menu.Item>
  //       <Link to="/postall">Tất cả bài viết</Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <section className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center ">
        {/* Logo / Tiêu đề */}
        <Link to="/" className="text-xl font-bold text-white pr-10">
          Trang chủ
        </Link>

        {/* Menu chính */}
        <div className="flex flex-wrap gap-6 items-center">
          {/* Danh mục sản phẩm */}
          <Dropdown overlay={categoryMenu} trigger={["hover"]}>
            <button className="flex items-center gap-1 hover:text-yellow-300">
              Danh mục sản phẩm <DownOutlined />
            </button>
          </Dropdown>

          {/* Thương hiệu */}
          {/* <Dropdown overlay={brandMenu} trigger={["hover"]}>
            <button className="flex items-center gap-1 hover:text-yellow-300">
              Thương hiệu sản phẩm <DownOutlined />
            </button>
          </Dropdown> */}

          {/* Bài viết */}
          {/* <Dropdown overlay={topicMenu} trigger={["hover"]}>
            <button className="flex items-center gap-1 hover:text-yellow-300">
              Bài viết <DownOutlined />
            </button>
          </Dropdown> */}

          {/* Liên hệ */}
          <Link to="/contact" className="hover:text-yellow-300">
            Liên hệ
          </Link>
           <Link to="/post" className="hover:text-yellow-300">
            Bài viết
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuHeader;
