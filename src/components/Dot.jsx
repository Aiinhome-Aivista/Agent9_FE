export default function Dot({ s }) {
  return (
    <span
      className={`dot d${s === "active" ? "a" : s === "processing" ? "p" : "i"}`}
    />
  );
}
