import authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Features/slice1";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");

    try {
      const userData = await authservice.createAccount(data);

      if (userData) {
        const user = await authservice.getCurrentuser();

        if (user) {
          dispatch(
            login({
              $id: user.$id,
              email: user.email,
              name: user.name,
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
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              {...register("name", { required: true })}
            />

            <Input
              label="Email:"
              type="email"
              {...register("email", { required: true })}
            />

            <Input
              label="Password:"
              type="password"
              {...register("password", { required: true })}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
