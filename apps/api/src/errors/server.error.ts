import { loggerUtil } from "../utils";

/**
 * Handles server errors with specific messages
 * @param {NodeJS.ErrnoException} error - The error object
 * @param {number} port - The port number
 */
export const handleServerError = (
  error: NodeJS.ErrnoException,
  port: number
): void => {
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      loggerUtil.error(`${bind} requires elevated privileges`);
      break;
    case "EADDRINUSE":
      loggerUtil.error(`${bind} is already in use`);
      break;
    default:
      loggerUtil.error("Server error", {
        error: error.message,
        stack: error.stack,
      });
  }

  process.exit(1);
};
