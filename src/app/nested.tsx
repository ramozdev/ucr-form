import { UcrTodoInput } from "@/app/validation";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";

export default function Notes({
  parentIndex,
  control,
  setValue,
  register,
  defaultValues,
}: {
  parentIndex: number;
  control: Control<UcrTodoInput>;
  register: UseFormRegister<UcrTodoInput>;
  setValue: UseFormSetValue<UcrTodoInput>;
  defaultValues?: UcrTodoInput;
}) {
  const _notes = useFieldArray({
    control,
    name: `tasks.${parentIndex}.notes`,
    keyName: "_id",
  });

  return (
    <div className="mb-4">
      {_notes.fields.map((field, index) => {
        if (field.text.action === "REMOVE") return null;

        return (
          <div key={field._id}>
            <div className="flex gap-2">
              <div className="grid gap-1">
                <label
                  htmlFor={`tasks.${parentIndex}.notes.${index}.text.value`}
                >
                  Note
                </label>
                {field.noteId.action === "CREATE" ? (
                  <input
                    className="ring-1"
                    {...register(
                      `tasks.${parentIndex}.notes.${index}.text.value`
                    )}
                  />
                ) : (
                  <input
                    className="ring-1"
                    {...register(
                      `tasks.${parentIndex}.notes.${index}.text.value`,
                      {
                        onChange: ({ target }) => {
                          const { value } = target as HTMLInputElement;
                          setValue(
                            `tasks.${parentIndex}.notes.${index}.text.value`,
                            value
                          );
                          if (
                            value === defaultValues?.tasks?.[index]?.name?.value
                          ) {
                            setValue(
                              `tasks.${parentIndex}.notes.${index}.text.action`,
                              ""
                            );
                            return;
                          }
                          setValue(
                            `tasks.${parentIndex}.notes.${index}.text.action`,
                            `UPDATE`
                          );
                        },
                      }
                    )}
                  />
                )}
              </div>
              <button
                type="button"
                className="mt-auto"
                onClick={() => {
                  if (field.noteId.value === "") {
                    _notes.remove(index);
                    return;
                  }
                  _notes.update(index, {
                    ...field,
                    text: {
                      ...field.text,
                      action: "REMOVE",
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
    </div>
  );
}
