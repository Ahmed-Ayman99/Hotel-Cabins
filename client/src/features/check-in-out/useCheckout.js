import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkinBooking } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { mutate: checkout, isLoading: isChecingout } = useMutation({
    mutationFn: (bookingId) =>
      checkinBooking(
        bookingId,
        {
          status: "checked-out",
        },
        token
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking checked out");
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { checkout, isChecingout };
};

export default useCheckout;
