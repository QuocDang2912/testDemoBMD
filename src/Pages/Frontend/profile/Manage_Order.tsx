import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import OrderServie from "../../../services/OrderService";
import { toast } from "react-toastify";

// import OrderService from "../../../services/OrderService";

interface Product {
  image: string;
  // có thể thêm các thuộc tính khác như id, name, ...
}
interface OrderDetail {
  id: number;
  name: string;
  finalPrice: number;
  price: number;
  discount: number;
  quantity: number;
  image:string;
  product: Product;
}

interface Order {
  id: number;
  delivery_name: string;
  delivery_email: string;
  delivery_phone: string;
  delivery_address: string;
  total: number;
  status: string;
  note: string;
  created_at: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  user_id?: number;
  details: OrderDetail[];
}

export default function ManageOrder() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const user = {
    id:1
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await OrderServie.show();
      console.log("🚀 ~ fetchOrders ~ res:", res)
      setAllOrders(res.data.orders || []);
      user.id++
    } catch (error) {
      console.error(error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.id]);

  const handleCancelOrder = async (id: number) => {
    try {
      await OrderServie.cancel(id);
      toast.success("Đã hủy đơn hàng thành công");
      fetchOrders();
    } catch (error) {
      console.error(error);
      message.error("Hủy đơn hàng thất bại");
    }
  };

  const handleUpdateOrder = async () => {
    if (!currentOrder) return;
    try {
    //   await OrderService.update(currentOrder, currentOrder.id);
      message.success("Cập nhật đơn hàng thành công");
      setIsModalOpen(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại");
    }
  };



  const columns: ColumnsType<Order> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Tên người nhận",
      dataIndex: "receiverName",
    },

    {
      title: "Điện thoại",
      dataIndex: "receiverPhone",
    },
       {
      title: "Tạm tính",
      dataIndex: "moneyProduct",
      align: "center",
      render: (moneyProduct: number) =>
        moneyProduct.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
       {
      title: "Giảm giá",
      dataIndex: "moneyDiscountCoupon",
      align: "center",
      render: (moneyDiscountCoupon: number) =>
        moneyDiscountCoupon.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
       {
      title: "Phí giao hàng",
      dataIndex: "shipFee",
      align: "center",
      render: (shipFee: number) =>
        shipFee.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Tổng tiền",
      dataIndex: "moneyFinal",
      align: "center",
      render: (moneyFinal: number) =>
        moneyFinal.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (status: string) => {
        switch (status) {
          case "CANCEL":
            return <Tag color="red">Đã hủy</Tag>;
          case 'PENDING':
            return <Tag color="orange">Chờ xác nhận</Tag>;
          case "CONFIRM":
            return <Tag color="blue">Đang giao</Tag>;
          case "COMPLETE":
            return <Tag color="green">Đã giao</Tag>;
          case "RETURN_REFUND":
            return <Tag color="red">Hoàn trả</Tag>;
          default:
            return <Tag color="default">Không xác định</Tag>;
        }
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      align: "center",
       render: (createdAt: number) => {
                if (!createdAt) return "—"; // tránh lỗi khi endAt null/undefined
                const date = new Date(createdAt * 1000); // timestamp → milliseconds
                return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                });
        }
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          {record.status === "PENDING" && (
            <>
              <Button
                danger
                onClick={() => handleCancelOrder(record.id)}
              >
                Hủy đơn
              </Button>
              {/* <Button
                type="primary"
                onClick={() => {
                  setCurrentOrder(record);
                  setIsModalOpen(true);
                }}
              >
                Cập nhật
              </Button> */}
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h2>

      <Table
        columns={columns}
        dataSource={allOrders}
        rowKey="id"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Chi tiết đơn hàng</h4>
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Tên sản phẩm</th>
                    <th className="border p-2 text-center">Hình ảnh</th>
                    <th className="border p-2 text-center">Giá</th>
                    {/* <th className="border p-2 text-center">Giá giảm</th> */}
                    <th className="border p-2 text-center">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {record.details.map((d, i) => (
                    <tr key={i}>
                      <td className="border p-2">{d.name}</td>
                      <td className="border p-2 text-center">
                        <img
                          src={d.product.image}
                          alt={d.product.image}
                          className="w-24 h-24 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        {d.finalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      {/* <td className="border p-2 text-center">
                        {d.discount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td> */}
                      <td className="border p-2 text-center">{d.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        }}
        pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: allOrders.length,
        showSizeChanger: true, 
        pageSizeOptions: [5, 10, 20, 50],
        showTotal: (total, range) =>
          `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} đơn hàng`,
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        },
      }}
      />

      {/* Modal cập nhật */}
      <Modal
        title="Cập nhật thông tin đơn hàng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleUpdateOrder}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <div className="space-y-3">
          <div>
            <label>Họ tên người nhận</label>
            <Input
              name="delivery_name"
              value={currentOrder?.delivery_name}
              onChange={(e) =>
                setCurrentOrder((prev) =>
                  prev ? { ...prev, delivery_name: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <label>Email</label>
            <Input
              name="delivery_email"
              value={currentOrder?.delivery_email}
              onChange={(e) =>
                setCurrentOrder((prev) =>
                  prev ? { ...prev, delivery_email: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <label>Điện thoại</label>
            <Input
              name="delivery_phone"
              value={currentOrder?.delivery_phone}
              onChange={(e) =>
                setCurrentOrder((prev) =>
                  prev ? { ...prev, delivery_phone: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <label>Địa chỉ</label>
            <Input
              name="delivery_address"
              value={currentOrder?.delivery_address}
              onChange={(e) =>
                setCurrentOrder((prev) =>
                  prev ? { ...prev, delivery_address: e.target.value } : prev
                )
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
