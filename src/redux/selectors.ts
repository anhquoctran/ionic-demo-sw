import { FilterCriteria, Pagination, TodoList } from "../common/types";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import drop from 'lodash/drop';

dayjs.extend(isBetween);

export function queryFilterList(todos: TodoList, filter: FilterCriteria, needFilter: boolean, pagination: Pagination) {
  let result = [...todos];

  if (needFilter) {
    let { keyword, type, date_from, date_to } = filter;

    keyword = keyword?.trim()?.toLowerCase();
    if (keyword && keyword.length >= 3) {
      result = result.filter(it => {
        const taskName = it.taskName.toLowerCase();
        const regex = new RegExp(keyword, 'gmi');
        return taskName.startsWith(keyword) || taskName.endsWith(keyword) || taskName.match(regex) || taskName.includes(keyword) || taskName.indexOf(keyword) >= 0;
      });
    }
    
    if (type) {
      result = result.filter(it => it.state === type);
    }
  
    if (date_from && date_to) {
      date_from = dayjs(date_from).startOf('date').toDate();
      date_to = dayjs(date_to).startOf('date').toDate();
  
      result = result.filter(it => {
        return dayjs(it.date).isBetween(date_from, date_to, undefined, '[]');
      });
    }
  }


  const offset = (pagination.page ? 1 : pagination.page) - 1;
  const pageSize = pagination.pageSize ?? 20;

  return drop(result, offset).slice(0, pageSize);
}