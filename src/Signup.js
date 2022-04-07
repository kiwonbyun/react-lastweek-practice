import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import { getCookie, setCookie, deleteCookie } from "./shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import { emailCheck } from "./shared/emailCheck";

const Signup = () => {
  const dispatch = useDispatch();
  const id = useRef("");
  const pwd = useRef("");
  const user_name = useRef("");
  const pwdconfirm = useRef("");
  const signupBtnClick = () => {
    if (
      id.current.value === "" ||
      pwd.current.value === "" ||
      user_name.current.value === ""
    ) {
      alert("필수항목이 빈칸입니다.");
      return;
    }
    if (!emailCheck(id.current.value)) {
      alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (pwd.current.value !== pwdconfirm.current.value) {
      return;
    }
    dispatch(
      actionCreators.signupFB(
        id.current.value,
        pwd.current.value,
        user_name.current.value
      )
    );
  };

  return (
    <Container>
      <div>
        <h1>회원가입</h1>
      </div>
      <div>
        <label htmlFor="id">아이디</label>
        <input id="id" type="text" ref={id}></input>
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" type="text" ref={user_name}></input>
        <label htmlFor="pwd">패스워드</label>
        <input id="pwd" type="password" ref={pwd}></input>
        <label htmlFor="pwdcomfrim">패스워드확인</label>
        <input id="pwdcomfrim" type="password" ref={pwdconfirm}></input>
        <button onClick={signupBtnClick}>회원가입하기</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  div {
    &:last-child {
      display: flex;
      flex-direction: column;
      width: 60%;
      input {
        height: 30px;
        font-size: 20px;
      }
      button {
        background-color: black;
        color: white;
        height: 30px;
        margin-top: 20px;
      }
    }
  }
`;

export default Signup;
