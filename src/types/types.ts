import React from 'react';

export type TSectionHeaderProps = {
  title: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};
