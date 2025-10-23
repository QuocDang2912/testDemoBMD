import  { useEffect,  } from "react";
import { Link } from "react-router-dom";
import {
  FacebookFilled,
  InstagramFilled,
  GoogleCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";

export default function Footer() {

  useEffect(() => {
    const fetch = async () => {
      try {
        // const res = await PageService.index();
        // setPage(res.pages);
      } catch (error) {
        console.log("🚀 ~ fetch ~ error:", error);
      }
    };
    fetch();
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      {/* MAIN FOOTER */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 text-gray-700">
        {/* LEFT COLUMN */}
        <div>
          <h3 className="text-xl font-bold text-[#006ba1] mb-3">
            CHÚNG TÔI LÀ AI?
          </h3>
          <p className="mb-2 leading-relaxed">
            Copyright © 2024 Bee Mart là hệ thống bán sỉ và lẻ các sản phẩm thời trang, 
            quần áo và phụ kiện dành cho nam, nữ và trẻ em. 
            Với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tiện lợi, hiện đại và đáng tin cậy, Bee Mart không ngừng cập nhật những xu hướng mới nhất trong làng thời trang Việt Nam và quốc tế.
          </p>
          <p className="mb-1">
            <strong>Địa chỉ:</strong> 78 đường số 2, Tăng Nhơn Phú B, Quận 9,
            TP. Hồ Chí Minh
          </p>
          <p className="mb-4">
            <strong>Điện thoại:</strong> 0985 608 759 (call, zalo) –{" "}
            <strong>Email:</strong> Beemartshop@gmail.com
          </p>

          <h3 className="text-xl font-bold text-[#006ba1] mt-5 mb-3">
            MẠNG XÃ HỘI
          </h3>
          <div className="flex space-x-4 text-2xl text-[#006ba1]">
            <a href="#" className="hover:text-blue-600">
              <FacebookFilled />
            </a>
            <a href="#" className="hover:text-pink-500">
              <InstagramFilled />
            </a>
            <a href="#" className="hover:text-red-500">
              <GoogleCircleFilled />
            </a>
            <a href="#" className="hover:text-red-600">
              <YoutubeFilled />
            </a>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div>
          <h3 className="text-xl font-bold text-[#006ba1] mb-3">LIÊN HỆ</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                Tính năng đang phát triển
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                                Tính năng đang phát triển
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                Tính năng đang phát triển

              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <h3 className="text-xl font-bold text-[#006ba1] mb-3">TRANG ĐƠN</h3>
          <ul className="space-y-2 text-gray-700">
            {/* Dữ liệu động */}
            {/* {Page &&
              Page.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/post_page/${item.slug}`}
                    className="hover:text-[#006ba1]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))} */}

            {/* Dữ liệu mẫu */}
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
               Sản phẩm

              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                 Bài viết 

              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#006ba1]">
                Liên hệ

              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* COPYRIGHT */}
      <section className="bg-[#006ba1] text-center text-white py-3 text-sm">
        Thiết kế bởi: Anh Quốc
      </section>
    </footer>
  );
}
