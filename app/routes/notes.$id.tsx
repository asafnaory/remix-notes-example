import { json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { getNoteById, updateNote } from "~/models/notes.server";
import CreateOrUpdateNote from "~/components/AddOrUpdateNote";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const id = params.id;
  if (!id) {
    return redirect("/");
  }
  const note = await getNoteById(id);
  return json({ note, id });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const id = formData.get("id") as string;

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

  await updateNote(id, { content, title });
  return redirect("/");
}

interface UpdateNoteProps {
  title: string;
  content: string;
  id: string;
}

const UpdateNote = (props: UpdateNoteProps): JSX.Element => {
  const { note, id } = useLoaderData<typeof loader>();
  if (!note) {
    return <></>;
  }
  return (
    <CreateOrUpdateNote
      CreateOrUpdate="Update"
      content={note.content}
      title={note.title}
      id={id}
    />
  );
};

export default UpdateNote;
