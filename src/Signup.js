import React from "react";
import styled from "styled-components";
import { auth, storage } from "./shared/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import NullImg from "./shared/img/null_img.jpg";

const Signup = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const img_ref = React.useRef(null);
  const [placeholder, setPlaceholder] = React.useState("첨부파일");

  const navigate = useNavigate();

  React.useCallback(() => {
    changeImgText();
  }, []);

  const changeImgText = async (e) => {
    if (img_ref.current.value !== "") {
      const fileName = img_ref.current.value;
      setPlaceholder(fileName);

      console.log(e.target.files[0]);

      const uploaded_file = await uploadBytes(
        ref(storage, `images/${e.target.files[0].name}`),
        e.target.files[0]
      );

      const file_url = await getDownloadURL(uploaded_file.ref);

      img_ref.current = { url: file_url };
      console.log(img_ref.current);
    } else {
      alert("첨부 실패");
    }
  };

  function newText() {
    id_ref.current.value = "";
    name_ref.current.value = "";
    pw_ref.current.value = "";
    img_ref.current.value = "";
    setPlaceholder("첨부파일");
  }

  function check_email(str) {
    var reg_email =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const signupFB = async () => {
    if (id_ref.current.value === "") {
      return alert("아이디를 입력해주세요.");
    } else if (check_email(id_ref.current.value)) {
      return alert("유효한 이메일을 입력해주세요.");
    } else if (name_ref.current.value === "") {
      return alert("이름을 입력해주세요.");
    } else if (name_ref.current.value.length >8){
      return alert("이름을 8자 이하로 입력해주세요.");
    }else if (
      pw_ref.current.value === "" ||
      pw_ref.current.value.length <= 5
    ) {
      return alert("비밀번호를 6자 이상 입력해주세요.");
    } else {
      await createUserWithEmailAndPassword(
        auth,
        id_ref.current.value,
        pw_ref.current.value
      ).catch((err)=>{
          console.log(err);
          alert("아이디가 중복되거나, 기타 오류입니다.");
      })

      if(!img_ref.current.url){
        await updateProfile(auth.currentUser, {
          displayName: name_ref.current.value,
          photoURL: NullImg,
        })
      }else{
        await updateProfile(auth.currentUser, {
          displayName: name_ref.current.value,
          photoURL: img_ref.current.url,
        })
      }
      alert("가입이 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <Body>
      <h1>
        회원가입<Span>기본정보입력</Span>
      </h1>
      <Line />
      <Form>
        <span>아이디</span>
        <input ref={id_ref} placeholder="이메일 주소" />
      </Form>
      <Form>
        <span>이름</span>
        <input ref={name_ref} />
      </Form>
      <Form>
        <span>비밀번호</span>
        <input type="password" ref={pw_ref} />
      </Form>
      <FormImg>
        <FormText>이미지</FormText>
        <FormFile>
          <ShowUrl placeholder={placeholder} disabled />
          <label htmlFor="input_img">
            <span className="material-symbols-outlined">file_upload</span>
          </label>
          <input
            type="file"
            id="input_img"
            ref={img_ref}
            accept="image/jpeg,.txt"
            onChange={changeImgText}
          />
        </FormFile>
      </FormImg>
      <Line />
      <BtnForm>
        <button onClick={signupFB}>확인</button>
        <button onClick={newText}>새로 입력</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          뒤로 가기
        </button>
      </BtnForm>
    </Body>
  );
};

const Body = styled.div`
  box-shadow: 1px 1px 3px 1px gray;
  margin: 4em auto;
  width:20em;
  border: 1px solid #708090;
  border-radius: 10%;
  padding: 1em 2em 2em 2em;
  background-color: white;

  @media screen and (max-width: 600px){
    width:23em;
    font-size:80%;
  }
`;

const Span = styled.span`
  font-size: 0.5em;
  margin-left: 0.5em;
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 1.5em;

  span {
    margin: 0 3.5em 0 0;
    width: 5em;
    font-size: 0.8em;
  }

  input {
    height: 2em;
    width: 15em;
    border: 1px solid #dddddd;
  }
`;

const FormImg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 1.5em;
`;

const FormText = styled.span`
  margin-right: 3.6em;
  margin-left: 0;
  width: 5em;
  font-size: 0.8em;
`;

const FormFile = styled.div`
  display: flex;
  flex-direction: row;

  label {
    height: 1.87em;
    width: 2.5em;
    text-align: center;
    padding-top: 0.3em;
    color: #fff;
    background-color: #999999;
    cursor: pointer;
    
  @media screen and (max-width: 600px){
    padding-top:0.1em;
    padding-bottom:0.2em;
  }

    :hover {
      background-color: gray;
    }
  }

  input[type="file"] {
    display: none;
  }
`;

const ShowUrl = styled.input`
  height: 2.3em;
  width: 9.6em;
  border: 1px solid #dddddd;
  background-color: white;
  color: #999999;

  @media screen and (max-width: 600px){
    width:13.5em;
    font-size:80%;
  }
`;

const Line = styled.div`
  content: "";
  border-bottom: 1px solid #c0c0c0;
  width: 20em;
  margin: 1em auto;
`;

const BtnForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    border: 1px solid #c0c0c0;
    margin: 0.2em;
    background-color: #708090;
    color: white;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 5%;
    width: 6em;
    cursor: pointer;

    :hover {
      background-color: #696969;
    }
  }
`;

export default Signup;
