import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useBooking = () => {
  const { token } = useUser();
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId, token],
    queryFn: () => getBooking(bookingId, token),
  });

  return { error, isLoading, booking };
};

export default useBooking;
