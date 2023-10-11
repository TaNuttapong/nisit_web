import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { PathEnum } from "../enum/path.enum";

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
  token: string;
  setToken: (value: string) => void;
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
  token: "",
  setToken: () => {},
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
  const [token, setToken] = useState<string>(Cookies.get("token") ?? "");

  useEffect(() => {
    if (token === "" && pathUrl !== PathEnum.LOGIN) {
      setEmail("");
      setName("");
      setBranch("");
      setRole("");
      if (pathUrl !== PathEnum.HOME) {
        window.location.href = PathEnum.LOGIN;
      }
    }
  }, []);

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
      token,
      setToken,
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
      token,
      setToken,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
