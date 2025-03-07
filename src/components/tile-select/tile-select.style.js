import styled, { css } from "styled-components";
import { margin } from "styled-system";
import Fieldset from "../fieldset";
import { Input } from "../../__internal__/input";
import tint from "../../style/utils/tint";
import { LegendContainerStyle } from "../fieldset/fieldset.style";
import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";

const StyledTitle = styled.h3`
  font-size: 16px;
  font-weight: 900;
  margin: 0;
  margin-right: 16px;
  margin-bottom: 8px;
`;

const StyledSubtitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  margin-right: 16px;
  margin-bottom: 8px;
`;

const StyledAdornment = styled.div`
  z-index: 500;
  margin-bottom: ${({ hasAdditionalInformation }) =>
    hasAdditionalInformation ? "4" : "8"}px;
`;

const StyledDescription = styled.p`
  color: ${({ theme }) => theme.tileSelect.descriptionColor};
  font-size: 14px;
  margin: 0;
`;

const StyledTileSelect = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  ${({ checked, theme }) =>
    checked &&
    css`
      background: ${tint(theme.colors.primary)(95)};
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.tileSelect.disabledBackground};
      ${StyledTitle}, ${StyledSubtitle}, ${StyledDescription} {
        color: ${theme.tileSelect.disabledText};
      }
      ${StyledAdornment} * {
        color: ${theme.colors.black};
        fill: ${theme.colors.black};
        opacity: 0.3;
      }
    `}
`;

const StyledFocusWrapper = styled.div`
  ${({ checked, theme, hasFocus }) => css`
    position: relative;
    border: 1px solid ${theme.tileSelect.border};
    ${checked &&
    css`
      border-color: ${theme.colors.primary};
      z-index: 10;
    `}

    ${hasFocus &&
    css`
      outline: 3px solid ${theme.colors.focus};
      z-index: 15;
    `}
  `}
`;

const StyledTileSelectContainer = styled.div`
  ${margin}

  width: 100%;
  position: relative;
  & + & ${StyledFocusWrapper} {
    margin-top: -1px;
  }
  ${({ checked, disabled, theme }) =>
    !checked &&
    !disabled &&
    css`
      &:hover ${StyledTileSelect} {
        background: ${theme.tileSelect.hoverBackground};
      }
    `}
`;

const StyledFooterWrapper = styled.div`
  width: fit-content;
  position: relative;
  z-index: 200;
`;

const StyledAccordionFooterWrapper = styled.div`
  width: fit-content;
  position: relative;
  z-index: 200;
  left: -12px;

  ${({ accordionExpanded }) => `
      span[data-element="chevron_down"] {
        transition: transform 0.3s;
        ${!accordionExpanded && "transform: rotate(-90deg)"};
      }
  `}
`;

const StyledTileSelectInput = styled(Input)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  z-index: 100;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const StyledTitleContainer = styled.div`
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  margin-right: 16px;
  position: relative;
`;

const StyledDeselectWrapper = styled.div`
  ${({ hasActionAdornment, theme }) => css`
    z-index: 200;
    position: relative;
    top: -4px;
    right: 8px;
    height: fit-content;

    ${hasActionAdornment &&
    `
      margin-right: ${2 * theme.spacing}px;
      display: flex;
      align-items: baseline;
      min-height: ${4 * theme.spacing}px;

      ${StyledIcon} {
        top: 2px;
      }
    `}
  `}
`;

const StyledTileSelectFieldset = styled(Fieldset)`
  ${margin}

  ${LegendContainerStyle} {
    margin-bottom: 16px;
    legend {
      font-size: 16px;
      line-height: 16px;
      margin-left: -2px;
    }
  }
  ${({ multiSelect }) =>
    multiSelect &&
    css`
      ${StyledTileSelectContainer} {
        margin-bottom: 8px;
      }
    `}
`;

const StyledGroupDescription = styled.p`
  color: ${({ theme }) => theme.tileSelect.descriptionColor};
  margin: 0;
  margin-bottom: 16px;
`;

StyledTileSelectFieldset.defaultProps = {
  theme: baseTheme,
};

StyledTileSelect.defaultProps = {
  theme: baseTheme,
};

StyledTileSelectContainer.defaultProps = {
  theme: baseTheme,
};

StyledGroupDescription.defaultProps = {
  theme: baseTheme,
};

StyledTileSelectInput.defaultProps = {
  theme: baseTheme,
};

StyledDescription.defaultProps = {
  theme: baseTheme,
};

StyledDeselectWrapper.defaultProps = {
  theme: baseTheme,
};

StyledFocusWrapper.defaultProps = {
  theme: baseTheme,
};

export {
  StyledTileSelectFieldset,
  StyledGroupDescription,
  StyledTileSelectContainer,
  StyledTileSelect,
  StyledTileSelectInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectWrapper,
  StyledFooterWrapper,
  StyledFocusWrapper,
  StyledAccordionFooterWrapper,
};
