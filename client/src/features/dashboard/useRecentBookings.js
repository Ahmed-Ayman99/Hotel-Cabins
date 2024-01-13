import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import useUser from "../authentication/useUser";
import { getRecentBookings } from "../../services/apiBookings";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const { token } = useUser();

  const days = !searchParams.get("days") ? 7 : searchParams.get("days");

  const {
    data: bookings,
    isLoading: recentLoading,
    error: recentError,
  } = useQuery({
    queryFn: () => getRecentBookings(days, token),
    queryKey: ["recent-bookings", days],
  });

  return { bookings, recentError, recentLoading, days };
};

export default useRecentBookings;
