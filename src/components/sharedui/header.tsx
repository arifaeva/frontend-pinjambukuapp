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
    <header className="flex justify-between items-center p-4 border-b-2 border-black">
      <div className="flex gap-2 items-center w-[400px]">
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
            <Button className="w-full h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-purple-500 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]">
              Dashboard
            </Button>
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
            <Button className="w-full h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-pink-500 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-fit h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-blue-500 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
