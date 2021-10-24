import { useState, useContext } from "react";
import { firebaseAuth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { UserContext } from "../lib/context";

export default function SignupForm({ closeSignupModal, openLoginModal }) {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
      .then(() => {
        closeSignupModal();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Sign up
      </h2>
      {error && (
        <div className="px-4 py-2 mt-6 mb-4 text-sm text-red-600 bg-red-100 rounded-md border border-red-600">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname" className="block font-semibold mb-2">
          Name
        </label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          className="w-full h-12 mb-5 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
          required
          value={values.fullname}
          onChange={handleChange}
        />
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full h-12 mb-5 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
          required
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="block font-semibold mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="w-full h-12 mb-7 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button
          disabled={isSubmitted}
          type="submit"
          className={`w-full p-3 mb-6 text-white bg-secondary-color hover:bg-gray-900 transition-colors font-bold text-lg rounded ${
            isSubmitted ? "opacity-50 cursor-disabled" : "cursor-pointer"
          }`}
        >
          Sign up
        </button>
        <div className="font-semibold text-center text-primary-color">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => {
                closeSignupModal();
                openLoginModal();
              }}
              type="button"
              className="text-secondary-color font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
