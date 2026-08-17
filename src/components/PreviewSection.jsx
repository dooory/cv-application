import PreviewEntry from "./PreviewEntry";

export default function PreviewSection({ entries, legend }) {
  return (
    <div className="preview-section">
      <h4>{legend}</h4>
      {entries.map((entry) => {
        return <PreviewEntry {...entry} key={entry.id}></PreviewEntry>;
      })}
    </div>
  );
}
