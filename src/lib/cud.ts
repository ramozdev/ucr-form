type CudObject = {
  [key: string]: {
    action: "" | "CREATE" | "UPDATE" | "DELETE" | "ID";
    value: string | boolean;
  };
};

export function processObjectUpdate(object: CudObject) {
  const isUpdate = Object.values(object).some(
    ({ action }) => action === "UPDATE"
  );

  if (!isUpdate) return {};

  return Object.entries(object).reduce<{ [key: string]: string | boolean }>(
    (acc, [key, item]) => {
      if (item.action === "UPDATE" || item.action === "ID") {
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
      Object.values(object).some(({ action }) => action === "UPDATE")
    )
    .map((object) => {
      return Object.entries(object).reduce<{ [key: string]: string | boolean }>(
        (acc, [key, item]) => {
          if (item.action === "UPDATE" || item.action === "ID") {
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
      Object.values(object).some(({ action }) => action === "DELETE")
    )
    .map((object) =>
      Object.values(object).reduce<string | boolean>((acc, item) => {
        if (item.action === "ID") {
          acc = item.value;
        }
        return acc;
      }, "")
    );
}

export function processArrayCreate(array: CudObject[]) {
  return array
    .filter((object) => {
      return Object.values(object).some(({ action }) => action === "CREATE");
    })
    .map((object) =>
      Object.entries(object).reduce<{ [key: string]: string | boolean }>(
        (acc, [key, item]) => {
          if (item.action === "CREATE") {
            acc[key] = item.value;
          }
          return acc;
        },
        {}
      )
    );
}
