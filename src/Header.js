import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { actionCreators } from "./redux/modules/user";

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const logoutBtnClick = () => {
    dispatch(actionCreators.logOutFB());
  };
  if (is_login) {
    return (
      <Headerbox>
        <div onClick={() => history.push("/")}>홈으로 가기</div>
        <div>
          <button>내정보</button>
          <button
            onClick={() => {
              history.push("/notice");
            }}
          >
            알림
          </button>
          <button onClick={logoutBtnClick}>로그아웃</button>
        </div>
      </Headerbox>
    );
  }
  return (
    <Headerbox>
      <div>홈으로 가기</div>
      <div>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </button>
      </div>
    </Headerbox>
  );
};

const Headerbox = styled.div`
  background-color: aliceblue;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  div {
    &:last-child {
      button {
        background-color: blue;
        color: white;
        border: none;
        padding: 8px 20px;
        margin-left: 5px;
        border-radius: 10px;
        font-size: 16px;
      }
    }
  }
`;

export default Header;
