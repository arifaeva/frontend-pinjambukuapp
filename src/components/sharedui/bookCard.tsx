import { API_URL } from "@/config/apiUrl";
import { IBook } from "@/types/entity";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const BookCard = ({ book }: { book: IBook }) => {
  return (
    <main className="space-y-2">
      <div>
        <img
          src={`${API_URL}/${book.file}`}
          width={800}
          height={800}
          className="rounded-lg bg-cover"
        />
      </div>
      <div className="flex justify-between items-center">
        <section>
          <h3>{book.name}</h3>
          <p>{book.author}</p>
        </section>
        <Link to={`/${book._id}`}>
          <Button size="sm" variant="outline">
            Lihat
          </Button>
        </Link>
      </div>
    </main>
  );
};
