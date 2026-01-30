
import OrderHistory from "./OrderHistory";
import UserInfo from "./UserInfo";
import { useProfile } from "./useProfile";

const ProfilePage = () => {
  const { orders, user, handleLogout, handleClearAllOrder, handleRemoveOrder } = useProfile();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

        <UserInfo
          user={user}
          onLogout={handleLogout}
        />

        <OrderHistory
          orders={orders}
          onClearAll={handleClearAllOrder}
          onRemove={handleRemoveOrder}
        />

      </div>
    </div>
  );
};

export default ProfilePage;