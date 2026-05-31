const employees = [
  {
    id: 1,
    name: "Amit",
    role: "Developer",
    email: "amit@gmail.com",
  },
  {
    id: 2,
    name: "Sneha",
    role: "Designer",
    email: "sneha@gmail.com",
  },
];

const EmployeeTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Email</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">{employee.id}</td>
              <td className="p-4">{employee.name}</td>
              <td className="p-4">{employee.role}</td>
              <td className="p-4">{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;