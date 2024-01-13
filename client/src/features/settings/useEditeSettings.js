import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { editeSettingsApi } from "../../services/apiSettings";
import useUser from "../authentication/useUser";

const useEditeSettings = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { mutate: editeSettings, isLoading: editingLoading } = useMutation({
    mutationFn: ({ data, settingId }) =>
      editeSettingsApi(data, settingId, token),
    onSuccess: () => {
      toast.success("New Field successfully Updating");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editeSettings, editingLoading };
};

export default useEditeSettings;
