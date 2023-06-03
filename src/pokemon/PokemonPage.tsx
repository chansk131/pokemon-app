import { Link, Outlet } from "react-router-dom"

const PokemonPage = () => {
  return (
    <div className="flex flex-col items-center h-full gap-4 py-10">
      <div className="flex flex-row gap-1">
        <Link
          to="/pokemon/pikachu"
          className="px-4 py-2 rounded-lg bg-gray-900 text-white"
        >
          Pikachu
        </Link>
        <Link
          to="/pokemon/ditto"
          className="px-4 py-2 rounded-lg bg-gray-900 text-white"
        >
          Ditto
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default PokemonPage
