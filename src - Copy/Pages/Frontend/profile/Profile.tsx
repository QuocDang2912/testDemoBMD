import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Typography, Card, Menu } from "antd";

const { Title, Text } = Typography;

interface User {
  fullName: string;
  address: string;
  email: string;
  phone: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    document.title = "Thông tin tài khoản";

    const dataUser = localStorage.getItem("user");
    if (dataUser) {
      try {
        setUser(JSON.parse(dataUser));
      } catch (error) {
        console.error("Lỗi khi parse user:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <Text type="secondary">Không tìm thấy thông tin người dùng</Text>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { title: <Link to="/" className="text-blue-600">Trang chủ</Link> },
            { title: "Thông tin tài khoản" },
          ]}
        />
      </div>

      <div className="container mx-auto mt-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card
          title="Thông tin tài khoản"
          className="shadow-md border border-gray-200"
          headStyle={{ backgroundColor: "#A9D0E8" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["profile"]}
            items={[
              {
                key: "profile",
                label: <Link to="/profile">Quản lý thông tin</Link>,
              },
              {
                key: "order",
                label: <Link to="/quanly_order">Quản lý đơn hàng</Link>,
              },
              {
                key: "changePass",
                label: (
                  <Link to="/changePass" className="text-blue-600">
                    Đổi mật khẩu
                  </Link>
                ),
              },
            ]}
          />
        </Card>

        {/* Main content */}
        <div className="md:col-span-3">
          <Card className="shadow-md border border-gray-200">
            <Title level={3} className="text-blue-700 mb-4">
              Thông tin tài khoản
            </Title>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr className="border-b">
                    <td className="w-1/4 py-2 font-medium text-gray-600">
                      Tên tài khoản
                    </td>
                    <td className="py-2 text-gray-800">{user.fullName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium text-gray-600">
                      Địa chỉ
                    </td>
                    <td className="py-2 text-gray-800">
                      {user.address}{" "}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium text-gray-600">Email</td>
                    <td className="py-2 text-gray-800">{user.email}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-gray-600">
                      Điện thoại
                    </td>
                    <td className="py-2 text-gray-800">{user.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
