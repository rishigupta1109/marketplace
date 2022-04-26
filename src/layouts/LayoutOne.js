import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";

const LayoutOne = ({
  SetUserLogin,
  isLogin,
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
}) => {
  return (
    <Fragment>
      <HeaderOne
        isLogin={isLogin}
        SetUserLogin={SetUserLogin}
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1 style={{ alignSelf: "center",fontWeight:"bolder" }}>Market Place</h1>
      </div>
      {children}
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default LayoutOne;
