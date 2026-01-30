import FormInformation from "./FormInformation";
import ReviewCart from "./ReviewCart";
import { useCheckOut } from "./useCheckOut";

const Checkout = () => {
  const { handleChange, handleCheckout, cart, formData, totalPrice } = useCheckOut();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FormInformation
          handleChange={handleChange}
          formData={formData}
        />

        <ReviewCart
          cart={cart}
          totalPrice={totalPrice}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Checkout;