import {join} from "path";
import {readFile} from "fs/promises";
import {Database, Program, Resident} from "../src/types";

const parseDatabase:() => Promise<Database> = async():Promise<Database> => {
  const dataPath:string = join(__dirname, '../database.json');
  const dataString:string = await readFile(dataPath, 'utf-8');
  const data:Database = JSON.parse(dataString);
  const residents:Resident[] = data.residents;
  const programs:Program[] = data.programs;
  return {residents, programs};
}

export default parseDatabase;