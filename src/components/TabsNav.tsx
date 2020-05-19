import React from 'react'
import useLayoutPortals from '../hooks/useLayoutPortals'
import { Portal, Tabs, TabsProps } from '@material-ui/core';

type Pros = TabsProps;

const TabsNav: React.FC<TabsProps> = ({ children, ...props }) => {
  const { header } = useLayoutPortals();


  return (
    <Portal container={ header.current }>
      <Tabs { ...props }>
        { children }
      </Tabs>
    </Portal>
  )
}

export default TabsNav
