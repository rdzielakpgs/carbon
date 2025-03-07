/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { css } from "styled-components";
import TabTitle from "./__internal__/tab-title/tab-title.component";
import { Tabs, Tab } from "./tabs.component";
import { TabContext } from "./tab/index";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledTabs from "./tabs.style";
import StyledTab from "./tab/tab.style";
import { StyledTabTitle } from "./__internal__/tab-title/tab-title.style";
import {
  assertStyleMatch,
  simulate,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import { StyledTabsHeaderWrapper } from "./__internal__/tabs-header/tabs-header.style";
import { DrawerSidebarContext } from "../drawer";

function render(props) {
  return mount(
    <Tabs {...props}>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 2"
        tabId="uniqueid2"
      >
        TabContent
      </Tab>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 3"
        tabId="uniqueid3"
      >
        TabContent
      </Tab>
    </Tabs>
  );
}

function renderStyles(props) {
  return mount(<StyledTabs {...props} />);
}

const TabChildren = ({ id, error, warning, info, text }) => {
  const context = useContext(TabContext);

  useEffect(() => {
    context.setError(id, !!error);
    context.setWarning(id, !!warning);
    context.setInfo(id, !!info);
  }, [id, context, error, warning, info]);

  return (
    <div style={{ height: "28px", width: "50px", backgroundColor: "pink" }}>
      {text}
    </div>
  );
};

const MockWrapper = ({
  errors = {},
  warnings = {},
  infos = {},
  validationStatusOverride = undefined,
  renderHiddenTabs = true,
}) => {
  return (
    <Tabs
      validationStatusOverride={validationStatusOverride}
      renderHiddenTabs={renderHiddenTabs}
    >
      <Tab
        title="Tab Title 1"
        tabId="uniqueid1"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <TabChildren
          error={errors.one}
          warning={warnings.one}
          info={infos.one}
          id="foo"
        />
        <TabChildren
          error={errors.two}
          warning={warnings.two}
          info={infos.two}
          id="bar"
        />
      </Tab>
      <Tab
        title="Tab Title 2"
        tabId="uniqueid2"
        errorMessage="error"
        warningMessage="warning"
        infoMessage="info"
      >
        <TabChildren
          error={errors.three}
          warning={warnings.three}
          info={infos.three}
          id="baz"
        />
        <TabChildren
          error={errors.four}
          warning={warnings.four}
          info={infos.four}
          id="bax"
        />
      </Tab>
    </Tabs>
  );
};

describe("Tabs", () => {
  testStyledSystemMargin((props) => (
    <Tabs {...props}>
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ));

  testStyledSystemMargin((props) => (
    <Tabs {...props} position="left">
      <Tab
        errorMessage=""
        warningMessage=""
        infoMessage=""
        title="Tab Title 1"
        tabId="uniqueid1"
      >
        TabContent
      </Tab>
    </Tabs>
  ));

  describe("when `headerWidth` is provided", () => {
    describe.each(["35%", "100px", "5em"])(
      "and value of %s is provided",
      (headerWidth) => {
        it("should render correct `width` in `TabsHeader` component, and `Tab` `width` should be `auto`", () => {
          const wrapper = mount(
            <Tabs position="left" headerWidth={headerWidth}>
              <Tab title="Tab Title 1" tabId="uniqueid1">
                TabContent
              </Tab>
            </Tabs>
          );

          assertStyleMatch(
            {
              width: headerWidth,
            },
            wrapper,
            {
              modifier: css`
                ${StyledTabsHeaderWrapper}
              `,
            }
          );

          assertStyleMatch(
            {
              width: "auto",
            },
            wrapper,
            {
              modifier: css`
                ${StyledTab}
              `,
            }
          );
        });
      }
    );
  });

  describe('when `headerWidth` is provided, and `position="top"`', () => {
    it(" should render console error", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});

      mount(
        <Tabs position="top" headerWidth="500px">
          <Tab title="Tab Title 1" tabId="uniqueid1">
            TabContent
          </Tab>
        </Tabs>
      );

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        "Warning: Failed prop type: Invalid usage of prop headerWidth in Tabs. The headerWidth can be used only if position is set to left\n    in Tabs"
      );
    });
  });

  describe("when passing custom className as a prop", () => {
    it("adds it to the classList", () => {
      const wrapper = render({ className: "class" });
      expect(wrapper.exists(".class")).toEqual(true);
    });
  });

  describe('When position is "left"', () => {
    it("applies proper styling", () => {
      const wrapper = renderStyles({ position: "left" });
      assertStyleMatch(
        {
          display: "flex",
          width: "100%",
        },
        wrapper
      );
    });
  });

  describe('When "selectedTabId" is passed a valid "tabId"', () => {
    it("displays the specified Tab", () => {
      const wrapper = render({ selectedTabId: "uniqueid2" });

      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });
  });

  describe("When renderHiddenTabs", () => {
    describe("is false", () => {
      it("renders only the currently visible tab", () => {
        const tab = mount(
          <Tabs renderHiddenTabs={false}>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 1"
              tabId="uniqueid1"
            >
              <div name="foo" />
              <div name="bar" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 2"
              tabId="uniqueid2"
            >
              <div name="baz" />
              <div name="bax" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 3"
              tabId="uniqueid3"
            >
              <div name="baz" />
              <div name="bax" />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tab).toHaveLength(1);
        expect(tab.props().isTabSelected).toEqual(true);
        expect(tab.props().title).toEqual("Tab Title 1");
        expect(tab.props().tabId).toEqual("uniqueid1");
      });

      it.each(["error", "warning", "info"])(
        "adds the correct %s state to the tab header",
        (validation) => {
          const validationProp = {
            [`${validation}s`]: { one: true },
          };
          const tabTitle = mount(
            <MockWrapper {...validationProp} renderHiddenTabs={false} />
          ).find(TabTitle);

          expect(tabTitle.at(0).props()[validation]).toEqual(true);
          expect(tabTitle.at(1).props()[validation]).toEqual(false);
        }
      );
    });

    describe("is true", () => {
      it("returns an array of all Tab components with the first selected", () => {
        const tabs = mount(
          <Tabs renderHiddenTabs>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 1"
              tabId="uniqueid1"
            >
              <div name="foo" />
              <div name="bar" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 2"
              tabId="uniqueid2"
            >
              <div name="baz" />
              <div name="bax" />
            </Tab>
            <Tab
              errorMessage=""
              warningMessage=""
              infoMessage=""
              title="Tab Title 3"
              tabId="uniqueid3"
            >
              <div name="baz" />
              <div name="bax" />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tabs).toHaveLength(3);
        expect(tabs.at(0).props().isTabSelected).toEqual(true);
        expect(tabs.at(1).props().isTabSelected).toEqual(false);
        expect(tabs.at(2).props().isTabSelected).toEqual(false);
      });
    });
  });

  describe("When a TabTitle has click event", () => {
    it("does nothing if triggered by keydown", () => {
      const wrapper = render();
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick({
            type: "keydown",
            target: { dataset: { tabid: "uniqueid2" } },
          });
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(false);
    });

    it("updates to make the associated Tab visible", () => {
      const wrapper = render();
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick({
            type: "click",
            target: { dataset: { tabid: "uniqueid2" } },
          });
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });

    it('calls the "onTabChange" callback if one is passed on click of a TabTitle', () => {
      const onTabChange = jest.fn();
      const wrapper = render({ onTabChange });
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick({
            type: "click",
            target: { dataset: { tabid: "uniqueid2" } },
          });
      });
      wrapper.update();
      expect(onTabChange).toHaveBeenCalledWith("uniqueid2");
    });

    it("updates the selected tab when a new id is passed via the 'selectedTabId' prop", () => {
      const wrapper = render({ selectedTabId: "uniqueid1" });
      wrapper.setProps({ selectedTabId: "uniqueid2" });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
      wrapper.setProps({ selectedTabId: "uniqueid1" });
      wrapper.update();
      expect(wrapper.find(Tab).at(0).props().isTabSelected).toEqual(true);
    });

    it('only calls the "onTabChange" callback when visible tabId does not match new tabId', () => {
      const onTabChange = jest.fn();
      const wrapper = render({ onTabChange, selectedTabId: "uniqueid1" });
      act(() => {
        wrapper
          .find(TabTitle)
          .at(1)
          .props()
          .onClick({
            type: "click",
            target: { dataset: { tabid: "uniqueid2" } },
          });
      });
      wrapper.update();
      wrapper.setProps({ selectedTabId: "uniqueid2" });
      wrapper.update();
      expect(onTabChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("When a TabTitle has a keydown event", () => {
    describe('and the component has position "top" (default)', () => {
      it.each([0, 1, 2])(
        "updates to make the associated Tab visible when the right key is pressed",
        (index) => {
          const wrapper = render();
          act(() => {
            simulate.keydown.pressRightArrow(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 2 ? 0 : index + 1;
          expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(
            true
          );
        }
      );

      it.each([0, 2, 1])(
        "updates to make the associated Tab visible when the left key is pressed",
        (index) => {
          const wrapper = render();
          act(() => {
            simulate.keydown.pressLeftArrow(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 0 ? 2 : index - 1;
          expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(
            true
          );
        }
      );
    });

    describe('and the component has position "left"', () => {
      it.each([0, 1, 2])(
        "updates to make the associated Tab visible when the down key is pressed",
        (index) => {
          const wrapper = render({ position: "left" });
          act(() => {
            simulate.keydown.pressDownArrow(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 2 ? 0 : index + 1;
          expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(
            true
          );
        }
      );

      it.each([0, 2, 1])(
        "updates to make the associated Tab visible when the up key is pressed",
        (index) => {
          const wrapper = render({ position: "left" });
          act(() => {
            simulate.keydown.pressUpArrow(wrapper.find(TabTitle).at(index));
          });
          wrapper.update();
          const newIndex = index === 0 ? 2 : index - 1;
          expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(
            true
          );
        }
      );
    });

    it.each([0, 1, 2])("does nothing if key is not an arrow key", (index) => {
      const wrapper = render();
      act(() => {
        simulate.keydown.pressD(wrapper.find(TabTitle).at(index));
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(0).props().isTabSelected).toEqual(true);
    });
  });

  describe("With one Tab", () => {
    it("renders as the visible tab", () => {
      const tab = mount(
        <Tabs renderHiddenTabs={false}>
          <Tab
            errorMessage=""
            warningMessage=""
            infoMessage=""
            title="Tab Title 1"
            tabId="uniqueid1"
          >
            <div />
          </Tab>
        </Tabs>
      ).find(Tab);

      expect(tab.props().isTabSelected).toEqual(true);
      expect(tab.props().title).toEqual("Tab Title 1");
      expect(tab.props().tabId).toEqual("uniqueid1");
    });
  });

  describe("Validation", () => {
    const updateProps = (wrapper, props) => {
      wrapper.setProps({
        errors: { ...wrapper.props().errors, ...props.errors },
        warnings: { ...wrapper.props().warnings, ...props.warnings },
        infos: { ...wrapper.props().infos, ...props.infos },
      });
      wrapper.update();
    };

    describe("When a Tab child has an error", () => {
      it('sets "tabHasError" to false when a Tab has no errors', () => {
        const tabTitle = mount(<MockWrapper />).find(TabTitle);

        expect(tabTitle.at(0).props().error).toEqual(false);
        expect(tabTitle.at(1).props().error).toEqual(false);
      });

      it('sets "tabHasError" to true when a Tab has errors', () => {
        const tabTitle = mount(<MockWrapper errors={{ one: true }} />).find(
          TabTitle
        );

        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(1).props().error).toEqual(false);
      });

      it('sets "tabHasError" to true for any Tab that has an error', () => {
        const tabTitle = mount(
          <MockWrapper errors={{ one: true, three: true }} />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(1).props().error).toEqual(true);
      });

      it('maintains "tabHasError" status when Tab children update', () => {
        const wrapper = mount(
          <MockWrapper errors={{ one: true, three: true }} />
        );
        updateProps(wrapper, { errors: { two: true, three: false } });
        let tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(1).props().error).toEqual(false);
        updateProps(wrapper, { errors: { one: false, two: false } });
        tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().error).toEqual(false);
      });

      it('does not set warnings and infos if "tabHasErrors" is true', () => {
        const tabTitle = mount(
          <MockWrapper
            errors={{ one: true, three: true }}
            warnings={{ one: true, three: true }}
            infos={{ one: true, three: true }}
          />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(1).props().error).toEqual(true);
        expect(tabTitle.at(0).props().warning).toEqual(false);
        expect(tabTitle.at(1).props().warning).toEqual(false);
        expect(tabTitle.at(0).props().info).toEqual(false);
        expect(tabTitle.at(1).props().info).toEqual(false);
      });
    });

    describe("When a Tab child has an error and a warning", () => {
      it('sets "tabHasWarning" to false when a Tab has no warnings', () => {
        const tabTitle = mount(<MockWrapper />).find(TabTitle);

        expect(tabTitle.at(0).props().warning).toEqual(false);
        expect(tabTitle.at(1).props().warning).toEqual(false);
      });

      it('does not set "tabHasWarning" when "tabHasError" is true', () => {
        const tabTitle = mount(
          <MockWrapper errors={{ one: true }} warnings={{ one: true }} />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(0).props().warning).toEqual(false);
      });
    });

    describe("When a Tab child has a warning and no errors", () => {
      it('sets "tabHasWarning" is true and "tabHasError" is falsy', () => {
        const tabTitle = mount(<MockWrapper warnings={{ one: true }} />).find(
          TabTitle
        );

        expect(tabTitle.at(0).props().warning).toEqual(true);
        expect(tabTitle.at(1).props().warning).toEqual(false);
      });

      it('sets "tabHasWarning" for each Tab that has warning and "tabHasError" is falsy', () => {
        const tabTitle = mount(
          <MockWrapper warnings={{ one: true, three: true }} />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().warning).toEqual(true);
        expect(tabTitle.at(1).props().warning).toEqual(true);
      });

      it('maintains "tabHasWarning" status when Tab children update', () => {
        const wrapper = mount(
          <MockWrapper warnings={{ one: true, three: true }} />
        );
        updateProps(wrapper, { warnings: { two: true, three: false } });
        let tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().warning).toEqual(true);
        expect(tabTitle.at(1).props().warning).toEqual(false);
        updateProps(wrapper, { warnings: { one: false, two: false } });
        tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().warning).toEqual(false);
      });
    });

    describe("When a Tab child has an info and no errors or warnings", () => {
      it('sets "tabHasWarning" is true and "tabHasError" is falsy', () => {
        const tabTitle = mount(<MockWrapper infos={{ one: true }} />).find(
          TabTitle
        );

        expect(tabTitle.at(0).props().info).toEqual(true);
        expect(tabTitle.at(1).props().info).toEqual(false);
      });

      it('sets "tabHasInfo" for each Tab that has info and "tabHasError" and "tabHasWarning" are falsy', () => {
        const tabTitle = mount(
          <MockWrapper infos={{ one: true, three: true }} />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().info).toEqual(true);
        expect(tabTitle.at(1).props().info).toEqual(true);
      });

      it('maintains "tabHasInfo" status when Tab children update', () => {
        const wrapper = mount(
          <MockWrapper infos={{ one: true, three: true }} />
        );
        updateProps(wrapper, { infos: { two: true, three: false } });
        let tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().info).toEqual(true);
        expect(tabTitle.at(1).props().info).toEqual(false);
        updateProps(wrapper, { infos: { one: false, two: false } });
        tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().info).toEqual(false);
      });
    });

    describe("custom targeting", () => {
      it("supports overriding the targeted content", () => {
        const wrapper = mount(
          <DrawerSidebarContext.Provider value={{ isInSidebar: true }}>
            <Tabs>
              <Tab
                title="Tab Title 1"
                tabId="uniqueid1"
                errorMessage=""
                warningMessage=""
                infoMessage=""
              >
                TabContent
              </Tab>
            </Tabs>
          </DrawerSidebarContext.Provider>
        );
        act(() => {
          wrapper
            .find(TabTitle)
            .props()
            .onClick({
              type: "click",
              target: { dataset: { tabid: "uniqueid1" } },
            });
        });
        expect(wrapper.find(Tab).exists()).toEqual(false);
      });
    });

    describe("validation status overrides", () => {
      it('sets "tabHasError" to true when override is set', () => {
        const tabTitle = mount(
          <MockWrapper
            errors={{ one: false, three: true }}
            validationStatusOverride={{
              uniqueid1: { error: true },
              uniqueid2: { error: false },
            }}
          />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().error).toEqual(true);
        expect(tabTitle.at(1).props().error).toEqual(false);
      });

      it('sets "tabHasWarning" to true when override is set', () => {
        const tabTitle = mount(
          <MockWrapper
            warnings={{ one: false, three: true }}
            validationStatusOverride={{
              uniqueid1: { warning: true },
              uniqueid2: { warning: false },
            }}
          />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().warning).toEqual(true);
        expect(tabTitle.at(1).props().warning).toEqual(false);
      });

      it('sets "tabHasInfo" to true when override is set', () => {
        const tabTitle = mount(
          <MockWrapper
            infos={{ one: false, three: true }}
            validationStatusOverride={{
              uniqueid1: { info: true },
              uniqueid2: { info: false },
            }}
          />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().info).toEqual(true);
        expect(tabTitle.at(1).props().info).toEqual(false);
      });
    });

    describe("Keyboard behaviour", () => {
      let container;
      let wrapper;
      const tabTitles = ["tab-1", "tab-2", "tab-3"];

      const ConditionalChildrenMock = () => {
        const [showAllTabs, setShowAllTabs] = React.useState(true);

        const generateTab = (tabTitle) => (
          <Tab title={tabTitle} tabId={tabTitle} key={tabTitle}>
            {tabTitle}
          </Tab>
        );

        return (
          <>
            <button
              id="foo"
              type="button"
              onClick={() => setShowAllTabs((prev) => !prev)}
            >
              Toggle children
            </button>
            <Tabs>
              {!showAllTabs && generateTab(tabTitles[0])}
              {showAllTabs &&
                tabTitles.map((tabTitle) => generateTab(tabTitle))}
            </Tabs>
          </>
        );
      };

      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);

        wrapper = mount(<ConditionalChildrenMock />, {
          attachTo: document.getElementById("enzymeContainer"),
        });
      });

      afterEach(() => {
        if (container?.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      const runFocusExpectations = (keyDown, array) =>
        array.forEach((index) => {
          const child = wrapper.update().find(StyledTabTitle).at(index);
          expect(child.getDOMNode()).toBeFocused();
          simulate.keydown[keyDown](child);
        });

      const toggleChildren = () => {
        act(() => {
          wrapper.find("#foo").prop("onClick")();
        });

        expect(wrapper.update().find(StyledTabTitle).length).toEqual(1);

        act(() => {
          wrapper.find("#foo").prop("onClick")();
        });

        expect(wrapper.update().find(StyledTabTitle).length).toEqual(3);
      };

      it("is consistent when navigating with the arrow keys and the composition of the children changes", () => {
        wrapper.find(StyledTabTitle).first().getDOMNode().focus();

        runFocusExpectations("pressLeftArrow", [0, 2, 1, 0, 2]);

        toggleChildren();

        wrapper.find(StyledTabTitle).first().getDOMNode().focus();

        runFocusExpectations("pressLeftArrow", [0, 2, 1, 0, 2]);

        toggleChildren();

        wrapper.find(StyledTabTitle).first().getDOMNode().focus();

        runFocusExpectations("pressRightArrow", [0, 1, 2, 0]);
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      const wrapper = shallow(
        <Tabs data-element="bar" data-role="baz">
          <Tab
            tabId="1"
            title="Test"
            errorMessage=""
            warningMessage=""
            infoMessage=""
          />
        </Tabs>
      ).find(StyledTabs);

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "tabs", "bar", "baz");
      });
    });
  });
});
