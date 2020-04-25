import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import './Recipe.scss';
import { TextField, Button } from '@material-ui/core';
import RecipeDetail from './RecipeDetail';

const Recipe = () => {
  const APP_ID = 'ef5c4c37';
  const APP_KEY = '579eb57e4e1c6bee794eccb787b1b0c1';
  const API_DOMAIN = 'https://api.edamam.com';

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setfilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const SEARCH_API = `${API_DOMAIN}/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const TEN_RECIPES_API = `${SEARCH_API}&from=0&to=10`;

  useEffect(() => {
    getRecipes();
    // getRecipes_LIVE();
    console.log('Fetching data from Server............');
  }, [query]);

  const getRecipes_LIVE = async () => {
    const response = await fetch(TEN_RECIPES_API);
    const jsonData = await response.json();
    setRecipes(jsonData.hits.map((d) => d.recipe));
    setfilteredRecipes(jsonData.hits.map((d) => d.recipe));

    console.log('Recipes Response :: ', filteredRecipes);
  };

  const getRecipes = async () => {
    const jsonData = await import('./data');
    setRecipes(jsonData.default.hits.map((d) => d.recipe));
    setfilteredRecipes(jsonData.default.hits.map((d) => d.recipe));

    console.log('Recipes Response :: ', filteredRecipes);
  };

  const filterRecipes = (val) => {
    console.log('Searching For :: ', val);
    setfilteredRecipes(
      recipes.filter(
        (recipe) =>
          recipe.label.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
          recipe.ingredientLines
            .reduce((a, b) => a + b)
            .toLowerCase()
            .indexOf(val.toLowerCase()) !== -1
      )
    );

    setSearch(val);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <>
      <div className="recipe">
        <h2>Recipe App</h2>
        <form
          className="recipe-search-form"
          onSubmit={(e) => handleFormSubmit(e)}>
          <TextField
            label="search for recipe"
            className="recipe-search"
            value={search}
            onChange={(e) => filterRecipes(e.target.value)}
          />
          <span style={{ position: 'relative', top: 20 }}>
            <Icon.Search />
          </span>
        </form>
      </div>

      <div className="recipe-list">
        {filteredRecipes.map(
          ({ label, ingredientLines, calories, image }, idx) => (
            <RecipeDetail
              title={label}
              calories={calories}
              imgSrc={image}
              preparationSteps={ingredientLines}
              key={idx}
            />
          )
        )}
      </div>
    </>
  );
};

export default Recipe;
