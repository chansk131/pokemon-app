import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Pokemon, fetchPokemonById } from "./pokemon"

const PokemonDetail = () => {
  const { pokemonId = "" } = useParams<{ pokemonId: string }>()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    fetchPokemonById(pokemonId).then((newPokemon) => setPokemon(newPokemon))
  }, [pokemonId])

  if (!pokemon) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p className="text-xl">Name: {pokemon?.name}</p>
      <img
        src={pokemon?.image}
        alt={`Image of ${pokemon?.name}`}
        width={200}
        height={200}
      />
    </div>
  )
}

export default PokemonDetail
