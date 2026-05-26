function Register() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-5">Register</h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Enter Phone Number"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* ROLE DROPDOWN */}
        <select className="w-full border p-2 mb-4 rounded">
          <option value="">Select Role</option>

          <option value="admin">Admin</option>

          <option value="cashier">Cashier</option>

          <option value="manager">Manager</option>
        </select>

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-2 mb-4 rounded"
        />

        {/* BUTTON */}
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
