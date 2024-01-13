import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import useUser from "../authentication/useUser";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { token } = useUser();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = `${direction === "desc" ? "-" : ""}${field}`;

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page, token],
    queryFn: () => getBookings(filter, sortBy, page, token),
  });

  // PRE FETCHING
  const pageCount = Math.ceil(data?.count / 10);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1, token],
      queryFn: () => getBookings(filter, sortBy, page + 1, token),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1, token],
      queryFn: () => getBookings(filter, sortBy, page - 1, token),
    });
  }

  return { error, isLoading, bookings: data?.data, count: data?.count };
};

export default useBookings;
