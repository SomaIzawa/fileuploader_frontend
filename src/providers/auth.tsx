import { createContext, ReactNode, useState } from "react";


interface IAuthContext {
  userId: number;
  setUserId: (id: number) => void;
  userName: string;
  setUserName: (name: string) => void;
  ReloadAuth: () => void;
}

const AuthContext = createContext<IAuthContext>({
  userId: -1,
  setUserId: () => {},
  userName: "",
  setUserName: () => {},
  ReloadAuth: () => {},
})

type Props = {
  children: ReactNode
}

type Token = {
  exp: number,
  user_id: number,
  user_name: string,
}

const base64UrlDecode = (str :string) => {
  // Base64URL -> Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // パディングを追加
  switch (base64.length % 4) {
      case 2: base64 += '=='; break;
      case 3: base64 += '='; break;
  }

  // Base64デコード
  let decoded = atob(base64);

  // デコードした文字列をUTF-8に変換
  let utf8Decoded;
  try {
    utf8Decoded = decodeURIComponent(escape(decoded));
  } catch (e) {
    utf8Decoded = decoded;
  }

  // JSONパースしてToken型に変換
  const token: Token = JSON.parse(utf8Decoded);

  return token;
}

const GetJWTTokenByCookie = (): Token | null => {
  const cookies = document.cookie.split(';');
  let token :string = ""
  for(let cookie of cookies) {
    cookie = cookie.trim();
    if(cookie.startsWith("token=")){
      token = cookie.substring("token=".length + 1)
    }
  }
  if(token == ""){
    return null
  }
  const parts = token.split('.');
  if(parts.length !== 3){
    return null
  }
  const payload = parts[1]
  return base64UrlDecode(payload)
}

const AuthProvider = (props: Props) => {
  const token = GetJWTTokenByCookie()

  let user_id: number = -1;
  let user_name: string = "";
  if(token != null){
    user_id = token.user_id
    user_name = token.user_name
  }

  const [userId, setUserId] = useState<number>(user_id)
  const [userName, setUserName] = useState<string>(user_name)

  const ReloadAuth = () => {
    const token = GetJWTTokenByCookie()
    if(token != null){
      setUserId(token.user_id)
      setUserName(token.user_name)
    }
  }
  return (
    <AuthContext.Provider value={{
      userId: userId,
      userName: userName,
      setUserId: setUserId,
      setUserName: setUserName,
      ReloadAuth: ReloadAuth,
    }}>
      { props.children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }