import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getSignUp } from "../../services/apiAuth";

const useSignup = () => {
  const navigat = useNavigate();

  const { mutate: signup, isLoading: isSignup } = useMutation({
    mutationFn: (data) => getSignUp(data),
    onSuccess: () => {
      toast.success("You are Sign up");
      navigat("/");
    },
  });

  return { isSignup, signup };
};

export default useSignup;
