import React, { memo } from "react";
import { NavLink } from "react-router-dom";
function Result() {
  return (
    <div>
      RESULT HERE <NavLink to="/quiz">try agian</NavLink>
    </div>
  );
}
export default memo(Result);
