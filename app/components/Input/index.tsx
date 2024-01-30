'use client';

import { LabelProps, TextAreaProps, TextInputProps } from './type';

export const Label = ({ children, ...rest }: LabelProps) => (
  <label className={`flex gap-1 pb-2 subHeading`}>
    {children}
    {rest.isRequired ? <span className='text-primary-500'>*</span> : null}
    {rest.addText ? (
      <span className='text-gray-200 body1'>{rest.addText}</span>
    ) : null}
  </label>
);

export const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
}: TextInputProps) => (
  <input
    type='text'
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${InputClass}
      disabled:text-text-disable
      border transition-colors
    `}
  />
);

export const TextareaInput = ({
  name,
  value,
  onChange,
  placeholder,
}: TextAreaProps) => (
  <div className='relative'>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${InputClass}
    disabled:text-text-disable
    border transition-colors resize-none
    h-[140px]
    `}
    />
    <span className='absolute text-gray-200 caption bottom-[14px] right-[14px]'>
      {value?.length}/300
    </span>
  </div>
);

const InputClass =
  'w-full rounded-lg text-text-title body1 border-gray-100 px-4 py-[10px] text-gray-500';
