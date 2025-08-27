import "./ErrorMessage.css";

export default function ErrorMessage({ error, title = "Error" }) {
  return (
    <div className="error-message">
      <h3>{title}</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
