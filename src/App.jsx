import React from "react";
import { useState, useEffect } from "react";

import Card from "./hooks/card";
import "./styles/App.css";
import Loading from "./hooks/loading";
import FilterBar from "./hooks/filterBar";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch("../public/data.json");

        if (!res.ok) {
          throw new Error("Response is not okyyy");
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.mesage);
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
    if(filters.length > 1) {
      setFilters(filters.filter((eachFilt) => eachFilt.id !== id));
    }
    else {
      setFilters(null)
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
        ) : error ? (
          <Error />
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
        )
        }
      </div>
    </div>
  );
}

export default App;
