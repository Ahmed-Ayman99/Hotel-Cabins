import styled from "styled-components";

import useUser from "./useUser";
import { BE_URL_Img } from "../../utils/constants";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-gray-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-gray-100);
`;

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <StyledUserAvatar>
      <Avatar
        src={`${BE_URL_Img}/users/${user.photo}`}
        alt={`Avatar of ${user.name}`}
      />
      <span>{user.name}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
