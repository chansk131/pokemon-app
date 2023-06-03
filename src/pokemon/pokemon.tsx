export type Pokemon = {
  name: string
  image: string
}

export const baseUrl = "http://localhost:8080"

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`${baseUrl}/pokemon/${id}`)

  return (await response.json()) as Pokemon
}
