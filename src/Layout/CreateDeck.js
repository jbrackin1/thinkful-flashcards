import React from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

export default function createDeck() {
    const history = useHistory();

    function handleSubmit(newDeck){
        createDeck(newDeck).then((output) => history.push(`/decks/${output.id}`));
    }

    return (
        //styling/formatting for create deck page
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home" /> Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Deck
              </li>
            </ol>
          </nav>
          <h2>Create Deck</h2>
          <DeckForm handleSubmit={handleSubmit}/>
        </div>
      );
}