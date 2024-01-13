import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useState } from "react";

import useCheckout from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";
import ConfirmAction from "../../ui/ConfirmAction";
import useDeleteBooking from "./useDeleteBooking";
import ButtonGroup from "../../ui/ButtonGroup";
import BookingDataBox from "./BookingDataBox";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

const BookingDetail = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { checkout, isChecingout } = useCheckout();
  const { isLoading, booking } = useBooking();
  const { deletingBooking, isDeletingBooking } = useDeleteBooking();
  const [isOpeenModal, setIsOpeenModal] = useState(false);

  const handleDeleteBooking = () => {
    deletingBooking(booking._id, {
      onSuccess: () => {
        toast.success("Booking has been deleted");
        navigate("/bookings");
      },
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #X</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${booking._id}`)}
          >
            Check in
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button
            disabled={isChecingout}
            variation="primary"
            onClick={() =>
              checkout(booking._id, {
                onSuccess: () => {
                  toast.success("Booking checked out");
                  navigate("/bookings?status=checked-out");
                },
              })
            }
          >
            Check out
          </Button>
        )}

        {isOpeenModal && (
          <Modal onClose={() => setIsOpeenModal(false)}>
            <ConfirmAction
              resourceName={`${booking.cabin.name} Cabin`}
              onConfirm={handleDeleteBooking}
              isDisabled={isDeletingBooking}
              type="Delete"
              onClose={() => setIsOpeenModal(false)}
            />
          </Modal>
        )}

        <Button
          disabled={isChecingout}
          variation="danger"
          onClick={() => setIsOpeenModal(true)}
        >
          Delete Booking
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
