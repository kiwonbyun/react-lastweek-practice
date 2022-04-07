import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "./redux/modules/post";
import { actionCreators2 } from "./redux/modules/image";

const Upload = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const content = useRef("");
  const fileInput = useRef("");
  const is_login = useSelector((state) => state.user.is_login);
  const is_uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);

  const contentBtnClick = () => {
    dispatch(actionCreators.addPostFB(content.current.value));
  };

  const inputChange = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(actionCreators2.setPreview(reader.result));
    };
  };

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
      <div>
        <h1>게시글 작성</h1>
      </div>
      <div>
        <input
          type="file"
          ref={fileInput}
          onChange={inputChange}
          disabled={is_uploading}
        ></input>
      </div>
      <div>
        <h2>미리보기</h2>
        <img
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"
          }
        ></img>
      </div>
      <div>
        <span>게시글내용</span>
        <textarea placeholder="게시글 작성" ref={content}></textarea>
        <button onClick={contentBtnClick}>게시글 올리기</button>
      </div>
    </Container>
  );
};
const Container = styled.div`
  border: 1px solid black;
  width: 90%;
  margin: auto;
  div {
    &:last-child {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: auto;
      textarea {
        margin: 20px 0px;
        font-size: 18px;
      }
      button {
        height: 30px;
        background-color: blue;
        color: white;
        border: none;
      }
    }
    &:nth-child(3) {
      img {
        width: 80%;
      }
    }
  }
`;

export default Upload;
