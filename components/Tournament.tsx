import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
// import ReactMarkdown from 'react-markdown';

export type TournamentProps = {
  id: number;
  name: string;
  description: string;
  owners: {
    id: number;
    name: string;
  }[];
};

const Tournament: React.FC<{ tournament: TournamentProps }> = ({ tournament }) => {
  // const authorName = tournament.author ? tournament.author.name : 'Unknown author';
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${tournament.id}`)}>
      <h2>{tournament.name}</h2>
      {tournament.owners.length > 0 ? (
        <small>
          By{' '}
          {tournament.owners.map((owner, index) => (
            <span key={owner.id} className="owner">
              {owner.name}
              {index! < tournament.owners.length - 2 && ', '}
              {index == tournament.owners.length - 2 && ' and '}
            </span>
          ))}
        </small>
      ) : (
        <small>No Owner</small>
      )}

      <ReactMarkdown children={tournament.description} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Tournament;
