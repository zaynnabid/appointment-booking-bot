import {
  BOOKING_FIELDS,
  REQUIRED_FIELDS,
  QUESTIONS
} from "./bookingConfig.js";

function normalizeValue(value) {
  return String(value || "").trim();
}

function getSkippedFields(booking = {}) {
  return Array.isArray(booking._skippedFields) ? booking._skippedFields : [];
}

export function getNextMissingField(booking = {}) {
  const skippedFields = getSkippedFields(booking);

  for (const field of BOOKING_FIELDS) {
    if (skippedFields.includes(field)) {
      continue;
    }

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

export function markFieldSkipped(currentBooking = {}, field) {
  const existing = Array.isArray(currentBooking._skippedFields)
    ? currentBooking._skippedFields
    : [];

  if (existing.includes(field)) {
    return currentBooking;
  }

  return {
    ...currentBooking,
    _skippedFields: [...existing, field]
  };
}

export function buildBookingSummary(booking = {}) {
  return [
    "Booking Summary:",
    `Name: ${booking.fullName || "-"}`,
    `Phone: ${booking.phone || "-"}`,
    `Email: ${booking.email || "-"}`,
    `Appointment Type: ${booking.appointmentType || "-"}`,
    `Preferred Date: ${booking.preferredDate || "-"}`,
    `Preferred Time: ${booking.preferredTime || "-"}`,
    `Note: ${booking.note || "-"}`
  ].join("\n");
}
