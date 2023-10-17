import Form from "@/app/form";
import { UcrTodoInput } from "@/app/validation";

const tasks = [
  {
    taskId: "3",
    name: "egg",
    completed: "false",
  },
  {
    taskId: "4",
    name: "Ham",
    completed: "false",
  },
];

const notes = [
  {
    noteId: "3",
    text: "Lorem ipsum",
  },
  {
    noteId: "4",
    text: "Dolor sit amet",
  },
];

const defaultData: UcrTodoInput = {
  todo: {
    todoId: {
      action: "ID",
      value: "12",
    },
    name: {
      action: "",
      value: "Shopping List",
    },
    description: {
      action: "",
      value: "",
    },
  },

  tasks: tasks.map((task) => ({
    taskId: {
      action: "ID",
      value: task.taskId,
    },
    name: {
      action: "",
      value: task.name,
    },
    completed: {
      action: "",
      value: false,
    },
    notes: notes.map(({ noteId, text }) => ({
      noteId: {
        action: "ID",
        value: noteId,
      },
      taskId: {
        action: "",
        value: task.taskId,
      },
      text: {
        action: "",
        value: text,
      },
    })),
  })),
};

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto">
      <Form defaultData={defaultData} />
    </main>
  );
}
