import React from 'react';
import Router from 'next/router';
// import ReactMarkdown from 'react-markdown';

export type TeamProps = {
  id: number;
  name: string;
};

const Team: React.FC<{ team: TeamProps }> = ({ team }) => {
  // const authorName = team.author ? team.author.name : 'Unknown author';
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${team.id}`)}>
      <h2>{team.name}</h2>
      {/* <small>By {authorName}</small> */}
      {/* <ReactMarkdown children={team.content} /> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Team;
