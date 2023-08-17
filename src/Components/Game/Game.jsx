import styles from './Game.module.css';
import Modal from '../Modal/Modal';
// Add Images
// import
import question_mark from '../../imgs/cards/question-mark.png';
import logo_1 from '../../imgs/cards/1.png';
import logo_2 from '../../imgs/cards/2.png';
import logo_3 from '../../imgs/cards/3.png';
import logo_4 from '../../imgs/cards/4.png';
import logo_5 from '../../imgs/cards/5.png';
import logo_6 from '../../imgs/cards/6.png';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const makeGameArr = (...list) => {
  // console.log(list);
  let newArr = [...list, ...list];
  for (let i = 10; i > 0; i--) {
    const rand1 = Math.floor(Math.random() * newArr.length);
    const rand2 = Math.floor(Math.random() * newArr.length);
    let temp = newArr[rand1];
    newArr[rand1] = newArr[rand2];
    newArr[rand2] = temp;
  }
  return newArr;
};

let imageList;

const Game = () => {
  const [modalSettings, setModalSettings] = useState({ show: false });
  const [openedCard, setOpenedCard] = useState([]);
  const [wait, setWait] = useState(true);
  let [scoreCounter, setScoreCounter] = useState({
    all: 0,
    win: 0,
    count_win: 1,
    max_count: 6,
  });
  useMemo(() => {
    imageList = makeGameArr(logo_1, logo_2, logo_3, logo_4, logo_5, logo_6);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const select = document.querySelectorAll('.c_l__click');
      select.forEach((el) => {
        const current = el.children[0];
        current.style.transform = 'rotateY(-180deg)';
      });
      setTimeout(() => {
        select.forEach((el) => {
          const current = el.children[0];
          current.style.transform = 'rotateY(0deg)';
          setWait(false);
        });
      }, 1000);
    }, 500);
  }, []);
  const handleCardClick = (index) => {
    const select = document.querySelectorAll('.c_l__click');
    const el = select[index];

    const current = el.children[0];
    if (!wait && current.style.transform !== 'rotateY(-180deg)') {
      const attrValue = el.attributes['data-img'].value;
      let cards = openedCard;
      current.style.transform = 'rotateY(-180deg)';
      if (cards.length === 0) {
        setScoreCounter({ ...scoreCounter, all: scoreCounter.all + 1 });
        cards.push({ url: attrValue, id: index });
        setOpenedCard(cards);
      } else {
        if (cards[0]['url'] !== attrValue) {
          setWait(true);
          setTimeout(() => {
            select[cards[0]['id']].children[0].style.transform =
              'rotateY(0deg)';
            current.style.transform = 'rotateY(0deg)';
            cards.splice(0, 1);
            setOpenedCard(cards);
            setWait(false);
          }, 500);
        } else {
          let countWin = Math.round(scoreCounter.win + 1000 / scoreCounter.all);
          setScoreCounter({
            ...scoreCounter,
            win: countWin,
            count_win: scoreCounter.count_win + 1,
          });
          if (scoreCounter.count_win === scoreCounter.max_count) {
            const settings = {
              show: true,
              title: 'Yess you Win!',
              text:
                'We have a winner CONGRATS! You Want To Restart Game?\nTurns: ' +
                scoreCounter.all +
                '\nScores: ' +
                countWin,
              variants: [
                {
                  value: 'Yes',
                  actionType: 'reload',
                  action: '/',
                },
                {
                  value: 'No',
                  actionType: 'chdir',
                  action: '/',
                },
              ],
            };
            setModalSettings(settings);
          }
          cards.splice(0, 1);
          setOpenedCard(cards);
        }
      }
    }
  };
  function handleConfirmAction(text, action) {
    const settings = {
      show: true,
      title: 'Are you sure ?',
      text,
      variants: [
        {
          value: 'Yes',
          actionType: action,
          action: '/',
        },
        {
          value: 'No',
          actionType: '',
          action: () => {
            setModalSettings({ show: false });
          },
        },
      ],
    };
    setModalSettings(settings);
  }
  return (
    <div className={styles.Game}>
      <Modal settings={modalSettings} />
      <div className={styles.game_main}>
        <div className={styles.scoreboard}>
          <p>
            Scores: <span>{scoreCounter.win}</span>
          </p>
          <p>
            Counter: <span>{scoreCounter.all}</span>
          </p>
        </div>
        <div className={styles.card_list}>
          {imageList.map((el, index) => {
            return (
              <div
                className={`${styles.card_list__item} c_l__click`}
                data-img={el}
                key={index}
                onClick={(evt) => {
                  evt.stopPropagation();
                  handleCardClick(index);
                }}
              >
                <div className={styles.card_list__item_inner}>
                  <div className={styles.card_list__item_back}>
                    <img src={question_mark} alt="question" />
                  </div>
                  <div className={styles.card_list__item_front}>
                    <img src={el} alt="logo" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.game_btns}>
          <button
            className={styles.game_btns__button}
            onClick={() =>
              handleConfirmAction(
                'Are you sure that you want to exit.',
                'chdir'
              )
            }
          >
            Back To Menu
          </button>
          <button
            className={`${styles.game_btns__button} ${styles.bg_green}`}
            onClick={() =>
              handleConfirmAction(
                'Are you sure that you want to reload game.',
                'reload'
              )
            }
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
