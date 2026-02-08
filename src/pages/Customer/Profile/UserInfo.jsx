const UserInfo = ({ user, onLogout }) => (
    <div className="col-span-12 lg:col-span-3 p-6 rounded-xl bg-card-bg shadow">
        <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
        <div className="text-center">
            <img
                src={user?.avatar}
                alt="avatar"
                className="w-32 h-32 mx-auto rounded-full shadow-md object-cover"
            />
            <h1 className="text-2xl font-bold mt-4">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="mt-6 space-y-3">
            <div className="flex justify-between">
                <span className="font-semibold">User ID:</span>
                <span>{user?.id}</span>
            </div>

            <div className="flex justify-between">
                <span className="font-semibold">Vai trò:</span>
                <span className="capitalize">{user?.role}</span>
            </div>
        </div>
        <button
            onClick={onLogout}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
        >
            Đăng xuất
        </button>
    </div>
)

export default UserInfo;