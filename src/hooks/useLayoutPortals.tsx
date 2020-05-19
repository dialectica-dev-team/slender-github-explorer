import React from 'react';

const header = React.createRef<HTMLDivElement>();
const main = React.createRef<HTMLElement>();

export default () => ({
  header,
  main
});