import { Breadcrumb, Button, Image, InputNumber, Table, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartStore } from "../../../Store/cartStore";
import { observer } from "mobx-react-lite";


const { Text, Title } = Typography;

interface CartItem {
  id: number;
  name: string;
  image: string;
  finalPrice: number;
  count: number;
}

 const Cart = observer(() => {
  const navigate = useNavigate();

  const cartItem: CartItem[] = cartStore.cart.productList

  const total = cartItem.reduce((sum, item) => {
    const price = item.finalPrice || 0 ;
    return sum + item.count * price;
  }, 0);

  const handleDecrease = (item: CartItem) => {
        if(item.count > 1) {
          cartStore.decreaseCount(item.id);
        }
  };

  const handleIncrease = (item: CartItem) => {
    cartStore.increaseCount(item.id);
  };
  const handleRemoveFromCart = (item: CartItem) => {
    cartStore.removeFromCart(item.id);
  };

  const handleChangeCount = (id: number, value: number | null) => {
  if (!value || value < 1) return;
  cartStore.updateCount(id, value);
};
  

  const handleCheckout = () => {
    if (cartItem.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Bạn chưa có sản phẩm nào trong giỏ hàng");
    }
  };

  document.title = "Giỏ hàng";

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (_: number, __: CartItem, index: number) => <Text>{index + 1}</Text>,
      width: 70,
      align: "center" as const,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (img: string) => (
        <Image
          src={`${img}`}
          alt="product"
          width={100}
          className="rounded-md"
          preview={false}
        />
      ),
      width: 150,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text: string) => <Text strong>{text}</Text>,
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      render: (_: number, item: CartItem) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="default"
            size="small"
            onClick={() => handleDecrease(item)}
            disabled={item.count <= 1}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={item.count}
            onChange={(value) => handleChangeCount(item.id, value)}
            className="w-16 text-center"
          />
          <Button
            type="default"
            size="small"
            onClick={() => handleIncrease(item)}
          >
            +
          </Button>
        </div>
      ),
      align: "center" as const,
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "finalPrice",
      render: (value: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
      align: "center" as const,
      width: 120,
    },
    {
      title: "Thành tiền",
      render: (_: number, item: CartItem) => {
        const price = item.finalPrice 
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price * item.count);
      },
      align: "center" as const,
      width: 150,
    },
    {
      title: "Hành động",
      render: (_: number, item: CartItem) => (
        <Button
          danger
          size="small"
          onClick={() => handleRemoveFromCart(item)}
        >
          Xóa
        </Button>
      ),
      align: "center" as const,
      width: 100,
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <Breadcrumb
          className="mb-4"
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: "Giỏ hàng của bạn" },
          ]}
        />

        <div className="bg-white rounded-xl shadow-md p-6">
          <Title level={4} className="text-blue-600 mb-4">
            Giỏ hàng của bạn
          </Title>

          <Table
            dataSource={cartItem}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
          />

          <div className="flex justify-between items-center mt-6">
            <Text className="text-lg font-semibold">
              Tổng tiền:{" "}
              <span className="text-red-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </Text>
            <Button
                type="primary"
                size="large"
                className="bg-blue-600"
                onClick={handleCheckout}
                >
                Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Cart
