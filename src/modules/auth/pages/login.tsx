import { Aperture } from "lucide-react";
import { LoginForm } from "../components/login-form";
import AuthBanner from "@/assets/auth-banner.png";

export const LoginPage = () => {
  return (
    <main className="grid grid-cols-2 gap-12 bg-white px-4">
      <section className="flex flex-col gap-32">
        <div></div>

        <LoginForm />
      </section>
      <section>
        <img src={AuthBanner} />
      </section>
    </main>
  );
};
