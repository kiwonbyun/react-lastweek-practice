import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { storage } from "../../shared/firebase";
import { actionCreators2 } from "./image";

//action
const SET_POST = "Setpost";
const ADD_POST = "Addpost";
const EDIT_POST = "Editpost";
const EDIT_COMMENT = "Editcomment";
const LOADING = "Loading";
//action creators
const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (id, post) => ({ id, post }));
const editComment = createAction(EDIT_COMMENT, (id, comment) => ({
  id,
  comment,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 2 },
  is_loading: false,
};
const initialPost = {
  id: 0,
  user_info: {
    user_name: "kiwon",
    user_profile:
      "https://lh3.googleusercontent.com/a-/AOh14GiGczsi0j9r9PTTgzIwFUU4ACKOWm0-wofOYplHvg=s288-p-rw-no",
  },
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/sparta-megazine.appspot.com/o/images%2FG8lqlujLSLNe3Gy1XQbxNk83kNA2_1648774297180?alt=media&token=e56ec9eb-1eeb-416c-a599-5baba44019c2",
  contents: "우와 강아지네요",
  comment_cnt: 10,
  insert_dt: "2022-04-02 10:10:00",
};

//middlewares
const getPostFB = (start = null, size = 2) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    const postDB = firestore.collection("post2");
    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = {
            id: doc.id,
            ...doc.data(),
          };
          let post = {
            id: doc.id,
            user_info: {
              user_name: _post.user_name,
              user_profile: _post.user_profile,
              user_id: _post.user_id,
            },
            image_url: _post.image_url,
            contents: _post.contents,
            comment_cnt: _post.comment_cnt,
            insert_dt: _post.insert_dt,
          };
          post_list.push(post);
        });
        post_list.pop();
        dispatch(setPost(post_list, paging));
      });
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post2");
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_profile: _user.user_profile,
      user_id: _user.uid,
    };
    const _post = {
      image_url: "",
      contents: contents,
      comment_cnt: 0,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const _image = getState().image.preview;
    console.log(_image);
    const _upload = storage
      .ref(`images2/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              dispatch(actionCreators2.setPreview(null));
            })
            .catch((error) => console.log(error));
        });
    });
  };
};

const editPostFB = (id, content) => {
  return function (dispatch, getState, { history }) {
    const postTarget = firestore.collection("post2").doc(id);
    return postTarget
      .update({
        contents: content,
      })
      .then(() => {
        dispatch(editPost(id, content));
        history.replace("/");
      })
      .catch((error) => console.log(error));
  };
};
const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post2");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }

        let post = {
          id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          image_url: _post.image_url,
          contents: _post.contents,
          comment_cnt: _post.comment_cnt,
          insert_dt: _post.insert_dt,
        };
        dispatch(setPost([post], { start: null, next: null, size: 3 }));
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);

        // post_id가 같은 중복 항목을 제거합시다! :)
        draft.list = draft.list.reduce((acc, cur) => {
          // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
          // 있으면? 덮어쓰고, 없으면? 넣어주기!
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.list);
        console.log(action.payload);

        for (let i = 0; i < draft.list.length; i++) {
          if (draft.list[i].id === action.payload.id) {
            draft.list[i].contents = action.payload.post;
          }
        }
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
  getOnePostFB,
  editComment,
};

export { actionCreators };
