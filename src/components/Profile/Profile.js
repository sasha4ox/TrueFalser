import React, { memo } from "react";
import Header from "../Header/Header";
import ProfileLanguages from "./components/ProfileLanguages";

function Profile() {
  return (
    <>
      <Header />
      <ProfileLanguages />
    </>
  );
}

export default memo(Profile);
