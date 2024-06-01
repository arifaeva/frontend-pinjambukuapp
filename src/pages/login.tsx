import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useAuth(user);
  return (
    <main className="h-screen flex justify-center items-center bg-yellow-100">
      <div className="w-[320px] space-y-2 bg-purple-500 p-5 rounded-lg [box-shadow:5px_5px_black] border-2 border-black">
        <section>
          <h2>Login</h2>
          <p>Welcome back!</p>
        </section>
        <Input
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          className="w-full h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-pink-500 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]"
          onClick={handleLogin}
        >
          Login
        </Button>
        <section>
          Don't have an account ? <Link to="/register">Register</Link>
        </section>
      </div>
    </main>
  );
}
