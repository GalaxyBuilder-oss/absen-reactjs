import { Generation } from "./Generation";

export interface MemberPUB {
    id?: string | null;
    name: string;
    dormitory: string;
    generation: Generation;
    point?: number;
    alpha: boolean;
    late: boolean;
    permit: boolean;
    present: boolean;
  }
