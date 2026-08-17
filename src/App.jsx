import { useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import Preview from "./components/Preview.jsx";

const formSchema = [
  {
    id: "personalInfo",
    legend: "Personal Info",
    fields: [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        placeholder: "John Doe...",
        required: true,
        autoComplete: "name",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "johndoe@address.com...",
        required: true,
        autoComplete: "email",
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "01993278823...",
        autoComplete: "phone",
      },
    ],
  },
  {
    id: "educationalExperience",
    legend: "Educational Experience",
    repeatable: true,
    fields: [
      {
        id: "title",
        label: "Title",
        type: "text",
        placeholder: "Bachelor of ...",
        required: true,
      },
      {
        id: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
      },
      {
        id: "endDate",
        label: "End Date",
        type: "date",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Studied this and that...",
      },
    ],
  },
  {
    id: "jobExperience",
    legend: "Job Experience",
    repeatable: true,
    fields: [
      {
        id: "title",
        label: "Title",
        type: "text",
        placeholder: "Junior Software Engineer",
        required: true,
      },
      {
        id: "companyTitle",
        label: "Company",
        type: "text",
        placeholder: "A Business...",
        required: true,
      },
      {
        id: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
      },
      {
        id: "endDate",
        label: "End Date",
        type: "date",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Did this and that...",
      },
    ],
  },
];

function createTemplateFromSchema(schema) {
  const template = {};

  schema.forEach((group) => {
    const groupData = {
      id: group.id,
      legend: group.legend,
      fields: {},
    };

    group.fields.forEach((field) => {
      groupData.fields[field.id] = {
        value: "",
        label: field.label,
        id: field.id,
      };
    });

    template[group.id] = groupData;
  });

  return template;
}

function App() {
  const [cv, setCV] = useState(createTemplateFromSchema(formSchema));

  function updateCV(groupId, fieldId, newValue) {
    const copy = { ...cv };

    copy[groupId].fields[fieldId].value = newValue;

    setCV(copy);
  }

  return (
    <>
      <Form formSchema={formSchema} updateCV={updateCV}></Form>
      <Preview groups={Object.values(cv)}></Preview>
    </>
  );
}

export default App;
