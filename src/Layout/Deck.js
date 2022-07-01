import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom";
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index";

const Deck = () => {
    const [deck, setDeck] = useState({cards: []});
    const {deckId} = useParams();
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then(setDeck);

    }, [deckId]); //readDeckID, change with setDeck, run every time deckid changes

    function handleDeckDelete(deckID) {
        const confirmDelete = window.confirm("Do you want to delete this deck?");
        
        if (confirmDelete) {
            deleteDeck(deckID);
            history.push("/");
        }
    }
    function handleCardDelete(cardId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (confirmDelete){
            deleteCard(cardId);
            readDeck(deckId).then(setDeck);
        }
    }
    return (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home"></span> Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {deck.name}
              </li>
            </ol>
          </nav>
    
          <h3>{deck.name}</h3> 
          <p>{deck.description}</p>
          <div>
            <div>
              <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-secondary">
                  <span className="oi oi-pencil"></span> Edit
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="ml-2 btn btn-primary">
                  <span className="oi oi-book mr-2"></span> Study
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="ml-2 btn btn-primary add-cards">
                  <span className="oi oi-plus mr-2"></span> Add Cards
                </button>
              </Link>
              <button
                className="float-right m-1 btn btn-danger"
                onClick={() => handleDeckDelete(deck.id)} // deletes deck 
              >
                <span className="oi oi-trash"></span>
              </button>
            </div>
          </div>
        <br/>
          <h2 className="cards-header">Cards</h2>
          <div className="cards-list">
            {deck.cards.map((card) => (
              <div key={`${card.id}`} className="card">
                <div className="card body">
                  <h5 className="card-title">{card.front}</h5>
                  <div className="card text">
                    <div>{card.back}</div>
                    <div>
                      <button
                        className="float-right m-1 btn btn-danger"
                        onClick={() => handleCardDelete(card.id)} // deletes card on clicked
                      >
                        <span className="oi oi-trash"></span>
                      </button>
                      <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                        <button className="float-right m-1 btn btn-secondary">
                          <span className="oi oi-pencil"></span> Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default Deck;
