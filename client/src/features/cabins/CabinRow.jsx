import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useState } from "react";

import useOusideClick from "../../hooks/useOusideClick";
import ConfirmAction from "../../ui/ConfirmAction";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";

import { formatCurrency } from "../../utils/helpers";
import { BE_URL_Img } from "../../utils/constants";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-gray-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

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

function CabinRow({ cabin }) {
  const { _id: cabinId, ...restCabin } = cabin;
  const { name, maxCapacity, price, discount, image } = restCabin;

  const { deleteCabin, isDeleteCabin } = useDeleteCabin();
  const { isCreateCabin, createCabin } = useCreateCabin();

  const handleDeleteCabin = () => deleteCabin(cabinId);

  const handleDuplicateCabin = () => {
    const newCabin = {
      ...restCabin,
      name: `Copy of ${cabin.name}`,
    };

    createCabin(newCabin, {
      onSuccess: () => {
        toast.success("Cabin Successfully Duplicated");
        setShowDuplicateCabin(false);
      },
    });
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showActionList, setShowActionList] = useState(false);
  const [showDeleteCabin, setShowDeleteCabin] = useState(false);
  const [showDuplicateCabin, setShowDuplicateCabin] = useState(false);

  const ref = useOusideClick(() => setShowActionList(false));

  const handleIsOpenModal = () => {
    setIsOpenModal((prev) => !prev);
    setShowActionList(false);
  };

  const handleIsDuplicateModal = () => {
    setShowDuplicateCabin((prev) => !prev);
    setShowActionList(false);
  };

  const handleIsDeleteModal = () => {
    setShowDeleteCabin((prev) => !prev);
    setShowActionList(false);
  };

  return (
    <>
      <TableRow role="row">
        <Img src={`${BE_URL_Img}/cabins/${image}`} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

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
                onClick={handleIsDuplicateModal}
                disabled={isDeleteCabin || isCreateCabin}
              >
                <HiSquare2Stack /> Duplicate
              </StyledButton>

              <StyledButton
                onClick={handleIsOpenModal}
                disabled={isDeleteCabin || isCreateCabin}
              >
                <HiPencil /> Edite
              </StyledButton>

              <StyledButton
                disabled={isDeleteCabin || isCreateCabin}
                onClick={handleIsDeleteModal}
              >
                <HiTrash /> Delete
              </StyledButton>
            </StyledList>
          )}
        </Menues>
      </TableRow>

      {showDuplicateCabin && (
        <Modal onClose={() => setShowDuplicateCabin(false)}>
          <ConfirmAction
            resourceName={`${name} Cabin`}
            onConfirm={handleDuplicateCabin}
            isDisabled={isCreateCabin}
            type="Duplicate"
            onClose={() => setShowDuplicateCabin(false)}
          />
        </Modal>
      )}

      {showDeleteCabin && (
        <Modal onClose={() => setShowDeleteCabin(false)}>
          <ConfirmAction
            resourceName={`${name} Cabin`}
            onConfirm={handleDeleteCabin}
            isDisabled={isDeleteCabin}
            type="Delete"
            onClose={() => setShowDeleteCabin(false)}
          />
        </Modal>
      )}

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            cabinToEdit={cabin}
            onClose={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
