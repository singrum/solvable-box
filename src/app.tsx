import GameBoard from "./components/game-board/game-board";
import GameHeader from "./components/game-header/game-header";
import Header from "./components/header/header";

function App() {
  // const isMounted = useMount();

  return (
    <div className="space-y-4 max-w-screen-sm w-full">
      <Header />
      <GameHeader />
      <GameBoard />
    </div>
  );
}

export default App;
