import React from "react";

const checkItem = (item, itemToFocus) => {
  if (typeof itemToFocus !== "object") {
    return item === itemToFocus;
  }

  return Object.keys(itemToFocus).every(
    (key) => item[key] && itemToFocus[key] === item[key]
  );
};

const getRefs = (length) => Array.from({ length }, () => React.createRef());

export { checkItem, getRefs };
