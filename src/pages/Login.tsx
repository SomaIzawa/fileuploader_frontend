import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserAPI } from "../adapters/user/user";

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
    <div>
      <div>Login</div>
      <form onSubmit={submitLoginHandler}>
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
        <div>
          <button type="submit">
            ログイン
          </button>
        </div>
      </form>
      <Link to={"/signup"}>go SignUp</Link>
    </div>
    
  )
}
