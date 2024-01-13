import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-gray-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({ resourceName, onConfirm, onClose, isDisabled, type }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {type} {resourceName}
      </Heading>
      <p>
        Are you sure you want to {type} this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button onClick={onClose} variation="secondary" disabled={isDisabled}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variation={type === "Delete" ? "danger" : "primary"}
          disabled={isDisabled}
        >
          {type}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmAction;
