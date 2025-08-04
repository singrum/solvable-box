import ActionBar from "./components/action-bar/action-bar";
import GameBoard from "./components/game-board/game-board";
import GameOver from "./components/game-over/game-over";
import Header from "./components/header/header";
import { useGameStore } from "./stores/game-store";

function App() {
  // const isMounted = useMount();
  const gameState = useGameStore((e) => e.gameState);
  return (
    <div className="w-full flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center flex-col">
        {gameState === "playing" ? <GameBoard /> : <GameOver />}

        <ActionBar />
      </div>
    </div>
  );
}

export default App;
