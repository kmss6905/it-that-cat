import { ReactNode } from 'react';

export interface LabelProps {
  children?: ReactNode;
  isRequired?: boolean;
  addText?: string;
}

export interface TextInputProps {
  value?: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  required?: boolean;
}
