export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required."
      });
    }

    return res.status(200).json({
      success: true,
      reply: `Aap ne kaha: "${message}". Booking flow next phase mein add hoga.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}
