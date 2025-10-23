import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Breadcrumb, Card, message } from "antd";
import CustomerServie from "../../../services/CustomerService";



interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
}

const ChangePass: React.FC = () => {
  const [loading, setLoading] = useState(false);


  const [form] = Form.useForm<ChangePasswordForm>();

  const handleSubmit = async (values: ChangePasswordForm) => {

    setLoading(true);
    try {
       await CustomerServie.changePass(values);
    //   console.log("🚀 ~ handleSubmit ~ res:", res);
      message.success("Đổi mật khẩu thành công!");
      form.resetFields();

      // Đợi một chút rồi chuyển hướng
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
      message.error("Đổi mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  document.title = "Đổi mật khẩu";

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: <Link to="/" className="text-blue-600">Trang chủ</Link> },
            { title: "Đổi mật khẩu" },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <Card
            title="Tài khoản"
            className="shadow-md border border-gray-200"
            headStyle={{ backgroundColor: "#A9D0E8" }}
          >
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Quản lý thông tin
                </Link>
              </li>
              <li>
                <Link to="/quanly_order" className="text-gray-700 hover:text-blue-600">
                  Quản lý đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/changePass" className="text-blue-600 font-medium">
                  Đổi mật khẩu
                </Link>
              </li>
            </ul>
          </Card>

          {/* Form đổi mật khẩu */}
          <div className="md:col-span-2">
            <Card
              title={<span className="text-blue-700 font-semibold">Đổi mật khẩu</span>}
              className="shadow-md border border-gray-200"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="mt-4"
              >
                <Form.Item
                  label="Mật khẩu cũ"
                  name="oldPassword"
                  rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu cũ"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu mới"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Đổi mật khẩu
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
