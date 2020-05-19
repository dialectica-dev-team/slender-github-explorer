import { useState } from 'react';

export default (initialPage = 0) => {
  const [ page, setPage ] = useState(initialPage);
  const [ cursors, setCursors ] = useState<{ after?: string, before?: string }>({});

  return {
    page,
    setPage,
    ...cursors,
    setCursors,
    clearCursors: () => {
      setPage(1);
      setCursors({})
    }
  }
}
