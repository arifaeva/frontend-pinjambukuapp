import { useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IBook } from "@/types/entity";

const initialBookVal: IBook = {
  name: "",
  description: "",
  isbn: "",
  author: "",
  file: null,
};

export const ImportBook = () => {
  const [searchParams] = useSearchParams(); // query url
  const [book, setBook] = useState(initialBookVal);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["books"],
    queryFn: () => bookServices.getData(searchParams.get("search")),
  });

  useEffect(() => {
    query.refetch();
  }, [searchParams]);

  const { mutate: handleAddBook } = useMutation({
    mutationFn: bookServices.createData,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("A new book has been added!");
      setBook(initialBookVal);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex justify-center my-20">
      <main className="w-[400px] space-y-4 bg-purple-500 p-5 rounded-lg [box-shadow:5px_5px_black] border-black border-2">
        <h1 className="text-xl font-bold">Add Book to Catalog</h1>
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
            className="w-full h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-yellow-400 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]"
            onClick={() => {
              handleAddBook(book);
            }}
          >
            Submit Book
          </Button>
        </section>
      </main>
    </div>
  );
};
