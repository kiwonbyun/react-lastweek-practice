import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import { getCookie, setCookie, deleteCookie } from "./shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import { emailCheck } from "./shared/emailCheck";

const Login = () => {
  const dispatch = useDispatch();
  const id = useRef("");
  const pwd = useRef("");
  const loginBtnClick = () => {
    if (!emailCheck(id.current.value)) {
      alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    dispatch(actionCreators.loginFB(id.current.value, pwd.current.value));
  };
  return (
    <Container>
      <div>
        <h1>로그인</h1>
      </div>
      <div>
        <label htmlFor="id">아이디</label>
        <input id="id" type="text" ref={id}></input>
        <label htmlFor="pwd">패스워드</label>
        <input id="pwd" type="password" ref={pwd}></input>
        <button onClick={loginBtnClick}>로그인하기</button>
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

export default Login;
