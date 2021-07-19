import React from "react";
import { mount } from "enzyme";
import EditorLink from "./editor-link.component";
import Link from "../../../link";
import { EditorContext } from "../../text-editor.component";

const onLinkAdded = jest.fn();

const render = (props = {}, editMode = true) => {
  return mount(
    <EditorContext.Provider value={{ onLinkAdded, editMode }}>
      <EditorLink {...props} />
    </EditorContext.Provider>
  );
};

describe("EditorLink", () => {
  it("derives the correct url when the valid `contentState` and `entityKey` are provided", () => {
    const contentState = {
      getEntity: (entityKey) => ({ getData: () => entityKey }),
    };

    const wrapper = render({
      contentState,
      entityKey: "bar",
      children: [
        <div key="foo" text="foo">
          foo
        </div>,
      ],
    });

    expect(wrapper.find(Link).props().href).toEqual("https://bar");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("derives the correct url from the `children` element when no `contentState` is provided", () => {
    const wrapper = render({
      entityKey: "bar",
      children: [
        <div key="foo" text="foo">
          foo
        </div>,
      ],
    });

    expect(wrapper.find(Link).props().href).toEqual("https://foo");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("derives the correct url from the `children` element when no `entityKey` is provided", () => {
    const contentState = {
      getEntity: (entityKey) => ({ getData: () => entityKey }),
    };

    const wrapper = render({
      contentState,
      children: [
        <div key="foo" text="foo">
          foo
        </div>,
      ],
    });

    expect(wrapper.find(Link).props().href).toEqual("https://foo");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("does not append `https://` to the url when it contains `http://`", () => {
    const wrapper = render({
      entityKey: "bar",
      children: [
        <div key="foo" text="http://foo">
          foo
        </div>,
      ],
    });

    expect(wrapper.find(Link).props().href).toEqual("http://foo");
    expect(wrapper.find(Link).text()).toEqual("foo");
  });

  it("calls the `onLinkAdded` callback with the validUrl", () => {
    render({
      entityKey: "bar",
      children: [
        <div key="foo" text="http://foo">
          foo
        </div>,
      ],
    });

    expect(onLinkAdded).toHaveBeenCalledWith("http://foo");
  });

  it("prevents link from being tabbable if in editMode", () => {
    const wrapper = render({
      entityKey: "bar",
      children: [
        <div key="foo" text="http://foo">
          foo
        </div>,
      ],
    });

    expect(wrapper.find(Link).props().tabbable).toEqual(false);
  });

  it("allows link to be tabbable if not in editMode", () => {
    const wrapper = render(
      {
        entityKey: "bar",
        children: [
          <div key="foo" text="http://foo">
            foo
          </div>,
        ],
      },
      false
    );

    expect(wrapper.find(Link).props().tabbable).toEqual(true);
  });
});
