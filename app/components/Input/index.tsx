'use client';

import { LabelProps, TextAreaProps, TextInputProps } from './type';

export const Label = ({ children, ...rest }: LabelProps) => (
  <label className={`flex flex-col pb-2 subHeading`}>
    <div className='flex gap-1'>
      {children}
      {rest.isRequired ? <span className='text-primary-500'>*</span> : null}
      {rest.addText ? (
        <span className='text-gray-200 body1'>{rest.addText}</span>
      ) : null}
    </div>
    {rest.addTextBottom ? (
      <div className='text-gray-300 caption pt-1'>{rest.addTextBottom}</div>
    ) : null}
  </label>
);

export const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  isDisabled,
}: TextInputProps) => (
  <input
    type='text'
    name={name}
    value={value}
    onChange={onChange}
    maxLength={maxLength}
    placeholder={placeholder}
    className={`${InputClass}
      disabled:text-text-disable
      border transition-colors
    `}
    disabled={isDisabled ? isDisabled : false}
  />
);

export const TextareaInput = ({
  name,
  value,
  onChange,
  placeholder,
  maxLength,
  isDisabled,
  report,
}: TextAreaProps) => (
  <div className='relative'>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={isDisabled ? isDisabled : false}
      className={`${InputClass}
    disabled:text-text-disable
    border transition-colors resize-none
    h-[140px] 
    ${report ? 'body2' : null}
    `}
    />
    <span className='absolute text-gray-200 caption bottom-[-12px] right-[4px]'>
      {value?.length}/300
    </span>
  </div>
);

const InputClass =
  'w-full rounded-lg text-text-title body1 border-gray-100 px-4 py-[10px] text-gray-500';
