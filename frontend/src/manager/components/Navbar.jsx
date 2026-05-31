import profileImage from "../../assets/rutika-profile.jpeg";

const Navbar = ({ title = "Dashboard" }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Manager profile"
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
