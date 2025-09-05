import { createContext, useState } from "react";

export const dataContext = createContext();

function UserContext({ children }) {
  const [startRes, setStartRes] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState("");
  const [feature, setFeature] = useState("chat");
  const [showResult, setShowResult] = useState("");
  const [prevFeature, setPrevFeature] = useState("chat");
  const [genImgUrl, setGenImgUrl] = useState("");
  const [user, setUser] = useState({
    data: null,
    mime_type: null,
    imgUrl: null,
  });
  const [prevUser, setPrevUser] = useState({
    data: null,
    mime_type: null,
    prompt: null,
    imgUrl: null,
  });

  const value = {
    startRes,
    setStartRes,
    popUp,
    setPopUp,
    input,
    setInput,
    feature,
    setFeature,
    showResult,
    setShowResult,
    prevFeature,
    setPrevFeature,
    genImgUrl,
    setGenImgUrl,
    user,
    setUser,
    prevUser,
    setPrevUser,
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
}

export default UserContext;
