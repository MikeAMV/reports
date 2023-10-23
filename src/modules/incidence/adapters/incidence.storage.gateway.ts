import { pool } from '../../../config/postgres';
import { TArea } from '../../area/area.module.boundary';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from '../use-cases/port/incidence.repository';

export class IncidenceStorageGateway implements IIncidenceRepository {
  async existsById(id: number): Promise<boolean> {
    const query = `SELECT id FROM incidences WHERE id = $1;`;
    const { rows: incidenceRow } = await pool.query(query, [id]);
    return !!incidenceRow[0]?.id;
  }
  async existsByTitle(title: string, id?: number): Promise<boolean> {
    let query = `SELECT id FROM incidences WHERE title = $1;`;
    let params: any = [title];
    if (id) {
      query = `SELECT id FROM incidences WHERE title = $1 AND id != $2`;
      params = [title, id];
    }
    const { rows: incidenceRow } = await pool.query(query, params);
    return !!incidenceRow[0]?.id;
  }
  async findAll(id: number): Promise<TIncidence[]> {
    const query = `SELECT incidences.*, s.status FROM incidences 
    INNER JOIN annexes a on incidences.id = a.incidence_id
    INNER JOIN statuses s on s.id = incidences.status_id
    WHERE incidences.user_reports_id = $1;`;
    const { rows: incidencesRows } = await pool.query(query, [id]);
    return incidencesRows.map<TIncidence>((incidence) => ({
      id: Number(incidence.id),
      title: incidence.title,
      createdAt: incidence.created_at,
      description: incidence.description,
      incidenceDate: incidence.incidence_date,
      status: {
        id: Number(incidence.status_id),
        description: incidence.status,
      },
      type: incidence.type,
    }));
  }
  findById(id: number): Promise<TIncidence> {
    throw new Error('Method not implemented.');
  }
  findAreasByEmployee(id: number): Promise<TArea[]> {
    throw new Error('Method not implemented.');
  }
  save(incidence: TIncidence): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  update(incidence: TIncidence): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  changeStatus(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
