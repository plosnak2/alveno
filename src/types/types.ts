export type ITeam = {
    createdAt: string | null;
    id: string;
    name: string | null;
    parentTeam: string | null;
}

export type IEmployee = {
    createdAt: string;
    endDate: string | null;
    id: string;
    name: string;
    startDate: string | null;
    surname: string;
    team: string | null;
}