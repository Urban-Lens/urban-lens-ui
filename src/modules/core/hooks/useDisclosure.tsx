import { useState } from "react";

export const useDisclosure = (initialState = false) => {
  const [opened, setOpened] = useState(initialState);

  const open = () => setOpened(true);
  const close = () => setOpened(false);
  const toggle = () => setOpened((prev) => !prev);

  return { opened, open, close, toggle };
};
