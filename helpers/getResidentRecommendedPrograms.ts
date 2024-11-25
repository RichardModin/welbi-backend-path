import {GetResidentRecommendedPrograms, Program, ProgramWeight, ResidentProgramPreferences} from "../src/types";

const getResidentRecommendedPrograms: GetResidentRecommendedPrograms = async (programs: Program[], {
  dimensions, facilitators, hobbies, levelsOfCare
}: ResidentProgramPreferences): Promise<(Program | undefined)[]> => {
  const programWeights: ProgramWeight[] = [];
  programs.forEach(({ id,
                      dimensions: programDimensions,
                      facilitators: programFacilitators,
                      hobbies: programHobbies,
                      levelsOfCare: programLevelsOfCare
  }: Program): void => {
    let dimensionsWeight:number = 0;
    let facilitatorsWeight:number = 0;
    let hobbiesWeight:number = 0;
    let levelsOfCareWeight:number = 0;
    programDimensions?.split(',').forEach((dimension:string):void => {
      dimensionsWeight += (dimensions[dimension] || 0);
    });
    programFacilitators?.split(',').forEach((facilitator:string):void => {
      facilitatorsWeight += (facilitators[facilitator] || 0);
    });
    programHobbies?.split(',').forEach((hobby:string):void => {
      hobbiesWeight += (hobbies[hobby] || 0);
    });
    programLevelsOfCare?.split(',').forEach((levelOfCare:string):void => {
      levelsOfCareWeight += (levelsOfCare[levelOfCare] || 0);
    });
    const programWeight: ProgramWeight = {
      id,
      dimensionsWeight,
      facilitatorsWeight,
      hobbiesWeight,
      levelsOfCareWeight,
      totalWeight: dimensionsWeight + facilitatorsWeight + hobbiesWeight + levelsOfCareWeight,
    }
    programWeights.push(programWeight);
  });

  return programWeights
    .sort((a: ProgramWeight, b: ProgramWeight): number => b.totalWeight - a.totalWeight)
    .slice(0, 3)
    .map((programWeight: ProgramWeight): Program | undefined => {
      return programs.find((program: Program): boolean => program.id === programWeight.id);
    });
};

export default getResidentRecommendedPrograms;