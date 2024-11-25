import React from "react";
import "../styles/card.css";

function Card({eachCard, addToFilt}) {
  return (
    <div className={`card ${eachCard.featured && `featured`}`}>
      <div className="profile">
        <img 
				src={`/src/assets/${eachCard.logo.slice(1)}`} alt="" className="pro-pic" />

        <div className="info">
          <div className="comp-info">
            <span className="name">{eachCard.company}</span>

            {eachCard.new && <span className="age">New!</span>}

            {eachCard.featured && <span className="is-featured">Featured</span>}
          </div>
          <h2 className="role">{eachCard.position}</h2>
          <div className="job-time">
            <span className="job-date">{eachCard.postedAt}</span>
            <span className="dots"></span>
            <span className="job-t">{eachCard.contract}</span>
            <span className="dots"></span>
            <span className="job-place">{eachCard.location}</span>
          </div>
        </div>
      </div>
      <div className="job-requirements">
        {
          eachCard.languages.map((eachLang, id) => (
            <button 
            key={id}
            className="requirement"
            onClick={(e) => addToFilt(e)}
            >{eachLang}</button>
          ))
        }
      </div>
    </div>
  );
}

export default Card;
