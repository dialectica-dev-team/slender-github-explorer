import { TableCell, TableCellProps, TableSortLabel } from '@material-ui/core';
import React from 'react';

type Props<S extends string> = TableCellProps & {
  children: React.ReactNode,
  defaultDirection?: 'asc' | 'desc';
  sortProperty: S;
  onRequestSort: (event: React.MouseEvent<unknown>, property: S, direction: 'asc' | 'desc') => void;
}

const SortableTableCell = <S extends string>({ children, onRequestSort, sortProperty, sortDirection, defaultDirection = "asc", ...props }: Props<S>) => {
  const direction = React.useMemo(() => sortDirection || defaultDirection, [ sortDirection, defaultDirection ]);
  const toggleDirection = React.useCallback(() => direction === 'asc' ? 'desc' : 'asc', [ direction ])
  const sortHandler = React.useCallback((event: React.MouseEvent<unknown>) => {
    const newDirection = toggleDirection();
    onRequestSort(event, sortProperty, newDirection);
  }, [ toggleDirection, onRequestSort, sortProperty ]);

  return (
    <TableCell { ...props } sortDirection={ sortDirection }>
      <TableSortLabel
        active={ sortDirection !== false }
        direction={ direction }
        onClick={ sortHandler }
      >
        { children }
      </TableSortLabel>
    </TableCell>
  )
}

export default SortableTableCell
