import { useReducer, createContext } from "react";
type AppState = {
  mode: string;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme : dark)").matches
    ? "dark"
    : "light",
};

type Action = {
  type: "SWITCH_MODE";
};

function reducer(state: AppState, action: Action): AppState {
  if (action.type == "SWITCH_MODE") {
    localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
    return { mode: state.mode === "dark" ? "light" : "dark" };
  } else {
    return state;
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState,
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}
export { Store, StoreProvider };
