import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { TournamentProps } from '../../components/Tournament';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tournament = await prisma.tournament.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
  });

  return {
    props: { tournament: JSON.parse(JSON.stringify(tournament)) },
  };
};

async function publishTournament(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deleteTournament(id: number): Promise<void> {
  await fetch(`/api/tournament/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

const Tournament: React.FC<TournamentProps> = props => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  console.log('two ', props);

  const userHasValidSession = Boolean(session);
  // const tournamentBelongsToUser = session?.user?.email === props.author?.email;
  // if (!props.published) {
  //   title = `${title} (Draft)`;
  // }

  return (
    <Layout>
      <div>
        <h2>{props?.tournament?.name}</h2>
        <p>By {props?.tournament?.owner?.name || 'Unknown owner'}</p>
        <ReactMarkdown children={props.tournament.description} />
        {/* {!props.published && userHasValidSession && tournamentBelongsToUser && (
          <button onClick={() => publishTournament(props.id)}>Publish</button>
        )} */}
        {/* {userHasValidSession && tournamentBelongsToUser && (
          <button onClick={() => deleteTournament(props.id)}>Delete</button>
        )} */}
        {/* <Players></Players> */}
        {/* <Teams></Teams> */}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Tournament;
