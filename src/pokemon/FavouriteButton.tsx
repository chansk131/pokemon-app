import Heart from "../assets/heart.png"
import HeartBlank from "../assets/heart-blank.png"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPokemonFavouriteById, postPokemonFavouriteById } from "./pokemon"

type Props = {
  className?: string
}

const FavouriteButton = ({ className }: Props) => {
  const { pokemonId = "" } = useParams<{ pokemonId: string }>()

  const { data: favouriteData } = useQuery({
    queryKey: ["pokemon", "favourite", pokemonId],
    queryFn: () => fetchPokemonFavouriteById(pokemonId),
  })

  const active = favouriteData?.favourite

  const queryClient = useQueryClient()
  const favouriteMutation = useMutation({
    mutationFn: async (favourite: boolean) =>
      postPokemonFavouriteById(pokemonId, favourite),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pokemon", "favourite", pokemonId],
      })
    },
  })

  return (
    <button
      className={className}
      onClick={() => favouriteMutation.mutate(!active)}
    >
      <img
        src={active ? Heart : HeartBlank}
        alt="Favourite"
        height={40}
        width={40}
      />
    </button>
  )
}

export default FavouriteButton
