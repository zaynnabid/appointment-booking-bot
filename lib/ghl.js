export async function sendToGHL(booking) {
  try {
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("GHL webhook URL not configured.");
      return {
        success: false,
        message: "Missing GHL webhook URL"
      };
    }

    const payload = {
      name: booking.fullName || "",
      phone: booking.phone || "",
      email: booking.email || "",
      appointmentType: booking.appointmentType || "",
      preferredDate: booking.preferredDate || "",
      preferredTime: booking.preferredTime || "",
      note: booking.note || "",
      bookingId: booking.bookingId || "",
      createdAt: booking.createdAt || ""
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    return {
      success: response.ok,
      status: response.status,
      responseText
    };
  } catch (error) {
    console.error("GHL webhook error:", error);

    return {
      success: false,
      message: error.message
    };
  }
}
