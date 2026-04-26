import ApiResponseBuilder from '../Builders/ApiResponse.js';

import jwt from 'jsonwebtoken';

export default class AuthorizationMiddleware {
	static generateApiFailureResponse(message) {
		const apiResponse = new ApiResponseBuilder()
			.setSuccess(false)
			.setResponse(message ?? 'This API endpoint requires users to be authenticated. Please log in to your account and try again.');

		return apiResponse;
	}

	static throwApiFailureResponse(res) {
		const apiResponse = AuthorizationMiddleware.generateApiFailureResponse()
		res.status(401).json(apiResponse);
	}

	static requiresAuthentication(req, res, next) {
		const jwtToken = req.headers.authorization?.split('Bearer ')[1];

		if (jwtToken === undefined) {
			return AuthorizationMiddleware.throwApiFailureResponse(res);
		}

		try {
			const decodedPayload = jwt.verify(jwtToken, process.env.JWT_SIGNING_KEY);
			
			if (decodedPayload.authenticated) {
				next();
			} else {
				AuthorizationMiddleware.throwApiFailureResponse(res);
			}
		} catch(err) {
			AuthorizationMiddleware.throwApiFailureResponse(res);
		}
	}
}

