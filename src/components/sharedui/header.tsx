import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "boring-avatars";
import { Input } from "../ui/input";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const { user } = useAuth({});

  // console.log(user);

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      navigate(`/?search=${searchKey}`);
    }
  }

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex gap-2 items-center">
        <Link to="/">
          <div className="font-semibold text-lg">pinjambuku.</div>
        </Link>
        <Input
          placeholder="Search by title or author or description"
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyUp={handleSearch}
        />
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <div>{user.name}</div>
          <Avatar
            name={user.name}
            size={32}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
