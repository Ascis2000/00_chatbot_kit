
import React from 'react';

const MessageParser = ({ children, actions }) => {
	const parse = (message) => {
		if (message.includes('hola')) {
			console.log('mensaje: hola');
			actions.handleHello();
		}

		if (message.includes('dog')) {
			actions.handleDog();
		}

		if (message.includes('pikachu')) {
			actions.handlePokemonOption('pikachu');
		} else if (message.includes('charmander')) {
			actions.handlePokemonOption('charmander');
		} else if (message.includes('bulbasaur')) {
			actions.handlePokemonOption('bulbasaur');
		}
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					parse: parse,
					actions,
				});
			})}
		</div>
	);
};

export default MessageParser;