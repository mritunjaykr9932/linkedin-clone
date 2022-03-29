import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/storage";
import { postArticleAPI } from "../actions";
import React from "react";


const getUserName = (props) => {
  if (props.user != null) {
    return props.user.displayName;
  } else {
    return "there";
  }
};

const PostModel = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === " " || image == "undefined") {
      alert(`not an image,the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };
  return (
    <div>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>

            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{getUserName(props)}</span>
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
              {assetArea === "image" ? (
                <UploadImage>
                  <input
                    type="file"
                    input="file"
                    accept="image/gifs ,image/jpeg, image/jpg,image/png "
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      Select an image to Share
                    </label>
                  </p>
                  {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                </UploadImage>
              ) : (
                assetArea === "media" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Please input a video link"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                    {videoLink && (
                      <ReactPlayer width={"100%"} url={videoLink} />
                    )}
                  </div>
                )
              )}
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-img-icon.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video-icon.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/comment-icon.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  outline: none;
  animation: fadeIn 0.5s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    align-items: center;
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    border: none;
    background-color: white;
    vertical-align: middle;
    svg,
    img {
      pointer-events: none;
    }
    &:hover {
      border-radius: 45%;
      background-color: rgba(0, 0, 0, 0.08);
      transition: 100ms;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 10px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  img {
    padding: 10px;
    cursor: pointer;
    &:hover {
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const AttachAssets = styled.div`
  display: flex;
  padding-right: 8px;
  align-items: center;

  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${(props) => (props.disabled ? "darkgray" : "#0a66c2")};
  color: white;
  border: none;
  outline: none;

  &:hover {
    transition: ease-in-out 100ms;
    cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
    background-color: ${(props) => (props.disabled ? "darkgray" : "darkblue")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: none;
  }
  input {
    width: 100%;
    height: 15px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
    height: auto;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userstate.user,
  };
};

const mapDispatchToProps = (Dispatch) => ({

  postArticle : (payload) => Dispatch (postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModel);
