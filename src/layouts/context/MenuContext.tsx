import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IMenuContext {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>> | null;
}

export const MenuContext = createContext<IMenuContext>({} as IMenuContext);

export const MenuProvider = (props: { children: JSX.Element }) => {
  const [activeMenu, setActiveMenu] = useState('');

  const value = {
    activeMenu,
    setActiveMenu
  };

  return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};
