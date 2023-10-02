import { dayjs } from 'element-plus'

export type DayJsViewType = dayjs.ManipulateType

export type Event = {
  id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  initialTime?: string;
  finalTime?: string;
  description: string;
}

export type EventForm = Omit<Event, 'id'>

export type EventFormEdit = Pick<Event, 'id' | 'title' | 'start_date' | 'end_date' | 'description'>

export enum ViewType {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export type CalendarEvent = {
  date: string;
  isCurrentMonth: boolean;
  events: Event[];
}

// auth
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
}