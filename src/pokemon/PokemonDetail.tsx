import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchPokemonById } from "./pokemon"

const PokemonDetail = () => {
  const { pokemonId = "" } = useParams<{ pokemonId: string }>()

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => fetchPokemonById(pokemonId),
  })

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
