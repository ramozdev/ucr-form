import Form from "@/app/form";
import { CudTodoInput } from "@/app/validation";

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

const defaultData: CudTodoInput = {
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
  })),
};

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto">
      <Form defaultData={defaultData} />
    </main>
  );
}
