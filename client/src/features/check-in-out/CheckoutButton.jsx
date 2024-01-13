import useCheckout from "./useCheckout";
import Button from "../../ui/Button";

const CheckoutButton = ({ bookingId }) => {
  const { checkout, isChecingout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isChecingout}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
