import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerServie from "../../../services/CustomerService";
import "react-toastify/dist/ReactToastify.css";
// import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { Form, Input, Button, Typography, Card } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { userStore } from "../../../Store/UserStore";

const { Title, Text } = Typography;

interface LoginForm {
  phone: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<LoginForm>();
  const navigate = useNavigate(); 


  const handleLogin = async (form: LoginForm) => {
      setLoading(true);
      try {
      let phone = form.phone.trim();
      if (phone.startsWith("0")) {
        phone = "84" + phone.slice(1);
      }

      const response = await CustomerServie.login({
        ...form,
        phone,
      });
      const result = response.data;

      localStorage.setItem("accessToken", result.token);
      // localStorage.setItem("user", JSON.stringify(result.user));

      const responseProfile = await CustomerServie.profile();
      console.log("🚀 ~ handleLogin ~ responseProfile:", responseProfile.data)
      localStorage.setItem("user", JSON.stringify(responseProfile.data));

      toast.success("Đăng nhập thành công!", {
        autoClose: 2000, // thời gian hiển thị toast (1s)
        onClose: () => {
          userStore.addUser(responseProfile.data)
          navigate("/");
        },
      });
    } catch (error: unknown) {
      console.error("Đăng nhập thất bại:", error);
      toast.error( "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  document.title = "Đăng nhập";

  return (
    <section className="flex items-center justify-center bg-gray-50 py-5">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
        <div className="text-center mb-6">
          <Title level={3} className="text-blue-600">
            Đăng nhập tài khoản
          </Title>
          <Text type="secondary">
            Để bình luận, mua hàng hoặc liên hệ — vui lòng đăng nhập
          </Text>
        </div>

        <Form<LoginForm>
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Số điện thoại (*)"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
          >
            <Input placeholder="Nhập số điện thoại" size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu (*)"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          {/* <div className="flex justify-between mb-3">
            <Link to="/userByEmail" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          <u className="text-blue-600">Chú ý:</u> (*) Thông tin bắt buộc phải nhập
        </p>
      </Card>

    </section>
  );
}
