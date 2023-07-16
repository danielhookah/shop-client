import cn from 'clsx';
import s from './Checkbox.module.css';
import React, { InputHTMLAttributes, useId, useState } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: any[]) => any;
  label?: string;
  error?: string;
  value?: string;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const id = useId();
  const { className, children, onChange, label, checked, ...rest } = props;
  const hasError = !!props.error;

  const labelClassName = label
    ? 'cursor-pointer text-sm ' + (hasError ? ' text-red' : '')
    : '';
  const rootClassName = cn(
    s.root,
    {
      'border-2 border-red': hasError,
    },
    className
  );

  return (
    <div className='flex items-center'>
      <input
        id={id}
        type='checkbox'
        className={rootClassName}
        onChange={onChange}
        checked={checked}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        {...rest}
      />

      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
