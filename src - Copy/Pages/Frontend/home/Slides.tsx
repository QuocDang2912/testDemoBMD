import React, { useEffect, useState, useRef } from "react";
import { Carousel, Spin, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BannerServie from "../../../services/BannerService";
// import { urlImage } from "../../../Api/config";

interface Banner {
  id: number;
  image: string;
  title?: string;
}

const Slides: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<any>(null);


 
  // Lấy dữ liệu banner
  useEffect(() => {
    (async () => {
      try {
        const res = await BannerServie.index();
        setBanners(res.data.banners || []);
      } catch (error) {
        console.error("Lỗi tải banner:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
      <Carousel
        autoplay
        dots
        ref={carouselRef}
        // effect="fade"
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full h-[600px]">
            <img
              src={banner.image}
              alt={banner.title || "Banner"}
              className="w-full h-full"
            />
          </div>
        ))}
      </Carousel>

    </section>
  );
};

export default Slides;
