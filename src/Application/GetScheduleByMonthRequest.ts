import { UserId } from 'src/Domain/ValueObjects/UserId';

export class GetScheduleByMonthRequest {
  constructor(private date: Date, private userId: UserId) {}

  public getDate(): Date {
    return this.date;
  }

  public getUserId(): UserId {
    return this.userId;
  }
}
