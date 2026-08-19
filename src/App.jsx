import { useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import Preview from "./components/Preview.jsx";
import formSchema from "./data/formSchema";
import { createCVData, createSubsection, updateCVSection } from "./utils";

function App() {
  const [cv, setCV] = useState(createCVData(formSchema));
  const [savedCV, setSavedCV] = useState(structuredClone(cv));

  function addSubsection(parentId) {
    const parentSchema = formSchema.find((section) => section.id == parentId);
    const newSubsection = createSubsection(parentSchema?.template);

    updateCVSection(setCV, parentId, (section) => {
      const copy = structuredClone(section);
      copy.subsections.push(newSubsection);
      return copy;
    });
  }

  function saveSection(sectionId) {
    setCV((latestCV) => {
      updateCVSection(setSavedCV, sectionId, () =>
        structuredClone(latestCV[sectionId]),
      );
      return latestCV;
    });
  }

  function updateFormField(sectionId, subsectionId, fieldId, value) {
    updateCVSection(setCV, sectionId, (section) => {
      const copy = structuredClone(section);
      copy.subsections[subsectionId][fieldId].value = value;
      return copy;
    });
  }

  return (
    <>
      <h1>CV Application</h1>
      <Form
        cv={cv}
        updateFormField={updateFormField}
        schema={formSchema}
        addSubsection={addSubsection}
        saveSection={saveSection}
      ></Form>
      <Preview cv={savedCV}></Preview>
    </>
  );
}

export default App;
