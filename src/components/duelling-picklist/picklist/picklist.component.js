import React, { useCallback, useContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

import Events from "../../../utils/helpers/events";
import { StyledPicklist, StyledEmptyContainer } from "./picklist.style";
import PicklistGroup from "../picklist-group/picklist-group.component";
import { FocusContext } from "../duelling-picklist.component";
import { checkItem, getRefs } from "../__internal__/utils";

export const Picklist = ({
  disabled,
  children,
  placeholder,
  itemToFocus,
  isGroup,
}) => {
  const { addItemToFocus } = useContext(FocusContext);
  const refs = getRefs(React.Children.count(children));
  const isEmpty = useMemo(() => !React.Children.toArray(children).length, [
    children,
  ]);

  const focusItem = useCallback(
    (ev, index) => {
      ev.preventDefault();
      refs[index].current.focus();
    },
    [refs]
  );

  const handleKeyDown = useCallback(
    (ev) => {
      if (Events.isHomeKey(ev)) {
        focusItem(ev, 0);
      } else if (Events.isEndKey(ev)) {
        focusItem(ev, refs.length - 1);
      }
    },
    [focusItem, refs]
  );

  const content = React.Children.map(
    children,
    (child, index) =>
      child &&
      React.cloneElement(child, {
        ref: refs[index],
        disabled,
        itemToFocus: child.type === PicklistGroup ? itemToFocus : undefined,
        groupIndex: child.type === PicklistGroup ? index : undefined,
      })
  );

  useEffect(() => {
    if (itemToFocus !== undefined) {
      if (isGroup && refs[itemToFocus].current) {
        refs[itemToFocus].current.focus();
      } else {
        const index = React.Children.toArray(children).findIndex((child) => {
          if (child.type === PicklistGroup) {
            // return false as the focus functionality is applied in the Group itself
            return false;
          }

          return checkItem(child.props.item, itemToFocus);
        });

        if (index > -1 && refs[index].current) {
          refs[index].current.focus();
        }
      }
      addItemToFocus(undefined);
    }
  }, [children, itemToFocus, refs, addItemToFocus, isGroup]);

  return (
    <StyledPicklist
      data-element="picklist"
      scrollVariant="light"
      onKeyDown={handleKeyDown}
    >
      {isEmpty && <StyledEmptyContainer>{placeholder}</StyledEmptyContainer>}
      <TransitionGroup component={null}>{content}</TransitionGroup>
    </StyledPicklist>
  );
};

Picklist.propTypes = {
  /** List of PicklistItem elements */
  children: PropTypes.node,
  /** Placeholder to be rendered when list is empty */
  placeholder: PropTypes.node,
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,

  /**
    @private
    @ignore
    Item used for lookup and focusing after a picklist item is added/removed
  */
  itemToFocus: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
    @private
    @ignore
    Flag to indicate group was added/ removed from a picklist
  */
  isGroup: PropTypes.bool,
};

export const areEqual = (prevProps, nextProps) => {
  let changesCounter = 0;
  const prevChildCount = React.Children.count(prevProps.children);
  const nextChildCount = React.Children.count(nextProps.children);

  if (prevChildCount !== nextChildCount) {
    changesCounter += 1;
  }

  if (prevProps.disabled !== nextProps.disabled) {
    changesCounter += 1;
  }

  return !changesCounter;
};

export default Picklist;
