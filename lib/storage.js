function generateBookingId() {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `BK-${randomPart}`;
}

export async function saveBooking(data) {
  const bookingId = generateBookingId();

  return {
    saved: true,
    bookingId,
    booking: {
      ...data,
      bookingId,
      createdAt: new Date().toISOString()
    }
  };
}
