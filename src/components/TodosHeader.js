function TodosHeader() {
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
    <header
      className="bg-todo-header bg-cover bg-center border-b-1 border-gray-300 px-4 py-6"
    >
      {/* TODO set 'st, nd, rd, th' programmatically */}
      <h1 className="text-2xl text-white">{`${weekDay}, ${day}th`}</h1>
      <p className="pt-1 text-lg text-gray-100">{month}</p>
    </header>
  );
};

export default TodosHeader;
