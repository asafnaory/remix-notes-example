import React, { useState } from "react";
import { Form } from "@remix-run/react";

interface CreateOrNoteProps {
  CreateOrUpdate: "Create";
}

interface UpdateOrNoteProps {
  CreateOrUpdate: "Update";
  content: string;
  title: string;
  id: string;
}

type CreateOrUpdateNoteProps = CreateOrNoteProps | UpdateOrNoteProps;

export default function CreateOrUpdateNote(
  props: CreateOrUpdateNoteProps
): JSX.Element {
  const [title, setTitle] = useState(
    props.CreateOrUpdate === "Update" ? props.title : ""
  );
  const [content, setContent] = useState(
    props.CreateOrUpdate === "Update" ? props.content : ""
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Create a Note</h1>
      <Form method="post">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-800 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-800 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            required
          ></textarea>
        </div>
        {props.CreateOrUpdate === "Update" && (
          <input type="hidden" name="id" value={props.id} />
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {props.CreateOrUpdate === "Create" ? "Create" : "Update"}
          </button>
        </div>
      </Form>
    </div>
  );
}
