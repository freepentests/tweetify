import ApiResponseBuilder from '../../../Builders/ApiResponse.js';
import Helpers from './Helpers.js';

import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export default class LoginRoute {
	static async login({ username, password }) {
		const credentialsValid = await Helpers.validateCredentials({ username, password });
		if (!credentialsValid) throw new Error('Username or password is incorrect.');

		return {
			message: 'Successfully logged in.',
			jwt: jwt.sign({ username }, process.env.JWT_SIGNING_KEY)
		};
	}

	static async onPost(req, res) {
		const username = req.body.username;
		const password = req.body.password;

		const apiResponse = new ApiResponseBuilder();

		if (!username || !password) {
			apiResponse.setSuccess(false).setResponse('Not enough parameters provided to satisfy this request.');
			res.status(400).json(apiResponse);
		}

		const passwordHash = await argon2.hash(password);

		try {
			const response = await LoginRoute.login({
				username,
				password
			});

			apiResponse.setSuccess(true).setResponse(response);
			res.json(apiResponse);
		} catch(error) {
			apiResponse.setSuccess(false).setResponse(error.message);
			res.status(500).json(apiResponse);
		}
	}
}

