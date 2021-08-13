import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../utils/helpers/tags";
import StyledLoader from "./loader.style";
import StyledLoaderBar, { InnerBar } from "./loader-bar.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const LoaderBar = ({ size, ...rest }) => {
  return (
    <StyledLoader {...rest} {...tagComponent("loader-bar", rest)}>
      <StyledLoaderBar size={size}>
        <InnerBar size={size} />
      </StyledLoaderBar>
    </StyledLoader>
  );
};

LoaderBar.defaultProps = {
  size: "medium",
};

LoaderBar.propTypes = {
  ...marginPropTypes,
  /** Size of the loader. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default LoaderBar;
