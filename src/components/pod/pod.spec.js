import React from "react";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";

import Pod from "./pod.component";
import Button from "../button";
import Icon from "../icon";
import {
  StyledBlock,
  StyledDescription,
  StyledEditAction,
  StyledActionsContainer,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
  StyledArrow,
  StyledDeleteButton,
  StyledUndoButton,
} from "./pod.style.js";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import {
  elementsTagTest,
  rootTagTest,
} from "../../utils/helpers/tags/tags-specs/tags-specs";
import { baseTheme } from "../../style/themes";
import PodManager from "./pod-manager.component";
import PodContext from "./pod-context";

describe("Pod", () => {
  let instance;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Pod />);
  });

  testStyledSystemMargin((props) => <Pod {...props} />);

  describe("functionality", () => {
    it("sets the collapsed state same as collapsed prop on mount", () => {
      const initialWrapper = shallow(<Pod collapsed />);
      expect(initialWrapper.state().isCollapsed).toBeTruthy();
    });
  });

  describe("podHeader", () => {
    it("is not rendered if title prop not passed", () => {
      expect(wrapper.find(StyledHeader).exists()).toBeFalsy();
    });

    it("renders title when title is passed as a prop", () => {
      wrapper.setProps({ title: "Title" });
      expect(wrapper.find(StyledTitle).props().children).toEqual("Title");
    });

    it("renders subtitle when subtitle is passed as a prop", () => {
      wrapper.setProps({ title: "Title", subtitle: "Subtitle" });
      expect(wrapper.find(StyledSubtitle).props().children).toEqual("Subtitle");
    });

    it("adds an additional collapsible arrow to the the header when pod is collapsible", () => {
      wrapper.setProps({ title: "Title" });
      wrapper.setState({ isCollapsed: true });
      expect(wrapper.find(StyledArrow).exists()).toBeTruthy();
    });

    it("does not add additional collapsible arrow when pod is NOT collapsible", () => {
      wrapper.setProps({ title: "Title" });
      expect(wrapper.find(StyledArrow).exists()).toBeFalsy();
    });
  });

  describe("PodManager", () => {
    wrapper = mount(
      <PodManager>
        <PodContext.Provider value={{ heightOfTheLongestPod: "100" }}>
          <Pod>test</Pod>
        </PodContext.Provider>
      </PodManager>
    );

    assertStyleMatch(
      {
        height: "100px",
      },
      wrapper.find(StyledPod)
    );
  });

  describe("collapsability", () => {
    const ContentComp = () => <div />;

    it("initializes component as collapsed when collapsed prop is passed as true", () => {
      const collapsableWrapper = shallow(
        <Pod collapsed>
          <ContentComp />
        </Pod>
      );
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(false);
    });

    it("initializes component as not collapsed when collapsed prop is passed as false", () => {
      const collapsableWrapper = shallow(
        <Pod collapsed={false}>
          <ContentComp />
        </Pod>
      );
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(true);
    });

    it("clicking on Header toggles isCollapsed state", () => {
      const collapsableWrapper = shallow(
        <Pod collapsed title="Title">
          <ContentComp />
        </Pod>
      );
      collapsableWrapper.find(StyledHeader).props().onClick();
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(true);
      collapsableWrapper.find(StyledHeader).props().onClick();
      expect(collapsableWrapper.find(ContentComp).exists()).toEqual(false);
    });

    it("the Arrow icon should be flipped", () => {
      wrapper = mount(
        <Pod collapsed title="collapsed">
          <ContentComp />
        </Pod>
      );

      assertStyleMatch(
        {
          transform: "rotate(180deg)",
        },
        wrapper.find(StyledArrow)
      );

      wrapper.unmount();
    });
  });

  describe("podDescription", () => {
    it("renders a description when description prop is passed", () => {
      wrapper.setProps({ description: "Description" });
      expect(wrapper.find(StyledDescription).props().children).toEqual(
        "Description"
      );
    });

    it("does not render description when description prop is not passed", () => {
      expect(wrapper.find(StyledDescription).exists()).toEqual(false);
    });
  });

  describe("podFooter", () => {
    it("renders footer when footer prop is passed", () => {
      wrapper.setProps({ footer: "Footer" });
      expect(wrapper.find(StyledFooter).props().children).toEqual("Footer");
    });

    it("does not render footer when footer prop is not passed", () => {
      expect(wrapper.find(StyledFooter).exists()).toEqual(false);
    });
  });

  describe("delete action button", () => {
    it("renders delete action button when onDelete prop is passed", () => {
      wrapper.setProps({ onDelete: () => {} });
      expect(wrapper.find(StyledDeleteButton).exists()).toEqual(true);
    });

    it("does not render delete action button when onDelete prop is not passed", () => {
      expect(wrapper.find(StyledDeleteButton).exists()).toEqual(false);
    });

    it("onDelete prop function gets invoked by clicking delete action button", () => {
      const event = { preventDefault: () => {} };
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find(StyledDeleteButton).props().onAction(event);
      expect(onDelete).toHaveBeenCalled();
    });

    it("onDelete prop function gets invoked by pressing enter key", () => {
      const event = { preventDefault: () => {}, which: 13, type: "keydown" };
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find(StyledDeleteButton).props().onKeyDown(event);
      expect(onDelete).toHaveBeenCalled();
    });

    it("onEdit prop function is not invoked by pressing non-enter key", () => {
      const event = { preventDefault: () => {}, which: 15, type: "keydown" };
      const onDelete = jest.fn();
      wrapper.setProps({ onDelete });
      wrapper.find(StyledDeleteButton).props().onKeyDown(event);
      expect(onDelete).not.toHaveBeenCalled();
    });

    it("toggles the hover state when moving the mouse into the action button", () => {
      wrapper.setProps({ onDelete: () => {} });
      wrapper.find(StyledDeleteButton).props().onMouseEnter();
      expect(wrapper.state().isDeleteHovered).toBe(true);
    });

    it("toggles the hover state when moving the mouse out of the action button", () => {
      wrapper.setProps({ onDelete: () => {} });
      wrapper.find(StyledDeleteButton).props().onMouseLeave();
      expect(wrapper.state().isDeleteHovered).toBe(false);
    });

    it("toggles the focus state when focusing on the action button", () => {
      wrapper.setProps({ onDelete: () => {} });
      wrapper.find(StyledDeleteButton).props().onFocus();
      expect(wrapper.state().isDeleteFocused).toBe(true);
    });

    it("toggles the focus state when bluring the action button", () => {
      wrapper.setProps({ onDelete: () => {} });
      wrapper.find(StyledDeleteButton).props().onBlur();
      expect(wrapper.state().isDeleteFocused).toBe(false);
    });
  });

  describe("undo action button", () => {
    it("renders undo action button when onUndo and softDelete props are passed", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      expect(wrapper.find(StyledUndoButton).exists()).toEqual(true);
    });

    it("does not render delete action button when onDelete prop is not passed", () => {
      expect(wrapper.find(StyledUndoButton).exists()).toEqual(false);
    });

    it("onDelete prop function gets invoked by clicking delete action button", () => {
      const event = { preventDefault: () => {} };
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find(StyledUndoButton).props().onAction(event);
      expect(onUndo).toHaveBeenCalled();
    });

    it("onDelete prop function gets invoked by pressing enter key", () => {
      const event = { preventDefault: () => {}, which: 13, type: "keydown" };
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find(StyledUndoButton).props().onKeyDown(event);
      expect(onUndo).toHaveBeenCalled();
    });

    it("onEdit prop function is not invoked by pressing non-enter key", () => {
      const event = { preventDefault: () => {}, which: 15, type: "keydown" };
      const onUndo = jest.fn();
      wrapper.setProps({ onUndo, softDelete: true });
      wrapper.find(StyledUndoButton).props().onKeyDown(event);
      expect(onUndo).not.toHaveBeenCalled();
    });

    it("toggles the hover state when moving the mouse into the action button", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      wrapper.find(StyledUndoButton).props().onMouseEnter();
      expect(wrapper.state().isUndoHovered).toBe(true);
    });

    it("toggles the hover state when moving the mouse out of the action button", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      wrapper.find(StyledUndoButton).props().onMouseLeave();
      expect(wrapper.state().isUndoHovered).toBe(false);
    });

    it("toggles the focus state when focusing on the action button", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      wrapper.find(StyledUndoButton).props().onFocus();
      expect(wrapper.state().isUndoFocused).toBe(true);
    });

    it("toggles the focus state when bluring the action button", () => {
      wrapper.setProps({ onUndo: () => {}, softDelete: true });
      wrapper.find(StyledUndoButton).props().onBlur();
      expect(wrapper.state().isUndoFocused).toBe(false);
    });
  });

  describe("edit action button", () => {
    it("renders edit action button when onEdit prop is passed", () => {
      wrapper.setProps({ onEdit: () => {} });
      expect(wrapper.find(StyledEditAction).exists()).toEqual(true);
    });

    it("does not render edit action button when onEdit prop is not passed", () => {
      expect(wrapper.find(StyledEditAction).exists()).toEqual(false);
    });

    it("edit action button has a `to` prop if onEdit is a string", () => {
      wrapper.setProps({ onEdit: "someString" });
      expect(wrapper.find(StyledEditAction).props().to).toEqual("someString");
    });

    it("if onEdit prop is an object then it is spread on edit action button as props", () => {
      const onEdit = {
        baz: "baz",
        foo: "foo",
      };
      wrapper.setProps({ onEdit });
      expect(wrapper.find(StyledEditAction).props()).toMatchObject(onEdit);
    });

    it("if onEdit prop is a function it gets invoked by clicking edit action button container", () => {
      const event = { preventDefault: () => {} };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find('[data-element="edit-container"]').props().onClick(event);
      expect(onEdit).toHaveBeenCalled();
    });

    it("if onEdit prop is a function it gets invoked by pressing enter key", () => {
      const event = { preventDefault: () => {}, which: 13, type: "keydown" };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find('[data-element="edit-container"]').props().onKeyDown(event);
      expect(onEdit).toHaveBeenCalled();
    });

    it("if onEdit prop is a function it is not invoked by pressing non-enter key", () => {
      const event = { preventDefault: () => {}, which: 15, type: "keydown" };
      const onEdit = jest.fn();
      wrapper.setProps({ onEdit });
      wrapper.find('[data-element="edit-container"]').props().onKeyDown(event);
      expect(onEdit).not.toHaveBeenCalled();
    });

    it("toggles the hover state when moving the mouse into the action button", () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find('[data-element="edit-container"]').props().onMouseEnter();
      expect(wrapper.state().isEditHovered).toBe(true);
    });

    it("toggles the hover state when moving the mouse out of the action button", () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find('[data-element="edit-container"]').props().onMouseLeave();
      expect(wrapper.state().isEditHovered).toBe(false);
    });

    it("toggles the focus state when focusing on the action button", () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find('[data-element="edit-container"]').props().onFocus();
      expect(wrapper.state().isEditFocused).toBe(true);
    });

    it("toggles the focus state when bluring the action button", () => {
      wrapper.setProps({ onEdit: () => {} });
      wrapper.find('[data-element="edit-container"]').props().onBlur();
      expect(wrapper.state().isEditFocused).toBe(false);
    });
  });

  describe("podContent", () => {
    describe("when onEdit prop has been set", () => {
      describe.each([
        [true, false],
        [false, true],
        [true, true],
      ])(
        "and triggerEditOnContent prop = %s displayEditButtonOnHover = %s",
        (displayEditButtonOnHover, triggerEditOnContent) => {
          it("toggles the hover state when moving the mouse in to the pod", () => {
            wrapper.setProps({
              displayEditButtonOnHover,
              triggerEditOnContent,
              onEdit: () => {},
            });
            wrapper.find(StyledBlock).props().onMouseEnter();
            expect(wrapper.state().isEditHovered).toBe(true);
          });

          it("toggles the hover state when moving the mouse out of the pod", () => {
            wrapper.setProps({
              displayEditButtonOnHover,
              triggerEditOnContent,
              onEdit: () => {},
            });
            wrapper.find(StyledBlock).props().onMouseLeave();
            expect(wrapper.state().isEditHovered).toBe(false);
          });

          it("toggles the focus state when focusing on the pod", () => {
            wrapper.setProps({
              displayEditButtonOnHover,
              triggerEditOnContent,
              onEdit: () => {},
            });
            wrapper.find(StyledBlock).props().onFocus();
            expect(wrapper.state().isEditFocused).toBe(true);
          });

          it("toggles the focus state when bluring on the pod", () => {
            wrapper.setProps({
              displayEditButtonOnHover,
              triggerEditOnContent,
              onEdit: () => {},
            });
            wrapper.find(StyledBlock).props().onBlur();
            expect(wrapper.state().isEditFocused).toBe(false);
          });

          describe("and onEdit prop is a function", () => {
            it("it gets invoked by clicking on the pod content", () => {
              const event = { preventDefault: () => {} };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onClick(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it("it gets invoked by pressing enter key", () => {
              const event = {
                preventDefault: () => {},
                which: 13,
                type: "keydown",
              };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).toHaveBeenCalled();
            });

            it("it is not invoked by pressing non-enter key", () => {
              const event = {
                preventDefault: () => {},
                which: 15,
                type: "keydown",
              };
              const onEdit = jest.fn();
              wrapper.setProps({
                displayEditButtonOnHover,
                triggerEditOnContent,
                onEdit,
              });
              wrapper.find(StyledBlock).props().onKeyDown(event);
              expect(onEdit).not.toHaveBeenCalled();
            });
          });
          describe("and onEdit prop is not a function", () => {
            it("pod content does not have onClick and onKeyDown events", () => {
              wrapper.setProps({ onEdit: {} });
              expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
              expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(
                undefined
              );
            });
          });
        }
      );
    });

    describe("when onEdit prop has not been set", () => {
      it("pod content has no events assigned", () => {
        expect(wrapper.find(StyledBlock).props().onMouseEnter).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onMouseLeave).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onFocus).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onBlur).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onClick).toBe(undefined);
        expect(wrapper.find(StyledBlock).props().onKeyDown).toBe(undefined);
      });
    });
  });

  describe("render", () => {
    it("applies all props to the pod", () => {
      const someRandomProps = {
        prop1: "value1",
        prop2: "value2",
      };

      instance = shallow(<Pod {...someRandomProps} />);
      expect(instance.find(StyledPod).props()).toMatchObject(someRandomProps);
    });

    it("does not apply title prop to containing elements", () => {
      instance = shallow(<Pod title="some-title" />);
      expect(wrapper.is("[title]")).toBe(false);
    });

    it("renders all children passed to it", () => {
      instance = shallow(
        <Pod>
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </Pod>
      );

      expect(instance.find(Button).length).toEqual(3);
    });
  });

  describe("if border prop is set to false", () => {
    it("renders proper box shadow in the StyleBlock", () => {
      wrapper = mount(<Pod border={false} />);
      assertStyleMatch(
        {
          border: "none",
        },
        wrapper.find(StyledBlock)
      );
      wrapper.unmount();
    });
  });

  describe("if internal edit button is enabled", () => {
    it("renders the Pod with relative position", () => {
      wrapper = mount(<Pod internalEditButton />);
      assertStyleMatch({ position: "relative" }, wrapper);
      wrapper.unmount();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const tagWrapper = shallow(<Pod data-element="bar" data-role="baz" />);

      it("include correct component, element and role data tags", () => {
        rootTagTest(tagWrapper, "pod", "bar", "baz");
      });
    });

    describe("on internal elements - include correct component, element and role data tags", () => {
      const tagWrapper = shallow(
        <Pod
          footer="footer"
          onEdit={() => {}}
          subtitle="subtitle"
          title="title"
        />
      );

      elementsTagTest(tagWrapper, ["edit", "footer", "subtitle", "title"]);
    });
  });
});

describe("ActionButtons", () => {
  const commonActionButtonAssertions = ({ renderer, modifier }) => {
    let wrapper;

    describe("when isHovered prop is set", () => {
      it("should match expected styles", () => {
        wrapper = renderer({ isHovered: true }, TestRenderer.create);
        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });

    describe.each([
      ["primary", baseTheme.colors.white],
      ["secondary", baseTheme.pod.secondaryBackground],
      ["tertiary", baseTheme.pod.tertiaryBackground],
      ["transparent", "transparent"],
      ["tile", baseTheme.colors.white],
    ])("when the variant prop is set to %s", (variant, expectedValue) => {
      it("should have expected backgroundColor", () => {
        wrapper = renderer({ variant });
        assertStyleMatch(
          {
            backgroundColor: expectedValue,
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when noBorder prop is set", () => {
      it("should not render the border", () => {
        wrapper = renderer({ noBorder: true });
        assertStyleMatch(
          {
            border: "none",
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when displayOnlyOnHover prop is set", () => {
      it("should not be dislayed", () => {
        wrapper = renderer({ displayOnlyOnHover: true });
        assertStyleMatch(
          {
            display: "none",
          },
          wrapper,
          {
            modifier,
          }
        );
      });
    });

    describe("when isFocused and internalEditButton props are set", () => {
      it("should match expected styles", () => {
        wrapper = renderer({
          isFocused: true,
          internalEditButton: true,
        });
        assertStyleMatch(
          {
            border: "none",
            background: "transparent",
          },
          wrapper,
          {
            modifier,
          }
        );
      });

      describe("without contentTriggersEdit prop", () => {
        it("should have expected outline and border", () => {
          wrapper = renderer({
            isFocused: true,
            internalEditButton: true,
          });
          assertStyleMatch(
            {
              outline: "3px solid #FFB500",
              border: "none",
            },
            wrapper,
            {
              modifier,
            }
          );
        });
      });
    });
  };

  describe("StyledEditAction", () => {
    commonActionButtonAssertions({
      renderer: renderEditAction,
      modifier: `&& > a`,
    });

    let wrapper;
    describe("when displayOnlyOnHover prop is set", () => {
      describe.each(["isHovered", "isFocused"])(
        "with the %s prop set",
        (prop) => {
          it("should have undefined display style", () => {
            wrapper = renderEditAction({
              displayOnlyOnHover: true,
              [prop]: true,
            });
            assertStyleMatch(
              {
                display: undefined,
              },
              wrapper,
              {
                modifier: `&& > a`,
              }
            );
          });
        }
      );
    });
  });

  describe("StyledDeleteButton", () => {
    commonActionButtonAssertions({
      renderer: renderDeleteAction,
      modifier: "&&",
    });
  });

  describe("StyledUndoButton", () => {
    commonActionButtonAssertions({
      renderer: renderUndoAction,
      modifier: "&&",
    });

    let wrapper;
    describe.each(["isHovered", "isFocused"])(
      "with the %s prop set",
      (prop) => {
        it("should have undefined display style", () => {
          wrapper = renderUndoAction({
            displayOnlyOnHover: true,
            [prop]: true,
          });
          assertStyleMatch(
            {
              display: undefined,
            },
            wrapper,
            {
              modifier: `&&`,
            }
          );
        });
      }
    );
  });
});

describe("StyledPod", () => {
  it("sets correct height when height prop value is a number", () => {
    const wrapper = mount(<Pod height={400}>Content</Pod>);

    assertStyleMatch(
      {
        height: "400px",
      },
      wrapper.find(StyledPod)
    );
  });

  it("sets correct height when height prop value is a string", () => {
    const wrapper = mount(<Pod height="100%">Content</Pod>);

    assertStyleMatch(
      {
        height: "100%",
      },
      wrapper.find(StyledPod)
    );
  });
});

describe("StyledBlock", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledBlock({}, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe.each([
    ["primary", baseTheme.colors.white],
    ["secondary", baseTheme.pod.secondaryBackground],
    ["tertiary", baseTheme.pod.tertiaryBackground],
    ["transparent", "transparent"],
    ["tile", baseTheme.colors.white],
  ])("when the variant prop is set to %s", (variant, expectedValue) => {
    it("should have expected backgroundColor", () => {
      wrapper = renderStyledBlock({ variant });
      assertStyleMatch(
        {
          backgroundColor: expectedValue,
        },
        wrapper
      );
    });
  });

  describe("when hasButtons prop is set", () => {
    it("should have the width style set to auto", () => {
      wrapper = renderStyledBlock({ hasButtons: true });
      assertStyleMatch(
        {
          width: "auto",
        },
        wrapper
      );
    });

    describe.each(["fullWidth", "internalEditButton"])(
      "with the %s prop set",
      (prop) => {
        it("should have the width style set to 100%", () => {
          wrapper = renderStyledBlock({ [prop]: true });
          assertStyleMatch(
            {
              width: "100%",
            },
            wrapper
          );
        });
      }
    );
  });

  describe("when variant prop is set to tile", () => {
    it("should match expected styles", () => {
      wrapper = renderStyledBlock({ variant: "tile" });
      assertStyleMatch(
        {
          boxShadow: "0 2px 3px 0 rgba(2,18,36,0.2)",
        },
        wrapper
      );
    });
  });

  describe("when noBorder prop is set", () => {
    it("should not render the border", () => {
      wrapper = renderStyledBlock({ noBorder: true });
      assertStyleMatch(
        {
          border: "none",
        },
        wrapper
      );
    });
  });

  describe("when softDelete prop is set", () => {
    it("should not render the border", () => {
      wrapper = renderStyledBlock({ softDelete: true });
      assertStyleMatch(
        {
          color: baseTheme.pod.softDeleteText,
          backgroundColor: baseTheme.pod.tertiaryBackground,
        },
        wrapper
      );
    });
  });

  describe.each(["isHovered", "isFocused"])("when the %s prop set", (prop) => {
    it("should have undefined display style", () => {
      wrapper = renderStyledBlock({ [prop]: true });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.pod.hoverBackground,
        },
        wrapper
      );
    });

    describe("with internalEditButton prop set and variant set to tile", () => {
      it("should have undefined display style", () => {
        wrapper = renderStyledBlock({
          [prop]: true,
          internalEditButton: true,
          variant: "tile",
        });
        assertStyleMatch(
          {
            backgroundColor: "transparent",
          },
          wrapper
        );
      });
    });
  });

  describe("when the isFocused prop is set", () => {
    describe("with the noBorder prop set", () => {
      it("should have no padding", () => {
        wrapper = renderStyledBlock({ isFocused: true, noBorder: true });
        assertStyleMatch(
          {
            padding: undefined,
          },
          wrapper
        );
      });
    });
    describe("with the internalEditButton prop set", () => {
      describe("without contentTriggersEdit prop", () => {
        it("should have expected border and no outline", () => {
          wrapper = renderStyledBlock({
            isFocused: true,
            internalEditButton: true,
          });
          assertStyleMatch(
            {
              outline: undefined,
              border: "1px solid #CCD6DB",
            },
            wrapper
          );
        });
      });

      describe("with contentTriggersEdit prop", () => {
        it("should have expected outline and no border", () => {
          wrapper = renderStyledBlock({
            isFocused: true,
            internalEditButton: true,
            contentTriggersEdit: true,
          });
          assertStyleMatch(
            {
              outline: "3px solid #FFB500",
              border: "none",
            },
            wrapper
          );
        });
      });
    });
  });
});

describe("StyledFooter", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledFooter({}, TestRenderer.create);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  describe("when variant prop is set to tile", () => {
    it("should have expected border top style", () => {
      wrapper = renderStyledFooter({ variant: "tile" });
      assertStyleMatch(
        {
          borderTop: `1px solid ${baseTheme.pod.border}`,
        },
        wrapper
      );
    });
  });

  describe("when size prop is set", () => {
    it("should have expected padding", () => {
      wrapper = renderStyledFooter({ size: "medium" });
      assertStyleMatch(
        {
          padding: "8px 16px",
        },
        wrapper
      );
    });
  });

  describe("when softDelete prop is set", () => {
    it("should have expected padding", () => {
      wrapper = renderStyledFooter({ softDelete: true });
      assertStyleMatch(
        {
          color: baseTheme.pod.softDeleteText,
        },
        wrapper
      );
    });
  });
});

describe("StyledHeader", () => {
  let wrapper;

  it("should match expected styles", () => {
    wrapper = renderStyledHeader({});
    assertStyleMatch(
      {
        marginBottom: "24px",
      },
      wrapper
    );
  });

  describe("when the internalEditButton prop is set and alignTitle prop is set to right", () => {
    it("should have expected margin right style dependent on the size prop", () => {
      wrapper = renderStyledHeader({
        internalEditButton: true,
        alignTitle: "right",
        size: "medium",
      });
      assertStyleMatch(
        {
          marginRight: "30px",
        },
        wrapper
      );
    });
  });

  describe("when isCollapsed prop is set", () => {
    it("should have cursor pointer and no margin bottom", () => {
      wrapper = renderStyledHeader({ isCollapsed: true });
      assertStyleMatch(
        {
          marginBottom: "0",
          cursor: "pointer",
        },
        wrapper
      );
    });
  });
});

describe("StyledActionsContainer", () => {
  describe("when internalEditButton prop is set", () => {
    it("should have expected styles", () => {
      const wrapper = TestRenderer.create(
        <StyledActionsContainer internalEditButton />
      );
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});

function renderEditAction(props = {}, renderer = mount) {
  return renderer(<StyledEditAction {...props} />);
}

function renderDeleteAction(props = {}, renderer = mount) {
  return renderer(
    <StyledDeleteButton onAction={() => {}} {...props}>
      <Icon type="delete" />
    </StyledDeleteButton>
  );
}

function renderUndoAction(props = {}, renderer = mount) {
  return renderer(
    <StyledUndoButton onAction={() => {}} {...props}>
      <Icon type="undo" />
    </StyledUndoButton>
  );
}

function renderStyledBlock(props = {}, renderer = mount) {
  return renderer(<StyledBlock {...props} />);
}

function renderStyledFooter(props = {}, renderer = mount) {
  return renderer(<StyledFooter {...props} />);
}

function renderStyledHeader(props = {}, renderer = mount) {
  return renderer(<StyledHeader {...props} />);
}
