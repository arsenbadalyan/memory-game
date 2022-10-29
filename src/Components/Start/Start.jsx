import styles from './Start.module.css';
import { NavLink } from 'react-router-dom';
const Start = () => {
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
            Options(Not Working Yet)
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Start;
