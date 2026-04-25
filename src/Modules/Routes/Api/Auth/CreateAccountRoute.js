import ApiResponseBuilder from '../../../Builders/ApiResponse.js';
import Helpers from './Helpers.js';

import * as argon2 from 'argon2';

export default class CreateAccountRoute {
	static createAccount({ username, password, passwordHash }) {
		const isPasswordSafe = Helpers.checkIfPasswordIsSafe(password);
		if (!isPasswordSafe) throw new Error('Your password must be between 8 and 1024 characters long, your password must contain at least one symbol, and your password must contain at least 1 uppercase latin character as well as 1 lowercase latin character');

		const userExists = Helpers.checkIfUserExists(username);
		if (userExists) throw new Error('This username already exists; please select a different username.');

		Helpers.addNewUserAccount({
			username,
			passwordHash
		});

		return 'Successfully created a new user account. You can now log in.';
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
			const response = CreateAccountRoute.createAccount({
				username,
				password,
				passwordHash
			});

			apiResponse.setSuccess(true).setResponse(response);
			res.json(apiResponse);
		} catch(error) {
			apiResponse.setSuccess(false).setResponse(error.message);
			res.status(500).json(apiResponse);
		}
	}
}

