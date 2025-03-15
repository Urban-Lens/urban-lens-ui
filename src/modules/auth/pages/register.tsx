import AuthBanner from "@/assets/auth-banner.png"; // Make sure this asset exists
import Logo from "@/assets/logo.png";
import { RegisterForm } from "../components/register-form";

export const RegisterPage = () => {
  return (
    <main className="flex flex-row gap-12 bg-white">
      <section className="flex flex-col flex-1 p-6 pr-50">
        <div className="flex justify-start mb-8">
          <img src={Logo} alt="Urban Lens Logo" className="h-8" />
        </div>

        <div className="flex flex-col items-center justify-center flex-1">
          <div className="max-w-[500px] space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Create an account</h2>
              <p className="text-sm text-muted-foreground">
                Urban Lens provides dynamic, real-time analytics on traffic
                patterns, vehicle movement, foot traffic, and urban safety.
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </section>

      <section className="flex-1">
        <img
          src={AuthBanner}
          alt="Auth Banner"
          className="h-full w-full object-contain"
        />
      </section>
    </main>
  );
};

export default RegisterPage;
