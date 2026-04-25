export default class ApiResponseBuilder {
	constructor() {
		this.success = null;
		this.response = null;
	}

	setSuccess(success) {
		this.success = success;
		return this;
	}

	setResponse(response) {
		this.response = response;
		return this;
	}
}

