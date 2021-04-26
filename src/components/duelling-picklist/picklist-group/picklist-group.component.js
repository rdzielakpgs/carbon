import React, { useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  StyledGroupWrapper,
  StyledPicklistGroup,
  StyledGroupButton,
} from "./picklist-group.style";
import Events from "../../../utils/helpers/events/events";
import { FocusContext } from "../duelling-picklist.component";
import { checkItem, getRefs } from "../__internal__/utils";

const PicklistGroup = React.forwardRef(
  (
    { title, children, type, onChange, itemToFocus, groupIndex, ...rest },
    ref
  ) => {
    const { addItemToFocus } = useContext(FocusContext);
    const [highlighted, setHighlighted] = useState(false);
    const refs = getRefs(React.Children.count(children));

    const handleClick = useCallback(() => {
      onChange();
      addItemToFocus(groupIndex, true);
    }, [addItemToFocus, groupIndex, onChange]);

    const handleKeydown = useCallback(
      (event) => {
        if (Events.isEnterKey(event) || Events.isSpaceKey(event)) {
          event.preventDefault();
          onChange();
          addItemToFocus(groupIndex, true);
        }
      },
      [addItemToFocus, groupIndex, onChange]
    );

    const content = React.Children.map(
      children,
      (child, index) =>
        child &&
        React.cloneElement(child, {
          ref: refs[index],
          ...child.props,
        })
    );

    useEffect(() => {
      if (itemToFocus !== undefined) {
        const index = React.Children.toArray(children).findIndex((child) =>
          checkItem(child.props.item, itemToFocus)
        );

        if (index > -1) {
          refs[index].current.focus();
          addItemToFocus(undefined);
        }
      }
    }, [children, itemToFocus, refs, addItemToFocus]);

    return (
      <CSSTransition
        timeout={{
          appear: 500,
          enter: 300,
          exit: 0,
        }}
        classNames="picklist-group"
        {...rest}
        {...(type === "add" ? { enter: false } : {})}
      >
        <StyledGroupWrapper highlighted={highlighted} type={type}>
          <StyledPicklistGroup
            onKeyDown={handleKeydown}
            data-element="picklist-group"
          >
            {title}
            <StyledGroupButton
              buttonType="secondary"
              destructive={type === "remove"}
              iconType={type}
              onClick={handleClick}
              onMouseEnter={() => setHighlighted(true)}
              onMouseLeave={() => setHighlighted(false)}
              onFocus={() => setHighlighted(true)}
              onBlur={() => setHighlighted(false)}
              ref={ref}
            />
          </StyledPicklistGroup>
          <TransitionGroup component={null}>{content}</TransitionGroup>
        </StyledGroupWrapper>
      </CSSTransition>
    );
  }
);

PicklistGroup.propTypes = {
  /** Group title */
  title: PropTypes.node.isRequired,
  /** Item content */
  children: PropTypes.node.isRequired,
  /** Define if item is of type add or remove */
  type: PropTypes.oneOf(["add", "remove"]).isRequired,
  /** Handler invoked when add/remove button is clicked or when space/enter is pressed on the whole item */
  onChange: PropTypes.func.isRequired,

  /** @private @ignore */
  itemToFocus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  /** @private @ignore */
  groupIndex: PropTypes.number,
};

export default PicklistGroup;
