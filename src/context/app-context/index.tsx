import { Context, Dispatch, SetStateAction, createContext, useState } from "react";

interface IAppContext {
  navigationIndex: number;
  setNavigationIndex: Dispatch<SetStateAction<number>>;
}

const AppContext: Context<IAppContext | null> = createContext<IAppContext | null>(null);

const AppState = (props: { children: any }) => {
  const [navigationIndex, setNavigationIndex] = useState<number>(0);
  return (
    <AppContext.Provider
      value={{
        navigationIndex,
        setNavigationIndex,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppState };
