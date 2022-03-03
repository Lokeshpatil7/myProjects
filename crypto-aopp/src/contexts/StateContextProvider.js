import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();
const baseUrl = "https://google-search1.p.rapidapi.com/google-search";
//https://google-search3.p.rapidapi.com/api/v1
export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      // headers: {
      //   'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      //   'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      //   //9a929b8bd8msh66c7a48b91f802bp19cf94jsn753bc3740093
      // },

      headers: {
        'x-rapidapi-host': 'google-search1.p.rapidapi.com',
        'x-rapidapi-key': '9a929b8bd8msh66c7a48b91f802bp19cf94jsn753bc3740093'
      }
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
