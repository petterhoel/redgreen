import { LastChanges } from './last-changes';
export class Build {
  number: string = '';
  status: 'FAILURE' | 'SUCCESS' = 'FAILURE';
  statusText: string  = '';
  lastChanges: LastChanges = { change: [] };
  branchName: string  = '';
}
