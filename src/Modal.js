export default function Modal(props) {
  console.log("cigani", props.stale);
  return (
    <div className="modal">
      <div className="modal-contexts">
        {props.stale ? (
          <h2>Stalemate</h2>
        ) : (
          <h2>The winner is {props.winPlayer}</h2>
        )}
        <button className="modal-btn" onClick={() => props.clickedBtn()}>
          Ok
        </button>
      </div>
    </div>
  );
}
