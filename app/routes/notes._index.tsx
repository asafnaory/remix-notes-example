import React from "react";
import { Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { createNote } from "~/models/notes.server";
import CreateOrUpdateNote from "~/components/AddOrUpdateNote";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.length < 3) {
    return json(
      { errors: { title: "title should be text and more than 3 characters" } },
      { status: 400 }
    );
  }

  if (typeof content !== "string" || title.length < 10) {
    return json(
      {
        errors: { title: "content should be text and more than 10 characters" },
      },
      { status: 400 }
    );
  }

  await createNote({ content, title });
  return redirect("/");
}

const AddNote: React.FC = () => {
  return <CreateOrUpdateNote CreateOrUpdate="Create" />;
};

export default AddNote;
