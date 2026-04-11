import {
  INITIAL_BOOKING_STATE,
  QUESTIONS
} from "../lib/bookingConfig.js";
import {
  getBookingReply,
  updateBookingData,
  isBookingComplete
} from "../lib/bookingFlow.js";

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

    const updatedBooking = updateBookingData(
      safeBookingData,
      currentField,
      trimmedMessage
    );

    const bookingReply = getBookingReply(updatedBooking);

    return res.status(200).json({
      success: true,
      reply: bookingReply.reply,
      bookingData: updatedBooking,
      currentField: bookingReply.nextField,
      completed: isBookingComplete(updatedBooking) && !bookingReply.nextField
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}
