import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table,Radio } from "antd";
import DiscountcodeService from "../../../services/DiscountcodeService";
import { cartStore } from "../../../Store/cartStore";
import addressServie from "../../../services/AddressService";
import { toast } from "react-toastify";
import OrderServie from "../../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { userStore } from "../../../Store/UserStore";

// State


interface DiscountCode {
  code: string;
  discountValue: number;
  conditionValue: number;
  endAt: string;
  type:string
}

interface CartItem {
  image: string;
  name: string;
  count: number;
  finalPrice: number;
  id:number
}

interface District {
  code: number;
  name: string;
  id:number
}

interface Ward {
  code: number;
  name: string;
    id:number
}

interface Province {
  code: number;
  name: string;
  id:number
}

interface CartDetail {
  quantity: number;
  productId: number;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  refCustomerId: number;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate(); 
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState<DiscountCode | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);


  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);

  const [isReceiveAtStore, setIsReceiveAtStore] = useState<boolean>(true);


  const [form] = Form.useForm();
  // 🏙️ Lấy danh sách tỉnh từ API của Việt Nam
  useEffect(() => {
    const fetchCity = async() => {
          const res = await addressServie.city();
          setProvinces(res.data.cities)
    }
    fetchCity()
  }, []);

  // Khi chọn tỉnh => lấy danh sách quận/huyện
  useEffect(() => {
    if (selectedProvince) {
       const fetchDistricts = async() => {
          const res = await addressServie.district(selectedProvince);
          setDistricts(res.data.districts)
        }
        fetchDistricts()
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedProvince]);

  //  Khi chọn quận => lấy danh sách xã/phường
  useEffect(() => {
    if (selectedDistrict) {
      const fetchward = async() => {
          const res = await addressServie.ward(selectedDistrict);
          setWards(res.data.wards)
        }
        fetchward()
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);


  // reset 
const handleProvinceChange = (value: number) => {
  setSelectedProvince(value);
  setSelectedDistrict(null);
  setSelectedWard(null);

  setDistricts([]);
  setWards([])
  form.setFieldsValue({ district: undefined, ward: undefined });
};

// --- Khi chọn Quận/Huyện ---
const handleDistrictChange = (value: number) => {
  setSelectedDistrict(value);
  setSelectedWard(null);


  setWards([]);

  form.setFieldsValue({ ward: undefined });


};

  const cartItems: CartItem[] = cartStore.cart.productList || []; // Giỏ hàng
    const total = cartItems.reduce((totalPrice, item) => {
        return (
            totalPrice +
            item.count * (item.finalPrice)
        );
    }, 0);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await DiscountcodeService.index();
        setDiscountCodes(res.data.couponCampaigns || []);
      } catch (error) {
        console.log("🚀 ~ fetchCodes ~ error:", error)
        // toast.error("Không thể tải danh sách mã giảm giá!");
      }
    };
    fetchCodes();
  }, []);

  const handleUseDiscount = (code: DiscountCode) => {
    setSelectedCode(code);
    setShowModal(false);
    toast.success(`Đã chọn mã ${code.code}`);
  };

  const handleApplyDiscount = async () => {
    const code = selectedCode?.code;
    if (!code) {
      toast.warning("Vui lòng chọn mã giảm giá trước!");
      return;
    }
    if(total<selectedCode.conditionValue){
      toast.warning("giá trị đơn hàng của bạn chưa đủ để nhận giảm giá!");
      setSelectedCode(null)
      return;
    }else{
      toast.success(`Áp dụng mã thành công ${code}`);
      setDiscountAmount(selectedCode.discountValue);
    }
  };

  
 
  const user = toJS(userStore.user); // gỡ lớp Proxy MobX
  console.log("🚀 ~ user:", user)



  const handleCheckout = async () => {

  const cartDetails: CartDetail[] = cartItems.map((item) => ({
    quantity: item.count,
    productId: item.id,
    name: item.name,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    refCustomerId: user.id,
  }));
    const cityId = provinces.find(p => Number(p.code) == selectedProvince)?.id ?? null;
    const districtId = districts.find(d => Number(d.code) == selectedDistrict)?.id ?? null;
    const wardId = wards.find(w => Number(w.code) == selectedWard)?.id ?? null;

    const dataSend ={
      order : {
            // "isHasPoint": true,
            "note": "string",
            "length": 0,
            "width": 0,
            "height": 0,
            "senderName": "string",
            "senderPhone": "string",
            "senderAddress": "string",
            "receiverName": user.fullName,
            "receiverPhone": user.phone,
            "receiverAddress": user.address,
            "status": "string",
            "distance": 0,
            "paidPoint": 0,
            "totalWeight": 0,
            // "isReceiveAtStore": true,  //đượcNhận tại cửa hàng
            // "isFreeShip": true,
            isReceiveAtStore: isReceiveAtStore,
            isFreeShip: !isReceiveAtStore,
      },
      details: cartDetails,
      cityId: cityId,
      districtId: districtId,
      wardId: wardId,
      ...(selectedCode?.code && {
        couponCode: selectedCode.code,
        couponType: selectedCode.type,
      }),
    }
 
    try {
      if(user.id !==0){
         if(selectedProvince && selectedDistrict && selectedWard ){
            await OrderServie.store(dataSend)
           localStorage.removeItem("cartStore");
           cartStore.reset()
            toast.success("Đặt hàng thành công!", {
              autoClose: 1000, 
              onClose: () => {
                navigate("/");
              },
            });  
         }else{
           toast.warning("Vùi lòng điền đầy đủ thông tin giao hàng trước khi thanh toán!");
         }
      }else{
         toast.error("Vui lòng đăng nhập trước khi thanh toán!", {
            autoClose: 2000, // thời gian hiển thị toast (1s)
            onClose: () => {
              navigate("/login");
            },
          });
      }

    } catch (error) {
      console.log("🚀 ~ handleCheckout ~ error:", error)
      toast.error("Đặt hàng thất bại!");
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_: number,__: CartItem, index: number) => index + 1,
      align: "center" as const,
    },
    {
      title: "Hình",
      dataIndex: "image",
      render: (image: string) => (
        <img
          src={`${image}`}
          alt="product"
          className="h-20 w-25 object-cover rounded-md"
        />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name" },
    { title: "Số lượng", dataIndex: "count", align: "center" as const },
    {
      title: "Giá",
      dataIndex: "finalPrice",
      align: "center" as const,
      render: (finalPrice: number) =>
        finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Thành tiền",
      align: "center" as const,
      render: (item: CartItem) =>
        (
          ((item.finalPrice || 0)) * item.count
        ).toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-main mb-6">Thanh toán</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* --- Thông tin giao hàng --- */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-main">
            Thông tin giao hàng
          </h3>
          <Form layout="vertical" form={form}>
            {/* --- Tỉnh / Thành phố --- */}
            <Form.Item label="Tỉnh / Thành phố" name="province">
              <Select
                placeholder="Chọn tỉnh / thành phố"
                showSearch
                optionFilterProp="children"
                onChange={handleProvinceChange}
                value={selectedProvince ?? undefined}
              >
                {provinces.map((p) => (
                  <Select.Option key={p.code} value={p.code}>
                    {p.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* --- Quận / Huyện --- */}
            <Form.Item label="Quận / Huyện" name="district">
              <Select
                placeholder="Chọn quận / huyện"
                showSearch
                disabled={!selectedProvince}
                optionFilterProp="children"
                onChange={handleDistrictChange}
                value={selectedDistrict ?? undefined}
              >
                {districts.map((d) => (
                  <Select.Option key={d.code} value={d.code}>
                    {d.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* --- Xã / Phường --- */}
            <Form.Item label="Xã / Phường" name="ward">
              <Select
                placeholder="Chọn xã / phường"
                showSearch
                disabled={!selectedDistrict}
                optionFilterProp="children"
                onChange={(value) => setSelectedWard(value)}
                value={selectedWard ?? undefined}
              >
                {wards.map((w) => (
                  <Select.Option key={w.code} value={w.code}>
                    {w.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <div className="mt-4">
            <Form.Item label="Hình thức nhận hàng">
              <Radio.Group
                value={isReceiveAtStore ? "store" : "address"}
                onChange={(e) => setIsReceiveAtStore(e.target.value === "store")}
              >
                <Radio value="store">Nhận tại cửa hàng</Radio>
                <Radio value="address">Nhận tại địa chỉ</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        {/* --- Thông tin đơn hàng --- */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4 text-main">Thông tin đơn hàng</h3>
          <Table
            columns={columns}
            dataSource={cartItems}
            pagination={false}
            // rowKey={(r) => r.name}
          />

         <div className="mt-4 flex justify-end items-center space-x-2">
            <Input
                className="w-48"
                placeholder="Nhập mã giảm giá"
                value={selectedCode?.code || ""}
                readOnly
            />
            <Button onClick={() => setShowModal(true)}>Chọn mã</Button>
            <Button type="primary" onClick={handleApplyDiscount}>
                Áp dụng
            </Button>
        </div>

          <div className="mt-4 space-y-2 text-right">
            <p>Tạm tính: {total.toLocaleString("vi-VN")}₫</p>
            {/* <p>Phí vận chuyển: {shippingFee.toLocaleString("vi-VN")}₫</p> */}
            <p>Giảm giá: -{discountAmount.toLocaleString("vi-VN")}₫</p>
            <p className="font-bold text-red-500">
              Tổng cộng: {(total - discountAmount).toLocaleString("vi-VN")}₫
            </p>
          </div>

          <div className="mt-4 space-y-2 text-right">
          <Button
            type="primary"
            className="mt-4 bg-red-500 hover:bg-red-600"
            onClick={handleCheckout}
          >
            Xác nhận thanh toán

          </Button>
          </div>

        </div>
      </div>

      {/* Modal chọn mã giảm giá */}
      <Modal
        title="Chọn mã giảm giá"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={[
            { title: "Mã", dataIndex: "code" , align: "center" },
            { title: "Giá trị", dataIndex: "discountValue",
                  render: (value: number) =>
                    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
            },
            { title: "Giá trị đơn hàng tối thiểu", dataIndex: "conditionValue" , align: "center",
                  render: (value: number) =>
                    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
             },
            { title: "Ngày kết thúc", dataIndex: "endAt" ,  align: "center",
                render: (endAt: number) => {
                if (!endAt) return "—"; // tránh lỗi khi endAt null/undefined
                const date = new Date(endAt * 1000); // timestamp → milliseconds
                return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                });
            }, 
            },
            {
              title: "Hành động",
              render: (record: DiscountCode) => (
                <Button type="primary" onClick={() => handleUseDiscount(record)}>
                  Sử dụng
                </Button>
              ),
            },
          ]}
          dataSource={discountCodes}
          rowKey={(r) => r.code}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default Checkout;
