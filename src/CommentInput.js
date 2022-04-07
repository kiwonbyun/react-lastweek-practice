import React, { useRef } from "react";
import styled from "styled-components";
import { actionCreators3 } from "./redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/post";
import { useParams } from "react-router-dom";
const CommentInput = (props) => {
  const dispatch = useDispatch();

  const comment_text_ref = useRef("");
  const post_id = props.post_id;

  const commentBtnClick = () => {
    const comment_text = comment_text_ref.current.value;
    dispatch(actionCreators3.addCommentFB(post_id, comment_text));
    comment_text_ref.current.value = "";
  };

  return (
    <Container>
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        ref={comment_text_ref}
      ></input>
      <button onClick={commentBtnClick}>작성</button>
    </Container>
  );
};
const Container = styled.div`
  width: 80%;
  padding: 20px 0px;
  margin: 20px auto;
  border-top: 2px solid aliceblue;
  border-bottom: 2px solid aliceblue;
  input {
    font-size: 20px;
    height: 30px;
    width: 60%;
  }
`;

export default CommentInput;
