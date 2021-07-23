import styled from "styled-components";
import { StyledFormFooter } from "../form/form.style.js";
import { StyledContent } from "../pod/pod.style.js";
import Pod from "../pod";
import StyledDeleteButton from "./delete-button.style.js";
import { baseTheme } from "../../style/themes";

const StyledPod = styled(Pod)`
  ${StyledFormFooter} {
    margin-top: 24px;
  }

  ${StyledContent} {
    padding: 16px;
  }

  ${StyledDeleteButton} {
    color: ${({ theme }) => theme.colors.error};

    &:hover {
      color: ${({ theme }) => theme.colors.destructive.hover};
    }
  }

  .common-input__prefix {
    z-index: 5;
  }

  .carbon-show-edit-pod__transition-enter {
    opacity: 0;
  }

  .carbon-show-edit-pod__transition-enter.carbon-show-edit-pod__transition-enter-active {
    opacity: 1;
    transition: all 300ms ease-in;
  }

  .carbon-show-edit-pod__transition-exit {
    opacity: 0;
    position: absolute;
  }
`;

StyledPod.defaultProps = {
  theme: baseTheme,
};

export default StyledPod;
