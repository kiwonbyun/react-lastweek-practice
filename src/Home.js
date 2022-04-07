import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { actionCreators } from "./redux/modules/post";
import Scroll from "./Scroll";

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(actionCreators.getPostFB());
    }
  }, []);
  console.log(post_list);
  if (is_login) {
    return (
      <div>
        <Scroll
          callNext={() => {
            dispatch(actionCreators.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            return (
              <PostCard key={p.id}>
                <div>
                  <img src={p.user_info.user_profile}></img>
                  <h3>{p.user_info.user_name}</h3>
                  <span>{p.insert_dt}</span>
                  {p.user_info.user_id === user_info.uid ? (
                    <button
                      onClick={() => {
                        history.push(`/edit/${p.id}`);
                      }}
                    >
                      수정
                    </button>
                  ) : null}
                </div>
                <div>
                  <span>{p.contents}</span>
                  <img
                    onClick={() => {
                      history.push(`/detail/${p.id}`);
                    }}
                    src={p.image_url}
                  ></img>
                </div>
                <div>
                  <span>좋아요 10개</span>
                  <span>댓글{p.comment_cnt}개</span>
                </div>
              </PostCard>
            );
          })}
        </Scroll>
        <WriteBtn
          onClick={() => {
            history.push("/upload");
          }}
        >
          글쓰기
        </WriteBtn>
      </div>
    );
  }
  return (
    <div>
      <Scroll
        callNext={() => {
          console.log("next");
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          return (
            <PostCard key={p.id}>
              <div>
                <img src={p.user_info.user_profile}></img>
                <h3>{p.user_info.user_name}</h3>
                <span>{p.insert_dt}</span>
              </div>
              <div>
                <span>{p.contents}</span>
                <img
                  onClick={() => {
                    history.push(`/detail/${p.id}`);
                  }}
                  src={p.image_url}
                ></img>
              </div>
              <div>
                <span>좋아요 10개</span>
                <span>댓글 {p.comment_cnt}개</span>
              </div>
            </PostCard>
          );
        })}
      </Scroll>
    </div>
  );
};

const WriteBtn = styled.button`
  background-color: blue;
  color: white;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 9999px;
  position: fixed;
  right: 50px;
  bottom: 50px;
`;

const PostCard = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 80%;
  margin: 20px auto;
  color: black;

  div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px;
      font-size: 18px;
      border-bottom: 2px solid aliceblue;

      img {
        width: 50px;
        height: 50px;
        border-radius: 999px;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      font-size: 20px;
      border-bottom: 2px solid aliceblue;
      padding: 10px 0px;
      span {
        margin: 10px;
        padding: 0px 10px;
        font-size: 30px;
      }
      img {
        margin: auto;
        height: 250px;
        cursor: pointer;
      }
    }
    &:last-child {
      margin: 10px;
      padding: 10px 0px;
      span {
        margin-right: 30px;
        padding: 0px 10px;
        font-size: 20px;
      }
    }
  }
`;
export default Home;
