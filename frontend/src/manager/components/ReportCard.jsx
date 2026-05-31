const ReportCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-gray-500 text-lg">
        {title}
      </h3>

      <h1 className="text-3xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
};

export default ReportCard;