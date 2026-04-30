import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../Features/slice1";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);

      if (session) {
        const userdata = await authservice.getCurrentuser();
        if (userdata) {
          dispatch(
            login({
              $id: userdata.$id,
              email: userdata.email,
              name: userdata.name,
            }),
          );
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold">Sign in</h2>

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-5">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: true })}
          />

          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
