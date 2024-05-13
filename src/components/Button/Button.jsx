import styles from './Button.module.css';

function Button({ textColor, bgColor, isActive, id, onClick, children }) {
	return (
		<button
			className={`${styles.btn} ${isActive ? styles.active : ''}`}
			style={{
				backgroundColor: `${bgColor}`,
				color: `${textColor}`,
			}}
			onClick={() => onClick(id)}>
			{children}
		</button>
	);
}

export default Button;
