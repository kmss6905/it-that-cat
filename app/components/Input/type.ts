import { ReactNode } from 'react';

export interface LabelProps {
  children?: ReactNode;
  isRequired?: boolean;
  addText?: string;
  addTextBottom?: string;
}

export interface TextInputProps {
  name: string;
  value?: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  required?: boolean;
  maxLength?: number;
}

export interface TextAreaProps {
  name: string;
  value?: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  required?: boolean;
  maxLength?: number;
  isDisabled?: boolean;
  report?: boolean;
}
