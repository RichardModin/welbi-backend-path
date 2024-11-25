import {GetResidentProgramPreferences, Program, ResidentProgramPreferences} from "../src/types";

const getResidentProgramPreferences: GetResidentProgramPreferences = async (programs: Program[]): Promise<ResidentProgramPreferences> => {
  const dimensions: Record<string, number> = {};
  const facilitators: Record<string, number> = {};
  const hobbies: Record<string, number> = {};
  const levelsOfCare: Record<string, number> = {};
  programs.forEach(({ dimensions: programDimension,
                      facilitators: programFacilitators,
                      hobbies: programHobbies,
                      levelsOfCare: programLevelsOfCare
  }: Program): void => {
    programDimension?.split(',').forEach((dimension:string):void => {
      dimensions[dimension] = (dimensions[dimension] || 0) + 1;
    });
    programFacilitators?.split(',').forEach((facilitator:string):void => {
      facilitators[facilitator] = (facilitators[facilitator] || 0) + 1;
    });
    programHobbies?.split(',').forEach((hobby:string):void => {
      hobbies[hobby] = (hobbies[hobby] || 0) + 1;
    });
    programLevelsOfCare?.split(',').forEach((levelOfCare:string):void => {
      levelsOfCare[levelOfCare] = (levelsOfCare[levelOfCare] || 0) + 1;
    });
  });

  return {
    dimensions,
    facilitators,
    hobbies,
    levelsOfCare,
  }
}

export default getResidentProgramPreferences;