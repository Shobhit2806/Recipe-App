import React, {useEffect,useState} from 'react';
import Recipe from './recipe.js'    
import './App.css';

const App = () =>{
  const App_ID="a929f90f";
  const App_Key="ae0df60e2ea71bfd595e7485befd1cb4"
  

  const [recipes, setRecipes]  = useState([]);
  const [search, setSearch] = useState("");
  const [query,setQuery] = useState("banana")


  useEffect(() =>{
    getRecipes();
  },[query])

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  } 

  const getSearch =e =>{
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"  value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe">
      {recipes.map(recipe => (
        <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
        
        />

        
      ))}
      </div>
    </div>
  )

}

export default App;
