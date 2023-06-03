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
    // When mutate is called:
    onMutate: async (newFavourite) => {
      console.log("mutating", newFavourite)
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["pokemon", "favourite", pokemonId],
      })

      // Snapshot the previous value
      const previousFavourite = queryClient.getQueryData([
        "pokemon",
        "favourite",
        pokemonId,
      ])

      // Optimistically update to the new value
      queryClient.setQueryData(["pokemon", "favourite", pokemonId], {
        favourite: newFavourite,
      })

      // Return a context with the previous and new todo
      return { previousFavourite, newFavourite }
    },
    // If the mutation fails, use the context we returned above
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["pokemon", "favourite", pokemonId],
        context?.previousFavourite
      )
    },
    // Always refetch after error or success:
    onSettled: () => {
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
