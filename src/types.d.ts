export type Resident = {
  userId: string;
  name: string
  gender: string;
  birthday: string;
  moveInDate: string;
  levelOfCare: string|null;
  hobbies: string|null;
  roomNumber: string;
}

export type Program = {
  id: string;
  name: string;
  start: string;
  end: string;
  mode: string;
  dimensions: string | null;
  facilitators: string | null;
  hobbies: string | null;
  levelsOfCare: string | null;
  attendees: {userId: string}[];
}

export type ResidentProgramPreferences = {
  dimensions: Record<string, number>;
  facilitators: Record<string, number>;
  hobbies: Record<string, number>;
  levelsOfCare: Record<string, number>;
}

export type Database = {
  residents: Resident[];
  programs: Program[];
}

export type Attendee = {
  userId: string;
}

export type ProgramWeight = {
  id: string;
  dimensionsWeight: number;
  facilitatorsWeight: number;
  hobbiesWeight: number;
  levelsOfCareWeight: number;
  totalWeight: number;
};

export type GetResidentProgramPreferences = (programs: Program[]) => Promise<ResidentProgramPreferences>

export type GetResidentRecommendedPrograms = (programs: Program[], ResidentProgramPreferences: ResidentProgramPreferences) => Promise<(Program | undefined)[]>