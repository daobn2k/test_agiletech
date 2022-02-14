import React, { useEffect, useRef } from 'react';
import './index.css';

interface Props {}

const Menu: React.FC<Props> = (props: Props) => {
    const checkboxRef:any = useRef();
    const divRef:any = useRef();
    const changePage = ():void =>{
        window.open('/')
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
        <li>
          <a onClick={changePage}> 1</a>
        </li>
        <li>
          <a onClick={changePage}> 2</a>
        </li>
        <li>
          <a onClick={changePage}> 3</a>
        </li>
        <li>
          <a onClick={changePage}> 4</a>
        </li>
        <li>
          <a onClick={changePage}> 5</a>
        </li>
      </ul>
    </section>
  );
};

export default Menu;
