import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getActivities } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useActivities = () => {
  const [searchParams] = useSearchParams();
  const { token } = useUser();

  const days = !searchParams.get("days") ? 7 : searchParams.get("days");

  const {
    isLoading: activitiesLoading,
    data: activities,
    error: activitiesError,
  } = useQuery({
    queryKey: ["activities", days],
    queryFn: () => getActivities(days, token),
  });

  return { activitiesError, activitiesLoading, activities };
};

export default useActivities;
