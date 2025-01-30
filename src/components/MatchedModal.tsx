import React from "react";
import { Dog } from "../pages/Match";
import "./MatchedModal.css";

const MatchedModal = ({
  showModal,
  setShowModal,
  matchedDog,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  matchedDog: Dog | null;
}) => {
  const handleExitButton = () => {
    setShowModal(false);
    console.log("in match", matchedDog);
  };

  return (
    <div className="match_modal">
      <div className="modal_overlay"></div>
      <div className="modal_card">
        <button className="exit_button" onClick={handleExitButton}>
          X
        </button>
        {matchedDog ? (
          <div className="modal_card_content">
            <h2>Found a Match!</h2>
            <img className="matched_img" src={matchedDog?.img} alt=""></img>
            <span className="matched_name">{`${matchedDog?.name} (${matchedDog?.age})`}</span>
            <span>{matchedDog?.breed}</span>
            {`Zip Code: ${matchedDog?.zip_code}`}
          </div>
        ) : (
          <h2>No Match Found. Try again</h2>
        )}
      </div>
    </div>
  );
};

export default MatchedModal;
