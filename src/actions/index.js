import { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADING_STATUS,GET_ARTICLES } from "./actionType";
import db from "../firebase";

export const setuser = (payload) => ({
  type: SET_USER,
  user: payload.user,
});

export const setusernull = () => ({
  type: SET_USER,
  user: null,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  loading: status,
});

export const getArticle = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

export function SignInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload);
        dispatch(setuser(payload));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        dispatch(setuser(user));
      }
    });
  };
}

export function SignOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setusernull(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image != "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress:${progress}`);

          if (snapshot.state === "RUNNING") {
            console.log(`progress:${progress}`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            actor: {
              email: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            shareImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      db.collection("articles").add({
        actor: {
          email: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        shareImg: " ",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticleAPI() {
  return (dispatch) => {
    let payload;

    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        dispatch(getArticle(payload));
      });
  };
}