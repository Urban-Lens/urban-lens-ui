import AuthBanner from "@/assets/auth-banner.png";
import { LoginForm } from "../components/login-form";
import Logo from "@/components/logo";

export const LoginPage = () => {
  return (
    <main className="flex flex-row gap-12 bg-white">
      <section className="flex flex-col flex-1 p-6">
        <div className="flex justify-start mb-8">
          <Logo />
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          <div className="max-w-[500px] space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Sign in to your account to continue using Urban Lens analytics
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </section>

      <section className="flex-1">
        <img
          src={AuthBanner}
          alt="Auth Banner"
          className="flex-1 object-cover"
        />
      </section>
    </main>
  );
};
