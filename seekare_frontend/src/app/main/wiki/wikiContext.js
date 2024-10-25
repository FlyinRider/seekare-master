import React, { useState, useContext } from "react";

const WikiContext = React.createContext();

const WikiContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const value = { questions, setQuestions, pageNum, setPageNum };

  return <WikiContext.Provider value={value}>{children}</WikiContext.Provider>;
};

const useWikiContext = () => {
  const context = useContext(WikiContext);
  if (!context)
    throw new Error("useWikiContext must be used within WikiContextProvider");
  return context;
};

export { WikiContextProvider, useWikiContext };
