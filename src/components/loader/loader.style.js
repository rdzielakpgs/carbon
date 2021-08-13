import styled from "styled-components";
import { margin } from "styled-system";
import { baseTheme } from "../../style/themes";

const StyledLoader = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;
  line-height: 0;
  font-size: 0;
`;

StyledLoader.defaultProps = {
  theme: baseTheme,
};

export default StyledLoader;
