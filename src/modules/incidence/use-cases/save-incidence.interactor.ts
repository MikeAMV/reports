import { UseCase } from 'kernel/contract';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from './port/incidence.repository';

export class SaveIncidenceInteractor implements UseCase<TIncidence, boolean> {
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload?: TIncidence | undefined): Promise<boolean> {
    return true;
  }
}
