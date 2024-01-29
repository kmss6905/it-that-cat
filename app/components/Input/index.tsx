'use client';

import { LabelProps, TextInputProps } from './type';

export const Label = ({ children, ...rest }: LabelProps) => (
  <label className={`flex gap-1 pb-2 subHeading`}>
    {children}
    {rest.isRequired ? <span className='text-primary-500'>*</span> : null}
    {rest.addText ? (
      <span className='text-gray-200 body1'>{rest.addText}</span>
    ) : null}
  </label>
);

export const TextInput = ({ value, onChange, ...rest }: TextInputProps) => (
  <>
    <input
      type='text'
      value={value}
      onChange={onChange}
      className={`${InputClass}
      disabled:text-text-disable
      border transition-colors
    `}
    />
  </>
);

export const TextareaInput = ({ value, onChange, ...rest }: TextInputProps) => (
  <>
    <textarea
      value={value}
      className={`${InputClass}
      disabled:text-text-disable
      border transition-colors resize-none
    `}
    />
  </>
);

const InputClass =
  'w-full rounded-lg text-text-title body1 border-gray-100 px-4 py-[10px] text-gray-500';
