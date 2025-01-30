import React from "react";
import DogCard from "./DogCard";
import { Dog } from "../pages/Match";
import "./Grid.css";

const Grid = ({
  itemList,
  favIds,
  setFavIds,
}: {
  itemList: Dog[];
  favIds: string[];
  setFavIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  //Can make Grid generic for reusablity

  const onClick = (id: string) => {
    setFavIds((prev) => {
      if (favIds.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        console.log([...prev, id]);
        return [...prev, id];
      }
    });
  };

  return (
    <div className="grid-container">
      {/* If generic, do a check if its a dog object before calling Dog card
      Could also do the check in Card and make card  generic */}
      {itemList.map((item) => {
        const isFav = favIds.includes(item.id);
        if (isFav) {
          return (
            <DogCard
              key={item.id}
              item={item}
              isFav={isFav}
              onClick={() => onClick(item.id)}
            ></DogCard>
          );
        } else {
          return (
            <DogCard
              key={item.id}
              item={item}
              onClick={() => onClick(item.id)}
            ></DogCard>
          );
        }
      })}
    </div>
  );
};

export default Grid;
