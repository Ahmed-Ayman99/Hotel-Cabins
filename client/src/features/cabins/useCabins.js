import { useQuery } from "@tanstack/react-query";

import useUser from "../../features/authentication/useUser";
import { getCabins } from "../../services/apiCabins";

const useCabins = () => {
  const { token } = useUser();

  const {
    data: cabins,
    isLoadin,
    error,
  } = useQuery({
    queryKey: ["cabins", token],
    queryFn: () => getCabins(token),
  });

  return { cabins, isLoadin, error };
};

export default useCabins;
