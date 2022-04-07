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
    <div>
      <Container>
        <Userdiv>
          <img src={post.user_info.user_profile}></img>
          <h3>{post.user_info.user_name}</h3>
          <span>{post.insert_dt}</span>
        </Userdiv>
        <Contentsdiv>
          <span>{post.contents}</span>
          <img src={post.image_url}></img>
        </Contentsdiv>
        <Socialdiv>
          <span>좋아요 10개</span>
          <span>댓글 {post.comment_cnt}개</span>
        </Socialdiv>
      </Container>
      <CommentInput post_id={id} />
      <Comments post_id={id} />
    </div>
  );
};
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin: 20px auto;
`;
const Userdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
  }
`;
const Contentsdiv = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-top: 20px;
    font-size: 20px;
  }
  img {
    width: 60%;
    margin: 20px auto;
  }
`;
const Socialdiv = styled.div`
  display: flex;
  span {
    margin-left: 40px;
  }
`;

export default Detail;
