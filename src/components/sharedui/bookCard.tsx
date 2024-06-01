import { API_URL } from "@/config/apiUrl";
import { IBook } from "@/types/entity";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const BookCard = ({ book }: { book: IBook }) => {
  return (
    <main className="h-[360px] rounded-lg bg-rose-500 [box-shadow:5px_5px_black] border-black border-4">
      <div className="relative  h-[70%] m-auto bg-rose-500">
        <img
          src={`${API_URL}/${book.file}`}
          width="150"
          className="rounded-lg bg-cover object-center absolute -bottom-3 left-3"
        />
      </div>
      <div className="flex justify-between items-center h-[30%] p-3 bg-sky-500 rounded-t-lg">
        <section>
          <h3>{book.name}</h3>
          <p>{book.author}</p>
        </section>
        <Link to={`/${book._id}`}>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full bg-rose-500 text-black hover:bg-black hover:text-white border-2 border-black"
          >
            More...
          </Button>
        </Link>
      </div>
    </main>
  );
};
