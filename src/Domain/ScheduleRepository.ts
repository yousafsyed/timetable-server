import { Schedule } from './Schedule';
export const SCHEDULE_REPOSITORY_TOKEN = Symbol('ScheduleRepository');
export interface ScheduleRepository {
  getScheduleByMonth(dateTime: Date): Schedule[];

  persist(schedule: Schedule): Promise<Schedule>;

  bulkPersist(schedule: Schedule[]): Promise<Schedule[]>;
}
