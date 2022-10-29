import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <p>&copy; {new Date().getFullYear()} by Arsen Badalyan</p>
    </div>
  );
};

export default Footer;
