import {
  INITIAL_BOOKING_STATE,
  QUESTIONS
} from "../lib/bookingConfig.js";
import {
  getBookingReply,
  updateBookingData,
  isBookingComplete,
  buildBookingSummary
} from "../lib/bookingFlow.js";
import {
  validateField,
  isSkippableField,
  isSkipCommand
} from "../lib/validation.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { message, bookingData, currentField } = req.body;

    const safeBookingData = {
      ...INITIAL_BOOKING_STATE,
      ...(bookingData || {})
    };

    const trimmedMessage = String(message || "").trim();

    if (!trimmedMessage && !currentField) {
      return res.status(200).json({
        success: true,
        reply: QUESTIONS.fullName,
        bookingData: safeBookingData,
        currentField: "fullName",
        completed: false
      });
    }

    if (!currentField) {
      const bookingReply = getBookingReply(safeBookingData);

      return res.status(200).json({
        success: true,
        reply: bookingReply.reply,
        bookingData: safeBookingData,
        currentField: bookingReply.nextField,
        completed: false
      });
    }

    const shouldSkip =
      isSkippableField(currentField) && isSkipCommand(trimmedMessage);

    if (!shouldSkip) {
      const validation = validateField(currentField, trimmedMessage);

      if (!validation.valid) {
        return res.status(200).json({
          success: true,
          reply: validation.message,
          bookingData: safeBookingData,
          currentField,
          completed: false
        });
      }
    }

    const valueToStore = shouldSkip ? "" : trimmedMessage;

    const updatedBooking = updateBookingData(
      safeBookingData,
      currentField,
      valueToStore
    );

    const bookingReply = getBookingReply(updatedBooking);
    const completed =
      isBookingComplete(updatedBooking) && !bookingReply.nextField;

    return res.status(200).json({
      success: true,
      reply: completed
        ? `${bookingReply.reply}\n\n${buildBookingSummary(updatedBooking)}`
        : bookingReply.reply,
      bookingData: updatedBooking,
      currentField: bookingReply.nextField,
      completed
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}
