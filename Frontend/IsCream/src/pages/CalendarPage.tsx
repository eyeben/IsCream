import Nav from "../components/nav/Nav";
import Calendar from "../components/calendar/Calendar";
import Header1 from "../components/header/Header";

const CalendarPage: React.FC = () => {
  return (
    <>
      <Header1 />
      <Calendar childId="1" />
      <div className="pb-20">
        <Nav />
      </div>
    </>
  );
};

export default CalendarPage;
