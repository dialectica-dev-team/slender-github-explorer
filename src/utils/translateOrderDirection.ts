import { OrderBy } from './../typings';
import { TableCellProps } from '@material-ui/core';
export default function translateOrderDirection(
  direction: OrderBy<never>['direction']
): TableCellProps['sortDirection'] {
  return direction.toLowerCase() as any;
}
