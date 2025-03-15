import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

      {/* Email Field */}
      <div className="my-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      {/* Sign-up Link */}
      <p className="text-sm text-gray-500 my-2">
        New Here?{" "}
        <Link
          to="/register"
          className="text-primary hover:underline font-semibold"
        >
          Sign up to get started!
        </Link>
      </p>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full hover:cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Continue"}
      </Button>
    </form>
  );
};
