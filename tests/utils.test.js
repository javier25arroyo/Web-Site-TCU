import { describe, it, expect } from 'vitest';

// Función de ejemplo para testear
function formatTitle(title) {
  if (!title) return '';
  return title.trim().toUpperCase();
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Pruebas unitarias
describe('formatTitle', () => {
  it('debe convertir el título a mayúsculas', () => {
    expect(formatTitle('hola mundo')).toBe('HOLA MUNDO');
  });

  it('debe eliminar espacios al inicio y final', () => {
    expect(formatTitle('  astro  ')).toBe('ASTRO');
  });

  it('debe retornar string vacío si no hay título', () => {
    expect(formatTitle('')).toBe('');
    expect(formatTitle(null)).toBe('');
  });
});

describe('isValidEmail', () => {
  it('debe validar emails correctos', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.org')).toBe(true);
  });

  it('debe rechazar emails inválidos', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
  });
});