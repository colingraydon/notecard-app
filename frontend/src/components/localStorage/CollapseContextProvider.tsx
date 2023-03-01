import { WithChildrenProps } from "../../types";
import { CollapseContext, SetCollapseContext } from "./contextFunctions";
import { useCollapse } from "./useCollapse";

export function CollapseContextProvider({ children }: WithChildrenProps) {
  const [collapse, setCollapse] = useCollapse();
  return (
    <CollapseContext.Provider value={collapse}>
      <SetCollapseContext.Provider value={setCollapse}>
        {children}
      </SetCollapseContext.Provider>
    </CollapseContext.Provider>
  );
}
