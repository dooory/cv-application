import PreviewSection from "./PreviewSection";

export default function Preview({ groups }) {
  return (
    <section className="cv-preview">
      <h1>Preview</h1>
      <div className="preview">
        {groups.map((group, index) => {
          return (
            <PreviewSection
              key={index}
              legend={group.legend}
              entries={Object.values(group.fields)}
            ></PreviewSection>
          );
        })}
      </div>
    </section>
  );
}
