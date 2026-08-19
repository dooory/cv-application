function createField(template) {
  return {
    ...template,
    value: "",
  };
}

export function createSubsection(template) {
  const subsection = {};

  template.forEach((field) => {
    subsection[field.id] = createField(field);
  });

  return subsection;
}

export function createSection(sectionSchema, id) {
  const section = {
    id: id,
    legend: sectionSchema.legend,
    subsections: [createSubsection(sectionSchema.template)],
  };

  return section;
}

export function addSubSection(sectionSchema, section) {
  section.subsections.push(createSubsection(sectionSchema.template));

  return section;
}

export function createCVData(CVSchema) {
  const data = {};

  CVSchema.forEach((section) => {
    data[section.id] = createSection(section, section.id);
  });

  return data;
}

export function sectionHasValue(section) {
  const subsections = section.subsections;
  let hasValue = false;

  subsections.forEach((subsection) => {
    if (subsectionHasValue(subsection)) {
      hasValue = true;
    }
  });

  return hasValue;
}

export function subsectionHasValue(subsection) {
  for (const key in subsection) {
    if (!Object.hasOwn(subsection, key)) continue;

    const field = subsection[key];

    if (field.value !== "") {
      return true;
    }
  }
}

export function fieldHasValue(field) {
  return field.value !== "";
}

export function updateCVSection(cvSetter, sectionId, updater) {
  cvSetter((prev) => ({
    ...prev,
    [sectionId]: updater(prev[sectionId]),
  }));
}
