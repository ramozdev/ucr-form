# CUD Form

## Proposed API

### CUDObject

A cud object is an object that contains a list of objects and arrays. Each item in the object or array is a key-value pair. The key is the name of the column in the database and the value is the value to be inserted into the database. Each item in the object or array must have an `action` and `value` key. The `action` key is a string that describes the action to be taken on the item. The `value` key is the value to be inserted into the database.

```ts
type CudObject = {
  [key: string]: {
    action: "" | "create" | "update" | "delete" | "id";
    value: string;
  };
};
```

### Actions

- `""`: No action. This value is assigned by default to items fetched from the database.
- `"create"`: Create a new row in the database. If any item in a `CuDObject` has this action, the entire object will be created. You may omit the `"id"` key if you are creating a new object.
- `"update"`: Update a row in the database. If any item in a `CuDObject` has this action, the entire object will be updated. There must be a key with the action `"id"` in order to update an object.
- `"delete"`: Delete a row in the database. If any item in a `CuDObject` has this action, the entire object will be deleted. There must be a key with the action `"id"` in order to delete an object.
- `"id"`: The id for a row. This item is required for `"update"` and `"delete"` actions.

### Example

In this example we have a todo list with a `name` and `description`. The todo list has tasks that have a `name` and a `completed` status.

```json
{
  "todo": {
    "todoId": {
      "action": "id",
      "value": "12"
    },
    "name": {
      "action": "",
      "value": "Shopping List"
    },
    "description": {
      "action": "",
      "value": ""
    }
  },
  "tasks": [
    {
      "taskId": {
        "action": "id",
        "value": "3"
      },
      "name": {
        "action": "",
        "value": "egg"
      },
      "completed": {
        "action": "",
        "value": "false"
      }
    },
    {
      "taskId": {
        "action": "id",
        "value": "4"
      },
      "name": {
        "action": "",
        "value": "Ham"
      },
      "completed": {
        "action": "",
        "value": "false"
      }
    }
  ]
}
```

In this example we are updating the todo list name and description, updating the task name and completed status, deleting the task with id 4, and creating a new task.

```json
{
  "todo": {
    "todoId": {
      "action": "id",
      "value": "12"
    },
    "name": {
      "action": "update",
      "value": "Shopping"
    },
    "description": {
      "action": "update",
      "value": "These are the things that I must buy."
    }
  },
  "tasks": [
    {
      "taskId": {
        "action": "id",
        "value": "3"
      },
      "name": {
        "action": "update",
        "value": "Eggs"
      },
      "completed": {
        "action": "update",
        "value": "true"
      }
    },
    {
      "taskId": {
        "action": "id",
        "value": "4"
      },
      "name": {
        "action": "delete",
        "value": "Ham"
      },
      "completed": {
        "action": "",
        "value": "false"
      }
    },
    {
      "taskId": {
        "action": "create",
        "value": ""
      },
      "name": {
        "action": "create",
        "value": "Potatoes"
      },
      "completed": {
        "action": "create",
        "value": "false"
      }
    }
  ]
}
```

We propose providing a set of functions which can be used to generate a payload object to be sent to the backend.

```ts
// the `todo` and `tasks` objects come from your form
const payload = {
  update: {
    todo: processObjectUpdate(todo),
    tasks: processArrayUpdate(tasks),
  },
  delete: {
    tasks: processArrayDelete(tasks),
  },
  create: {
    tasks: processArrayCreate(tasks),
  },
};
```

This object will be parsed by the `cud` functions and return the following object:

```json
{
  "update": {
    "todo": {
      "todoId": "12",
      "name": "Shopping",
      "description": "These are the things that I must buy."
    },
    "tasks": [
      {
        "taskId": "3",
        "name": "Eggs",
        "completed": "true"
      }
    ]
  },
  "create": {
    "tasks": [
      {
        "name": "Potatoes",
        "completed": "false"
      }
    ]
  },
  "delete": {
    "tasks": [
      {
        "taskId": "4"
      }
    ]
  }
}
```
