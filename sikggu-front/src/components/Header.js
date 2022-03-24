/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Header() {
    return (
        <div css={header}>
            <div css={logo}>식꾸식꾸</div>
        </div>
    );
}

const header = css`
    width: 100%;
    height: 50px;
`;

const logo = css`
    text-align: center;
    line-height: 50px;
    font-family: Black Han Sans;
    font-size: 30px;
`;