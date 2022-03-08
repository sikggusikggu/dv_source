/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function MainPage(props) {
    return (
        <div css={defaultFrame}>
            <div css={header}>식꾸식꾸 헤더</div>
            <div css={characterBlock}>식꾸식꾸 캐릭터 이미지 블록</div>
            <div css={statusBlock}>식꾸식꾸 실시간 정보 블록</div>
            <div css={calenderBlock}>식꾸식꾸 달력 블록</div>
        </div>
    );
}

const defaultFrame = css`
    width: 396px;
    margin: 0 auto;
    padding: 0 21px;
`;

const header = css`
    width: 100%;
    height: 50px;
    background-color: yellow;
`;

const characterBlock = css`
    width: 100%;
    height: 300px;
    background-color: red;
`;

const statusBlock = css`
    width: 100%;
    height: 300px;
    background-color: blue;
`;

const calenderBlock = css`
    width: 100%;
    height: 400px;
    background-color: black;
`;

export default MainPage;