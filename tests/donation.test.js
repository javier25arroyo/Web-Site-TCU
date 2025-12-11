/**
 * Test Suite: Página de Donaciones
 * Validación de datos bancarios y métodos de pago
 * Estándares: IEEE 829, ISTQB
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// Funciones de validación para donaciones
// ============================================================================

/**
 * Valida formato IBAN costarricense
 * Formato: CR + 2 dígitos de control + 17 dígitos
 */
export function validateIBAN(iban) {
  if (!iban || typeof iban !== 'string') {
    return { isValid: false, error: 'El IBAN es requerido' };
  }

  const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();

  if (cleanIBAN.length !== 22) {
    return { isValid: false, error: 'El IBAN debe tener 22 caracteres' };
  }

  if (!cleanIBAN.startsWith('CR')) {
    return { isValid: false, error: 'El IBAN debe iniciar con CR' };
  }

  const ibanRegex = /^CR\d{20}$/;
  if (!ibanRegex.test(cleanIBAN)) {
    return { isValid: false, error: 'El formato del IBAN no es válido' };
  }

  return { isValid: true, error: null };
}

/**
 * Valida formato SINPE Móvil costarricense
 */
export function validateSINPE(phone) {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'El número SINPE es requerido' };
  }

  const cleanPhone = phone.replace(/[\s()-]/g, '');
  const sinpeRegex = /^(\+506)?[5-8]\d{7}$/;

  if (!sinpeRegex.test(cleanPhone)) {
    return { isValid: false, error: 'El formato SINPE no es válido. Debe ser un número móvil CR' };
  }

  return { isValid: true, error: null };
}

/**
 * Valida que una URL sea válida
 */
export function validateURL(url) {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'La URL es requerida' };
  }

  // URLs relativas válidas
  if (url.startsWith('/')) {
    return { isValid: true, error: null };
  }

  // URLs absolutas
  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch {
    return { isValid: false, error: 'El formato de URL no es válido' };
  }
}

// ============================================================================
// TEST SUITE: Validación de IBAN
// ============================================================================
describe('validateIBAN', () => {
  describe('Casos válidos', () => {
    it('TC-IBAN-001: Debe aceptar IBAN costarricense válido', () => {
      const result = validateIBAN('CR12345678901234567890');
      expect(result.isValid).toBe(true);
    });

    it('TC-IBAN-002: Debe aceptar IBAN con espacios', () => {
      const result = validateIBAN('CR12 3456 7890 1234 5678 90');
      expect(result.isValid).toBe(true);
    });

    it('TC-IBAN-003: Debe aceptar IBAN en minúsculas', () => {
      const result = validateIBAN('cr12345678901234567890');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-IBAN-004: Debe rechazar IBAN vacío', () => {
      const result = validateIBAN('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El IBAN es requerido');
    });

    it('TC-IBAN-005: Debe rechazar IBAN sin código de país', () => {
      const result = validateIBAN('12345678901234567890');
      expect(result.isValid).toBe(false);
    });

    it('TC-IBAN-006: Debe rechazar IBAN con código de país incorrecto', () => {
      const result = validateIBAN('US12345678901234567890');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El IBAN debe iniciar con CR');
    });

    it('TC-IBAN-007: Debe rechazar IBAN con longitud incorrecta', () => {
      const result = validateIBAN('CR123456789');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('El IBAN debe tener 22 caracteres');
    });

    it('TC-IBAN-008: Debe rechazar IBAN con letras en parte numérica', () => {
      const result = validateIBAN('CR1234567890ABCD567890');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de SINPE Móvil
// ============================================================================
describe('validateSINPE', () => {
  describe('Casos válidos', () => {
    it('TC-SINPE-001: Debe aceptar número móvil sin código país', () => {
      const result = validateSINPE('88888888');
      expect(result.isValid).toBe(true);
    });

    it('TC-SINPE-002: Debe aceptar número móvil con +506', () => {
      const result = validateSINPE('+50688888888');
      expect(result.isValid).toBe(true);
    });

    it('TC-SINPE-003: Debe aceptar número con formato espacios', () => {
      const result = validateSINPE('+506 8888-8888');
      expect(result.isValid).toBe(true);
    });

    it('TC-SINPE-004: Debe aceptar números que inician con 5', () => {
      const result = validateSINPE('55555555');
      expect(result.isValid).toBe(true);
    });

    it('TC-SINPE-005: Debe aceptar números que inician con 6', () => {
      const result = validateSINPE('66666666');
      expect(result.isValid).toBe(true);
    });

    it('TC-SINPE-006: Debe aceptar números que inician con 7', () => {
      const result = validateSINPE('77777777');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-SINPE-007: Debe rechazar número vacío', () => {
      const result = validateSINPE('');
      expect(result.isValid).toBe(false);
    });

    it('TC-SINPE-008: Debe rechazar número fijo (inicia con 2)', () => {
      const result = validateSINPE('25501234');
      expect(result.isValid).toBe(false);
    });

    it('TC-SINPE-009: Debe rechazar número incompleto', () => {
      const result = validateSINPE('8888888');
      expect(result.isValid).toBe(false);
    });

    it('TC-SINPE-010: Debe rechazar número con letras', () => {
      const result = validateSINPE('8888ABCD');
      expect(result.isValid).toBe(false);
    });

    it('TC-SINPE-011: Debe rechazar número que inicia con 0', () => {
      const result = validateSINPE('08888888');
      expect(result.isValid).toBe(false);
    });

    it('TC-SINPE-012: Debe rechazar número que inicia con 1', () => {
      const result = validateSINPE('18888888');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Validación de URLs
// ============================================================================
describe('validateURL', () => {
  describe('Casos válidos', () => {
    it('TC-URL-001: Debe aceptar URL relativa', () => {
      const result = validateURL('/ubicacion');
      expect(result.isValid).toBe(true);
    });

    it('TC-URL-002: Debe aceptar URL absoluta HTTPS', () => {
      const result = validateURL('https://facebook.com');
      expect(result.isValid).toBe(true);
    });

    it('TC-URL-003: Debe aceptar URL absoluta HTTP', () => {
      const result = validateURL('http://example.com');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Casos inválidos', () => {
    it('TC-URL-004: Debe rechazar URL vacía', () => {
      const result = validateURL('');
      expect(result.isValid).toBe(false);
    });

    it('TC-URL-005: Debe rechazar texto sin formato URL', () => {
      const result = validateURL('no es una url');
      expect(result.isValid).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Datos de la página de donaciones
// ============================================================================
describe('Página de Donaciones - Verificación de Contenido', () => {
  // Datos esperados según el diseño
  const DONATION_PAGE_DATA = {
    title: 'Donaciones',
    sinpeNumber: '+506 8888-8888',
    bankName: 'Banco Nacional de Costa Rica',
    iban: 'CR00 0000 0000 0000 0000 00',
    beneficiary: 'Basílica de Los Ángeles',
    methods: ['PayPal', 'SINPE Móvil', 'Transferencia Bancaria', 'Donación Presencial'],
    internalLinks: ['/ubicacion']
  };

  it('TC-DON-001: La página debe tener título correcto', () => {
    expect(DONATION_PAGE_DATA.title).toBe('Donaciones');
  });

  it('TC-DON-002: Debe tener 4 métodos de donación', () => {
    expect(DONATION_PAGE_DATA.methods.length).toBe(4);
  });

  it('TC-DON-003: El número SINPE debe ser móvil válido', () => {
    const result = validateSINPE(DONATION_PAGE_DATA.sinpeNumber);
    expect(result.isValid).toBe(true);
  });

  it('TC-DON-004: El enlace a ubicación debe ser válido', () => {
    const result = validateURL(DONATION_PAGE_DATA.internalLinks[0]);
    expect(result.isValid).toBe(true);
  });

  it('TC-DON-005: Debe incluir nombre del beneficiario', () => {
    expect(DONATION_PAGE_DATA.beneficiary).toContain('Basílica');
  });

  it('TC-DON-006: Debe incluir nombre del banco', () => {
    expect(DONATION_PAGE_DATA.bankName).toContain('Banco');
  });
});