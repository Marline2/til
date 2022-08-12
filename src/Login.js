import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { auth } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const navigate = useNavigate();

  const loginFB = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    ).then((user)=>{
      console.log(user);
      alert("환영합니다! "+ user.user.displayName+"님");
      navigate("/Home");
    }).catch((err)=>{
      const errorCode = err.code;
      console.log(errorCode);
      if(errorCode === "auth/user-not-found"){
        alert("존재하지 않는 회원입니다.");
      }else if(errorCode === "auth/wrong-password"){
        alert("잘못된 비밀번호입니다.");
        pw_ref.current.value="";
      }else if(errorCode === "auth/invalid-email"){
        alert("유효하지 않는 아이디입니다.");
      }else{ alert("비밀번호를 입력해주세요.");};
    })
  };

  return (
    <Body>
      <h1>Til</h1>
      <LoginForm>
        <Input ref={id_ref} placeholder="아이디(이메일)"/> <br />
        <Input ref={pw_ref} type="password" placeholder="비밀번호"/> <br />
        <LoginBtn onClick={loginFB}>로그인</LoginBtn><br />
        <SignupBtn
          onClick={() => {
            navigate("/sign_up");
          }}
        >
          회원가입
        </SignupBtn>
      </LoginForm>
    </Body>
  );
};

const Body = styled.div`
  margin: auto;
  text-align: center;
  border: 1px solid #708090;
  border-radius: 10%;
  padding: 1em 2em 2em 2em;
`;

const LoginForm = styled.div`
  width: 300px;
  margin: auto;
`;

const Input = styled.input`
  height:2em;
  width: 15em;
  margin-bottom: 0.5em;
`

const LoginBtn = styled.button `
  border: 1px solid #FFF5EE;
  background-color: #708090;
  color: white;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.5em;
  width:15em;
  height: 2.8em;
  cursor: pointer;
  :hover{
    background-color: #696969;
  }
`

const SignupBtn = styled.button `
  border: none;
  background-color: white;
  font-weight: bold;
  border-radius: 20%;
  margin-bottom: 0.5em;
  cursor: pointer;
  color: gray;
  :hover{
    color: #708090;
  }
`



export default Login;
