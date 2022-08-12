import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTils.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const work_ref = React.useRef(null);
  const description_ref = React.useRef(null);
  const study_time_ref = React.useRef(null);

  const navigate = useNavigate();

  const addTilForm = () => {
    const til_data = {
      work: work_ref.current.value,
      study_time: study_time_ref.current.value,
      description: description_ref.current.value,
    };

    const empty_input = Object.values(til_data).findIndex((v) => v === "");

    try {
      if (empty_input !== -1) {
        throw new Error("Empty input");
      } else {
        noEmpty(til_data);
      }
    } catch (err) {
      console.log(err);
      if (empty_input === 0) {
        alert("과목명을 적어주세요!");
      } else if (empty_input === 1) {
        alert("총 시간을 적어주세요!");
      } else {
        alert("내용을 적어주세요!");
      }
    }
  };

  const noEmpty = async (til_data) => {
    console.log(til_data);
    const postList = await axios.post(
      "http://localhost:5001/til_list",
      til_data
    );
    console.log(postList);

    alert("추가 완료");

    work_ref.current.value = "";
    description_ref.current.value = "";
    study_time_ref.current.value = "";

    navigate(-1);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <AddTilForm>
            <Title>🍒 당신의 TIL을 간략히 작성해요</Title>
            <Form>
              <InputBox ref={work_ref} placeholder="과목" />
              <InputBox ref={study_time_ref} placeholder="총 시간" />
              <InputBoxBig ref={description_ref} placeholder="내용" />
            </Form>
            <BtnZone>
            <Btn onClick={addTilForm}>추가하기 🍓</Btn>
            <Btn className="close" onClick={close}>뒤로가기 🍓
            </Btn>
            </BtnZone>
          </AddTilForm>
        </section>
      ) : null}
    </div>
  );
};

const AddTilForm = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
  border: 1px dashed #feebe1;
  padding: 1em;
  margin: auto;
`;

const Title = styled.h3`
  text-align: center;
  height: 2em;
  font-size: 1em;
`;

const Form = styled.div`
  height: 8em;
  width: 14em;
`;

const InputBox = styled.input`
  border-radius: 20px;
  border: 1px solid gray;
  padding: 1em;
  width: 19em;
  height: 1em;
  margin-bottom: 2px;
`;

const InputBoxBig = styled.textarea`
  border-radius: 20px;
  border: 1px solid gray;
  width: 19em;
  height: 4em;
  padding: 1em;

`;

const BtnZone = styled.div`
display: flex;
flex-direction: row;
`

const Btn = styled.button`
  background-color: #fbe0c5;
  height: 2em;
  width: 7.5em;
  margin: auto 0.5em;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`;

export default Modal;
