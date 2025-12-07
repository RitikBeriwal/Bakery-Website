import { Calendar, Clock, CreditCard, ShoppingBag } from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";

const StatsCards = () => {
    const stats = [
        { label: "Total Orders", value: 1200, icon: <ShoppingBag /> },
        { label: "Today's Orders", value: 42, icon: <Calendar /> },
        { label: "Revenue Today", value: "₹8,450", icon: <CreditCard /> },
        { label: "Pending Orders", value: 15, icon: <Clock /> },
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4 w-full">
                {stats.map((s) => (
                    <motion.div
                        key={s.label}
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center gap-4 p-4 bg-[#fff9f4] rounded-2xl border border-[#e6e0db] hover:shadow-md hover:border-[#3f2e20]/50 transition w-full"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-tr from-orange-300 to-yellow-200 text-[#8B5E3C]">
                            {React.cloneElement(s.icon, { size: 24 })}
                        </div>

                        {/* Text */}
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-[#8B5E3C] text-sm sm:text-base font-semibold">{s.label}</p>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-1 text-[#6f482a]">{s.value}</h2>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default StatsCards;
