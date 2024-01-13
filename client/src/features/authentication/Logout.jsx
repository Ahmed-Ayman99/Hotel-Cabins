import { HiArrowRightOnRectangle } from "react-icons/hi2";

import SpinnerMini from "../../ui/SpinnerMini";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";

const Logout = () => {
  const { logout, isLogout } = useLogout();
  const handleLogOut = () => logout();

  return (
    <ButtonIcon disabled={isLogout} onClick={handleLogOut}>
      {isLogout ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
