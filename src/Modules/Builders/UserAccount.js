export default class UserAccountBuilder {
	constructor() {
		this.username = null;
		this.passwordHash = null;
	}

	setUsername(username) {
		this.username = username;
		return this;
	}

	setPasswordHash(passwordHash) {
		this.passwordHash = passwordHash;
		return this;
	}
}

