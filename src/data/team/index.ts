import { TeamMember } from "./types";
import { facultyMembers } from "./facultyData";
import { executiveMembers } from "./executiveData";
import { coreMembers } from "./coreData";

export * from "./types";
export { facultyMembers } from "./facultyData";
export { executiveMembers } from "./executiveData";
export { coreMembers } from "./coreData";

export const TEAM_MEMBERS: TeamMember[] = [
  ...facultyMembers,
  ...executiveMembers,
  ...coreMembers,
];
