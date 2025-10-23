import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MdConstruction } from "react-icons/md"; // hoặc FaTools, tùy bạn thích

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center   bg-gray-100 text-center px-4 py-20">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md">
        <div className="flex justify-center mb-4 text-blue-600">
          <MdConstruction className="text-6xl animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tính năng đang được phát triển
        </h1>

        <p className="text-gray-500 mb-6">
          Xin lỗi, tính năng này hiện chưa khả dụng.  
          Chúng tôi đang hoàn thiện và sẽ sớm ra mắt!
        </p>

        <Button
          type="primary"
          size="large"
          className="bg-blue-600 hover:bg-blue-700 rounded-xl"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </Button>
      </div>

      {/* <p className="text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} - All rights reserved.
      </p> */}
    </div>
  );
}
