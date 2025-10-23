import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { Card } from "antd";

interface InfoItem {
  id: number;
  icon: React.ReactNode;
  title: string;
}

const ThreeItem = () => {
  const items: InfoItem[] = [
    {
      id: 1,
      icon: <LiaShippingFastSolid className="text-blue-600 text-5xl" />,
      title: "MIỄN PHÍ VẬN CHUYỂN",
    },
    {
      id: 2,
      icon: <MdOutlineAttachMoney className="text-blue-600 text-5xl" />,
      title: "TRẢ HÀNG HOÀN TIỀN",
    },
    {
      id: 3,
      icon: <BiSupport className="text-blue-600 text-5xl" />,
      title: "HỖ TRỢ TRỰC TUYẾN 24/7",
    },
  ];

  return (
    <section className="w-full my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            bordered={false}
            className="flex items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300 py-6 rounded-2xl"
          >
            <div className="flex flex-col items-center">
              <div className="mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-700 uppercase">
                {item.title}
              </h4>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ThreeItem;
