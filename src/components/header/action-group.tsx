import { ModeToggle } from "../mode-toggle";
import GithubButton from "./github-button";

export default function ActionGroup() {
  return (
    <div className="flex gap-2">
      <ModeToggle />
      <GithubButton />
    </div>
  );
}
