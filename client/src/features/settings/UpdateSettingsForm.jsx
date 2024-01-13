import useEditeSettings from "./useEditeSettings";
import FormRow from "../../ui/FormRow";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

const EditeSettingsForm = () => {
  const { editeSettings, isEditeSetting } = useEditeSettings();
  const { settings = {}, settingLoading } = useSettings();

  if (settingLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakFastPrice,
    _id: settingId,
  } = settings;

  const handelEdite = (val, field) => {
    if (val.toString() === settings[field].toString()) return;

    editeSettings({ data: { [field]: val }, settingId });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditeSetting}
          onBlur={(e) => {
            handelEdite(e.target.value, "minBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditeSetting}
          onBlur={(e) => {
            handelEdite(e.target.value, "maxBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditeSetting}
          onBlur={(e) => {
            handelEdite(e.target.value, "maxGuestsPerBooking");
          }}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={isEditeSetting}
          onBlur={(e) => {
            handelEdite(e.target.value, "breakFastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
};

export default EditeSettingsForm;
