import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getLogin } from "../../services/apiAuth";

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogIn } = useMutation({
    mutationFn: ({ email, password }) => getLogin({ email, password }),
    onSuccess: () => {
      toast.success("Welcome to Wild Oasis");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLogIn };
};

export default useLogin;
