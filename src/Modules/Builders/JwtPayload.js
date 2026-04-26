export default class JwtPayloadBuilder {
	constructor() {
		this.authenticated = null;
		this.username = null;
	}

	setAuthenticated(authenticated) {
		this.authenticated = authenticated;
		return this;
	}

	setUsername(username) {
		this.username = username;
		return this;
	}

	serialize() {
		return JSON.stringify(this);
	}
}

