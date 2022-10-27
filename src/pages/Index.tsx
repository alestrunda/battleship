import { Link } from 'react-router-dom';
import imgBattleship from '../../assets/battleship.jpg';

const Index = () => {
  return (
    <div className="page">
      <h1 className="page__title">Battleship</h1>
      <Link to="game">Start the game</Link>
      <img className="page__bg" alt="battleship" src={imgBattleship} />
    </div>
  );
};

export default Index;
