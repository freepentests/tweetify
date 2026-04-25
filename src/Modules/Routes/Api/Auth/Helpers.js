import UserAccountBuilder from '../../../Builders/UserAccount.js';

import * as argon2 from 'argon2';
import * as fs from 'fs';

export default class Helpers {
	static async validateCredentials({ username, password }) {
		const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
		const targetUser = users.filter(user => user.username === username)[0];
		if (!targetUser) return;

		const targetUserPasswordHash = targetUser.passwordHash;

		return await argon2.verify(targetUserPasswordHash, password);
	}

	static checkIfUserExists(username) {
		const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
		const listOfAllUsernames = users.map((user) => user.username);
		const userExists = listOfAllUsernames.includes(username);

		return userExists;
	}

	static checkIfPasswordIsSafe(password) {
		const isLengthSafe = [...password].length >= 8 && [...password].length <= 1024; // i chose 1024 instead of 1000 as the maximum password length because i like making numbers powers of 2 for no reason at all
		const containsSymbols = password.match(/[!"£$%^&*'\/\\|<>?{}`¬]/g); 
		const containsUpperCaseLatinLetters = password.match(/[A-Z]/g); 
		const containsLowerCaseLatinLetters = password.match(/[a-z]/g); 

		const isPasswordSafe = isLengthSafe && containsSymbols && containsUpperCaseLatinLetters && containsLowerCaseLatinLetters;
		return isPasswordSafe;
	}

	static addNewUserAccount({ username, passwordHash }) {
		const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

		const user = new UserAccountBuilder()
			.setUsername(username)
			.setPasswordHash(passwordHash);

		users.push(user);

		fs.writeFileSync('data/users.json', JSON.stringify(users));
	}
}

