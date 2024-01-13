import { useState } from "react";

import FormRowVertical from "../../ui/FormRowVertical";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import useLogin from "./useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("ahmed@gmail.com");
  const [password, setPassword] = useState("pass1234");

  const { login, isLogIn } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button disabled={isLogIn} size="large">
          Login
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
