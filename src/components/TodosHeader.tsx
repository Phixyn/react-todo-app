// TODO Move to utils
function getFormattedDateParts(date = new Date()) {
  const hours = date.getHours();

  const day = date.getDate();
  const weekDay = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });

  const ordinalRules = new Intl.PluralRules("en", { type: "ordinal" });
  const ordinalSuffixMap: Record<Intl.LDMLPluralRule, string> = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
    zero: "",
    many: "",
  };
  const ordinalSuffix = ordinalSuffixMap[ordinalRules.select(day)];

  return { hours, day, weekDay, month, ordinalSuffix };
}

export default function TodosHeader() {
  const { hours, day, weekDay, month, ordinalSuffix } = getFormattedDateParts();

  // Use a different header image depending on the time of day
  const getHeaderImageClass = (hour: number) => {
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
      className={`${getHeaderImageClass(hours)} bg-cover bg-center border-b-1 border-gray-300 px-4 py-6`}
      data-testid="todos-header-bg"
    >
      <h1 className="text-2xl text-white" data-testid="calendar-date">
        {`${weekDay}, ${day}${ordinalSuffix}`}
      </h1>
      <p className="pt-1 text-lg text-gray-100" data-testid="calendar-month">
        {month}
      </p>
    </header>
  );
}
