import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import useUser from "../authentication/useUser";
import { getRecentStays } from "../../services/apiBookings";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const { token } = useUser();

  const days = !searchParams.get("days") ? 7 : searchParams.get("days");

  const {
    data: stays,
    isLoading: staysLoading,
    error: staysError,
  } = useQuery({
    queryFn: () => getRecentStays(days, token),
    queryKey: ["recent-stays", days],
  });

  return { stays, staysError, staysLoading, days };
};

export default useRecentStays;
