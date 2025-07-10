import { API_URL } from "./apiConfig";

export type DayAPI = {
  id: number;
  name: string;
  date: string;
  description?: string;
  concerts?: any[];
};

export const fetchDays = async (): Promise<DayAPI[]> => {
  const res = await fetch(`${API_URL}/api/days`);
  if (!res.ok) throw new Error("Erreur API Days");
  const data = await res.json();
  return data.map((day: any) => ({
    id: day.id,
    name: day.title,
    date: day.date,
    description: day.description,
    concerts: day.concerts,
  }));
};

export const fetchDayById = async (id: string | number): Promise<DayAPI> => {
  const res = await fetch(`${API_URL}/api/days/${id}`);
  if (!res.ok) throw new Error("Erreur API Day");
  return await res.json();
};
