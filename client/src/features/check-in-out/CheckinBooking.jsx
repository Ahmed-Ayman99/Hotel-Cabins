import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Row from "../../ui/Row";

import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";
import useBooking from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import useCheckin from "./useCheckin";

const Box = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  align-items: center;
`;

const CheckinBooking = () => {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, settingLoading } = useSettings();

  useEffect(() => {
    console.log(booking?.isPaid ?? false);
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading || settingLoading) return <Spinner />;

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakFastPrice * numNights * numGuests;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    const breakfast = {
      hasBreakfast: true,
      extrasPrice: optionalBreakfastPrice,
      totalPrice: totalPrice + optionalBreakfastPrice,
    };

    if (addBreakfast) checkin({ bookingId, breakfast });
    if (!addBreakfast) checkin({ bookingId });
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="breakfast"
          />
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id="confirm"
        />
        I confirm that {booking.guest.fullName} has paid the total amount of{" "}
        {!addBreakfast
          ? formatCurrency(totalPrice)
          : `${formatCurrency(
              totalPrice + optionalBreakfastPrice
            )} (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice
            )})`}
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{booking?.cabin?.name}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
