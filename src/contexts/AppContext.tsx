import { ReactNode, createContext, useMemo, useState } from "react";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
  permission: string;
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  branch: string;
  setBranch: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  permission: "",
  email: "",
  setEmail: () => {},
  name: "",
  setName: () => {},
  branch: "",
  setBranch: () => {},
  role: "",
  setRole: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}
export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const permission = sessionStorage.getItem("permission") ?? "";
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      permission,
      email,
      setEmail,
      name,
      setName,
      branch,
      setBranch,
      role,
      setRole,
    }),
    [
      pathUrl,
      setPathUrl,
      permission,
      email,
      setEmail,
      name,
      setName,
      branch,
      setBranch,
      role,
      setRole,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
