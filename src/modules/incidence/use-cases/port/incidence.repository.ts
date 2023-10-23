import { TArea } from '../../../area/area.module.boundary';
import { TIncidence } from '../../entities/incidence';

export interface IIncidenceRepository {
  existsById(id: number): Promise<boolean>;
  existsByTitle(title: string, id?: number): Promise<boolean>;
  findAll(id: number): Promise<Array<TIncidence>>;
  findById(id: number): Promise<TIncidence>;
  findAreasByEmployee(id: number): Promise<Array<TArea>>;
  save(incidence: TIncidence): Promise<boolean>;
  update(incidence: TIncidence): Promise<boolean>;
  changeStatus(id: number): Promise<boolean>;
}
