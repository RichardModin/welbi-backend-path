import { Request, Response } from 'express';
import { Router } from 'express';
import parseDatabase from "../../helpers/parseDatabase";
import {Database, Resident, Program, ResidentProgramPreferences, Attendee} from "../../src/types";
import getResidentProgramPreferences from "../../helpers/getResidentProgramPreferences";
import getResidentRecommendedPrograms from "../../helpers/getResidentRecommendedPrograms";

const router:Router = Router();

router.get('/:name', async (req:Request, res:Response):Promise<void> => {
  try {
    const {name} = req.params;
    const {residents, programs}:Database = await parseDatabase();
    const resident:Resident|undefined = residents.find((resident:Resident):boolean => resident.name === name);
    if (!resident) {
      res.status(404).send('Resident not found');
    }
    const pastPrograms:Program[] = [];
    const possiblePrograms:Program[] = [];
    programs.forEach((program:Program):void => {
      program.attendees.forEach(({userId}:Attendee):void => {
        if (userId === resident?.userId) {
          pastPrograms.push(program);
        } else {
          possiblePrograms.push(program);
        }
      });
    });
    const residentProgramPreferences:ResidentProgramPreferences = await getResidentProgramPreferences(pastPrograms);
    const recommendedPrograms:(Program|undefined)[] = await getResidentRecommendedPrograms(possiblePrograms, residentProgramPreferences);
    res.json({
      resident: resident,
      recommendedPrograms: recommendedPrograms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading database file');
  }
});

export default router;