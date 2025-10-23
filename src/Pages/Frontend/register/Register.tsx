import { useState } from "react";
import { Input, Select, Button, Form } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerServie from "../../../services/CustomerService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function Register() {
  const [inputs, setInputs] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate(); 


  const validateField = (name: string, value: any) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value || value.length < 2) error = "Họ tên phải có ít nhất 2 kí tự";
        break;

      case "phone":
        if (!/^(0\d{9})$/.test(value)) error = "Số điện thoại không hợp lệ";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Email không hợp lệ";
        break;

      case "password":
        if (!value || value.length < 8)
          error = "Mật khẩu phải có ít nhất 8 kí tự";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (name: string, value: any) => {
    setInputs((prev: any) => ({
      ...prev,
      [name]: value,
      roles: "customer",
      status: 1,
    }));

    // validate và bỏ lỗi khi người dùng nhập lại đúng
    const errorMsg = validateField(name, value);
    setErrors((prev: any) => ({
      ...prev,
      [name]: errorMsg || undefined,
    }));
  };

  const handleSubmit = async () => {
    const newErrors: any = {};

    Object.keys(inputs).forEach((key) => {
      const error = validateField(key, inputs[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataInput = { customer: inputs };
      await CustomerServie.store(dataInput);
      toast.success("Đăng ký thành công!", {
        autoClose: 2000, // thời gian hiển thị toast (1s)
        onClose: () => {
          navigate("/login");
        },
      });

      setInputs({
        fullName: "",
        phone: "",
        gender: "",
        email: "",
        password: "",
      });
      setErrors({});
    } catch (error :any) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      console.error(error);
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
      // toast.error("Đăng ký thất bại");
    }
  };

  document.title = "Đăng ký tài khoản";

  return (
    <>
      <section className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-700">
              <li>
                <a href="/" className="text-blue-600 hover:underline">
                  Trang chủ
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-500">Đăng ký tài khoản</li>
            </ol>
          </nav>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
          <Form layout="vertical" onFinish={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ tên */}
              <Form.Item
                label="Họ tên (*)"
                validateStatus={errors.fullName && "error"}
                help={errors.fullName}
              >
                <Input
                  name="fullName"
                  value={inputs.fullName || ""}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Nhập họ tên"
                />
              </Form.Item>

              {/* Điện thoại */}
              <Form.Item
                label="Điện thoại (*)"
                validateStatus={errors.phone && "error"}
                help={errors.phone}
              >
                <Input
                  name="phone"
                  value={inputs.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>

              {/* Giới tính */}
              <Form.Item label="Giới tính">
                <Select
                  value={inputs.gender || ""}
                  onChange={(value) => handleChange("gender", value)}
                  placeholder="Chọn giới tính"
                >
                  <Option value="1">Nam</Option>
                  <Option value="0">Nữ</Option>
                </Select>
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email (*)"
                validateStatus={errors.email && "error"}
                help={errors.email}
              >
                <Input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Nhập email"
                />
              </Form.Item>

              {/* Mật khẩu */}
              <Form.Item
                label="Mật khẩu (*)"
                validateStatus={errors.password && "error"}
                help={errors.password}
              >
                <Input.Password
                  name="password"
                  value={inputs.password || ""}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                htmlType="submit"
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
              >
                Đăng ký
              </Button>
            </div>

            <div className="text-center mt-4 text-sm">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
