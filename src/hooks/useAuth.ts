import { API_URL } from "@/config/apiUrl";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { userAtom } from "@/context/user";
import { useNavigate } from "react-router-dom";

interface useAuthProps {
  name?: string;
  email?: string;
  password?: string;
}

export const useAuth = ({ name, email, password }: useAuthProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  async function handleLogin() {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    // console.log(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    Cookies.set("token", data.token);

    setUser(data.user);
    navigate("/", { replace: true });
  }

  async function handleRegister() {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    // console.log(data);
    return data;
  }

  return { handleRegister, handleLogin, user };
};
