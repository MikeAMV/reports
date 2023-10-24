import { TUser } from '../../user/user.module.boundary';
import { Entity, TStatus } from '../../../kernel/types';
import { TAnnexe } from './annexe';
import { UserArea } from './user-area';

export type TIncidence = Entity<number> & {
  title: string;
  incidenceDate?: string;
  type?: string;
  description?: string;
  createdAt?: string;
  user?: UserArea;
  status?: TStatus;
  annexes?: Array<TAnnexe>;
};
