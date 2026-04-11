export function isEmpty(value) {
  return !value || !String(value).trim();
}

export function isValidPhone(phone) {
  const cleaned = String(phone || "").replace(/\s+/g, "");
  return /^[0-9+\-()]{7,20}$/.test(cleaned);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function isValidDateInput(value) {
  return !isEmpty(value);
}

export function isValidTimeInput(value) {
  return !isEmpty(value);
}

export function isSkippableField(field) {
  return field === "email" || field === "note";
}

export function isSkipCommand(value) {
  const text = String(value || "").trim().toLowerCase();
  return text === "skip" || text === "nahi" || text === "no";
}

export function validateField(field, value) {
  const text = String(value || "").trim();

  if (field === "fullName") {
    if (!text) {
      return {
        valid: false,
        message: "Please اپنا poora naam likhein."
      };
    }
  }

  if (field === "phone") {
    if (!isValidPhone(text)) {
      return {
        valid: false,
        message: "Please valid phone number enter karein."
      };
    }
  }

  if (field === "email") {
    if (!text) {
      return {
        valid: false,
        message: "Please valid email address enter karein ya skip likhein."
      };
    }

    if (!isValidEmail(text)) {
      return {
        valid: false,
        message: "Please valid email address enter karein ya skip likhein."
      };
    }
  }

  if (field === "appointmentType") {
    if (!text) {
      return {
        valid: false,
        message: "Please appointment type batayein."
      };
    }
  }

  if (field === "preferredDate") {
    if (!isValidDateInput(text)) {
      return {
        valid: false,
        message: "Please preferred date batayein."
      };
    }
  }

  if (field === "preferredTime") {
    if (!isValidTimeInput(text)) {
      return {
        valid: false,
        message: "Please preferred time batayein."
      };
    }
  }

  return {
    valid: true,
    message: ""
  };
}
