import { createContext, useEffect, useState } from "react";
import { Props } from "../Components/DefaultLayout";
type themeState = "light" | "dark";

export const Context = createContext<any>(null);

const ContextProvider = ({ children }: Props) => {
  const [mode, setmode] = useState<themeState>(
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode")!)
      : "light",
  );

  const handleSwitch = () => {
    if (mode == "light") {
      setmode("dark");
      document.body.className = "bg-light";
      localStorage.setItem("mode", JSON.stringify("light"));
      return;
    }
    document.body.className = "bg-dark";
    localStorage.setItem("mode", JSON.stringify("dark"));
    setmode("light");
  };

  const initialState = {
    mode,
    handleSwitch,
  };

  useEffect(() => {
    handleSwitch();
  }, []);

  return <Context.Provider value={initialState}>{children}</Context.Provider>;
};
export default ContextProvider;
