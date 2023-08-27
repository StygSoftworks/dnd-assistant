export const iconTextContainerStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '8px', // Add padding to create a larger clickable area
	transition: 'background-color 0.3s, color 0.3s', // Add transition for smooth hover and click effect
	textDecoration: 'none', // Add text decoration to make the text clickable
	cursor: 'pointer', // Add cursor pointer for clickable effect
};

export const activeStyles = {
	backgroundColor: 'lightgray', // Change to your preferred active background color
	color: 'black', // Change to your preferred active text color
};
