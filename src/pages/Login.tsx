import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserAPI } from "../adapters/user/user";
import { Form } from "../components/Form/Form";
import { TitleBox } from "../components/Title/TitleBox";
import { PageTitle } from "../components/Title/PageTitle";
import { FormLabel } from "../components/Form/FormLabel";
import { FormInput } from "../components/Form/FormInput";
import { SimpleButton } from "../components/Button/SimpleButton";
import { StyledLink } from "../components/Link/StyledLink";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { ReloadAuth } = useContext(AuthContext)
  const navigate = useNavigate();

  const submitLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await useUserAPI.login({
      email: email,
      password: password
    })
    ReloadAuth();
    navigate("/posts")
  }

  const { userId } = useContext(AuthContext)
  console.log(userId)

  return (
    <div className='py-5 px-10 h-screen flex-grow bg-slate-200'>
      <TitleBox>
        <PageTitle title="Login" />
      </TitleBox>
      <Form onSubmit={submitLoginHandler}>
        <FormLabel labelId="email" label="email" />
        <FormInput
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <FormLabel labelId="password" label="password" />
        <FormInput
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <br />
        <div>
            <SimpleButton type="submit" label="Login" />
        </div>
        <br />
        <StyledLink to="/signup" label="SignUp Here" />  
      </Form>
    </div>
    
  )
}
