import React, { useEffect, useRef } from 'react';
import './index.css';

interface Props {}

const Menu: React.FC<Props> = (props: Props) => {
    const checkboxRef:any = useRef();
    const divRef:any = useRef();
    const changePage = ():void =>{
      window.open("https://mockapi.io/docs", "_blank")
    }

      const handleClickOutside = (e:any) => {
        if (!divRef.current.contains(e.target)) {
          checkboxRef.current.checked = false
        }
    };
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <section className="top-nav">
      <input id="menu-toggle" type="checkbox" ref={checkboxRef} />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu"  ref={divRef} >
        <li onClick={changePage}>
          <a > 1</a>
        </li>
        <li onClick={changePage}>
          <a > 2</a>
        </li>
        <li onClick={changePage}>
          <a > 3</a>
        </li>
        <li onClick={changePage}>
          <a > 4</a>
        </li>
        <li onClick={changePage}>
          <a > 5</a>
        </li>
      </ul>
    </section>
  );
};

export default Menu;
