import { useSearchParams, Link } from "react-router";
import { useEffect } from "react";
export default function Verify() {
  const [params] = useSearchParams();
  const status = params.get("status");

  const messages = {
    success: "Your account is verified. You can now log in.",
    invalid: "This link is invalid or has expired.",
    missing: "No verification token was provided.",
  };

  return (
    <main className="verify-page">
      <h1>Email verification</h1>
      <p>{messages[status] || "Unknown status."}</p>
      <Link to="/login">Go to login</Link>
    </main>
  );
}