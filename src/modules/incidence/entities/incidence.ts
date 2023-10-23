import { TUser } from '../../user/user.module.boundary';
import { Entity, TStatus } from '../../../kernel/types';

export type TIncidence = Entity<number> & {
  title: string;
  incidenceDate?: string;
  type?: string;
  description?: string;
  createdAt?: string;
  user?: TUser;
  status?: TStatus;
};
