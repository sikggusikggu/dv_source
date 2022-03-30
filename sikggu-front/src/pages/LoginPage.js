/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { logo } from "asset/index";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    //const {name, value} = event.target 과 같음
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    //전송버튼 기본 값 -> 새로고침
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    const auth = getAuth();
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    });
  };
  return (
    <div css={defaultFrame}>
      <img css={logoStyle} src={logo} alt="메인 캐릭터" />
      <p css={serviceName}>식꾸식꾸</p>
      <form css={formContainer} onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          css={inputStyle}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          css={inputStyle}
          onChange={onChange}
        />
        <input
          css={loginStyle}
          type="submit"
          value={newAccount ? "계정 생성" : "로그인"}
        />
        {error}
      </form>
      <div css={loginStyle}>
        <button css={googleLogin} onClick={onSocialClick} name="google">
          구글 간편 로그인
        </button>
      </div>
      <div css={makeIDStyle} onClick={toggleAccount}>
        {newAccount
          ? "있는 계정으로 로그인하기"
          : "아이디가 없으신가요...? 계정 만들기"}
      </div>
    </div>
  );
};

const defaultFrame = css`
  width: 396px;
  margin: 0 auto;
`;

const serviceName = css`
  width: 10rem;
  text-align: center;
  font-size: 2rem;
  font-family: Black Han Sans;
  margin: 0 auto;
`;

const logoStyle = css`
  width: 100%;
`;

const formContainer = css`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  width: 13.5rem;
  margin: 0 auto 0.3rem;
`;

const loginStyle = css`
  width: 13.5rem;
  text-align: center;
  margin: 0 auto;
`;

const googleLogin = css`
  width: 100%;
  height: 2rem;
  border: 0.2px solid #0f0f0f;
  border-radius: 0.8rem;
  font-size: 0.9rem;
  margin-top: 3rem;
`;

const makeIDStyle = css`
  width: 15rem;
  margin: 1rem auto 0.5rem;
  text-align: center;
`;

export default LogInPage;
