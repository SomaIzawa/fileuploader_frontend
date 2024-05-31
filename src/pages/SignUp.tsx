import { FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useUserAPI } from "../adapters/user/user";
import { TitleBox } from "../components/Title/TitleBox";
import { PageTitle } from "../components/Title/PageTitle";
import { FormLabel } from "../components/Form/FormLabel";
import { FormInput } from "../components/Form/FormInput";
import { SimpleButton } from "../components/Button/SimpleButton";
import { StyledLink } from "../components/Link/StyledLink";
import { Form } from "../components/Form/Form";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const submitSignUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await useUserAPI.signup({
      email: email,
      password: password,
      password_confirm: passwordConfirm,
    });
    if(res.status == 201){
      navigate("/login")
    }
  }

  return (
    <div className='py-5 px-10 h-screen flex-grow bg-slate-200'>
      <TitleBox>
        <PageTitle title="SignUp" />
      </TitleBox>
      <Form onSubmit={submitSignUpHandler}>
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
        <FormLabel labelId="password_confirm" label="password_confirm" />
        <FormInput
          id="password_confirm"
          placeholder="password_confirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          type="password"
        />
        <br />
        <div>
            <SimpleButton type="submit" label="Login" />
        </div>
        <br />
        <StyledLink to="/login" label="Existing members, please log in here" />  
      </Form>
    </div>
  )
}
