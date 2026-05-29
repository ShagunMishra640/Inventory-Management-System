function AuthForm({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default AuthForm;
