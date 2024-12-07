
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Users from '../../../componentes/Users';
import UserForm from '../../../componentes/UserForm';
import DogPicture from '../../../componentes/DogPicture';

const botName = 'Eve';

//const AvatarWidget = (props) => React.createElement(AvatarWidget, props);
//const dogPictureWidget = (props) => React.createElement(DogPicture, props);

const headerWidget = () => React.createElement(
	'div',
	{ style: { backgroundColor: 'red', padding: '5px', borderRadius: '3px' } },
	`CHATBOT con ${botName}`
);


const config = {
	botName: botName,
	initialMessages: [
		createChatBotMessage(
			`Hola! Mi nombre es ${botName}.
			¿En qué puedo ayudarte?
		`),
		createChatBotMessage('Por favor, ingresa tus datos a continuación:', {
			widget: 'getUsers', // Este es el nombre del widget
		}),
		createChatBotMessage('Por favor, este texto no sale:', {
			widget: 'showUserForm', // Este es el nombre del widget
		}),
	],

	widgets: [
		{
			widgetName: 'showUserForm',
			widgetFunc: (props) => <UserForm {...props} />, 
		},
		{
			widgetName: 'getUsers',
			widgetFunc: (props) => <Users {...props} />, 
		},
		{
			widgetName: 'dogPicture',
			widgetFunc: (props) => <DogPicture {...props} />,
		},
	],

	/* widgets: [
		{
			widgetName: 'pokemonOptions',
			widgetFunc: (props) => (
				<div>
					<button onClick={() => props.actionProvider.handlePokemonOption('pikachu')}>Pikachu</button>
					<button onClick={() => props.actionProvider.handlePokemonOption('charmander')}>Charmander</button>
					<button onClick={() => props.actionProvider.handlePokemonOption('bulbasaur')}>Bulbasaur</button>
				</div>
			),
			props: {},
		},
	], */

	customStyles: {
		botMessageBox: {
			backgroundColor: '#376B7E',
		},
		chatButton: {
			backgroundColor: '#5ccc9d',
		},
	},

	customComponents: {
		// Replaces the default header
		header: headerWidget,

		// reemplaza el avatar por defecto
		//botAvatar: AvatarWidget,
	}
};

export default config;