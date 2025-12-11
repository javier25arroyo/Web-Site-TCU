/**
 * Módulo de validación para formularios
 * Basílica de Los Ángeles - TCU Project
 */

export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'El nombre es requerido' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return { isValid: false, error: 'El nombre es requerido' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'El nombre no puede exceder 100 caracteres' };
  }

  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'El nombre contiene caracteres no válidos' };
  }

  return { isValid: true, error: null };
}

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'El correo electrónico es requerido' };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return { isValid: false, error: 'El correo electrónico es requerido' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'El formato del correo electrónico no es válido' };
  }

  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'El correo electrónico es demasiado largo' };
  }

  return { isValid: true, error: null };
}

export function validatePhone(phone) {
  if (!phone || phone.trim().length === 0) {
    return { isValid: true, error: null };
  }

  const cleanPhone = phone.replace(/[\s().-]/g, '');
  const phoneRegex = /^(\+506)?[2-8]\d{7}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'El formato del teléfono no es válido. Use formato: +506 8888-8888' };
  }

  return { isValid: true, error: null };
}

export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'El mensaje es requerido' };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return { isValid: false, error: 'El mensaje es requerido' };
  }

  if (trimmedMessage.length < 10) {
    return { isValid: false, error: 'El mensaje debe tener al menos 10 caracteres' };
  }

  if (trimmedMessage.length > 2000) {
    return { isValid: false, error: 'El mensaje no puede exceder 2000 caracteres' };
  }

  return { isValid: true, error: null };
}

export function validateContactForm(formData) {
  const errors = {};

  const nameResult = validateName(formData.name);
  if (!nameResult.isValid) errors.name = nameResult.error;

  const emailResult = validateEmail(formData.email);
  if (!emailResult.isValid) errors.email = emailResult.error;

  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.isValid) errors.phone = phoneResult.error;

  const messageResult = validateMessage(formData.message);
  if (!messageResult.isValid) errors.message = messageResult.error;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}