const initialData = {
  rows: {
    "row-1": {
      id: "row-1",
      content: {
        Priority: {},
        Status: {},
        AccountOwner: {},
        ExpectedClose: {},
        Added: {},
        Phone: {},
        EstimatedValue: {},
        Email: {},
        Name: {},
        LastContact: {},
        Company: {},
      },
    },
  },
  columns: {
    Priority: {
      id: "Priority",
      title: "Priority",
    },
    Status: {
      id: "Status",
      title: "Status",
    },
    AccountOwner: {
      id: "AccountOwner",
      title: "AccountOwner",
    },
    ExpectedClose: {
      id: "ExpectedClose",
      title: "ExpectedClose",
    },
    Added: {
      id: "Added",
      title: "Added",
    },
    Phone: {
      id: "Phone",
      title: "Phone",
    },
    EstimatedValue: {
      id: "EstimatedValue",
      title: "EstimatedValue",
    },
    Email: {
      id: "Email",
      title: "Email",
    },
    Name: {
      id: "Name",
      title: "Name",
    },
    LastContact: {
      id: "LastContact",
      title: "LastContact",
    },
    Company: {
      id: "Company",
      title: "Company",
    },
  },
  // Facilitate reordering of the columns
  columnOrder: [
    "Priority",
    "Status",
    "AccountOwner",
    "ExpectedClose",
    "Added",
    "Phone",
    "EstimatedValue",
    "Email",
    "Name",
    "LastContact",
    "Company",
  ],
  rowsOrder: []
};

export default initialData;


// checkbox: Completed , date: Expected Close , multi_select: Skills , number: salary , rich_text: Company ,
// select: status , timestamp , status
