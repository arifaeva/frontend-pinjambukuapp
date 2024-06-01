import { Header } from "@/components/sharedui/header";
import { bookServices } from "@/services/bookServices";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_URL } from "@/config/apiUrl";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SinglePage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetching data berdasarkan id
  const query = useQuery({
    queryKey: [`book-${id}`],
    queryFn: () => bookServices.getSingleData(id as string),
  });

  const { mutate: handlePinjamBuku } = useMutation({
    mutationFn: () => bookServices.updateData(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Buku berhasil dipinjam!");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  console.log(query.data?.isAvailable);

  return (
    <main className="space-y-12 bg-yellow-100 pb-12 h-full">
      <Header />
      <section className="grid grid-cols-2 max-w-5xl m-auto bg-pink-500 p-8 rounded-xl [box-shadow:8px_8px_black] border-black border-2">
        <div className="w-[350px]">
          <img
            src={`${API_URL}/${query.data?.file}`}
            width={800}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-4 bg-yellow-100 rounded-xl p-6 border-black border-2">
          <h1>{query.data?.name}</h1>
          <p>{query.data?.author}</p>
          <p>{query.data?.isbn}</p>
          <p className="whitespace-pre-line">{query.data?.description}</p>
          {query.data?.isAvailable === true ||
          query.data?.isAvailable === undefined ? (
            <Button
              className="w-fit h-12 items-center justify-center overflow-hidden rounded-md border-2 border-black bg-blue-500 px-6 font-medium text-black hover:text-white transition-all duration-100 [box-shadow:5px_5px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_black]"
              onClick={() => handlePinjamBuku()}
            >
              Borrow book
            </Button>
          ) : (
            <Button disabled>Book has ben borrowed</Button>
          )}
        </div>
      </section>
    </main>
  );
}
