import React, { useContext } from "react";
import PropTypes from "prop-types";
import StyledDivider from "./menu-divider.style";
import MenuContext from "../menu.context";
import { StyledMenuItem } from "../menu.style";

const MenuDivider = React.forwardRef(({ size = "default" }, ref) => {
  const menuContext = useContext(MenuContext);

  return (
    <StyledMenuItem role="presentation" inSubmenu>
      <StyledDivider
        size={size}
        data-component="menu-divider"
        menuType={menuContext.menuType}
        ref={ref}
      />
    </StyledMenuItem>
  );
});

MenuDivider.propTypes = {
  /** sets the size of the MenuDivider */
  size: PropTypes.oneOf(["default", "large"]),
};

export default MenuDivider;
