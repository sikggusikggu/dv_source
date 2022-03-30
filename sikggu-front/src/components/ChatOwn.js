/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ChatOwn({ nweetObj, isOwner }) {
  return (
    <div css={contentsBox}>
      <p>{nweetObj.text}</p>
      {/* {isOwner && (
        <>
          <button>삭제하기</button>
          <button>수정하기</button>
        </>
      )} */}
    </div>
  );
}

const contentsBox = css`
  width: 100%;
  padding: 1rem;
`;

export default ChatOwn;
