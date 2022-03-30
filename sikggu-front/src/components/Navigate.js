/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Navigate({ nickName }) {
  return (
    <div css={[contentsBox]}>
      <button css={btnStyle}>내 {nickName} 자랑하러 가기</button>
    </div>
  );
}

const contentsBox = css`
  width: 80%;
  height: 3rem;
  margin: 0 auto 1rem;
`;

const btnStyle = css`
  height: 3rem;
  background: #efefef;
  line-height: 3rem;
  text-align: center;
  font-size: 1rem;
`;

export default Navigate;
