import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [matched, setMatched] = useState([]);

  const onClickHandler = (currentId) => {
    const clickedCard = cardList.find((card) => card.id === currentId); 

    if (clickedCard.isOpen) {
      return;
    } 

    const updateMatchedList = [...cardList];
    matched.forEach((element) => {
      let index = updateMatchedList.findIndex((e) => {
        return e.id === element;
      });
      if (index > -1) {
        updateMatchedList.splice(index, 1);
      }
    });

    const openedCard = updateMatchedList.find(
      (card) => card.isOpen && card.id !== currentId
    );

    if (openedCard) {
      if (openedCard.name === clickedCard.name) {
        setCardList((prevList) =>
          prevList.map((card) =>
            card.id === currentId || card.id === openedCard.id
              ? { ...card, isOpen: true }
              : card
          )
        );

        setMatched((prevMatched) => [...prevMatched, currentId, openedCard.id]);
      } else {
        setCardList((prevList) =>
          prevList.map((card) =>
            card.id === currentId ? { ...card, isOpen: true } : card
          )
        );

        setTimeout(() => {
          setCardList((prevList) =>
            prevList.map((card) =>
              card.id === currentId || card.id === openedCard.id
                ? { ...card, isOpen: false }
                : card
            )
          );
        }, 1000);
      }
    } else {
      setCardList((prevList) =>
        prevList.map((card) =>
          card.id === currentId ? { ...card, isOpen: true } : card
        )
      );
    }
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
