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
    <main className="space-y-12">
      <Header />
      <section className="grid grid-cols-2 gap-8 max-w-5xl m-auto">
        <div>
          <img
            src={`${API_URL}/${query.data?.file}`}
            width={800}
            height={800}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1>{query.data?.name}</h1>
          <p>{query.data?.author}</p>
          <p>{query.data?.isbn}</p>
          <p className="whitespace-pre-line">{query.data?.description}</p>
          {query.data?.isAvailable === true ||
          query.data?.isAvailable === undefined ? (
            <Button onClick={() => handlePinjamBuku()}>Pinjam Buku</Button>
          ) : (
            <Button disabled>Buku sudah dipinjam</Button>
          )}
        </div>
      </section>
    </main>
  );
}
