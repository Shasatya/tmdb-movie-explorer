import { ThemeSelector } from "./ThemeSelector";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="bg-surface w-full px-6 py-4 border-b border-surface shadow-sm">
      <nav>
        <ul className="flex items-center justify-between no-underline">
          <li>
            <button className="text-2xl font-bold text-text-primary">M</button>
          </li>

          <li className="flex items-center">
            <ThemeSelector />
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
