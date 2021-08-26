import styled, { css } from "styled-components";
import { margin } from "styled-system";
import { baseTheme } from "../../style/themes";
import {
  StyledDraggableContainer,
  StyledDraggableItem,
  StyledIcon,
} from "../draggable/draggable-item.style";
import { StyledPicklistItem } from "./picklist-item/picklist-item.style";
import { StyledPicklist } from "./picklist/picklist.style";

const StyledDuellingPicklistOverlay = styled.div`
  ${margin}

  transition: opacity 0.3s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
      user-select: none;
    `}
`;

const StyledDuellingPicklist = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;

  ${StyledPicklist}:first-of-type {
    padding-right: 36px;
  }

  ${StyledPicklist}:last-of-type {
    padding-left: 36px;
  }
  ${StyledDraggableContainer} {
    width: 100%;

    margin: 0 -4px;
    ${StyledPicklistItem} {
      width: 100%;
    }

    ${StyledDraggableItem} {
      padding: 4px 0;
      margin-right: 36px;
      margin-left: 36px;
    }

    ${StyledIcon}:last-of-type {
      display: none;
    }
    ${StyledPicklistItem} {
      @keyframes itemEnter {
        0% {
          opacity: 0;
          transform: translate(-16px);
          transition: all 300ms ease-in;
        }
        100% {
          opacity: 1;
          transform: translate(0);
          transition: all 300ms ease-in;
        }
      }
      animation: itemEnter 0.3s ease-in;
    }
  }
`;

const StyledLabelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 36px;
  margin-bottom: 24px;
`;

const StyledLabel = styled.p`
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1;
  margin: 0;
`;

const StyledControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

const StyledControl = styled.div`
  width: 50%;
  padding-right: 40px;

  & ~ & {
    padding-right: 0;
    padding-left: 40px;
  }
`;

const StyledPicklistPlaceholder = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

StyledDuellingPicklistOverlay.defaultProps = {
  theme: baseTheme,
};

export {
  StyledDuellingPicklist,
  StyledDuellingPicklistOverlay,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
  StyledPicklistPlaceholder,
};
