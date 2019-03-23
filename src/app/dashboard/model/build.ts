import { LastChanges } from "./last-changes";
export class Build {
  number: string = 'N/A';
  status: string  = 'N/A';
  statusText: string = 'N/A' ;
  lastChanges: LastChanges = new LastChanges();
  branchName: string = 'N/A';
}
