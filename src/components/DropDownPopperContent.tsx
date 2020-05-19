import React from 'react';
import { makeStyles, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Radio } from '@material-ui/core';
import { usePopperActions } from '../actions';

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterState: {}
}));

type Props<T extends string> = {
  radio?: boolean;
  initialValues?: T[];
  options: { [ k in T ]: string | null };
  onApplyFilter: (values: T[]) => void;
};

const DropDownPopperContent = <T extends string>({
  radio = false,
  options,
  initialValues = [],
  onApplyFilter,
}: Props<T>) => {
  const classes = useStyles();
  const { setOpen } = usePopperActions();
  const [ values, setValues ] = React.useState<T[]>(initialValues);
  const Control = React.useMemo(() => radio ? Radio : Checkbox, [ radio ]);

  const createChangeHandler = React.useCallback(
    (value: T) => (event: React.ChangeEvent<HTMLInputElement>) => {

      let newValues: Set<T> = new Set<T>([]);
      if (radio)
        newValues = new Set([ value ]);
      else if (!event.target.checked)
        newValues = new Set(values.filter((v) => v !== value));
      else if (values.indexOf(value) === -1) {
        values.push(value);
        newValues = new Set(values);
      }
      setValues(Array.from(newValues));
    },
    [ values, radio ]
  );

  const handleClickApply = () => {
    onApplyFilter(values);
    setOpen(false);
  };

  const handleClickCancel = () => setOpen(false);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        { 'Select one or more options' }
      </FormLabel>
      <FormGroup>
        { Object.keys(options).map((key, idx) => (
          <FormControlLabel
            key={ `filter-option-${key}-${idx}` }
            label={ key }
            control={
              <Control
                checked={ values.indexOf(options[ key as T ] as any) > -1 }
                onChange={ createChangeHandler(options[ key as T ] as any) }
              />
            }
          />
        )) }
      </FormGroup>
      <div className={ classes.buttons }>
        <Button
          variant="text"
          color="default"
          size="small"
          onClick={ handleClickCancel }
        >
          Cancel
          </Button>
        <Button
          disabled={ values.length === 0 }
          variant="text"
          color="primary"
          size="small"
          onClick={ handleClickApply }
        >
          { 'Apply' }
        </Button>
      </div>
    </FormControl>
  );
};


export default DropDownPopperContent;