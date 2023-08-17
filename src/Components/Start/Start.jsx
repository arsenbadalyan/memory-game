import styles from './Start.module.css';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Howl } from 'howler';
import menuSound from '../../sounds/menu.mp3';
const Start = () => {
  useEffect(() => {
    const sound = new Howl({
      src: [menuSound],
    });
    const menuItems = document.querySelectorAll(
      '.' + styles.start_page__menu_item
    );
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('mouseover', (item) => {
        sound.play();
      });
    });
  }, []);
  return (
    <div className={styles.Start_Page}>
      <div className={styles.start_page__title}>
        <h1>Memory Game</h1>
      </div>
      <div className={styles.start_page__content}>
        <div className={styles.start_page__menu}>
          <NavLink to="/game" className={styles.start_page__menu_item}>
            Start Game
          </NavLink>
          <NavLink to="/" className={styles.start_page__menu_item}>
            Options
          </NavLink>
        </div>
      </div>
      <div>v 0.1.0</div>
    </div>
  );
};

export default Start;
