/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Navigate(props) {
  return (
    <div css={[contentsBox]}>
      <ul css={[ulAlign]}>
        <li>마이페이지</li>
        <li>커뮤니티</li>
        <li>로그아웃</li>
      </ul>
    </div>
  );
}

const contentsBox = css`
  width: 100%;
  height: 3rem;
  background: #efefef;
  line-height: 2rem;
`;

const ulAlign = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export default Navigate;
