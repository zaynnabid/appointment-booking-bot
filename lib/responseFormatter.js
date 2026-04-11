export function successResponse(reply, extra = {}) {
  return {
    success: true,
    reply,
    ...extra
  };
}

export function errorResponse(message, extra = {}) {
  return {
    success: false,
    message,
    ...extra
  };
}
