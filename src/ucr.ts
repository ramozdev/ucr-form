type UCR = {
  action: "" | "CREATE" | "UPDATE" | "REMOVE" | "ID";
  value: string | boolean;
};

type RecursiveUCR = Array<Record<string, UCR | RecursiveUCR>>;

type UcrObjects = Record<string, RecursiveUCR>;

export function getUCR(ucrObjects: UcrObjects) {
  return {
    update,
    create,
    remove,
  };
}

// interface NestedObject {
//   name: string;
//   value: number;
//   children?: NestedObject[];
// }

// const totalValues = (nestedObjects: NestedObject[]) => {
//   return nestedObjects.reduce(
//     (totalValue, nestedObject: NestedObject): number => {
//       // Add the current object's value
//       totalValue += nestedObject.value;

//       // If we have children, let's add their values too
//       if (nestedObject.children) {
//         totalValue += totalValues(nestedObject.children);
//       }

//       // Return the new total
//       return totalValue;
//     },
//     0,
//   );
// };

export function recursivelyGetUpdatedItems(tables: UcrObjects) {
  return Object.entries(tables).reduce<Record<string, UCR | RecursiveUCR>>(
    (acc, [table, columnsOrTables]) => {
      

  // return array
  //   .filter(
  //     (object) =>
  //       !Object.values(object).some(({ action }) => action === "REMOVE")
  //   )
  //   .filter((object) =>
  //     Object.values(object).some(({ action }) => action === "UPDATE")
  //   )
  //   .map((object) => {
  //     return Object.entries(object).reduce<Record<string, string | boolean>>(
  //       (acc, [key, item]) => {
  //         if (item.action === "UPDATE" || item.action === "ID") {
  //           acc[key] = item.value;
  //         }
  //         return acc;
  //       },
  //       {}
  //     );
  //   });
}

export function getRemovedItems(array: UcrObject[]) {
  return array
    .filter((object) =>
      Object.values(object).some(({ action }) => action === "REMOVE")
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

export function getCreatedItems(array: UcrObject[]) {
  return array
    .filter((object) => {
      return Object.values(object).some(({ action }) => action === "CREATE");
    })
    .map((object) =>
      Object.entries(object).reduce<Record<string, string | boolean>>(
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
