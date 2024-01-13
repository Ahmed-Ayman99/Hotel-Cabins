import { HiEllipsisVertical, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import styled from "styled-components";
import { useState } from "react";

import Tag from "../../ui/Tag";

import { formatDistanceFromNow } from "../../utils/helpers";
import useOusideClick from "../../hooks/useOusideClick";
import useCheckout from "../check-in-out/useCheckout";
import { formatCurrency } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-gray-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-gray-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const StyledTable = styled.div`
  border: 1px solid var(--color-gray-200);

  font-size: 1.4rem;
  background-color: var(--color-gray-0);
  border-radius: 7px;
`;

const StyledRow = styled.div`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledList = styled.div`
  position: absolute;
  top: 50%;
  right: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-50);
  box-shadow: var(--shadow-md);
  z-index: 9999999;
  padding: 1.2rem;
  width: 130%;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border: none;
  outline: none;
  padding: 1.4rem;
  background-color: var(--color-gray-50);

  &:hover {
    background-color: var(--color-gray-200);
  }

  & svg {
    width: 2.4rem;
    width: 2.4rem;
  }
`;

// Menu
const Menues = styled.div`
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-700);
  }
`;

const BookingRow = ({ booking }) => {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const [showActionList, setShowActionList] = useState(false);
  const ref = useOusideClick(() => setShowActionList(false));

  const navigate = useNavigate();
  const { checkout, isChecingout } = useCheckout();

  if (!booking._id) return;

  const handleChecOut = () =>
    checkout(booking._id, {
      onSuccess: () => {
        setShowActionList(false);
        navigate("/bookings?status=checked-out");
      },
    });

  const {
    _id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guest,
    cabin,
  } = booking;

  return (
    <StyledTable>
      <StyledRow>
        <CommonRow>
          <Cabin>{cabin.name}</Cabin>

          <Stacked>
            <span>{guest.fullName}</span>
            <span>{guest.email}</span>
          </Stacked>

          <Stacked>
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
              {format(new Date(endDate), "MMM dd yyyy")}
            </span>
          </Stacked>

          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

          <Amount>{formatCurrency(totalPrice)}</Amount>

          <Menues ref={ref}>
            <StyledToggle
              onClick={() => setShowActionList((prev) => !prev)}
              variation="secondary"
              size="small"
            >
              <HiEllipsisVertical />
            </StyledToggle>

            {showActionList && (
              <StyledList>
                <StyledButton
                  disabled={isChecingout}
                  onClick={() => navigate(`${bookingId}`)}
                >
                  <HiEye /> See Details
                </StyledButton>

                {status === "unconfirmed" && (
                  <StyledButton
                    disabled={isChecingout}
                    onClick={() => navigate(`/checkin/${bookingId}`)}
                  >
                    <HiEye /> Check in
                  </StyledButton>
                )}

                {status === "checked-in" && (
                  <StyledButton disabled={isChecingout} onClick={handleChecOut}>
                    <HiEye /> Check out
                  </StyledButton>
                )}
              </StyledList>
            )}
          </Menues>
        </CommonRow>
      </StyledRow>
    </StyledTable>
  );
};

export default BookingRow;
