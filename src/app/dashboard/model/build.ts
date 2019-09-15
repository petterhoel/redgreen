import { LastChanges } from './last-changes';
export class Build {
  number: string = '';
  status: string  = '';
  statusText: string  = '';
  lastChanges: LastChanges = { change: [] };
  branchName: string  = '';
}
