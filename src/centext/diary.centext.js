import { createContext, useState } from "react";

const DiaryContext = createContext();

const DiaryContextProvider = ({ children }) => {
  const [openState, setOpenState] = useState(false);
  const updateOpenState = (date) => {
    console.log("click");
  };

  const contextValue = {
    isOpen: openState,
    updateOpenHandler: updateOpenState,
  };
  return (
    <DiaryContext.Provider value={contextValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryContext, DiaryContextProvider };