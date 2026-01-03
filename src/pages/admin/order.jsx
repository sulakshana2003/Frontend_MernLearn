import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root"); // IMPORTANT for accessibility (Vite/React usually uses #root)

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to view orders.");
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URI + "/api/orders/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loading]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  function handleStatusChange(orderId, newStatus) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update order status.");
      return;
    }

    axios
      .put(
        import.meta.env.VITE_BACKEND_URI + `/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        const newUpdatedOrder = { ...selectedOrder, status: newStatus };
        setSelectedOrder(newUpdatedOrder);
        toast.success("Order status updated successfully.");
        setLoading(true); // Refresh orders
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating order status.");
      });
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {loading ? (
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4">
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
            <p className="text-sm font-medium text-slate-700">
              Loading orders...
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-10">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Orders
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Manage customer orders and their statuses.
              </p>
            </div>
          </div>

          {/* Orders List */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            {/* ===================== MOBILE VIEW (NEW) ===================== */}
            <div className="divide-y divide-slate-100 md:hidden">
              {orders.map((order) => (
                <button
                  key={order.orderId}
                  onClick={() => openModal(order)}
                  className="w-full text-left transition hover:bg-slate-50/70"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 break-words">
                          {order.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 break-all">
                          {order.email}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {order.orderId}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Date
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="col-span-2 rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-200">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </p>
                        <span className="mt-1 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ===================== DESKTOP VIEW (UNCHANGED) ===================== */}
            <div className="hidden md:block">
              <div className="w-full">
                <table className="w-full table-fixed divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="w-[110px] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                        Customer
                      </th>
                      <th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                        Email
                      </th>
                      <th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 lg:table-cell">
                        Address
                      </th>
                      <th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                        Phone Number
                      </th>
                      <th className="w-[110px] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                        Total
                      </th>
                      <th className="hidden px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:table-cell">
                        Status
                      </th>
                      <th className="w-[120px] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {orders.map((order) => (
                      <tr
                        key={order.orderId}
                        className="cursor-pointer transition-colors hover:bg-slate-50/70"
                        onClick={() => openModal(order)}
                        role="button"
                        tabIndex={0}
                      >
                        <td className="px-4 py-4 text-sm font-medium text-slate-900 sm:px-6">
                          <span className="inline-flex max-w-full items-center truncate rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {order.orderId}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-900 sm:px-6">
                          <span className="block break-words">
                            {order.name}
                          </span>
                        </td>

                        <td className="hidden px-6 py-4 text-sm text-slate-700 md:table-cell">
                          <span className="block truncate">{order.email}</span>
                        </td>

                        <td className="hidden px-6 py-4 text-sm text-slate-700 lg:table-cell">
                          <span className="block break-words">
                            {order.address}
                          </span>
                        </td>

                        <td className="hidden px-6 py-4 text-sm text-slate-700 md:table-cell">
                          <span className="block truncate">{order.phone}</span>
                        </td>

                        <td className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                          ${order.total.toFixed(2)}
                        </td>

                        <td className="hidden px-6 py-4 text-sm sm:table-cell">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                            {order.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-700 sm:px-6">
                          <span className="inline-flex max-w-full items-center truncate rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/40 px-6 py-3">
                <p className="text-xs text-slate-500">
                  Showing {orders.length} orders
                </p>
              </div>
            </div>
          </div>

          {/* ONE modal, outside the map */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Order Details"
            overlayClassName="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 outline-none"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Full information for this order.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5">
              {!selectedOrder ? (
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-inset ring-slate-200">
                  No order selected.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {selectedOrder.orderId}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                      {selectedOrder.status}
                    </span>
                    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
                      {new Date(selectedOrder.orderDate).toLocaleString()}
                    </span>
                    <select
                      onChange={(e) => {
                        handleStatusChange(
                          selectedOrder.orderId,
                          e.target.value
                        );
                      }}
                      className="ml-auto h-9 rounded-xl bg-white px-3 text-sm font-medium text-slate-900
             shadow-sm ring-1 ring-inset ring-slate-200
             transition hover:bg-slate-50 focus:outline-none
             focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="Change">Change Status</option>
                      <option value="pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Customer
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900 break-words">
                        {selectedOrder.name}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Total
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        ${selectedOrder.total.toFixed(2)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 sm:col-span-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Email
                      </p>
                      <p className="mt-1 text-sm text-slate-900 break-all">
                        {selectedOrder.email}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 sm:col-span-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-slate-900 break-words">
                        {selectedOrder.address}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200 sm:col-span-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Phone
                      </p>
                      <p className="mt-1 text-sm text-slate-900 break-words">
                        {selectedOrder.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                onClick={closeModal}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
