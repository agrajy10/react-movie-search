import { useState } from "react";
import { firebaseAuth } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { firebaseDB } from "../lib/firebase";
import Alert from "./Alert";
import InputField from "./InputField";
export default function SignupForm({ closeSignupModal, openLoginModal }) {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
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
      await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password
      );
      await updateProfile(firebaseAuth.currentUser, {
        displayName: values.fullname,
      });
      await setDoc(
        doc(firebaseDB, "favourite-movies", firebaseAuth.currentUser.uid),
        {
          movies: [],
        }
      );
      if (error) setError("");
      setSuccess("Signed up successfully!");
      setTimeout(() => {
        closeSignupModal();
      }, 1000);
    } catch (error) {
      setError(error.message);
      setIsSubmitted(false);
    }
  }

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Sign up
      </h2>
      {error && <Alert className="danger sm my-4">{error}</Alert>}
      {success && <Alert className="success sm my-4">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          id="fullname"
          type="text"
          value={values.fullname}
          handleChange={handleChange}
        />
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
