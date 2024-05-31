import { useQuery } from "react-query";
import { bookServices } from "@/services/bookServices";
import { Header } from "@/components/sharedui/header";
import { BookCard } from "@/components/sharedui/bookCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
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
      <section className="grid grid-cols-4 gap-4 max-w-5xl m-auto">
        {query.data?.map((book) => {
          return <BookCard key={book._id} book={book} />;
        })}
      </section>
    </main>
  );
}
