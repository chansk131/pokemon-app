import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PokemonPage from "./pokemon/PokemonPage"
import PokemonDetail, { loader } from "./pokemon/PokemonDetail"
import { QueryClient, useQueryClient } from "@tanstack/react-query"

const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      element: <PokemonPage />,
      children: [
        {
          path: "pokemon/:pokemonId",
          loader: loader(queryClient),
          element: <PokemonDetail />,
        },
      ],
    },
  ])

function App() {
  const queryClient = useQueryClient()

  return <RouterProvider router={router(queryClient)} />
}

export default App
