import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "./logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/20">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Button variant="link" asChild>
            <Link to="#">Products</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="#">Help</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="#">Community</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="#">Pricing</Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="#">Contact</Link>
          </Button>
        </nav>
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}
