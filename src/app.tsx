import ActionBar from "./components/action-bar/action-bar";
import GameBoard from "./components/game-board/game-board";
import Header from "./components/header/header";

function App() {
  // const isMounted = useMount();

  return (
    <div className="w-full flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center flex-col">
        <GameBoard />
        <ActionBar />
      </div>
    </div>
  );
}

export default App;
