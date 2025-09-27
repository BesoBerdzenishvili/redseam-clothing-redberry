import { Spinner as SpinnerAnimation } from "react-bootstrap";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="text-center spinner">
      <SpinnerAnimation animation="border" role="status" className="mb-3" />
      <p>Loading data...</p>
    </div>
  );
}
