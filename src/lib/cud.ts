type CudObject = {
  [key: string]: {
    action: "" | "create" | "update" | "delete" | "id";
    value: string;
  };
};

export function processObjectUpdate(object: CudObject) {
  const isUpdate = Object.values(object).some(
    ({ action }) => action === "update"
  );

  if (!isUpdate) return {};

  return Object.entries(object).reduce<{ [key: string]: string }>(
    (acc, [key, item]) => {
      if (item.action === "update" || item.action === "id") {
        acc[key] = item.value;
      }
      return acc;
    },
    {}
  );
}

export function processArrayUpdate(array: CudObject[]) {
  return array
    .filter((object) =>
      Object.values(object).some(({ action }) => action === "update")
    )
    .map((object) => {
      return Object.entries(object).reduce<{ [key: string]: string }>(
        (acc, [key, item]) => {
          if (item.action === "update" || item.action === "id") {
            acc[key] = item.value;
          }
          return acc;
        },
        {}
      );
    });
}

export function processArrayDelete(array: CudObject[]) {
  return array
    .filter((object) =>
      Object.values(object).some(({ action }) => action === "delete")
    )
    .map((object) =>
      Object.entries(object).reduce<{ [key: string]: string }>(
        (acc, [key, item]) => {
          if (item.action === "id") {
            acc[key] = item.value;
          }
          return acc;
        },
        {}
      )
    );
}

export function processArrayCreate(array: CudObject[]) {
  return array
    .filter((object) => {
      return Object.values(object).some(({ action }) => action === "create");
    })
    .map((object) =>
      Object.entries(object).reduce<{ [key: string]: string }>(
        (acc, [key, item]) => {
          if (item.action === "create") {
            acc[key] = item.value;
          }
          return acc;
        },
        {}
      )
    );
}
