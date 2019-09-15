export interface BuildInfo {
  id: string;
  name: string;
  number: string;
  status: string;
  statusText: string;
  branchName: string;
  username: string;
  date?: Date;
  comment: string;
  commit: string;
}
