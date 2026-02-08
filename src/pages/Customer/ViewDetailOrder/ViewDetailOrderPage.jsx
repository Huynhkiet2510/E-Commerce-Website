import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { viewDetailOrder } from "../../../utils/orderStorage";
import ItemOrder from "./ItemOrder"

const ViewDetailOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = viewDetailOrder(id);
    setOrder(data);
  }, [id]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-main">
        Loading order...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-card-bg rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-main">
                Order #{order.id}
              </h1>
              <p className="text-sm text-text-muted">Ngày tạo: {order.date}</p>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                Payment pending
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                Unfulfilled
              </span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card-bg rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold">Order Items</h2>
              </div>
              {order.items.map((item) => (
                <ItemOrder key={item.id} item={item} />))}
              <div className="p-6 bg-card-bg border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    {order.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card-bg rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Customer</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-text-main">Full name</p>
                  <p className="font-medium text-text-muted">{order.customer.fullName}</p>
                </div>

                <div>
                  <p className="text-text-main">Email</p>
                  <p className="font-medium text-text-muted">{order.customer.email}</p>
                </div>

                <div>
                  <p className="text-text-main">Phone</p>
                  <p className="font-medium text-text-muted">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-text-main text-lg mb-4">Shipping Address</h3>

              <p className="text-sm   text-text-muted">
                {order.customer.city},{" "}
                {order.customer.country === "vn"
                  ? "Vietnam"
                  : "United States"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailOrderPage;
