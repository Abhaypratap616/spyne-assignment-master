const responseTemplate = async (success, message, data, error) => {
    return {
        success,
        message,
        data: !data ? {}: await (data),
        error: !error || Object.keys(error)?.length == 0 ? {} : await (error)
    }
}

const responseMessage = {
    serverError: "Some server error occurred! ",
    unauthorizedAccess: "Unauthorized access!",
    alreadyRegistered: "Account Id already exists.",
    invalidToken: "Invalid token used!",
    invalidCredentials: "Invalid credentials.",
    differentToken: "Don't try to create a different token!",
    tokenNotFound: "No token found in 'authorization' header",
    loginSuccess: "Logged in successfully. Save the token for access to your account.",
    badRequest : "Syntax or variable problem.",
    registerSuccess: "Registered in successfully. Save the token for access to your account.",
    badGateway: "Unknown route discovered. Check for correct URL and method.",
    noDataFound: "No such data found",
    requestVarsNotFound: "Some of the request body parameters are not found in the request, check the correct postman documentation.",
}

module.exports = { responseMessage, responseTemplate }