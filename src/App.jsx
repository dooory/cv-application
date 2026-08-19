import { useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import Preview from "./components/Preview.jsx";
import formSchema from "./data/formSchema";
import { createCVData, createSubsection } from "./utils";

function App() {
  const [cv, setCV] = useState(createCVData(formSchema));

  function addSubsection(parentId) {
    const parentSchema = formSchema.find((section) => section.id == parentId);
    const subsection = createSubsection(parentSchema?.template);

    const cvCopy = { ...cv };

    cvCopy[parentId].subsections.push(subsection);

    setCV(cvCopy);
  }

  function updateFormField(sectionId, subsectionId, fieldId, value) {
    const cvCopy = { ...cv };

    cvCopy[sectionId].subsections[subsectionId][fieldId].value = value;

    setCV(cvCopy);
  }

  return (
    <>
      <h1>CV Application</h1>
      <Form
        cv={cv}
        updateFormField={updateFormField}
        schema={formSchema}
        addSubsection={addSubsection}
      ></Form>
      <Preview cv={cv}></Preview>
    </>
  );
}

export default App;
