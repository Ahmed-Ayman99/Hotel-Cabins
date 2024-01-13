import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { checkinBooking } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { token } = useUser();

  const {
    mutate: checkin,
    isLoading: isCheckingIn,
    error: checkinError,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      checkinBooking(
        bookingId,
        {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        },
        token
      ),

    onSuccess: (data) => {
      toast.success(`Booking #${data.guest.fullName}`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { checkin, isCheckingIn, checkinError };
};

export default useCheckin;
