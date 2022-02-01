import React, { useCallback, useEffect, useState } from "react";

import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientHandler = (newIngredient) => {
    setIsLoading(true);
    fetch(
      "https://react-http-b3bb5-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(newIngredient),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        setUserIngredients((prevIngredient) => [
          ...prevIngredient,
          {
            id: data.name,
            ...newIngredient,
          },
        ]);
      })
      .catch((err) => setError("Something went wrong.."));
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-http-b3bb5-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        setIsLoading(false);
        const newIngredients = userIngredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        );

        setUserIngredients(newIngredients);
      })
      .catch((err) => setError("Something went wrong.."));
  };

  const filterIngredientsHandler = useCallback((loadIngredients) => {
    setUserIngredients(loadIngredients);
  }, []);

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError} />}

      <IngredientForm onAdd={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
