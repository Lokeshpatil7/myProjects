const FormFilds = [
  {
    lable: "Name",
    placeholder: "Enter Name",
    fild: "name",
    inputType: "text",
  },

  {
    lable: "email",
    placeholder: "Enter email",
    fild: "email",
    inputType: "text",
  },
  {
    lable: "phone",
    placeholder: "Enter phone",
    fild: "phone",
    inputType: "text",
  },
  {
    lable: "User Type",
    placeholder: "Select type",
    fild: "role_id",
    inputType: "select",
    options: ["Super Admin", "Group Admin", "Entity Admin"],
  },
  {
    lable: "User Department",
    placeholder: "Select department",
    fild: "departments",
    inputType: "select",
    options: ["Super Admin", "Group Admin", "Entity Admin"],
  },
];

export default FormFilds;
