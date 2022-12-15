interface Props {
  children: React.ReactNode;
}

export default function Empty(props: Props) {
  return (
    <div>
      <p>{props.children}</p>
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
    </div>
  );
}
