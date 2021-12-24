import { TodoState } from "./types";

export const TYPES = [
  {
    label: 'All states',
    value: null
  },
  {
    label: 'Not completed',
    value: TodoState.NotCompleted
  },
  {
    label: 'Completed',
    value: TodoState.Completed
  }
];