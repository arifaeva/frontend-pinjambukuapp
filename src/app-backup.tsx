import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useMutation, useQuery } from "react-query";
import { bookServices } from "./services/bookServices";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import { IBook } from "./types/entity";

const initialBookVal: IBook = {
  name: "",
  description: "",
  isbn: "",
  author: "",
  file: null,
};

export default function App() {
  const [book, setBook] = useState(initialBookVal);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["books"],
    queryFn: bookServices.getData,
  });

  const { mutate: handleAddBook } = useMutation({
    mutationFn: bookServices.createData,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Buku berhasil ditambahkan!");
      setBook(initialBookVal);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex justify-center my-20">
      <main className="w-[400px] space-y-4">
        <h1 className="text-xl font-bold">Books</h1>
        <section className="space-y-2">
          <Input
            value={book.name}
            placeholder="name"
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
          <Input
            value={book.description}
            placeholder="description"
            onChange={(e) => setBook({ ...book, description: e.target.value })}
          />
          <Input
            value={book.isbn}
            placeholder="isbn"
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
          />
          <Input
            value={book.author}
            placeholder="author"
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
          <Input
            type="file"
            onChange={(e) =>
              setBook({ ...book, file: e.target.files as FileList })
            }
          />
          <Button
            onClick={() => {
              handleAddBook(book);
            }}
          >
            Submit Book
          </Button>
        </section>
        {query.data?.length === 0 ? <div>Gak ada data</div> : null}
        {query.isLoading ? <div>Loading...</div> : null}
        {query.isError ? (
          <div>Error nih!</div>
        ) : (
          <section className="grid grid-cols-2">
            {query.data?.map((book) => {
              return (
                <div key={book._id}>
                  <div>{book.name}</div>
                  <div className="whitespace-pre-line">{book.description}</div>
                  <div>{book.isbn}</div>
                  <div>{book.author}</div>
                  <div>
                    <img
                      src={`http://localhost:8000/${book.file}`}
                      width={800}
                      height={800}
                    />
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
