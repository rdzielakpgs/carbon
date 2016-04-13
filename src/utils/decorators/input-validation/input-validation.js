import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './../../../components/icon';
import chainFunctions from './../../helpers/chain-functions';
import classNames from 'classnames';
import { assign } from 'lodash';

/**
 * InputValidation decorator.
 *
 * This decorator provides functionality and HTML for validation on inputs.
 *
 * == How to use InputValidation decorator in a component:
 *
 * In your file:
 *
 *   import InputValidation from 'carbon/lib/utils/decorators/input-validation';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputValidation(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         <input />
 *         { this.validationHTML() }
 *       </div>
 *     );
 *   }
 *
 * @method InputValidation
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
let InputValidation = (ComposedComponent) => class Component extends ComposedComponent {

  _window = window;

  constructor(...args) {
    super(...args);

    // use the super components state, or create an empty object
    this.state = this.state || {};

    /**
     * The inputs valid state.
     *
     * @property valid
     * @type {Boolean}
     * @default true
     */
    this.state.valid = true;

    /**
     * The inputs warning state.
     *
     * @property warning
     * @type {Boolean}
     * @default false
     */
    this.state.warning = false;

    /**
     * The inputs error message.
     *
     * @property errorMessage
     * @type {String}
     * @default null
     */
    this.state.errorMessage = null;

    /**
     * The inputs warning message.
     *
     * @property warningMessage
     * @type {String}
     * @default null
     */
    this.state.warningMessage = null;

    /**
     * Determines if the message should always be visible.
     *
     * @property messageLocked
     * @type {Boolean}
     * @default false
     */
    this.state.messageLocked = false;
  }

  static contextTypes = assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object,
    tab: React.PropTypes.object
  })

  /**
   * A lifecycle method for when the component has re-rendered.
   *
   * @method componentWillReceiveProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    // call the components super method if it exists
    if (super.componentWillReceiveProps) { super.componentWillReceiveProps(nextProps); }

    // if disabling the field, reset the validation on it
    if (nextProps.disabled && (!this.state.valid || this.state.warning)) {
      this.setState({ valid: true, warning: false });
    }

    // if value changes and the input is currently invalid, re-assess its validity
    if (!this.state.valid && (nextProps.value != this.props.value)) {
      if (this.warning(nextProps.value)) {
        this.setState({ warning: false });
      }

      if (this.validate(nextProps.value)) {
        this.setState({ valid: true });
      }
    }
  }

  /**
   * A lifecycle method for when the component has re-rendered.
   *
   * @method componentDidUpdate
   * @return {void}
   */
  componentDidUpdate(prevProps, prevState) {
    // call the components super method if it exists
    if (super.componentDidUpdate) { super.componentDidUpdate(prevProps, prevState); }

    if (!this.state.valid || this.state.warning) {
      // calculate the position for the message relative to the icon
      let icon = ReactDOM.findDOMNode(this.refs.validationIcon),
          message = this.refs.validationMessage;

      if (icon && message && message.offsetHeight) {
        let messagePositionLeft = (icon.offsetLeft + (icon.offsetWidth / 2)),
            topOffset = (icon.offsetTop - icon.offsetHeight) / 2;

        // set initial position for message
        message.style.left = `${messagePositionLeft}px`;
        message.style.top = `-${message.offsetHeight - topOffset}px`;

        // figure out if the message is positioned offscreen
        let messageScreenPosition = message.getBoundingClientRect().left + message.offsetWidth;

        // change the position if it is offscreen
        if (messageScreenPosition > this._window.innerWidth) {
          messagePositionLeft -= message.offsetWidth;
          message.style.left = `${messagePositionLeft}px`;
          message.className += " common-input__message--flipped";
        }

        // hide the message
        message.className += " common-input__message--hidden";
      }
    }
  }

  /**
   * A lifecycle method for when the component is added to the page.
   *
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    // call the components super method if it exists
    if (super.componentWillMount) { super.componentWillMount(); }

    if (this.context.form && (this.props.validations || this.props.warnings)) {
      // attach the input to the form so the form can track what it needs to validate on submit
      this.context.form.attachToForm(this);
    }
  }

  /**
   * A lifecycle method for when the component is removed from the page.
   *
   * @method componentWillUnmount
   * @return {void}
   */
  componentWillUnmount() {
    // call the components super method if it exists
    if (super.componentWillUnmount) { super.componentWillUnmount(); }

    if (this.isAttachedToForm && (this.props.validations || this.props.warnings)) {
      if (!this.state.valid) {
        // decrement the forms error count if the input is removed
        this.context.form.decrementErrorCount();
      }

      if (this.state.warning) {
        // decrement the forms error count if the input is removed
        this.context.form.decrementWarningCount();
      }

      // detach the input to the form so the form
      this.context.form.detachFromForm(this);
    }
  }

  /**
   * Positions the message relative to the icon.
   *
   * @method positionMessage
   * @return {Void}
   */
  positionMessage = () => {
    if (!this.state.valid) {
      // calculate the position for the message relative to the icon
      let icon = ReactDOM.findDOMNode(this.refs.validationIcon),
          message = this.refs.validationMessage;

      if (icon && message && message.offsetHeight) {
        let messagePositionLeft = (icon.offsetLeft + (icon.offsetWidth / 2)),
            topOffset = icon.offsetTop - icon.offsetHeight;

        // set initial position for message
        message.style.left = `${messagePositionLeft}px`;
        message.style.top = `-${message.offsetHeight - topOffset}px`;

        // figure out if the message is positioned offscreen
        let messageScreenPosition = message.getBoundingClientRect().left + message.offsetWidth;

        // change the position if it is offscreen
        if (messageScreenPosition > this._window.innerWidth) {
          messagePositionLeft -= message.offsetWidth;
          message.style.left = `${messagePositionLeft}px`;
          message.className += " common-input__message--flipped";
        }
      }
    }
  }

  /**
   * Checks for validations and returns boolean defining if field valid.
   *
   * @method validate
   * @return {Boolean} if the field/fields is/are valid
   */
  warning = (value = this.props.value) => {
    let shouldWarn = false;

    // if there are no validation, return truthy
    if (!this.props.warnings || !this.state.valid) {
      return false;
    }

    // iterate through each validation applied to the input
    for (let i = 0; i < this.props.warnings.length; i++) {
      let warning = this.props.warnings[i];

      // run this validation
      shouldWarn = warning.warning(value, this.props, this.updateWarning);

      this.updateWarning(shouldWarn, value, warning);

      if (shouldWarn) { break; }
    }

    // return the result of the validation
    return shouldWarn;
  }

  updateWarning = (shouldWarn, value, warning) => {
    // if validation fails
    if (shouldWarn) {
      // if input currently thinks it is valid
      if (!this.state.warning) {
        // if input has a form
        if (this.isAttachedToForm) {
          // increment the error count on the form
          this.context.form.incrementWarningCount();
        }

        // if input has a tab
        if (this.context.tab) {
          // Set the validity of the tab to false
          this.context.tab.setWarning(true);
        }

        // tell the input it is invalid
        this.setState({ warningMessage: warning.message(value, this.props), warning: true });
      }
    }
  }

  /**
   * Checks for validations and returns boolean defining if field valid.
   *
   * @method validate
   * @return {Boolean} if the field/fields is/are valid
   */
  validate = (value = this.props.value) => {
    let valid = false;

    // if there are no validation, return truthy
    if (!this.props.validations || this.props._placeholder) {
      return true;
    }

    // iterate through each validation applied to the input
    for (let i = 0; i < this.props.validations.length; i++) {
      let validation = this.props.validations[i];

      // run this validation
      valid = validation.validate(value, this.props);

      // if validation fails
      if (!valid) {
        // if input currently thinks it is valid
        if (this.state.valid) {
          // if input has a form
          if (this.isAttachedToForm) {
            // increment the error count on the form
            this.context.form.incrementErrorCount();
          }

          // if input has a tab
          if (this.context.tab) {
            // Set the validity of the tab to false
            this.context.tab.setValidity(false);
          }

          // tell the input it is invalid
          this.setState({ errorMessage: validation.message(value, this.props), valid: false });
        }

        // a validation has failed, so exit the loop at this point
        break;
      }
    }

    // return the result of the validation
    return valid;
  }

  /**
   * On blur of the input we want to validate the field.
   *
   * @method _handleBlur
   * @return {void}
   */
  _handleBlur = () => {
    if (!this.blockBlur) {
      // use setTimeout to drop in the callstack to ensure value has time to be set
      setTimeout(() => {
        this.validate();
        this.warning();

        if (this.state.messageLocked) {
          this.setState({ messageLocked: false });
        }
      }, 0);
    }
  }

  /**
   * On focus of the input.
   *
   * @method _handleFocus
   * @return {void}
   */
  _handleFocus = () => {
    if (!this.state.valid || this.state.warning) {
      this.positionMessage();

      if (!this.state.messageLocked) {
        this.setState({ messageLocked: true });
      }
    }
  }

  /**
   * On content change of the input when we want to reset the validation.
   *
   * @method _handleContentChange
   * @return {void}
   */
  _handleContentChange = () => {
    // if the field is in an invalid state
    if (!this.state.valid || this.state.warning) {
      // if there is a form, decrement the error count
      if (this.isAttachedToForm) {
        if (!this.state.valid) {
          this.context.form.decrementErrorCount();
        }

        if (this.state.warning) {
          this.context.form.decrementWarningCount();
        }
      }

      // if there is tab, remove invalid state
      if (this.context.tab) {
        if (!this.state.valid) {
          this.context.tab.setValidity(true);
        }

        if (this.state.warning) {
          this.context.tab.setWarning(false);
        }
      }

      // reset the error state
      this.setState({ errorMessage: null, valid: true, warning: false });
    }
  }

  /**
   * Determines if the input is attached to a form.
   *
   * @method isAttachedToForm
   * @return {Boolean}
   */
  get isAttachedToForm() {
    if (this.context.form && this.context.form.inputs[this._guid]) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the HTML for the validation, only if it is invalid.
   *
   * @method validationHTML
   * @return {HTML} Validation HTML including icon & message
   */
  get validationHTML() {
    if (this.state.valid && !this.state.warning) { return null; }

    let type = !this.state.valid ? "error" : "warning";

    let messageClasses = `common-input__message common-input__message--${type}`,
        iconClasses = `common-input__icon common-input__icon--${type}`;

    if (this.state.messageLocked) { messageClasses += " common-input__message--locked"; }

    return [
      <Icon key="0" ref="validationIcon" type={ type } className={ iconClasses } />,
      <div key="1" className="common-input__message-wrapper">
        <div ref="validationMessage" className={ messageClasses }>
          { this.state.errorMessage || this.state.warningMessage }
        </div>
      </div>
    ];
  }

  /**
   * Extends the main classes with any validation classes.
   *
   * @method mainClasses
   * @return {String} Main class names
   */
  get mainClasses() {
    return classNames(
      super.mainClasses, {
        'common-input--error': !this.state.valid,
        'common-input--warning': this.state.warning
      }
    );
  }

  /**
   * Extends the input classes with any validation classes.
   *
   * @method inputClasses
   * @return {String} Input class names
   */
  get inputClasses() {
    return classNames(
      super.inputClasses, {
        'common-input__input--error': !this.state.valid,
        'common-input__input--warning': this.state.warning
      }
    );
  }

  /**
   * Extends the input props with onBlur and onFocus events.
   *
   * @method inputProps
   * @return {Object} Input props
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    inputProps.onMouseOver = chainFunctions(this.positionMessage, inputProps.onMouseOver);
    inputProps.onFocus = chainFunctions(this._handleFocus, inputProps.onFocus);
    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);
    inputProps.onKeyDown = chainFunctions(this._handleContentChange, inputProps.onKeyDown);
    inputProps.onPaste = chainFunctions(this._handleContentChange, inputProps.onKeyDown);

    return inputProps;
  }

};

export default InputValidation;
