import { useRouter } from 'next/router'

function GamePage() {
  const router = useRouter()
  const idBoardGame  = router.query.idBoardgame

  return (
    <div>
      <h1>Jeu #{idBoardGame}</h1>
      {/* ... */}
    </div>
  )
}

export default GamePage
