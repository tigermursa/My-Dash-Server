export interface ITimePeriod {
  start: string;
  end: string;
}

export interface ISession extends ITimePeriod {
  type: 'morning' | 'afternoon' | 'night';
}

export interface IDaySchedule {
  toObject(): IDaySchedule;
  day:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  isOff: boolean;
  sessions: ISession[];
  groupMonitoring?: ITimePeriod;
}

export interface IWeeklySchedule {
  days: IDaySchedule[];
}
