export interface BuildInfo {
  id: string;
  name: string;
  number: string;
  status: 'FAILURE' | 'SUCCESS';
  statusText: string;
  branchName: string;
  username: string;
  date?: Date;
  comment: string;
  commit: string;
}
