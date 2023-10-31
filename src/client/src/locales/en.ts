export default {
  CardEvent: {
    button: {
      delete: "Remove",
      edit: "Edit",
    },
  },
  FormSearch: {
    switch: {
      id: "ID",
    },
    input: {
      label: {
        name: "Name",
        id: "ID",
      },
    },
    dropdown: {
      sortorder: {
        asc: "ASC",
        desc: "DESC",
      },
      sortby: {
        name: "Sort by",
      },
      type: {
        name: "Type",
      },
      priority: {
        name: "Priority",
      },
    },
  },
  InputForm: {
    input: [
      {
        name: "ID",
      },
      {
        name: "Name",
      },
      {
        name: "Priority",
      },
      {
        name: "Type",
      },
      {
        name: "Description",
      },
    ],
    insert: {
      title: "Add new event",
      button: "Add",
    },
    update: {
      title: "Edit event",
      button: "Update",
    },
    close: {
      button: "Close",
    },
    validate: {
      required: "Field cannot be empty",
      id: {
        pattern: "ID must be greater than 0",
        fail: "ID already exist",
      },
    },
  },
};
