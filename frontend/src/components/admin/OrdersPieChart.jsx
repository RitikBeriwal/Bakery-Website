import React from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const OrdersPieChart = () => {
    const colors = ["#ffb07c", "#d69e64", "#ed598a"];

    const data = [
        { name: "Pending", value: 2 },
        { name: "Completed", value: 2 },
        { name: "Cancelled", value: 1 },
    ];

    return (
        <div className="bg-[#fff9f4] p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3 text-[#6f482a]">Daily Order Status</h3>
            <div className="flex justify-center">
                <PieChart width={340} height={260}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        innerRadius={50}
                        paddingAngle={3}
                    >

                        {data.map((entry, i) => (
                            <Cell key={i} fill={colors[i]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>


            <div className="mt-4 flex justify-around text-sm">
                {data.map((item, i) => (
                    <div className="flex items-center gap-2" key={i}>
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[i] }}
                        ></span>
                        <span className="text-gray-600">{item.name}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrdersPieChart