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

  const getHeaderImageClass = (hour) => {
    if (hour >= 6 && hour < 16) {
      // Day time - 06:00 to 16:00
      return "bg-todo-header-day";
    } else if (hour >= 16 && hour < 20) {
      // Afternoon - 16:00 to 20:00
      return "bg-todo-header-afternoon";
    } else if (hour >= 20 || hour <= 5) {
      // Night time - 20:00 to 05:00
      return "bg-todo-header-night";
    }
  };

  return (
    <header
      className={`${getHeaderImageClass(date.getHours())} bg-cover bg-center border-b-1 border-gray-300 px-4 py-6`}
      data-testid="todos-header-bg"
    >
      <h1
        className="text-2xl text-white"
        data-testid="calendar-date"
      >
        {`${weekDay}, ${day}${getDaySuffix(day)}`}
      </h1>
      <p
        className="pt-1 text-lg text-gray-100"
        data-testid="calendar-month"
      >
        {month}
      </p>
    </header>
  );
};

export default TodosHeader;
