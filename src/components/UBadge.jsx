export default function UBadge({ u }) {
  const urgency = u || "Medium";
  return (
    <span className={`ub u${urgency}`}>
      <span className={`ub-dot u${urgency}-dot`} />
      {urgency}
    </span>
  );
}

