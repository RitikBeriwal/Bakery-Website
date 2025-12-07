import { Fullscreen } from 'lucide-react';
import React from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
    const data = [
        { month: "Jan", sales: 9000 },
        { month: "Feb", sales: 12000 },
        { month: "Mar", sales: 15000 },
        { month: "April", sales: 12000 },
        { month: "May", sales: 18000 },
        { month: "June", sales: 21000 },
        { month: "July", sales: 25000 },
        { month: "Aug", sales: 20000 },
        { month: "Sept", sales: 25000 },
        { month: "Oct", sales: 28000 },
        { month: "Nov", sales: 30000 },
        { month: "Dec", sales: 0 },

    ];
    return (
        <div className="bg-[#fff9f4] p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3 text-[#6f482a]">Monthly Sales</h3>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#d69e64"
                            strokeWidth={3}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesChart