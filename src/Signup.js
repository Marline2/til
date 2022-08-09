import React from "react";
import styled from "styled-components";
// import { auth, db, storage } from "./shared/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const img_ref = React.useRef(null);
  const [placeholder, setPlaceholder] = React.useState("첨부파일");

  function changeImgText() {
    if (img_ref.current.value !== "") {
      const fileName = img_ref.current.value;
      setPlaceholder(fileName);
    } else {
      alert("첨부 실패");
    }
  }

  function newText(){
    id_ref.current.value="";
    name_ref.current.value="";
    pw_ref.current.value="";
    img_ref.current.value="";
    setPlaceholder("첨부파일");
  }

  // const signupFB = async () => {
  //   if (id_ref.current.value === "") {
  //     return alert("아이디를 입력해주세요.");
  //   } else if (name_ref.current.value === "") {
  //     return alert("이름을 입력해주세요.");
  //   } else if (
  //     pw_ref.current.value === "" ||
  //     pw_ref.current.value.length <= 5
  //   ) {
  //     return alert("비밀번호 6자 이상 입력해주세요.");
  //   } else {
  //     console.log(file_link_ref);

  //     const user_doc = await addDoc(collection(db, "users"), {
  //       user_id: id_ref.current.value,
  //       name: name_ref.current?.value,
  //       image_url: file_link_ref.current?.url,
  //     });

  //     console.log(user_doc.id);

  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       id_ref.current.value,
  //       pw_ref.current.value
  //     );
  //     console.log(user);
  //   }
  // };

  // const uploadFB = async (e) => {
  //   console.log(e.target.files[0]);

  //   const uploaded_file = await uploadBytes(
  //     ref(storage, `images/${e.target.files[0].name}`),
  //     e.target.files[0]
  //   );

  //   const file_url = await getDownloadURL(uploaded_file.ref);

  //   file_link_ref.current = { url: file_url };
  // };

  return (
    <Body>
      <h1>
        회원가입<Span>기본정보입력</Span>
      </h1>
      <Line/>
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
        <input type="password" ref={pw_ref}/>
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
        <button>확인</button>
        <button onClick={newText}>새로 입력</button>
      </BtnForm>
    </Body>
  );
};

const Body = styled.div`
  margin: auto;
  border: 1px solid #708090;
  border-radius: 10%;
  padding: 1em 2em 2em 2em;
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
  }

  input[type="file"] {
    display: none;
  }
`;

const ShowUrl = styled.input`
  height: 2.3em;
  width: 12em;
  border: 1px solid #dddddd;
  background-color: white;
  color: #999999;
`;

const Line = styled.div`
  content: "";
  border-bottom: 1px solid #C0C0C0;
  width: 23em;
  margin: 1em auto;
`;

const BtnForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button{
    border:1px solid #C0C0C0;
    margin:0.2em;
    background-color: #708090;
    color:white;
    font-size:1em;
    padding:0.5em;
    border-radius: 5%;
    width: 6em;
    cursor: pointer;

    :hover{
      background-color: #696969;
    }
  }
`;

export default Signup;
