import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useEditeCabin } from "./useEditeCabin";
import useCreateCabin from "./useCreateCabin";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

const CreateCabinForm = ({ cabinToEdit = {}, onClose }) => {
  const { _id: cabinId, ...editeValues } = cabinToEdit;
  const isEditeMood = Boolean(cabinId);

  // Form Hook
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: editeValues,
  });

  const { errors: formErrors } = formState;

  const { isCreateCabin, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditeCabin();

  const onSuccess = (msg) => {
    onClose?.();
    reset();
    toast.success(msg);
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    const image = typeof data.image === "string" ? data.image : data.image[0];

    formData.append("description", data.description);
    formData.append("discount", data.discount);
    formData.append("maxCapacity", data.maxCapacity);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", image);

    if (!isEditeMood)
      createCabin(formData, {
        onSuccess: () => onSuccess("Cabin Sucssefully Created"),
      });

    if (isEditeMood)
      editCabin(
        { data: formData, id: cabinId },
        { onSuccess: () => onSuccess("Cabin Sucssefully Edited") }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onFormSubmit)}
      type={onClose ? "modal" : "redular"}
    >
      <FormRow label="Cabin name" error={formErrors?.name?.message}>
        <Input
          disabled={isCreateCabin || isEditing}
          type="text"
          id="name"
          {...register("name", {
            required: "A cabin must have a name",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={formErrors?.maxCapacity?.message}
      >
        <Input
          disabled={isCreateCabin || isEditing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "A cabin must have a maxCapacity",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={formErrors?.price?.message}>
        <Input
          disabled={isCreateCabin || isEditing}
          type="number"
          id="regularPrice"
          {...register("price", {
            required: "A cabin must have a price",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={formErrors?.discount?.message}>
        <Input
          disabled={isCreateCabin || isEditing}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              +value <= Number(getValues().price) ||
              "discount must be less than price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={formErrors?.description?.message}
      >
        <Textarea
          disabled={isCreateCabin || isEditing}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "A cabin must have a description",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreateCabin || isEditing}
          type="file"
          id="image"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button onClick={() => onClose?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEditeMood ? "Edite cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
