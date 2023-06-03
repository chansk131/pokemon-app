import { RouterProvider, createBrowserRouter } from "react-router-dom"
import PokemonPage from "./pokemon/PokemonPage"
import PokemonDetail from "./pokemon/PokemonDetail"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonPage />,
    children: [
      {
        path: "pokemon/:pokemonId",
        element: <PokemonDetail />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
