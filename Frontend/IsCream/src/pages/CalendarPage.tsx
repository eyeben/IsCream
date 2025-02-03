import Nav from "../components/nav/Nav";
import Calendar from "../components/calendar/Calendar";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Calendar childId="1" />
      <div className="pb-20">
        <Nav />
      </div>
    </>
  );
};

export default CalendarPage;
