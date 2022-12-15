import React from 'react';
import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Team, { TeamProps } from '../components/Team';
import prisma from '../lib/prisma';
import { features } from 'process';

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await prisma.team.findMany();
  return {
    props: { teams },
  };
};

type Props = {
  teams: TeamProps[];
};

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Teams</h1>
        <main>
          {props.teams.map(team => (
            <div key={team.id} className="Team">
              <Team team={team} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .Team {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .Team:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .Team + .Team {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
