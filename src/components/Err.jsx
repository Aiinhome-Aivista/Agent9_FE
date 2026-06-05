import { AlertCircle } from "lucide-react";

export default function Err({ msg }) {
  return msg ? (
    <div className="err">
      <AlertCircle size={12} style={{ display: "inline", marginRight: 6 }} />
      {msg}
    </div>
  ) : null;
}
