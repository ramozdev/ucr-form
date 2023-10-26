import { UcrTodoInput } from "@/app/validation";
import Button from "@/ui/html/button";
import Card from "@/ui/html/card";
import Input from "@/ui/html/input";
import Label from "@/ui/html/label";
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
  parentId,
  defaultValues,
}: {
  parentIndex: number;
  control: Control<UcrTodoInput>;
  register: UseFormRegister<UcrTodoInput>;
  setValue: UseFormSetValue<UcrTodoInput>;
  parentId: string;
  defaultValues?: UcrTodoInput;
}) {
  const _notes = useFieldArray({
    control,
    name: `tasks.${parentIndex}.notes`,
    keyName: "_id",
  });

  return (
    <Card>
      {_notes.fields.map((field, index) => {
        if (field.text.action === "REMOVE") return null;

        return (
          <div key={field._id}>
            <div className="flex gap-2">
              <div className="grid gap-1">
                <Label
                  htmlFor={`tasks.${parentIndex}.notes.${index}.text.value`}
                >
                  Note
                </Label>
                {field.noteId.action === "CREATE" ? (
                  <Input
                    {...register(
                      `tasks.${parentIndex}.notes.${index}.text.value`
                    )}
                  />
                ) : (
                  <Input
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
              <Button.Subtle
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
              </Button.Subtle>
            </div>
          </div>
        );
      })}
      <div>
        <Button.Subtle
          type="button"
          className="mb-8"
          onClick={() => {
            _notes.append({
              noteId: { action: "CREATE", value: "" },
              taskId: { action: "CREATE", value: parentId },
              text: { action: "CREATE", value: "" },
            });
          }}
        >
          Add task
        </Button.Subtle>
      </div>
    </Card>
  );
}
