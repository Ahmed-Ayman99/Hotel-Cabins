import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import useSignup from "./useSignup";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

const SignupForm = () => {
  const { register, formState, getValues, reset, handleSubmit } = useForm();
  const { isSignup, signup } = useSignup();
  const { errors } = formState;

  const onSubmit = (data) => {
    signup(data, {
      onSuccess: () => {
        reset();
        toast.success("You are signup");
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSignup}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSignup}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSignup}
          type="password"
          id="password"
          {...register("password", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSignup}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
