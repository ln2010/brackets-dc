export type TeamProp = {};

interface TeamForm {
  size: number;
  tournament_id: string;
  teams: [
    {
      id: string;
      name: string;
      players: [
        {
          id: string;
          name: string;
        },
      ];
    },
  ];
}

export default function Teams(props: PropType) {
  const { tournament_id } = props;

  const context = useMemo(() => ({ additionalTypenames: ['Tournament', 'Team'] }), []);
  const [tournament] = useTypedQuery({
    query: {
      tournament: [
        { tournament_id: tournament_id },
        {
          teams: {
            id: true,
            name: true,
            players: {
              id: true,
              name: true,
            },
          },
        },
      ],
    },
    context,
  });

  return (
    <div>
      {tournament.data?.tournament.teams && tournament.data?.tournament.teams.length > 0 ? (
        <>
          <ol className={styles.list}>
            {tournament.data.tournament.teams.map(team => (
              <li key={team.id} className={styles.team}>
                <div>
                  <h2 className={styles.name}>
                    {team.name}
                    {/* <Link to={`/team/${team.id}`}>{team.name}</Link> */}
                    {team.players.map(player => (
                      <span key={player.id} className={styles.player}>
                        {player.name}
                      </span>
                    ))}
                  </h2>
                  &nbsp;
                </div>
              </li>
            ))}
          </ol>
          <CreateRound tournament_id={tournament_id} round_number={1} />
        </>
      ) : (
        <Empty>&#10024; Create the first team &#10024;</Empty>
      )}
    </div>
  );
}
