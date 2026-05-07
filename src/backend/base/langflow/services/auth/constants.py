"""Auth-related constants shared by service and utils (avoids circular imports)."""

AUTO_LOGIN_WARNING = "In v2.0, IDRFLOW_SKIP_AUTH_AUTO_LOGIN will be removed. Please update your authentication method."
AUTO_LOGIN_ERROR = (
    "Since v1.5, IDRFLOW_AUTO_LOGIN requires a valid API key. "
    "Set IDRFLOW_SKIP_AUTH_AUTO_LOGIN=true to skip this check. "
    "Please update your authentication method."
)
