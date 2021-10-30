import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase";
import Alert from "./Alert";
import InputField from "./InputField";

export default function RestPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      if (error) setError("");
      setSuccess("Password reset link sent!");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsSubmitted(false);
    }
  }

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Reset password
      </h2>
      {error && <Alert className="danger sm my-4">{error}</Alert>}
      {success && <Alert className="success sm my-4">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          id="email"
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full p-3 mb-6 text-white bg-secondary-color hover:bg-gray-900 transition-colors font-bold text-lg rounded ${
            isSubmitted ? "opacity-30 cursor-default" : "cursor-pointer"
          }`}
        >
          Send reset link
        </button>
      </form>
    </>
  );
}
