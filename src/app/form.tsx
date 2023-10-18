"use client";

import { UcrTodoInput, ucrTodoSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCreatedItems, getRemovedItems, getUpdatedItems } from "ucr";
import Notes from "@/app/nested";

type Props = {
  defaultData?: UcrTodoInput;
};

export default function Form({ defaultData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { defaultValues },
  } = useForm<UcrTodoInput>({
    defaultValues: defaultData,
    resolver: zodResolver(ucrTodoSchema, undefined, { raw: true }),
  });

  const debugPayload = {
    update: {
      todos: getUpdatedItems([watch("todo")]),
      tasks: watch("tasks")
        .map(({ notes, ...task }) => {
          const parsedNotes = getUpdatedItems(notes);
          if (parsedNotes.length === 0)
            return { ...getUpdatedItems([task])[0] };

          return {
            ...getUpdatedItems([task])[0],
            notes: parsedNotes,
          };
        })
        .filter((task) => Object.keys(task).length > 0),
    },
    create: {
      todos: getCreatedItems([watch("todo")]),
      tasks: watch("tasks")
        .map(({ notes, ...task }) => {
          const parsedNotes = getCreatedItems(notes);
          if (parsedNotes.length === 0)
            return { ...getCreatedItems([task])[0] };

          return {
            ...getCreatedItems([task])[0],
            notes: parsedNotes,
          };
        })
        .filter((task) => Object.keys(task).length > 0),
    },
    remove: {
      todos: getRemovedItems([watch("todo")]),
      tasks: watch("tasks").flatMap(({ notes, ...task }) =>
        getRemovedItems([task])
      ),
      notes: watch("tasks").flatMap(({ notes }) => getRemovedItems(notes)),
    },
  };

  const onSubmit = handleSubmit(({ todo, tasks }) => {
    const payload = {
      update: {
        todos: getUpdatedItems([watch("todo")]),
        tasks: watch("tasks")
          .map(({ notes, ...task }) => {
            const parsedNotes = getUpdatedItems(notes);
            if (parsedNotes.length === 0)
              return { ...getUpdatedItems([task])[0] };

            return {
              ...getUpdatedItems([task])[0],
              notes: parsedNotes,
            };
          })
          .filter((task) => Object.keys(task).length > 0),
      },
      create: {
        todos: getCreatedItems([watch("todo")]),
        tasks: watch("tasks")
          .map(({ notes, ...task }) => {
            const parsedNotes = getCreatedItems(notes);
            if (parsedNotes.length === 0)
              return { ...getCreatedItems([task])[0] };

            return {
              ...getCreatedItems([task])[0],
              notes: parsedNotes,
            };
          })
          .filter((task) => Object.keys(task).length > 0),
      },
      remove: {
        todos: getRemovedItems([watch("todo")]),
        tasks: watch("tasks").flatMap(({ notes, ...task }) =>
          getRemovedItems([task])
        ),
        notes: watch("tasks").flatMap(({ notes }) => getRemovedItems(notes)),
      },
    };

    alert("Check the console");
    console.log(payload);
  });

  const _tasks = useFieldArray({ control, name: "tasks", keyName: "_id" });

  return (
    <main className="mx-auto max-w-screen-md">
      <form onSubmit={(e) => void onSubmit(e)} className="grid">
        <div className="mb-4 font-semibold">ToDo</div>

        <div className="mb-4 grid gap-1">
          <label>Name</label>
          <input
            className="ring-1"
            {...register("todo.name.value", {
              onChange: ({ target }) => {
                const { value } = target as HTMLInputElement;
                setValue(`todo.name.value`, value);
                if (value === defaultValues?.todo?.name?.value) {
                  setValue(`todo.name.action`, "");
                  return;
                }
                setValue(`todo.name.action`, `UPDATE`);
              },
            })}
          />
        </div>

        <div className="mb-4 grid gap-1">
          <label>Description</label>
          <textarea
            className="ring-1"
            {...register("todo.description.value", {
              onChange: ({ target }) => {
                const { value } = target as HTMLInputElement;
                setValue(`todo.description.value`, value);
                if (value === defaultValues?.todo?.description?.value) {
                  setValue(`todo.description.action`, "");
                  return;
                }
                setValue(`todo.description.action`, `UPDATE`);
              },
            })}
          ></textarea>
        </div>

        <div className="mb-4 font-semibold">Tasks</div>
        <div className="mb-4">
          {_tasks.fields.map((field, index) => {
            if (field.name.action === "REMOVE") return null;

            return (
              <div key={field._id} className="border mb-4">
                <div className="flex gap-2">
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.name.value`}>Name</label>
                    {field.taskId.action === "CREATE" ? (
                      <input
                        className="ring-1"
                        {...register(`tasks.${index}.name.value`)}
                      />
                    ) : (
                      <input
                        className="ring-1"
                        {...register(`tasks.${index}.name.value`, {
                          onChange: ({ target }) => {
                            const { value } = target as HTMLInputElement;
                            setValue(`tasks.${index}.name.value`, value);
                            if (
                              value ===
                              defaultValues?.tasks?.[index]?.name?.value
                            ) {
                              setValue(`tasks.${index}.name.action`, "");
                              return;
                            }
                            setValue(`tasks.${index}.name.action`, `UPDATE`);
                          },
                        })}
                      />
                    )}
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor={`tasks.${index}.completed.value`}>
                      Completed
                    </label>
                    {field.taskId.action === "CREATE" ? (
                      <input
                        type="checkbox"
                        {...register(`tasks.${index}.completed.value`)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        {...register(`tasks.${index}.completed.value`, {
                          onChange: ({ target }) => {
                            const { checked } = target as HTMLInputElement;
                            setValue(`tasks.${index}.completed.value`, checked);
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
                          },
                        })}
                      />
                    )}
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
                          action: "REMOVE",
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
                <Notes
                  parentId={field.taskId.value}
                  control={control}
                  parentIndex={index}
                  setValue={setValue}
                  register={register}
                />
              </div>
            );
          })}
        </div>
        <div>
          <button
            type="button"
            className="mb-8 ring-1"
            onClick={() => {
              _tasks.append({
                name: { value: "", action: "CREATE" },
                taskId: { value: "", action: "CREATE" },
                completed: { value: false, action: "CREATE" },
                notes: [],
              });
            }}
          >
            Add task
          </button>
        </div>

        <button className="ring-1">Save changes</button>
      </form>

      <div className="flex gap-2">
        <div>
          <div>
            <pre>getUCR()</pre>
          </div>
          <pre>{JSON.stringify(debugPayload, null, 2)}</pre>
        </div>
        <div>
          <div>
            <pre>watch()</pre>
          </div>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
