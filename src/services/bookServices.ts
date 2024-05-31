import { API_URL } from "@/config/apiUrl";
import { IBook } from "@/types/entity";

export const bookServices = {
  getData: async (searchKey: string | null) => {
    const query = searchKey ? `/?search=${searchKey}` : "";
    const res = await fetch(`${API_URL}/books${query}`);
    const data = (await res.json()) as IBook[];
    return data;
  },

  getSingleData: async (id: string) => {
    const res = await fetch(`${API_URL}/books/${id}`);
    const data = (await res.json()) as IBook;
    return data;
  },

  createData: async ({ name, description, isbn, author, file }: IBook) => {
    if (!name || !description || !isbn || !author || !file) {
      throw new Error("All field must be filled");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isbn", isbn);
    formData.append("author", author);
    formData.append("file", file[0]);

    const res = await fetch("http://localhost:8000/books", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ name, description, isbn, author }),
      body: formData,
    });
    const data = (await res.json()) as IBook;
    return data;
  },

  updateData: async (id: string) => {
    const res = await fetch(`${API_URL}/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: id }),
    });
    const data = await res.json();
    return data;
  },
};
