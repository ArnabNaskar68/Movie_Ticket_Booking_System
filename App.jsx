import './App.css';
import {useState} from 'react';

function App() {
  const [pokemon, setPokemon]= useState('');// searched value from input for API call
  const [pokemonData, setPokemonData] = useState(null);
  
 async function ClickHandler(e){
    e.preventDefault();
    if(!pokemon) return;
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
      if(!response.ok){
        console.log("error fetching data");
      }
      const data= await response.json();
        setPokemonData(data);
    }catch{
      console.log('Error displaying data');
    }
  }

  return (
    <>
    <input type='text'
    placeholder='Pokemon name'

    onChange={(e)=>setPokemon(e.target.value)}
    ></input>

    <button
    onClick={ClickHandler}
    >Enter</button>

    {pokemonData && (
      <div>
        <p>{pokemonData.name}</p>
        <img src={pokemonData.sprites.front_default}
         alt={pokemonData.name}
         />
      </div>
    )}
    </>
  );
}

export default App;
