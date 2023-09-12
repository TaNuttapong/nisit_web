import { ReactNode, createContext, useMemo, useState } from "react";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
  permission: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  permission: "",
});

interface ChildrenProps {
  children: ReactNode;
}
export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const permission = sessionStorage.getItem("permission") ?? "";

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      permission,
    }),
    [pathUrl, setPathUrl, permission]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
