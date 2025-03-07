import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";
import Icon from "../icon";
import {
  PORTRAIT_SHAPES,
  PORTRAIT_SIZES,
  PORTRAIT_SIZE_PARAMS,
} from "./portrait.config";

function stylingForSize({ size }) {
  const params = PORTRAIT_SIZE_PARAMS[size];

  if (!params) {
    return css``;
  }

  return css`
    width: ${params.dimensions}px;
    height: ${params.dimensions}px;
  `;
}

function stylingForShape({ shape }) {
  let cssString = "overflow: hidden;";

  if (shape === "square") cssString += "border-radius: 0px;";
  if (shape === "circle") cssString += "border-radius: 50%;";

  return css`
    ${cssString}
  `;
}

function stylingForIcon({ size, theme, darkBackground }) {
  const params = PORTRAIT_SIZE_PARAMS[size];

  if (!params) {
    return css``;
  }

  let color = theme.portrait.border;
  let backgroundColor = theme.portrait.background;

  if (darkBackground) {
    color = theme.portrait.background;
    backgroundColor = theme.portrait.border;
  }

  return css`
    background-color: ${backgroundColor};
    color: ${color};

    ${params.iconDimensions &&
    css`
      svg {
        width: ${params.iconDimensions}px;
        height: ${params.iconDimensions}px;
      }
    `}
  `;
}

export function getColorsForInitials(theme, darkBackground) {
  return {
    textColor: darkBackground
      ? theme.portrait.background
      : theme.portrait.initials,
    bgColor: darkBackground
      ? theme.portrait.initials
      : theme.portrait.background,
  };
}

export const StyledPortraitInitials = styled.div`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  ${stylingForSize}
  ${stylingForShape}
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.portrait.border};
    `}
`;

StyledPortraitInitials.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
};

StyledPortraitInitials.defaultProps = {
  theme: BaseTheme,
  shape: "square",
};

export const StyledPortraitInitialsImg = styled.img`
  display: block;
`;

StyledPortraitInitialsImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export const StyledPortraitGravatar = styled.img`
  display: inline-block;
  vertical-align: middle;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledPortraitGravatar.propTypes = {
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

StyledPortraitGravatar.defaultProps = {
  theme: BaseTheme,
};

export const StyledCustomImg = styled.img`
  display: block;
  ${stylingForSize}
  ${stylingForShape}
`;

StyledCustomImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  size: PropTypes.oneOf(PORTRAIT_SIZES).isRequired,
};

// && is used here to increase the specificity
export const StyledIcon = styled(({ darkBackground, ...rest }) => (
  <Icon {...rest} />
))`
  && {
    box-sizing: border-box;
    line-height: 14px;
    ${stylingForSize}
    ${stylingForIcon}
    ${stylingForShape}
    ${({ theme }) =>
      css`
        border: 1px dashed ${theme.portrait.border};
      `}
  }
`;

StyledIcon.propTypes = {
  darkBackground: PropTypes.bool,
  size: PropTypes.oneOf(PORTRAIT_SIZES),
  shape: PropTypes.oneOf(PORTRAIT_SHAPES),
  theme: PropTypes.object,
  type: PropTypes.string.isRequired,
};

StyledIcon.defaultProps = {
  darkBackground: false,
  size: "M",
  shape: "square",
  theme: BaseTheme,
};

export const StyledPortraitContainer = styled.div`
  display: inline-block;
  ${({ onClick }) => onClick && "cursor: pointer"}
  ${margin}
`;

StyledPortraitContainer.defaultProps = {
  theme: BaseTheme,
};
