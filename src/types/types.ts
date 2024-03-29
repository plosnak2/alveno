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
    position: string | null;
}

export type ICreateEmployee = {
    endDate: string | null;
    name: string;
    startDate: string | null;
    surname: string;
    team: string | null;
    position: string | null;
}

export type ICreateTeam = {
    name: string;
    parentTeam: string | null
}