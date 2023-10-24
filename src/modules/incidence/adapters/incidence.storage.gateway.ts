import { Errors } from '../../../kernel/types';
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
  async findAreasByEmployee(id: number): Promise<TArea[]> {
    const { rows: areaRows } = await pool.query(
      `SELECT a.id,
      a.name  as "areaName",
      ad.name as "acName",
      ad.id   as "acId"
FROM users u
        INNER JOIN user_area ua ON ua.user_id = u.id
        INNER JOIN areas a on ua.area_id = a.id
        INNER JOIN academic_divisions ad on a.academic_division_id = ad.id
WHERE u.id= $1;`,
      [id]
    );
    return areaRows.map((area) => ({
      id: Number(area.id),
      name: area.areaName,
      academicDivision: {
        id: Number(area.acId),
        name: area.acName,
      },
    }));
  }
  async save(incidence: TIncidence): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `INSERT INTO incidences (id, title, incidence_date, type, description, created_at, user_reports_id, status_id)
      VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, $6) RETURNING id;`;
      const { rows: incidenceRow } = await client.query(query, []);
      if (!incidenceRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      incidence.annexes?.forEach((annexe) => {
        client.query(
          `INSERT INTO annexes (id, name, mime_type, file, incidence_id)
        VALUES (DEFAULT, $1, $2, $3, $4);`,
          [annexe.name, annexe.mimeType, annexe.file, incidenceRow[0].id]
        );
      });
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw Error(Errors.SQLERROR);
    } finally {
      client.release();
    }
  }
  update(incidence: TIncidence): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  changeStatus(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
