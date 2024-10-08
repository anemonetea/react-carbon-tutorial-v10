import React from 'react';

/**
 * Split out the last word in the input phrase and return it in an array.
 */
function getLastPhraseArray(phrase) {
  const splitPhrase = phrase.split(' ');
  const lastWord = splitPhrase.pop();
  return [splitPhrase.join(' '), lastWord];
}

const InfoSection = props => (
  <section className={`bx--row ${props.className} info-section`}>
    <div className="bx--col-md-8 bx--col-lg-4 bx--col-xlg-3">
      <h3 className="info-section__heading">{props.heading}</h3>
    </div>
    {props.children}
  </section>
);

const InfoCard = props => {
  const splitHeading = getLastPhraseArray(props.heading);

  return (
    <article className="info-card bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-1">
      <h4 className="info-card__heading">
        {splitHeading[0] + ' '}
        <strong>{splitHeading[1]}</strong>
      </h4>
      <p className="info-card__body">{props.body}</p>
      {props.icon}
    </article>
  );
};

export { InfoSection, InfoCard };
