export type Role = {
  id: number;
  name: string;
  description: string;
};

export type Practice = {
  id: number;
  name: string;
  description: string;
};

export type Thinklet = {
  id: number;
  name: string;
  description: string;
};

export type CollaborativePattern = {
  id: number;
  name: string;
  description: string;
};

export type Round = {
  id: number;
  name: string;
  order: number;      
  processId: number;
};


export interface Process {
  id_process: number
  name_process: string
  description_process: string
  version_process?: string
  image?: string
  facilitator?: {
    id_role: number
    name_role: string
  } | null
}

export interface CreateProcessData {
  name: string
  version?: string
  image?: string
  facilitator?: string
}

export type Activity = {
  id: number;
  name: string;
  description: string;
  processId: number;
};

