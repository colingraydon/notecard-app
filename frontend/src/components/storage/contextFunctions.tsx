import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Collapse } from "../../types";

export const CollapseContext = createContext<Collapse>(false);
export const SetCollapseContext = createContext<
  Dispatch<SetStateAction<Collapse>>
>((value) => {
  console.log("Default function:", value);
});

export function useCollapseContext() {
  return useContext(CollapseContext);
}

export function useSetCollapseContext() {
  return useContext(SetCollapseContext);
}
