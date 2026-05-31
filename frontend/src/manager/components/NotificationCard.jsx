const NotificationCard = ({ title, message }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-600">
      <h2 className="text-lg font-bold">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {message}
      </p>
    </div>
  );
};

export default NotificationCard;