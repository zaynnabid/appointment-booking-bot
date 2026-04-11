import {
  BOOKING_FIELDS,
  REQUIRED_FIELDS,
  QUESTIONS
} from "./bookingConfig.js";

function normalizeValue(value) {
  return String(value || "").trim();
}

export function getNextMissingField(booking = {}) {
  for (const field of BOOKING_FIELDS) {
    if (!normalizeValue(booking[field])) {
      return field;
    }
  }

  return null;
}

export function isBookingComplete(booking = {}) {
  return REQUIRED_FIELDS.every((field) => normalizeValue(booking[field]));
}

export function getQuestionForField(field) {
  return QUESTIONS[field] || "Please provide the required information.";
}

export function getBookingReply(booking = {}) {
  const nextField = getNextMissingField(booking);

  if (!nextField) {
    return {
      completed: true,
      reply: QUESTIONS.confirmation,
      nextField: null
    };
  }

  return {
    completed: false,
    reply: getQuestionForField(nextField),
    nextField
  };
}

export function updateBookingData(currentBooking = {}, field, value) {
  if (!field) return currentBooking;

  return {
    ...currentBooking,
    [field]: normalizeValue(value)
  };
}
