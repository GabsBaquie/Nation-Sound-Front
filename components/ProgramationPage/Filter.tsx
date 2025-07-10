import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  days: any[];
  selectedDay: string | null;
  selectedLieu: string | null;
  onDayChange: (value: string | null) => void;
  onLieuChange: (value: string | null) => void;
}

const Filter: React.FC<FilterProps> = ({
  days,
  selectedDay,
  selectedLieu,
  onDayChange,
  onLieuChange,
}) => {
  // Extraire tous les lieux uniques depuis les concerts de tous les jours
  const lieuxSet = new Set<string>();
  days.forEach((day: any) => {
    if (Array.isArray(day.concerts)) {
      day.concerts.forEach((concert: any) => {
        if (concert.location) lieuxSet.add(concert.location);
      });
    }
  });
  const lieux = Array.from(lieuxSet);
  return (
    <div className="flex gap-4 justify-center mb-8">
      <div>
        <Select
          value={selectedDay || "all"}
          onValueChange={(value) => onDayChange(value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les jours" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tous les jours</SelectItem>
              {days.map((day: any) => (
                <SelectItem key={day.name} value={day.name}>
                  {day.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={selectedLieu || "all"}
          onValueChange={(value) =>
            onLieuChange(value === "all" ? null : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tous les lieux" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tous les lieux</SelectItem>
              {lieux.map((lieu) => (
                <SelectItem key={lieu} value={lieu}>
                  {lieu}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
