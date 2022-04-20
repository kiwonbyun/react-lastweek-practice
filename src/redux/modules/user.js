import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";

//action
const SETUSER = "Setuser";
const LOGOUT = "Logout";
//init
const init = {
  user: null,
  is_login: false,
};

//action creators
const setUser = createAction(SETUSER, (user) => ({ user }));
const logOut = createAction(LOGOUT, () => ({}));

//middlewares
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
          auth.currentUser
            .updateProfile({
              displayName: user_name,
            })
            .then(() => {
              dispatch(
                setUser({
                  user_name: user_name,
                  id: id,
                  user_profile:
                    "https://lh3.googleusercontent.com/a-/AOh14GiGczsi0j9r9PTTgzIwFUU4ACKOWm0-wofOYplHvg=s288-p-rw-no",
                  uid: user.user.uid,
                })
              );
              history.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.id,
            user_profile:
              "https://lh3.googleusercontent.com/a-/AOh14GiGczsi0j9r9PTTgzIwFUU4ACKOWm0-wofOYplHvg=s288-p-rw-no",
            uid: user.uid,
          })
        );
      } else {
        console.log("로그인 정보 없음");
        dispatch(logOut());
      }
    });
  };
};
const logOutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    });
  };
};
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              user_name: user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
};

//reducer
export default handleActions(
  {
    [SETUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true;
        draft.user = action.payload.user;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = false;
        draft.user = null;
      }),
  },
  init
);

const actionCreators = {
  signupFB,
  loginCheckFB,
  logOutFB,
  loginFB,
};

export { actionCreators };
