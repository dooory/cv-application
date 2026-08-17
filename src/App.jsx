import "./App.css";
import Form from "./components/Form.jsx";

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

function App() {
  return (
    <>
      <Form formSchema={formSchema}></Form>
    </>
  );
}

export default App;
