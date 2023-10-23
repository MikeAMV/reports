import { TRole } from '../../../modules/role/entities/role';
import { Entity, TStatus } from '../../../kernel/types';
import { TPerson } from './person';
import { TArea } from '../../area/area.module.boundary';
import { TAcademicDivision } from '../../academic-division/academic-division.module.boundary';

export type TUser = Entity<number> & {
  username: string;
  password?: string;
  userDetails?: string;
  type?: string;
  status?: TStatus;
  person?: TPerson;
  roles: Array<TRole>;
  areas?: Array<TArea>;
  division?: TAcademicDivision;
};
