import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { actionCreators } from "./redux/modules/post";

const Edit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const content = useRef("");
  const edit_postId = params.id;
  const post_list = useSelector((state) => state.post.list);
  const post = post_list.filter((v) => {
    return v.id === edit_postId;
  });
  console.log(post);
  React.useEffect(() => {
    dispatch(actionCreators.getPostFB());
  }, []);

  const editBtnClick = () => {
    dispatch(actionCreators.editPostFB(edit_postId, content.current.value));
  };

  if (post.length === 0) {
    return null;
  }
  return (
    <Container>
      <div>
        <h1>게시글 수정</h1>
      </div>
      <div>
        <h2>게시글 사진</h2>
        <img src={post[0].image_url}></img>
      </div>
      <div>
        <span>게시글내용</span>
        <textarea
          placeholder="게시글 작성"
          defaultValue={post[0].contents}
          ref={content}
        ></textarea>
        <button onClick={editBtnClick}>수정하기</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  div {
    &:last-child {
      display: flex;
      flex-direction: column;
      textarea {
        height: 100px;
        font-size: 20px;
        width: 80%;
        margin: 15px auto;
      }
      button {
        width: 80%;
        height: 30px;
        margin: auto;
      }
    }
    &:nth-child(2) {
      img {
        height: 300px;
      }
    }
  }
`;

export default Edit;
