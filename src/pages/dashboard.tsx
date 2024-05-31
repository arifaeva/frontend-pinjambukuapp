import { useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import { Header } from "@/components/sharedui/header";
import { BookCard } from "@/components/sharedui/bookCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ImportBook } from "@/components/sharedui/importBook";

export default function Dashboard() {
  const [searchParams] = useSearchParams(); // query url

  const query = useQuery({
    queryKey: ["books"],
    queryFn: () => bookServices.getData(searchParams.get("search")),
  });

  useEffect(() => {
    query.refetch();
  }, [searchParams]);

  return (
    <main className="space-y-12">
      <Header />
      <ImportBook />
      {query.data?.length === 0 ? <div>Gak ada data</div> : null}
      {query.isLoading ? <div>Loading...</div> : null}
      {query.isError ? (
        <div>Error nih!</div>
      ) : (
        <section className="grid grid-cols-4 gap-4 max-w-5xl m-auto">
          {query.data?.map((book) => {
            return <BookCard key={book._id} book={book} />;
          })}
        </section>
      )}
    </main>
  );
}
