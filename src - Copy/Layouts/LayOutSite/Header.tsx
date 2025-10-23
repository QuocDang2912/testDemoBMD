import React, { useEffect, useState } from "react";
import { Input, Dropdown, Menu } from "antd";
import { FaSearch, FaPhoneSquare, FaUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import phoneIcon from "../../assets/images/phone.png";
import dog from "../../assets/logo2.png";
import { cartStore } from "../../Store/cartStore";
import { observer } from "mobx-react-lite";
import { toast, ToastContainer } from "react-toastify";
import { userStore } from "../../Store/UserStore";
import { useNavigate, Link } from "react-router-dom";
import { toJS } from "mobx";

const { Search } = Input;

const Header: React.FC = observer(() => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Xử lý tìm kiếm
    console.log("Search:", search);
  };

  const totalItem = cartStore.cart.productList.reduce((total, item) => {
    // tổng item
    return total + item.count;
  }, 0);
  
  useEffect(() => {
 
  }, [totalItem])
  

  // const dataUser = localStorage.getItem("user");
  // let user = null;

  // if (dataUser) {
  //   user = JSON.parse(dataUser);
  // }
  // const user = userStore.user;
  const user = toJS(userStore.user); // gỡ lớp Proxy MobX
  console.log("🚀 ~ user:", user)
  console.log("🚀 ~ user:", user.fullName)
  // console.log("user:", user);
  const handleLogout = () => {
    // toast.success("Đăng xuất thành công ")
    // localStorage.clear();
    // userStore.reset();
      toast.success("Đăng xuất thành công!", {
        autoClose: 1000, // thời gian hiển thị toast (1s)
        onClose: () => {
          localStorage.clear();
          userStore.reset();
          navigate("/");
        },
      });
  };

  // Dropdown cho user
  const userMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/profile">Thông tin</Link>,
        },
        {
          key: "2",
          label: (
            <span onClick={handleLogout} className="text-red-500 cursor-pointer">
              Đăng xuất
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={dog}
            alt="Logo"
            className="w-36 h-24 object-contain"
          />
        </Link>

        {/* Search box */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <Search
            placeholder="Nhập nội dung tìm kiếm"
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
            enterButton={
              <div className="flex items-center justify-center gap-2">
                <FaSearch />
                <span>Search</span>
              </div>
            }
            className="rounded-lg border border-gray-300"
            size="large"
          />
        </div>

        {/* Contact & User */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Contact */}
          <div className="flex items-center space-x-2">
            <img src={phoneIcon} alt="phone" className="w-7 h-7" />
            <div>
              <p className="text-[#006ba1] font-semibold text-sm">Liên hệ ngay</p>
              <a
                href="tel:+84985608759"
                className="text-lg font-bold text-gray-800"
              >
                0327552982
              </a>
            </div>
          </div>

          {/* User */}
          {user && user.fullName ? (
            <div className="flex items-center space-x-2">
              <FaPhoneSquare className="text-[#006ba1] text-xl" />
              <span className="text-gray-700 text-base">{user.phone}</span>
              <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <FaUser className="text-[#006ba1] text-xl" />
                  <span className="capitalize">{user.fullName}</span>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-[#006ba1] font-medium hover:underline"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="text-[#006ba1] font-medium hover:underline"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="relative flex items-center">
          <Link to="/cart" className="relative">
            <FaShoppingBag  className="text-[#006ba1]" size={26} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {totalItem}
            </span>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

    </header>
    
  );
})
export default Header;

