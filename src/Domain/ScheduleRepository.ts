import { Schedule } from './Schedule';
import { UserId } from './ValueObjects/UserId';
export const SCHEDULE_REPOSITORY_TOKEN = Symbol('ScheduleRepository');
export interface ScheduleRepository {
  getScheduleByMonth(dateTime: Date, userId: UserId): Promise<Schedule[]>;

  persist(schedule: Schedule): Promise<Schedule>;

  bulkPersist(schedule: Schedule[]): Promise<Schedule[]>;
}
