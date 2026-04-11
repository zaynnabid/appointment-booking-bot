export const BOOKING_FIELDS = [
  "fullName",
  "phone",
  "email",
  "appointmentType",
  "preferredDate",
  "preferredTime",
  "note"
];

export const REQUIRED_FIELDS = [
  "fullName",
  "phone",
  "appointmentType",
  "preferredDate",
  "preferredTime"
];

export const QUESTIONS = {
  welcome: "Assalam o Alaikum! Main aapki appointment booking mein help karunga.",
  fullName: "Sab se pehle apna poora naam batayein.",
  phone: "Apna phone number share karein.",
  email: "Apna email address batayein.",
  appointmentType: "Aap kis type ki appointment book karna chahte hain?",
  preferredDate: "Aap kis date ko appointment chahte hain?",
  preferredTime: "Aap kis time ko prefer karte hain?",
  note: "Agar koi short note ya concern ho to batayein.",
  confirmation: "Shukriya. Aapki booking request receive ho gayi hai."
};

export const INITIAL_BOOKING_STATE = {
  fullName: "",
  phone: "",
  email: "",
  appointmentType: "",
  preferredDate: "",
  preferredTime: "",
  note: "",
  _skippedFields: []
};
