import React from "react";
import "./MatchDog.css";
import { Dog } from "../pages/Match";
import MatchDogCard from "./MatchDogCard";

const MatchDog = ({
  favList,
  favIds,
  setFavIds,
  handleMatchClick,
}: {
  favList: Dog[];
  favIds: string[];
  setFavIds: React.Dispatch<React.SetStateAction<string[]>>;
  handleMatchClick: () => void;
}) => {
  const onClick = (id: string) => {
    setFavIds((prev) => {
      const favs = new Set(prev);
      if (favs.has(id)) {
        favs.delete(id);
      }
      return Array.from(favs);
    });
  };

  return (
    <div>
      <h2>Favorited List</h2>
      <div className="favorite_list">
        {favList ? (
          favList.map((item) => (
            <MatchDogCard
              key={item.id}
              item={item}
              onClick={() => onClick(item.id)}
            ></MatchDogCard>
          ))
        ) : (
          <span>No favorites yet!</span>
        )}
      </div>
      <div className="match_button_container" onClick={handleMatchClick}>
        <button className="match_button">Find Match!</button>
      </div>
    </div>
  );
};

export default MatchDog;
