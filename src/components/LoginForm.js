import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase";
import Alert from "./Alert";
import InputField from "./InputField";

export default function LoginForm({ openSignupModal, closeLoginModal }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      if (error) setError("");
      setSuccess("Logged in successfully!");
      setTimeout(() => {
        closeLoginModal();
      }, 1000);
    } catch (error) {
      setError(error.message);
      setIsSubmitted(false);
    }
  }
  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Login
      </h2>
      {error && <Alert className="danger sm my-4">{error}</Alert>}
      {success && <Alert className="success sm my-4">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          id="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className={`w-full p-3 mb-6 text-white bg-secondary-color hover:bg-gray-900 transition-colors font-bold text-lg rounded ${
            isSubmitted ? "opacity-30 cursor-default" : "cursor-pointer"
          }`}
        >
          Login
        </button>
        <div className="font-semibold text-center text-primary-color">
          <button
            type="button"
            className="text-sm font-semibold  hover:underline mb-2"
          >
            Forgot password?
          </button>
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => {
                closeLoginModal();
                openSignupModal();
              }}
              type="button"
              className="text-secondary-color font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
