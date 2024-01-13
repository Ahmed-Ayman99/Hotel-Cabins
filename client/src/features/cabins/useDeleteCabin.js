import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabinApi } from "../../services/apiCabins";
import useUser from "../authentication/useUser";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { mutate: deleteCabin, isLoading: isDeleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id, token),

    onSuccess: () => {
      toast.success("Cabin has deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { deleteCabin, isDeleteCabin };
};

export default useDeleteCabin;
