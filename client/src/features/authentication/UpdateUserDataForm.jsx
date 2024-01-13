import { useForm } from "react-hook-form";

import useUpdateUserData from "./useUpdateUserData";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import useUser from "./useUser";

const UpdateUserDataForm = () => {
  const { user } = useUser();

  const { email, name, photo } = user;
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: { email, photo, name },
  });
  const { errors } = formState;

  const { updateUser, isUpdateUser } = useUpdateUserData();

  const onSubmit = (data) => {
    const formData = new FormData();
    const photo = typeof data.photo === "string" ? data.photo : data.photo[0];

    formData.append("photo", photo);
    formData.append("name", data.name);
    formData.append("email", data.email);

    updateUser(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          value={email}
          disabled
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Full name" error={errors?.email?.message}>
        <Input
          disabled={isUpdateUser}
          type="text"
          id="fullName"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdateUser}
          id="avatar"
          type="file"
          accept="image/*"
          {...register("photo")}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isUpdateUser}
          onClick={reset}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdateUser}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
