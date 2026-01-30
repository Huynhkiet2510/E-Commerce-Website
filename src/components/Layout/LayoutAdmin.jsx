import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";


const LayoutAdmin = () => {
    return (
        <div className="flex h-screen">
            <div className="h-full  sticky top-0">
                <Sidebar />
            </div>
            <main className="flex-1 bg-[#EFF0F7]">
                <div className="h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default LayoutAdmin;
