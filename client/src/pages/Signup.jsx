import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

const Signup = () => {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />;
    </>
  );
};

export default Signup;
