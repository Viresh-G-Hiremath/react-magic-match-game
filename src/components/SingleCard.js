import "./SingleCard.css";

export default function SingleCard({ card, Choose, isFliped }) {
  return (
    <div className="card">
      <div className={isFliped ? "fliped" : ""}>
        <img src={card.src} alt="img1" className="front" />
        <img
          src="/img/cover.png"
          alt="img2"
          className="back"
          onClick={() => Choose(card)}
        />
      </div>
    </div>
  );
}
