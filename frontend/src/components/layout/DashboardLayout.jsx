import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../admin/SideBar';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {

    return (
        <div className="flex min-h-screen bg-[#f8e9dd]/60">

            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                <Outlet />
            </div>
        </div >
    );
};

export default DashboardLayout;
