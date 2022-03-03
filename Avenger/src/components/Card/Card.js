import React from "react";
import typeColors from "../../color/typeColors";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from "semantic-ui-react";

import { Link } from "react-router-dom";

const Card = ({ pokemon }) => {
  const navigate = useNavigate();
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type, index) => {
          return (
            <div
              key={index}
              className="Card__type"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="Card__data Card__data--weight">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
          <button class="ui button" onClick={() => navigate("/video")}>
            Play Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
