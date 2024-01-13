import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBookingApi } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { mutate: deletingBooking, isLoading: isDeletingBooking } = useMutation(
    {
      mutationFn: (bookingId) => deleteBookingApi(bookingId, token),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  return { deletingBooking, isDeletingBooking };
};

export default useDeleteBooking;
