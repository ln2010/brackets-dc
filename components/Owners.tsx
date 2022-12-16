interface Props {
  owners: {
    id: number;
    name: string;
  }[];
}

export default function Owners(props: Props) {
  return (
    <>
      {props.owners && props.owners.length === 0 ? (
        <span>No Owners</span>
      ) : (
        props.owners.map((owner, index) => (
          <span key={owner.id} className="owner">
            {owner.name}
            {index! < props.owners.length - 2 && ', '}
            {index == props.owners.length - 2 && ' and '}
          </span>
        ))
      )}

      <style jsx>{`
        div {
            width: '100%',
	        height: '300px',
	        display: 'flex',
	        fontSize: '1.5rem',
	        alignItems: 'center',
	        justifyContent: 'center',
        }
      `}</style>
    </>
  );
}
