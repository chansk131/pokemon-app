export type Pokemon = {
  name: string
  image: string
}

export const baseUrl = "http://localhost:8080"

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`${baseUrl}/pokemon/${id}`)

  return (await response.json()) as Pokemon
}

export type PokemonAbility = {
  name: string
  effect: string
}

export const fetchPokemonAbilityById = async (
  id: string
): Promise<PokemonAbility[]> => {
  const response = await fetch(`${baseUrl}/pokemon/${id}/ability`)

  return (await response.json()) as PokemonAbility[]
}

export const fetchPokemonFavouriteById = async (
  id: string
): Promise<{ favourite: boolean }> => {
  const response = await fetch(`${baseUrl}/pokemon/${id}/favourite`)

  return (await response.json()) as { favourite: boolean }
}

export const postPokemonFavouriteById = async (
  id: string,
  favourite: boolean
) => {
  return fetch(`${baseUrl}/pokemon/${id}/favourite`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      favourite,
    }),
  })
}
