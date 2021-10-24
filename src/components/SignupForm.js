export default function SignupForm() {
  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Sign up
      </h2>
      <form>
        <label htmlFor="fullname" className="block font-semibold mb-2">
          Name
        </label>
        <input
          id="fullname"
          type="text"
          className="w-full h-12 mb-5 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
        />
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full h-12 mb-5 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
        />
        <label htmlFor="password" className="block font-semibold mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full h-12 mb-7 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
        />
        <label htmlFor="confirm_password" className="block font-semibold mb-2">
          Confirm password
        </label>
        <input
          id="confirm_password"
          type="password"
          className="w-full h-12 mb-7 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
        />
        <button
          type="submit"
          className="w-full p-3 mb-6 text-white bg-secondary-color hover:bg-gray-900 transition-colors font-bold text-lg rounded"
        >
          Sign up
        </button>
        <div className="font-semibold text-center text-primary-color">
          <p>
            Already have an account?{" "}
            <button
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
