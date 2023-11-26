import { useNavigate } from "@remix-run/react";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="" onClick={() => navigate(-1)}>
      Back
    </button>
  );
}
