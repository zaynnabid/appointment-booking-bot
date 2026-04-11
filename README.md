# Appointment Booking Bot

## Project Goal
A text-based appointment booking bot for health-related appointment requests.

## Main Purpose
- Collect booking details from the user in a chat-style interface
- Save or process the booking request in the backend
- Later send the booking data to GoHighLevel (GHL) for follow-up automation

## Required Booking Fields
- fullName
- phone
- email
- appointmentType
- preferredDate
- preferredTime
- note

## Required Fields For Completion
- fullName
- phone
- appointmentType
- preferredDate
- preferredTime

## Conversation Flow
1. Welcome the user
2. Ask for full name
3. Ask for phone number
4. Ask for email
5. Ask for appointment type
6. Ask for preferred date
7. Ask for preferred time
8. Ask for short note or concern
9. Confirm booking request submitted

## Example Final Output
{
  "fullName": "Ali Khan",
  "phone": "03001234567",
  "email": "ali@example.com",
  "appointmentType": "Dental Consultation",
  "preferredDate": "2026-04-15",
  "preferredTime": "05:00 PM",
  "note": "Tooth pain for 2 days"
}
