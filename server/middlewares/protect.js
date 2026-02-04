// export const protect = async (req, res, next) => {
// 	try {
// 		const { userId } = await req.auth();

// 		if (!userId) {
// 			return res.status(401).json({
// 				message: "Unauthorized",
// 			});
// 		}

// 		return next();
// 	} catch (error) {
// 		return res.status(401).json({ message: error.code || error.message });
// 	}
// };

// TODO:Solve the clerk auth 

export const devAuth = (req, res, next) => {
	// Only for local development
	if (process.env.NODE_ENV !== "development") {
		return next();
	}

	// If Clerk already attached auth, don't override it
	if (typeof req.auth === "function") {
		return next();
	}

	// Polyfill req.auth()
	req.auth = async () => ({
		userId: "dev_user_123",
		sessionId: "dev_session_123",
		getToken: async () => "dev_token",
	});

	next();
};
