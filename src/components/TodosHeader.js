const TodosHeader = () => {
  // TODO improve this, this is just to test the design
  const date = new Date();
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  const day = date.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];

  return (
    <div className="bg-gray-300 border-b-2 border-pink-600 shadow-sm px-4 py-6">
      {/* TODO set 'st, nd, rd, th' programmatically */}
      <h1 className="text-2xl">{`${weekDay}, ${day}th`}</h1>
      <p className="pt-1 text-lg text-gray-500">{month}</p>
    </div>
  );
};

export default TodosHeader;
