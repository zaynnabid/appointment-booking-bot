import { saveBooking } from "../lib/storage.js";
import { sendToGHL } from "../lib/ghl.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const bookingData = req.body || {};

    const requiredFields = [
      "fullName",
      "phone",
      "appointmentType",
      "preferredDate",
      "preferredTime"
    ];

    for (const field of requiredFields) {
      if (!bookingData[field] || !String(bookingData[field]).trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required.`
        });
      }
    }

    const result = await saveBooking(bookingData);

    const ghlResult = await sendToGHL(result.booking);

    return res.status(200).json({
      success: true,
      message: "Booking submitted successfully.",
      bookingId: result.bookingId,
      booking: result.booking,
      ghl: ghlResult
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit booking."
    });
  }
}
