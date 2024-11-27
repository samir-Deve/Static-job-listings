import React from "react";
import { useState, useEffect } from "react";

import Card from "./hooks/card";
import "./styles/App.css";
import Loading from "./hooks/loading";
import FilterBar from "./hooks/filterBar";
import ErrorCom from "./hooks/error";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch("/data.json");
        console.log(res)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    FetchData();
  }, []);

  function addToFilt(e) {
    if (!filters) {
      setFilters([{ id: 0, lang: e.target.innerText }]);
    } else {
      setFilters((pre) => [
        ...pre,
        {
          id: filters.length,
          lang: e.target.innerText,
        },
      ]);
    }
  }

  function Delete(id) {
    if (filters.length > 1) {
      setFilters(filters.filter((eachFilt) => eachFilt.id !== id));
    } else {
      setFilters(null);
    }
  }

  function ClearAll() {
    setFilters(null);
  }

  return (
    <div className="main-cont">
      <header className="header"></header>

      <div className="cards">
        {filters && (
          <FilterBar filters={filters} Delete={Delete} ClearAll={ClearAll} />
        )}
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <ErrorCom isError={isError} />
        ) : !filters ? (
          data.map((eachCard) => (
            <Card key={eachCard.id} eachCard={eachCard} addToFilt={addToFilt} />
          ))
        ) : (
          data
            .filter((eachData) =>
              filters.some((eachMap) =>
                eachData.languages.includes(eachMap.lang)
              )
            )
            .map((filteredCard) => (
              <Card
                key={filteredCard.id}
                eachCard={filteredCard}
                addToFilt={addToFilt}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default App;
