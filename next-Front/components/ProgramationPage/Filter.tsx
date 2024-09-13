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
  return (
    <div className="flex justify-center gap-4 mb-8 ">
      <div>
        <Select
          value={selectedDay || "all"}
          onValueChange={(value) =>
            onDayChange(value === "all" ? null : value)
          }>
          <SelectTrigger>
            <SelectValue placeholder="Tous les jours" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tous les jours</SelectItem>
              {days.map((day: any) => (
                <SelectItem key={day.title} value={day.title}>
                  {day.title}
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
          }>
          <SelectTrigger>
            <SelectValue placeholder="Tous les lieux" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tous les lieux</SelectItem>
              <SelectItem value="Paris">Paris</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Classic">Classic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
