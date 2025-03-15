import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/login";
import { useAuth } from "../provider";
import { ILoginCredentials } from "../types";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>();

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLogin((loginResponse) => {
    setToken(loginResponse.access_token);
    navigate("/dashboard");
  });

  const onSubmit = (data: ILoginCredentials) => {
    loginMutation.mutate(data);
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-0.5 px-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
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
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Continue"}
      </Button>
    </form>
  );
};
