import React from "react";
import Home, {AllProdListQuery} from "./Home";
import { withRouter } from "react-router-dom";
const HomeWrapper = () => {
  return (
    <div>
      <div className="sectionHeader">Personal todos</div>
<Home/>
      {/* {AllProdListQuery()} */}
    </div>
  );
};


export default withRouter(HomeWrapper);
