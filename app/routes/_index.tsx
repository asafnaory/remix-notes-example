import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import React from "react";
import Notes from "~/components/Notes";
import { deleteNote, getAllNotes } from "~/models/notes.server";

export async function loader({ request }: LoaderArgs) {
  const notes = await getAllNotes();
  return json(notes);
}

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  const id = form.get("id") as string;
  if (!id) {
    return json(
      {
        errors: { title: "should have an id" },
      },
      { status: 400 }
    );
  }

  await deleteNote(id);
  return redirect("/");
};

const HomePage: React.FC = () => {
  const notes = useLoaderData<typeof loader>();
  return <Notes notes={notes} />;
};

export default HomePage;
