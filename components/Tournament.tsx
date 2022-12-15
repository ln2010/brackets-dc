import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
// import ReactMarkdown from 'react-markdown';

export type TournamentProps = {
  id: number;
  name: string;
  description: string;
};

const Tournament: React.FC<{ tournament: TournamentProps }> = ({ tournament }) => {
  // const authorName = tournament.author ? tournament.author.name : 'Unknown author';
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${tournament.id}`)}>
      <h2>{tournament.name}</h2>
      {/* <small>By {authorName}</small> */}
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
