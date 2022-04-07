import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Notice = () => {
  const history = useHistory();
  const is_login = useSelector((state) => state.user.is_login);
  if (!is_login) {
    return (
      <div>
        <h1>로그인이 필요한 서비스입니다.</h1>
        <button
          onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </button>
      </div>
    );
  }
  return (
    <Container>
      <Cardbox>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-975fe.appspot.com/o/images2%2FfgVA7N9jRkgFpXLzHhujyFV53453_1649231630712?alt=media&token=7304bb73-2451-47df-b484-ac69495441a8"></img>
        </div>
        <div>
          <span>someone님이 게시물에 댓글을 남겼습니다!</span>
        </div>
      </Cardbox>
      <Cardbox>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/sparta-react-basic-975fe.appspot.com/o/images2%2FfgVA7N9jRkgFpXLzHhujyFV53453_1649231630712?alt=media&token=7304bb73-2451-47df-b484-ac69495441a8"></img>
        </div>
        <div>
          <span>someone님이 게시물에 댓글을 남겼습니다!</span>
        </div>
      </Cardbox>
    </Container>
  );
};
const Container = styled.div`
  width: 60%;
  border: 1px solid black;
  margin: auto;
  margin-top: 30px;
  background-color: aliceblue;
`;
const Cardbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background-color: white;
  div {
    &:first-child {
      margin-right: 10px;
      img {
        width: 80px;
      }
    }
  }
`;

export default Notice;
