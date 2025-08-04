import AppleBox from "./apple-box";

export default function GameOver() {
  return (
    <>
      <div className="relative bg-background rounded-xl w-full h-full flex items-center justify-center flex-col">
        <div className="select-none touch-none flex flex-col justify-center items-center max-w-screen-sm w-full p-4 py-12">
          <div className="text-3xl mb-6">🎉 클리어!</div>
          <AppleBox />
        </div>
      </div>
    </>
  );
}
