/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function StatusBlock(props) {
  return (
    <div css={statusBlock}>
      <ul>
        <li>
          <label for="water">🥤: </label>
          <progress value="20" max="100" />
        </li>
        <li>
          <label for="light">☀️: </label>
          <progress value="20" max="100" />
        </li>
        <li>
          <label for="Temperatura">🌡: </label>
          <progress value="30" max="100" />
        </li>
      </ul>
    </div>
  );
}

const statusBlock = css`
  width: 100%;
  padding: 8px 0;
`;
