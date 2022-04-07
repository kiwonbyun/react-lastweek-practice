import React from "react";
import styled from "styled-components";
import { actionCreators3 } from "./redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const Comments = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const post_id = props.post_id;

  React.useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(actionCreators3.getCommentFB(post_id));
    }
  }, []);
  if (!comment_list[post_id] || !post_id) {
    return null;
  }
  return (
    <Container>
      {comment_list[post_id].map((c) => {
        return (
          <Comment key={c.id}>
            <div>
              <img src="https://lh3.googleusercontent.com/a-/AOh14GiGczsi0j9r9PTTgzIwFUU4ACKOWm0-wofOYplHvg=s288-p-rw-no"></img>
              <span>{c.user_name}</span>
              <p>{c.contents}</p>
              <span>{c.insert_dt}</span>
            </div>
            <div>
              <button>삭제</button>
            </div>
          </Comment>
        );
      })}
    </Container>
  );
};
const Container = styled.div`
  padding: 20px 0px;
`;
const Comment = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: space-between;
  img {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    margin-right: 5px;
  }
  div {
    &:first-child {
      display: flex;
      align-items: center;
      p {
        margin-right: 50px;
      }
    }
  }
  span {
    margin-right: 30px;
  }
`;

export default Comments;
