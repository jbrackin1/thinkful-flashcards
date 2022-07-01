import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { createCard, readDeck} from "../utils/api/index"

function AddCard(){
   const history = useHistory();
   const [deck, setDeck] = useState([]);
   const { deckID } = useParams();
   const [cardFront, setCardFront] = useState("");
   const [cardBack, setCardBack] = useState("");
   
   useEffect(() => {
      //fetch with readdeck, setvalues with setDeck
      readDeck(deckID)
      .then((data) => setDeck(data))
      .catch((err) => console.log(err));
   }, [deckID]);

   const handleCardFrontChange = (event) => setCardFront(event.target.value); //changes front card val
   const handleCardBackChange = (event) => setCardBack(event.target.value); //changes card back

   //Submit form
   const handleAddCard = (event) => {
      event.preventDefault();
      createCard(deckID, {front: cardFront, back: cardBack});
      setCardFront("");
      setCardBack("");
      history.push(`/decks/${deck.id}`);
      //push to deck with id 
   };
   return(
      <div>
         <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
               <li className="breadcrumb-item">
                  <Link to = "/">
                     <span className = "oi oi-home" /> Home
                  </Link>
               </li>
               <li className="breadcrumb-item active" aria-current="page">
                  {deck.name}
                  {/*Access name of deck with dot notation*/}
               </li>
            </ol>
         </nav>
         <form onSubmit={handleAddCard}>
            {/* Event Listener to add cards */}
            <h2>{deck.name}:</h2>
            <span>Add Card</span>
            <div className="form-group">
               <label>Front</label>
               <textarea  
                  id="front"
                  name="front"
                  className="form-control"
                  onChange={handleCardFrontChange}
                  type="text"
                  value={cardFront}
                  placeholder="placeholder text"
                  required
                  />
               </div> 
               <Link to={`/decks/${deck.id}`} className="btn btn-secondary mb-2">
                  Done
               </Link>
               <button type="save" className="btn btn-primary ml-2 mb-2">
                  Save
               </button>
         </form>
      </div>   
   );
}

export default AddCard;