import { Dog } from "../pages/Match";
import React from "react";
import "./DogCard.css";

const DogCard = ({
  item,
  isFav = false,
  onClick,
}: {
  item: Dog;
  isFav?: boolean;
  onClick: () => void;
}) => {
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).classList.add("card_active");
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).classList.remove("card_active");
  };

  return (
    <div
      className="card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {isFav && <div className="favorite"></div>}
      <img className="img" src={item.img} alt=""></img>
      <span className="name">{`${item.name} (${item.age})`}</span>
      <span>{item.breed}</span>
      {`Zip Code: ${item.zip_code}`}
    </div>
  );
};

export default DogCard;
