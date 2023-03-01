import { Collapse } from "../../types";
import { useLocalStorage } from "./useLocalStorage";

export function useCollapse() {
  return useLocalStorage<Collapse>("collapse", true);
}
