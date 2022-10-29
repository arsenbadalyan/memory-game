import styles from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
const Modal = ({ settings }) => {
  const navigate = useNavigate();
  if (settings.show) {
    function handleBtnClick(elm) {
      if (elm.actionType === 'chdir') {
        navigate(elm.action);
      } else if (elm.actionType === 'reload') {
        window.location.reload();
      } else {
        elm.action();
      }
    }
    return (
      <div className={styles.Modal}>
        <div className={styles.Modal_inner}>
          <div className={styles.title}>
            <h2>{settings.title}</h2>
          </div>
          <div className={styles.text}>
            <p>{settings.text}</p>
          </div>
          <div className={styles.variants}>
            {settings.variants.map((el, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleBtnClick(el);
                  }}
                >
                  {el.value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default Modal;
