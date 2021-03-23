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

  // TODO check if there are more elegant solutions than this
  //    but tbfh, this was pretty good problem solving xD
  const getDaySuffix = (calendarDay) => {
    switch (calendarDay % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <header
      className="bg-todo-header bg-cover bg-center border-b-1 border-gray-300 px-4 py-6"
    >
      <h1 className="text-2xl text-white">{`${weekDay}, ${day}${getDaySuffix(day)}`}</h1>
      <p className="pt-1 text-lg text-gray-100">{month}</p>
    </header>
  );
};

export default TodosHeader;
