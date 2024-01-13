import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";
import useUser from "../authentication/useUser";

const useSettings = () => {
  const { token } = useUser();

  const {
    isLoading: settingLoading,
    error: settingError,
    data: settings,
  } = useQuery({
    queryKey: ["settings", token],
    queryFn: () => getSettings(token),
  });

  return { settings, settingLoading, settingError };
};

export default useSettings;
