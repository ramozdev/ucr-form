# CUD Form

## Proposed API

### CUDObject

A cud object is an object that contains a list of objects and arrays. Each item in the object or array is a key-value pair. The key is the name of the column in the database and the value is the value to be inserted into the database. Each item in the object or array must have an `action` and `value` key. The `action` key is a string that describes the action to be taken on the item. The `value` key is the value to be inserted into the database.

```ts
type CudObject = {
  [key: string]: {
    action: "" | "CREATE" | "UPDATE" | "DELETE" | "ID";
    value: string | boolean;
  };
};
```

### Actions

- `""`: No action. This value is assigned by default to items fetched from the database.
- `"CREATE"`: Create a new row in the database. If any item in a `CuDObject` has this action, the entire object will be created. You may omit the `"ID"` key if you are creating a new object.
- `"UPDATE"`: Update a row in the database. If any item in a `CuDObject` has this action, the entire object will be updated. There must be a key with the action `"ID"` in order to update an object.
- `"DELETE"`: Delete a row in the database. If any item in a `CuDObject` has this action, the entire object will be deleted. There must be a key with the action `"ID"` in order to delete an object.
- `"ID"`: The ID for a row. This item is required for `"UPDATE"` and `"DELETE"` actions.

### Example

In this example we have a todo list with a `name` and `description`. The todo list has tasks that have a `name` and a `completed` status.

```json
{
  "todo": {
    "todoId": {
      "action": "ID",
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
        "action": "ID",
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
        "action": "ID",
        "value": "4"
      },
      "name": {
        "action": "",
        "value": "Ham"
      },
      "completed": {
        "action": "",
        "value": false
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
      "action": "ID",
      "value": "12"
    },
    "name": {
      "action": "UPDATE",
      "value": "Shopping"
    },
    "description": {
      "action": "UPDATE",
      "value": "These are the things that I must buy."
    }
  },
  "tasks": [
    {
      "taskId": {
        "action": "ID",
        "value": "3"
      },
      "name": {
        "action": "UPDATE",
        "value": "Eggs"
      },
      "completed": {
        "action": "UPDATE",
        "value": "true"
      }
    },
    {
      "taskId": {
        "action": "ID",
        "value": "4"
      },
      "name": {
        "action": "DELETE",
        "value": "Ham"
      },
      "completed": {
        "action": "",
        "value": "false"
      }
    },
    {
      "taskId": {
        "action": "CREATE",
        "value": ""
      },
      "name": {
        "action": "CREATE",
        "value": "Potatoes"
      },
      "completed": {
        "action": "CREATE",
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
