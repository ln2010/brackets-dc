import { Player } from '@prisma/client';
import Empty from '../Empty';

export type PlayersProp = {
  players: Player[];
};

const Players: React.FC<{ players: PlayersProp }> = ({ players }) => {
  return (
    <div>
      {players && players.players.length > 0 ? (
        <>
          <ol>
            {players.players.map(player => (
              <li key={player.id}>
                <div>
                  <h2>
                    {player.name}
                    {/* <Link to={`/player/${player.id}`}>{player.name}</Link> */}
                  </h2>
                  &nbsp;
                </div>
              </li>
            ))}
          </ol>
          {/* <CreateTeams tournament_id={tournament_id} size={2} /> */}
        </>
      ) : (
        <Empty>&#10024; Post the first player &#10024;</Empty>
      )}
    </div>
  );
};
