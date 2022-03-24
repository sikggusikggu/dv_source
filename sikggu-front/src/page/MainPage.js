/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CharacterBlock from '../components/CharacterBlock';
import Header from '../components/Header';
import StatusBlock from '../components/StatusBlock';

function MainPage() {
    return (
        <div css={defaultFrame}>
            <Header />
            <CharacterBlock />
            <StatusBlock />
            <div css={calenderBlock}>식꾸식꾸 달력 블록</div>
        </div>
    );
}

const defaultFrame = css`
    width: 396px;
    margin: 0 auto;
    padding: 0 21px;
`;

const calenderBlock = css`
    width: 100%;
    height: 400px;
    background-color: black;
`;

export default MainPage;