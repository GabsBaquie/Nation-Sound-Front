import React from "react";
import ConcertCard from "./ConcertCard";

interface DaySectionProps {
  day: any;
  filteredConcerts: any[];
}

const DaySection: React.FC<DaySectionProps> = ({ day, filteredConcerts }) => {
  return (
    <div className="px-12 mb-12 ml-4 text-center md:ml-14 md:px-24">
      <h3 className="mb-4 text-2xl font-semibold">
        {day.title} - {day.date}
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredConcerts.map((concert, concertIndex) => (
          <ConcertCard
            key={concertIndex}
            concert={concert}
            isPrimary={concertIndex % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default DaySection;
