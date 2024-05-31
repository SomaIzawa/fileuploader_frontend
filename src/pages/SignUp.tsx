import { FormEvent, useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserAPI } from "../adapters/user/user";

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
    <div>
      <div>SignUp</div>
      <form onSubmit={submitSignUpHandler}>
        <dl>
          <dt>
            email
          </dt>
          <dd>
            <input 
            type="email" 
            name="email" 
            autoFocus 
            placeholder="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email} />
          </dd>
        </dl>
        <dl>
          <dt>
            password
          </dt>
          <dd>
            <input 
            type="password" 
            name="password" 
            autoFocus 
            placeholder="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password} />
          </dd>
        </dl>
        <dl>
          <dt>
            password_confirm
          </dt>
          <dd>
            <input 
            type="password" 
            name="password_confirm" 
            autoFocus 
            placeholder="password confirm" 
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm} />
          </dd>
        </dl>
        <div>
          <button type="submit">
            会員登録
          </button>
        </div>
      </form>
      <Link to={"/login"}>go login</Link>
    </div>
  )
}
