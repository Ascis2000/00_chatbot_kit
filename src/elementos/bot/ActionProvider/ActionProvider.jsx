
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

	const handleHello = () => {
		//const botMessage = createChatBotMessage('Hola. Encantad@ de conocerte.');

		const messageWithProperties = createChatBotMessage('Hola. Encantad@ de conocerteeee', {
			widget: 'my-widget',
			payload: {}, // any value I want to send to the given widget or message
			delay: 500,
		});

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, messageWithProperties],
		}));
	};

	const handleDog = () => {
		const botMessage = createChatBotMessage("Here's a nice dog picture for you!",
			{
				widget: 'dogPicture',
			}
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleGetUsers = () => {
		const botMessage = createChatBotMessage("Aquí están los usuarios:",
			{
				widget: 'getUsers',
			}
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleUserForm = () => {
		const botMessage = createChatBotMessage("Formulario:",
			{
				widget: 'showUserForm',
			}
		);

		setState((prev) => ({
			...prev,
			messages: [...prev.messages, botMessage],
		}));
	};

	const handleClearMessages = () => {
		// Actualiza el estado para limpiar los mensajes
		setState((prevState) => ({
			...prevState,
			messages: [],  // Borrar todos los mensajes del chatbot
		}));
	};

	const handlePokemonOption = async (pokemonName) => {
		// Mostrar la opción seleccionada
		const message = createChatBotMessage(`Has seleccionado: ${pokemonName}`,
			{
				widget: 'pokemonOptions',
			}
		);
		setState((prev) => ({
			...prev,
			messages: [...prev.messages, message],
		}));

		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
			const data = await response.json();
			console.log(data)
			if (data.sprites && data.sprites.front_default) {
				const imageUrl = data.sprites.front_default;
				const imageMessage = createChatBotMessage('', {
					image: {
						src: imageUrl,
						alt: pokemonName,
						height: 150,
						width: 150,
					},
				});
		
				setState((prev) => ({
					...prev,
					messages: [...prev.messages, imageMessage],
				}));
			} else {
				console.error('No sprite found for the selected Pokémon');
			}
		} catch (error) {
			console.error('Error fetching Pokémon data:', error);
		}
	};

	return (
		<div>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					actions: {
						handleHello,
						handleDog,
						handleGetUsers,
						handleUserForm,
						handleClearMessages,
						handlePokemonOption,
					},
				});
			})}
		</div>
	);
};

export default ActionProvider;