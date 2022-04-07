import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/post";

const Detail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(actionCreators.getOnePostFB(id));
  }, []);
  if (!post) {
    return null;
  }
  return (
    <Container>
      <div>
        <img src={post.user_info.user_profile}></img>
        <h3>{post.user_info.user_name}</h3>
        <span>{post.insert_dt}</span>
      </div>
      <div>
        <span>{post.contents}</span>
        <img src={post.image_url}></img>
      </div>
      <div>
        <span>좋아요 10개</span>
        <span>댓글 {post.comment_cnt}개</span>
      </div>
      <CommentInput post_id={id} />
      <Comments post_id={id} />
    </Container>
  );
};

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 90%;
  margin: 20px auto;
  div {
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid aliceblue;
      img {
        width: 50px;
        border-radius: 9999px;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      margin: 20px auto;
      img {
        margin: auto;
        height: 350px;
      }
    }
  }
`;

export default Detail;
