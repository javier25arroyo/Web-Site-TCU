/**
 * Test Suite: Validadores de Formulario
 * Basílica de Los Ángeles - TCU Project
 * Estándares: IEEE 829, ISTQB
 */

import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateContactForm,
  sanitizeInput
} from '../src/utils/validators.js';

// ============================================================================
// TEST SUITE: Validación de Nombre
// ============================================================================
describe('validateName', () => {
  describe('Casos válidos', () => {
    it('TC-NAME-001: Debe aceptar nombre simple válido', () => {
      const result = validateName('Juan');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('TC-NAME-002: Debe aceptar nombre con espacios', () => {
      const result = validateName('Juan Carlos Rodríguez');
      expect(result.isValid).toBe(true);
    });

    it('TC-NAME-003: Debe aceptar nombres con acentos y ñ', () => {
      const result = validateName('María José Núñez');
      expect(result.isValid).toBe(true);
    });

    it('TC-NAME-004: Debe aceptar nombre de 2 caracteres (límite inferior)', () => {
      const result = validateName('Jo');
      expect(result.isValid).toBe(true);
    });

    it('TC-NAME-005: Debe aceptar nombre de 100 caracteres (límite superior)', () => {
      const result = validateName('A'.repeat(100));
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-NAME-006: Debe rechazar nombre de 1 carácter', () => {
      const result = validateName('J');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El nombre debe tener al menos 2 caracteres');
    });

    it('TC-NAME-007: Debe rechazar nombre de 101 caracteres', () => {
      const result = validateName('A'.repeat(101));
      expect(result.isValid).toBe(false);
    });

    it('TC-NAME-008: Debe rechazar nombre vacío', () => {
      const result = validateName('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El nombre es requerido');
    });

    it('TC-NAME-009: Debe rechazar valor null', () => {
      const result = validateName(null);
      expect(result.isValid).toBe(false);
    });

    it('TC-NAME-010: Debe rechazar nombre con números', () => {
      const result = validateName('Juan123');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El nombre contiene caracteres no válidos');
    });

    it('TC-NAME-011: Debe rechazar nombre con solo espacios', () => {
      const result = validateName('   ');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de Email
// ============================================================================
describe('validateEmail', () => {
  describe('Casos válidos', () => {
    it('TC-EMAIL-001: Debe aceptar email simple válido', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
    });

    it('TC-EMAIL-002: Debe aceptar email con subdominio', () => {
      const result = validateEmail('user@mail.example.co.cr');
      expect(result.isValid).toBe(true);
    });

    it('TC-EMAIL-003: Debe aceptar email con puntos', () => {
      const result = validateEmail('juan.perez@gmail.com');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-EMAIL-004: Debe rechazar email sin @', () => {
      const result = validateEmail('testexample.com');
      expect(result.isValid).toBe(false);
    });

    it('TC-EMAIL-005: Debe rechazar email sin dominio', () => {
      const result = validateEmail('test@');
      expect(result.isValid).toBe(false);
    });

    it('TC-EMAIL-006: Debe rechazar email vacío', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El correo electrónico es requerido');
    });

    it('TC-EMAIL-007: Debe rechazar email muy largo', () => {
      const result = validateEmail('a'.repeat(250) + '@test.com');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de Teléfono
// ============================================================================
describe('validatePhone', () => {
  describe('Casos válidos', () => {
    it('TC-PHONE-001: Debe aceptar teléfono vacío (opcional)', () => {
      const result = validatePhone('');
      expect(result.isValid).toBe(true);
    });

    it('TC-PHONE-002: Debe aceptar móvil sin código país', () => {
      const result = validatePhone('88888888');
      expect(result.isValid).toBe(true);
    });

    it('TC-PHONE-003: Debe aceptar móvil con +506', () => {
      const result = validatePhone('+50688888888');
      expect(result.isValid).toBe(true);
    });

    it('TC-PHONE-004: Debe aceptar teléfono con formato', () => {
      const result = validatePhone('+506 8888-8888');
      expect(result.isValid).toBe(true);
    });

    it('TC-PHONE-005: Debe aceptar teléfono fijo', () => {
      const result = validatePhone('25500000');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-PHONE-006: Debe rechazar teléfono incompleto', () => {
      const result = validatePhone('8888888');
      expect(result.isValid).toBe(false);
    });

    it('TC-PHONE-007: Debe rechazar teléfono que inicia con 0', () => {
      const result = validatePhone('08888888');
      expect(result.isValid).toBe(false);
    });

    it('TC-PHONE-008: Debe rechazar teléfono con letras', () => {
      const result = validatePhone('8888ABCD');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de Mensaje
// ============================================================================
describe('validateMessage', () => {
  describe('Casos válidos', () => {
    it('TC-MSG-001: Debe aceptar mensaje válido', () => {
      const result = validateMessage('Este es un mensaje de prueba.');
      expect(result.isValid).toBe(true);
    });

    it('TC-MSG-002: Debe aceptar mensaje de 10 caracteres (límite inferior)', () => {
      const result = validateMessage('1234567890');
      expect(result.isValid).toBe(true);
    });

    it('TC-MSG-003: Debe aceptar mensaje de 2000 caracteres (límite superior)', () => {
      const result = validateMessage('A'.repeat(2000));
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-MSG-004: Debe rechazar mensaje de 9 caracteres', () => {
      const result = validateMessage('123456789');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El mensaje debe tener al menos 10 caracteres');
    });

    it('TC-MSG-005: Debe rechazar mensaje de 2001 caracteres', () => {
      const result = validateMessage('A'.repeat(2001));
      expect(result.isValid).toBe(false);
    });

    it('TC-MSG-006: Debe rechazar mensaje vacío', () => {
      const result = validateMessage('');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de Formulario Completo
// ============================================================================
describe('validateContactForm', () => {
  it('TC-FORM-001: Formulario válido completo', () => {
    const result = validateContactForm({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+506 8888-8888',
      message: 'Este es un mensaje de prueba.'
    });
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('TC-FORM-002: Formulario válido sin teléfono', () => {
    const result = validateContactForm({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '',
      message: 'Este es un mensaje de prueba.'
    });
    expect(result.isValid).toBe(true);
  });

  it('TC-FORM-003: Formulario con múltiples errores', () => {
    const result = validateContactForm({
      name: '',
      email: 'invalid',
      phone: 'abc',
      message: ''
    });
    expect(result.isValid).toBe(false);
    expect(Object.keys(result.errors).length).toBeGreaterThan(1);
  });
});

// ============================================================================
// TEST SUITE: Sanitización (Seguridad XSS)
// ============================================================================
describe('sanitizeInput', () => {
  it('TC-SEC-001: Debe escapar etiquetas HTML', () => {
    const result = sanitizeInput('<script>alert("xss")</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('TC-SEC-002: Debe escapar comillas', () => {
    const result = sanitizeInput('Test "quoted" text');
    expect(result).toContain('&quot;');
  });

  it('TC-SEC-003: Debe escapar ampersand', () => {
    const result = sanitizeInput('Tom & Jerry');
    expect(result).toBe('Tom &amp; Jerry');
  });

  it('TC-SEC-004: Debe manejar entrada vacía', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput(null)).toBe('');
  });
});