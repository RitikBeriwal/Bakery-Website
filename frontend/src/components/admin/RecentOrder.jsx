import React from 'react';
import { Link } from 'react-router-dom';

const RecentOrder = () => {
    const rows = [
        { id: "ORD123", customer: "Riya", amount: "₹650", status: "Completed" },
        { id: "ORD124", customer: "Aman", amount: "₹1200", status: "Pending" },
        { id: "ORD125", customer: "Neha", amount: "₹900", status: "Cancelled" },
        { id: "ORD126", customer: "Vikas", amount: "₹450", status: "Completed" },
        { id: "ORD127", customer: "Arjun", amount: "₹780", status: "Pending" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-5 text-[#6f482a]">Recent Orders</h3>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8e9dd] rounded-lg">
                            <th className="py-3 px-4 text-gray-700 font-semibold rounded-tl-lg">Order ID</th>
                            <th className="py-3 px-4 text-gray-700 font-semibold">Customer</th>
                            <th className="py-3 px-4 text-gray-700 font-semibold">Amount</th>
                            <th className="py-3 px-4 text-gray-700 font-semibold rounded-tr-lg">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r) => (
                            <tr
                                key={r.id}
                                className=" hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                <td className="py-2 px-4 text-gray-800 font-medium">{r.id}</td>
                                <td className="py-2 px-4 text-gray-700">{r.customer}</td>
                                <td className="py-2 px-4 text-gray-700">{r.amount}</td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                            r.status
                                        )}`}
                                    >
                                        {r.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                    <Link
                        to="/dashboard/orders"
                        className="px-4 py-2 bg-[#d69e64] text-white font-semibold rounded-lg shadow hover:bg-[#c17f45] transition"
                    >
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecentOrder;
