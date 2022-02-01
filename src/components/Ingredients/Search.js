import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const input = useRef();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (enteredFilter === input.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch(
          "https://react-http-b3bb5-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json" +
            query
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            let loadedIngredients = [];
            for (let key in data) {
              loadedIngredients.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, input]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            ref={input}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
