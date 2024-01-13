import { useState } from "react";

import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState();

  return (
    <div>
      <Button onClick={() => setIsOpenModal((prev) => !prev)}>
        Add New Cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
