/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CharacterBlock from "components/CharacterBlock";
import ControlButton from "components/ControlButton";
import Header from "components/Header";
import StatusBlock from "components/StatusBlock";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function MainPage() {
  const nickName = "뽀둥이";

  const [plantData, setPlantData] = useState({});
  useEffect(() => {
    const q = query(collection(dbService, "siku"), orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlantData(newArr[newArr.length - 1]);
    });
  }, []);
  return (
    <div css={defaultFrame}>
      {/* <div css={styleGuide} /> */}
      <Header />
      <CharacterBlock nickName={nickName} plantData={plantData} />
      <ControlButton />
      <StatusBlock plantData={plantData} />
      {/* <div css={calenderBlock}>식꾸식꾸 달력 블록</div> */}
    </div>
  );
}

const defaultFrame = css`
  width: 100%;
  min-width: 396px;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(207, 250, 247, 0.51);
`;

// const styleGuide = css`
//   position: absolute;
//   width: 198px;
//   height: 100%;
//   border: solid red 2px;
// `;

// const calenderBlock = css`
//   width: 100%;
//   height: 400px;
//   background-color: black;
// `;

export default MainPage;
