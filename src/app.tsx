import GameBoard from "./components/game-board/game-board";
import Header from "./components/header/header";

function App() {
  return (
    <div className="space-y-4 max-w-screen-sm w-full">
      <Header />
      <GameBoard />
    </div>
  );
}

export default App;
