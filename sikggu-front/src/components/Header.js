/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <div css={header}>
      <a href="/" css={logo}>
        식꾸식꾸
      </a>
      <button css={btnStyle} onClick={onLogOutClick}>
        로그아웃
      </button>
    </div>
  );
}

const header = css`
  position: relative;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

const logo = css`
  text-align: center;
  font-family: Black Han Sans;
  font-size: 2rem;
  line-height: 2rem;
  padding-top: 0.2rem;
`;

const btnStyle = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  &:hover {
    color: #adadad;
  }
`;
