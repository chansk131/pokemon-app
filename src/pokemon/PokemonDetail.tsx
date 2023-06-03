import { QueryClient, useQuery } from "@tanstack/react-query"
import { LoaderFunctionArgs, useParams } from "react-router-dom"
import {
  fetchPokemonAbilityById,
  fetchPokemonById,
  fetchPokemonFavouriteById,
} from "./pokemon"
import FavouriteButton from "./FavouriteButton"

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: LoaderFunctionArgs) => {
    const { pokemonId = "" } = params

    queryClient.prefetchQuery({
      queryKey: ["pokemon", pokemonId],
      queryFn: () => fetchPokemonById(pokemonId),
    })

    queryClient.prefetchQuery({
      queryKey: ["pokemon", "ability", pokemonId],
      queryFn: () => fetchPokemonAbilityById(pokemonId),
    })

    queryClient.prefetchQuery({
      queryKey: ["pokemon", "favourite", pokemonId],
      queryFn: () => fetchPokemonFavouriteById(pokemonId),
    })

    return {}
  }

const PokemonAbility = () => {
  const { pokemonId = "" } = useParams<{ pokemonId: string }>()

  const { data: pokemonAbilities } = useQuery({
    queryKey: ["pokemon", "ability", pokemonId],
    queryFn: () => fetchPokemonAbilityById(pokemonId),
  })

  if (!pokemonAbilities) {
    return <div>Loading Pokemon Abilities...</div>
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Abilities</h2>
      {pokemonAbilities.map((ability) => (
        <div key={ability.name} className="p-4">
          <h3 className="font-bold">{ability.name}</h3>
          <h3 className="font-bold">Effect:</h3>
          <p>{ability.effect}</p>
        </div>
      ))}
    </div>
  )
}

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
    <div className="w-[50ch] relative">
      <FavouriteButton className="absolute top-0 right-0" />
      <h1 className="text-xl font-bold text-center">Name: {pokemon?.name}</h1>
      <img
        className="m-auto"
        src={pokemon?.image}
        alt={`Image of ${pokemon?.name}`}
        width={200}
        height={200}
      />

      <PokemonAbility />
    </div>
  )
}

export default PokemonDetail
