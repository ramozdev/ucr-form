type CudObject = {
  [key: string]: {
    action: "" | "create" | "update" | "delete" | "id";
    value: string;
  };
};

export function processObjectUpdate(obj: CudObject) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, { action }]) => action === "update" || action === "id")
      .map(([key, { value }]) => [key, value])
  );
}

export function processArrayUpdate(arr: CudObject[]) {
  const isUpdate =
    arr.every((item) =>
      Object.values(item).every(({ action }) => action !== "delete")
    ) &&
    arr.every((item) =>
      Object.values(item).every(({ action }) => action !== "create")
    );

  if (!isUpdate) return [];

  return arr
    .map((item) =>
      Object.entries(item)
        .filter(([_, { action }]) => action === "update" || action === "id")
        .map(([key, { value }]) => [key, value])
    )
    .map((item) => Object.fromEntries(item as [string, string][]));
}

export function processArrayDelete(arr: CudObject[]) {
  const isDelete = arr.some((item) =>
    Object.values(item).some(({ action }) => action === "delete")
  );

  if (!isDelete) return [];

  return arr
    .filter((item) =>
      Object.values(item).some(({ action }) => action === "delete")
    )
    .map((item) => item);
}

export function processArrayCreate(arr: CudObject[]) {
  const isCreate =
    arr.every((item) =>
      Object.values(item).every(({ action }) => action !== "delete")
    ) &&
    arr.every((item) =>
      Object.values(item).every(({ action }) => action !== "update")
    );

  if (!isCreate) return [];

  return arr
    .filter((item) =>
      Object.values(item).some(({ action }) => action === "create")
    )
    .map((item) =>
      Object.entries(item)
        .filter(([_, { action }]) => action === "create" || action === "id")
        .map(([key, { value }]) => [key, value])
    )
    .map((item) => Object.fromEntries(item as [string, string][]));
}
