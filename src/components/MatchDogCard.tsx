import { Dog } from "../pages/Match";
import React from "react";
import "./MatchDogCard.css";

const MatchDogCard = ({
  item,
  onClick,
}: {
  item: Dog;
  onClick: () => void;
}) => {
  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).classList.add("match_card_active");
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).classList.remove("match_card_active");
  };

  return (
    <div
      className="match_card"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="img-container">
        <img className="match_img" src={item.img} alt=""></img>
      </div>
      <div className="content_container">
        <span className="match_name">{`${item.name} (${item.age})`}</span>
        <span>{item.breed}</span>
        {`Zip Code: ${item.zip_code}`}
      </div>
    </div>
  );
};

export default MatchDogCard;
