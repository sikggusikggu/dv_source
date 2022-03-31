/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ChatOwn from "components/ChatOwn";
import Header from "components/Header";

const Chat = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("전송되었습니다.: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweet.creatorId);
  console.log();
  return (
    <>
      <div css={defaultFrame}>
        <Header />
        <div css={minHeight}>
          {nweets.map((nweet) => (
            <ChatOwn
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </div>
        <form css={formStyle} onSubmit={onSubmit}>
          <input
            value={nweet}
            css={inputStyle}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
          />
          <div css={toolBox}>
            <input css={sendBtnStyle} type="submit" value="글 올리기" />
          </div>
        </form>
      </div>
    </>
  );
};

const defaultFrame = css`
  width: 20rem;
  min-height: 100vh;
  hight: 100%;
  margin: 0 auto;
`;

const minHeight = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 83vh;
`;

const formStyle = css`
  background-color: #fff;
  display: inline-block;
  width: 100%;
  height: 4rem;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
  input:focus {
    outline: none;
  }
`;

const inputStyle = css`
  width: 100%;
  height: 1.5rem;
  display: inline-block;
  border: 0;
`;

const toolBox = css`
  width: 100%;
`;

const sendBtnStyle = css`
  display: inline-block;
  float: right;
  border: 0;
  background-color: #fff;
`;

export default Chat;
