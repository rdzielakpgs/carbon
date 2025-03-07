import React from "react";
import PropTypes from "prop-types";
import Textbox from "../../textbox";
import useLocale from "../../../hooks/__internal__/useLocale";

const SelectTextbox = ({
  value,
  disabled,
  readOnly,
  placeholder,
  labelId,
  size,
  onClick,
  onFocus,
  onBlur,
  selectedValue,
  required,
  ...restProps
}) => {
  const l = useLocale();

  function handleTextboxClick(event) {
    if (disabled || readOnly) {
      return;
    }

    onClick(event);
  }

  function handleTextboxFocus(event) {
    if (disabled || readOnly) {
      return;
    }

    if (onFocus) {
      onFocus(event);
    }
  }

  function handleTextboxBlur(event) {
    if (onBlur) {
      onBlur(event);
    }
  }

  function getTextboxProps() {
    return {
      placeholder: placeholder || l.select.placeholder(),
      disabled,
      readOnly,
      required,
      onClick: handleTextboxClick,
      onFocus: handleTextboxFocus,
      onBlur: handleTextboxBlur,
      labelId,
      ...restProps,
    };
  }

  return (
    <Textbox
      data-element="select-input"
      inputIcon="dropdown"
      autoComplete="off"
      size={size}
      value={selectedValue}
      {...getTextboxProps()}
    />
  );
};

const formInputPropTypes = {
  /** Id attribute of the input element */
  id: PropTypes.string,
  /** Name attribute of the input element */
  name: PropTypes.string,
  /** If true the Component will be read-only */
  readOnly: PropTypes.bool,
  /** If true the Component will be disabled */
  disabled: PropTypes.bool,
  /** If true the Component will be focused when rendered */
  autoFocus: PropTypes.bool,
  /**
   * Label id passed from Select component
   * @private
   * @ignore
   *
   */
  labelId: PropTypes.string,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.node,
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Size of an input */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Placeholder string to be displayed in input */
  placeholder: PropTypes.string,
  /** A custom callback for when changes occur */
  onChange: PropTypes.func,
  /** Callback function for when the Select Textbox is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the Select Textbox is focused. */
  onFocus: PropTypes.func,
  /** Callback function for when the Select Textbox loses it's focus. */
  onBlur: PropTypes.func,
  /** Callback function for when the key is pressed when focused on Select Textbox. */
  onKeyDown: PropTypes.func,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

SelectTextbox.propTypes = {
  ...formInputPropTypes,
  /**
   * @private
   * @ignore
   * Value to be displayed in the Textbox */
  formattedValue: PropTypes.string,
  /**
   * @private
   * @ignore
   * Value of the Select Input */
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default SelectTextbox;
export { formInputPropTypes };
