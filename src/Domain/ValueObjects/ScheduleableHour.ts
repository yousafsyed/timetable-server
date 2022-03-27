export enum ScheduleableHour {
  EIGHT = 8,
  NINE,
  TEN,
  ELEVEN,
  TWELEVE,
  THIRTEEN,
  FOURTEEN,
  FIFTEEN,
  SIXTEEN,
  SEVENTEEN,
  EIGHTEEN,
  NIGNTEEN,
}

export const ScheduleableHourList: Array<number> = Object.entries(
  ScheduleableHour,
)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .filter(([key, value]) => {
    return typeof value === 'number';
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .map(([key, value]): number => <number>value);
