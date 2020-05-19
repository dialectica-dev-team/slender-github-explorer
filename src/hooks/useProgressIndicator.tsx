/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAppActions } from "../actions";

export default (loading: boolean) => {
  const { setLoading } = useAppActions();

  React.useEffect(() => {
    setLoading(loading);
  }, [ loading ]);

  return {
    loading
  }
}