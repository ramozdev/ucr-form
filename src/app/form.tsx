"use client";

import { CudTodoInput, cudTodoSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { deleteTask } from "@/app/_action/tasks/delete";
import { createTask } from "@/app/_action/tasks/create";
import { updateTask } from "@/app/_action/tasks/update";
import { UpdateTaskInput } from "@/app/_validation/tasks/update";
import { CreateTaskInput } from "@/app/_validation/tasks/create";
import {
  processArrayCreate,
  processArrayDelete,
  processArrayUpdate,
  processObjectUpdate,
} from "@/lib/cud";
import { DeleteTaskInput } from "@/app/_validation/tasks/delete";

type Props = {
  defaultData?: CudTodoInput;
};

export default function Form({ defaultData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { defaultValues },
  } = useForm<CudTodoInput>({
    defaultValues: defaultData,
    resolver: zodResolver(cudTodoSchema, undefined, { raw: true }),
  });

  const debugPayload = {
    update: {
      todo: processObjectUpdate(watch("todo")),
      tasks: processArrayUpdate(watch("tasks")) as UpdateTaskInput[],
    },
    delete: {
      tasks: processArrayDelete(watch("tasks")) as DeleteTaskInput[],
    },
    create: {
      tasks: processArrayCreate(watch("tasks")) as CreateTaskInput[],
    },
  };

  const onSubmit = handleSubmit(({ todo, tasks }) => {
    startTransition(() => {
      try {
        const payload = {
          update: {
            todo: processObjectUpdate(todo),
            tasks: processArrayUpdate(tasks) as UpdateTaskInput[],
          },
          delete: {
            tasks: processArrayDelete(tasks) as DeleteTaskInput[],
          },
          create: {
            tasks: processArrayCreate(tasks) as CreateTaskInput[],
          },
        };

        for (const id of payload.delete.tasks) {
          deleteTask(id);
        }
        for (const step of payload.create.tasks) {
          createTask({
            ...step,
          });
        }
        for (const step of payload.update.tasks) {
          updateTask(step);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    });
  });

  const _tasks = useFieldArray({ control, name: "tasks", keyName: "_id" });

  return (
    <main className="max-w-screen-md mx-auto">
      <form onSubmit={onSubmit} className="grid">
        <label>TODOS</label>
        <input
          {...register("todo.name.value", {
            onChange: ({ target }) => {
              const { value } = target as HTMLInputElement;
              setValue(`todo.name.value`, value);
              if (value !== defaultValues?.todo?.name?.value) {
                setValue(`todo.name.action`, `UPDATE`);
                return;
              }
              setValue(`todo.name.action`, "");
            },
          })}
        />

        <div className="mb-4">
          {_tasks.fields.map((field, index) => {
            if (field.name.action === "DELETE") return null;

            return (
              <div key={field._id}>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor={`tasks.${index}.name.value`}>Name</label>
                    <input
                      {...register(`tasks.${index}.name.value`, {
                        onChange: ({ target }) => {
                          const { value } = target as HTMLInputElement;
                          setValue(`tasks.${index}.name.value`, value);
                          if (field.taskId.action !== "CREATE") {
                            if (
                              value ===
                              defaultValues?.tasks?.[index]?.name?.value
                            ) {
                              setValue(`tasks.${index}.name.action`, "");
                              return;
                            }
                            setValue(`tasks.${index}.name.action`, `UPDATE`);
                          }
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor={`tasks.${index}.completed.value`}>
                      Completed
                    </label>
                    <input
                      type="checkbox"
                      {...register(`tasks.${index}.completed.value`, {
                        onChange: ({ target }) => {
                          const { checked } = target as HTMLInputElement;
                          setValue(`tasks.${index}.completed.value`, checked);
                          if (field.taskId.action !== "CREATE") {
                            if (
                              checked ===
                              defaultValues?.tasks?.[index]?.completed?.value
                            ) {
                              setValue(`tasks.${index}.completed.action`, "");
                              return;
                            }
                            setValue(
                              `tasks.${index}.completed.action`,
                              `UPDATE`
                            );
                          }
                        },
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      if (field.taskId.value === "") {
                        _tasks.remove(index);
                        return;
                      }
                      _tasks.update(index, {
                        ...field,
                        name: {
                          ...field.name,
                          action: "DELETE",
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="button"
              className="mb-8"
              onClick={() => {
                _tasks.append({
                  name: { value: "", action: "CREATE" },
                  taskId: { value: "", action: "CREATE" },
                  completed: { value: false, action: "CREATE" },
                });
              }}
            >
              Añadir tarea
            </button>
          </div>
        </div>

        <button>Save changes</button>
      </form>

      <pre>{JSON.stringify(debugPayload, null, 2)}</pre>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
