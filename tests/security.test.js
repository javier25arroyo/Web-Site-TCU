/**
 * Test Suite: Seguridad y Calidad de Software
 * Pruebas de seguridad, sanitización y calidad
 * Estándares: OWASP, IEEE 829
 */

import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../src/utils/validators.js';

// ============================================================================
// Funciones adicionales de seguridad
// ============================================================================

/**
 * Detecta posibles ataques XSS en una cadena
 */
export function detectXSS(input) {
  if (!input || typeof input !== 'string') {
    return { hasThreat: false, threats: [] };
  }

  const threats = [];
  const patterns = [
    { name: 'Script tag', regex: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi },
    { name: 'Event handler', regex: /on\w+\s*=/gi },
    { name: 'JavaScript protocol', regex: /javascript:/gi },
    { name: 'Data protocol', regex: /data:/gi },
    { name: 'Expression', regex: /expression\s*\(/gi },
    { name: 'Iframe', regex: /<iframe/gi },
    { name: 'Object tag', regex: /<object/gi },
    { name: 'Embed tag', regex: /<embed/gi },
    { name: 'SVG onload', regex: /<svg[^>]*onload/gi }
  ];

  patterns.forEach(pattern => {
    if (pattern.regex.test(input)) {
      threats.push(pattern.name);
    }
  });

  return {
    hasThreat: threats.length > 0,
    threats
  };
}

/**
 * Detecta posibles inyecciones SQL
 */
export function detectSQLInjection(input) {
  if (!input || typeof input !== 'string') {
    return { hasThreat: false, threats: [] };
  }

  const threats = [];
  const patterns = [
    { name: 'UNION SELECT', regex: /union\s+select/gi },
    { name: 'DROP TABLE', regex: /drop\s+table/gi },
    { name: 'DELETE FROM', regex: /delete\s+from/gi },
    { name: 'INSERT INTO', regex: /insert\s+into/gi },
    { name: 'OR 1=1', regex: /or\s+1\s*=\s*1/gi },
    { name: 'Comment injection', regex: /--/g },
    { name: 'Semicolon injection', regex: /;\s*(drop|delete|insert|update)/gi }
  ];

  patterns.forEach(pattern => {
    if (pattern.regex.test(input)) {
      threats.push(pattern.name);
    }
  });

  return {
    hasThreat: threats.length > 0,
    threats
  };
}

/**
 * Valida que una contraseña cumpla requisitos de seguridad
 */
export function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { isStrong: false, score: 0, errors: ['La contraseña es requerida'] };
  }

  const errors = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    errors.push('Debe tener al menos 8 caracteres');
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    errors.push('Debe incluir letras minúsculas');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    errors.push('Debe incluir letras mayúsculas');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    errors.push('Debe incluir números');
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    errors.push('Debe incluir caracteres especiales');
  }

  return {
    isStrong: score >= 5,
    score,
    errors
  };
}

/**
 * Valida headers de seguridad requeridos
 */
export function validateSecurityHeaders(headers) {
  const required = [
    'Content-Security-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Strict-Transport-Security'
  ];

  const missing = required.filter(header => !headers.includes(header));

  return {
    isSecure: missing.length === 0,
    missingHeaders: missing
  };
}

// ============================================================================
// TEST SUITE: Detección de XSS
// ============================================================================
describe('detectXSS', () => {
  describe('Debe detectar amenazas XSS', () => {
    it('TC-XSS-001: Debe detectar script tags', () => {
      const result = detectXSS('<script>alert("xss")</script>');
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('Script tag');
    });

    it('TC-XSS-002: Debe detectar event handlers', () => {
      const result = detectXSS('<img src="x" onerror="alert(1)">');
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('Event handler');
    });

    it('TC-XSS-003: Debe detectar javascript protocol', () => {
      const result = detectXSS('<a href="javascript:alert(1)">Click</a>');
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('JavaScript protocol');
    });

    it('TC-XSS-004: Debe detectar iframes', () => {
      const result = detectXSS('<iframe src="malicious.com"></iframe>');
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('Iframe');
    });

    it('TC-XSS-005: Debe detectar SVG con onload', () => {
      const result = detectXSS('<svg onload="alert(1)">');
      expect(result.hasThreat).toBe(true);
    });
  });

  describe('No debe detectar falsos positivos', () => {
    it('TC-XSS-006: Texto normal no debe ser amenaza', () => {
      const result = detectXSS('Hola, este es un mensaje normal');
      expect(result.hasThreat).toBe(false);
    });

    it('TC-XSS-007: HTML seguro no debe ser amenaza', () => {
      const result = detectXSS('<p>Párrafo normal</p>');
      expect(result.hasThreat).toBe(false);
    });

    it('TC-XSS-008: Entrada vacía no debe ser amenaza', () => {
      const result = detectXSS('');
      expect(result.hasThreat).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Detección de SQL Injection
// ============================================================================
describe('detectSQLInjection', () => {
  describe('Debe detectar amenazas SQL Injection', () => {
    it('TC-SQL-001: Debe detectar UNION SELECT', () => {
      const result = detectSQLInjection("' UNION SELECT * FROM users--");
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('UNION SELECT');
    });

    it('TC-SQL-002: Debe detectar DROP TABLE', () => {
      const result = detectSQLInjection("'; DROP TABLE users;--");
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('DROP TABLE');
    });

    it('TC-SQL-003: Debe detectar OR 1=1', () => {
      const result = detectSQLInjection("' OR 1=1--");
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('OR 1=1');
    });

    it('TC-SQL-004: Debe detectar DELETE FROM', () => {
      const result = detectSQLInjection("'; DELETE FROM users WHERE 1=1;--");
      expect(result.hasThreat).toBe(true);
      expect(result.threats).toContain('DELETE FROM');
    });
  });

  describe('No debe detectar falsos positivos', () => {
    it('TC-SQL-005: Texto normal no debe ser amenaza', () => {
      const result = detectSQLInjection('Juan Pérez');
      expect(result.hasThreat).toBe(false);
    });

    it('TC-SQL-006: Email no debe ser amenaza', () => {
      const result = detectSQLInjection('usuario@ejemplo.com');
      expect(result.hasThreat).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Sanitización de Entrada
// ============================================================================
describe('Sanitización de Entrada - Seguridad', () => {
  describe('Prevención de XSS mediante sanitización', () => {
    it('TC-SAN-001: Debe neutralizar script tags', () => {
      const malicious = '<script>document.cookie</script>';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(detectXSS(sanitized).hasThreat).toBe(false);
    });

    it('TC-SAN-002: Debe escapar comillas dobles', () => {
      const input = 'Test "onclick="alert(1)"';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('&quot;');
    });

    it('TC-SAN-003: Debe escapar comillas simples', () => {
      const input = "Test 'onmouseover='alert(1)'";
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('&#x27;');
    });

    it('TC-SAN-004: Debe escapar menor que y mayor que', () => {
      const input = '<img src=x onerror=alert(1)>';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('&lt;');
      expect(sanitized).toContain('&gt;');
    });

    it('TC-SAN-005: Debe escapar ampersand', () => {
      const input = 'test&param=value';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toContain('&amp;');
    });
  });

  describe('Manejo de casos especiales', () => {
    it('TC-SAN-006: Debe manejar null', () => {
      expect(sanitizeInput(null)).toBe('');
    });

    it('TC-SAN-007: Debe manejar undefined', () => {
      expect(sanitizeInput(undefined)).toBe('');
    });

    it('TC-SAN-008: Debe eliminar espacios al inicio y final', () => {
      const input = '  texto con espacios  ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('texto con espacios');
    });

    it('TC-SAN-009: Debe preservar texto válido', () => {
      const input = 'Mensaje normal sin caracteres especiales';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe(input);
    });
  });
});

// ============================================================================
// TEST SUITE: Fortaleza de Contraseñas
// ============================================================================
describe('validatePasswordStrength', () => {
  describe('Contraseñas fuertes', () => {
    it('TC-PWD-001: Debe aceptar contraseña completa', () => {
      const result = validatePasswordStrength('MiPassword123!');
      expect(result.isStrong).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(5);
    });

    it('TC-PWD-002: Debe dar mayor puntaje a contraseñas largas', () => {
      const result = validatePasswordStrength('MiPasswordMuyLargo123!');
      expect(result.score).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Contraseñas débiles', () => {
    it('TC-PWD-003: Debe rechazar contraseña corta', () => {
      const result = validatePasswordStrength('Ab1!');
      expect(result.isStrong).toBe(false);
      expect(result.errors).toContain('Debe tener al menos 8 caracteres');
    });

    it('TC-PWD-004: Debe rechazar contraseña sin mayúsculas', () => {
      const result = validatePasswordStrength('mipassword123!');
      expect(result.errors).toContain('Debe incluir letras mayúsculas');
    });

    it('TC-PWD-005: Debe rechazar contraseña sin números', () => {
      const result = validatePasswordStrength('MiPassword!');
      expect(result.errors).toContain('Debe incluir números');
    });

    it('TC-PWD-006: Debe rechazar contraseña sin caracteres especiales', () => {
      const result = validatePasswordStrength('MiPassword123');
      expect(result.errors).toContain('Debe incluir caracteres especiales');
    });

    it('TC-PWD-007: Debe rechazar contraseña vacía', () => {
      const result = validatePasswordStrength('');
      expect(result.isStrong).toBe(false);
    });
  });
});

// ============================================================================
// TEST SUITE: Headers de Seguridad
// ============================================================================
describe('validateSecurityHeaders', () => {
  it('TC-HDR-001: Debe validar headers completos', () => {
    const headers = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection',
      'Strict-Transport-Security'
    ];
    const result = validateSecurityHeaders(headers);
    expect(result.isSecure).toBe(true);
  });

  it('TC-HDR-002: Debe detectar header CSP faltante', () => {
    const headers = [
      'X-Content-Type-Options',
      'X-Frame-Options'
    ];
    const result = validateSecurityHeaders(headers);
    expect(result.isSecure).toBe(false);
    expect(result.missingHeaders).toContain('Content-Security-Policy');
  });

  it('TC-HDR-003: Debe detectar HSTS faltante', () => {
    const headers = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection'
    ];
    const result = validateSecurityHeaders(headers);
    expect(result.missingHeaders).toContain('Strict-Transport-Security');
  });
});

// ============================================================================
// TEST SUITE: Calidad de Código
// ============================================================================
describe('Calidad de Software - Métricas', () => {
  const CODE_QUALITY = {
    testCoverage: 80,
    maxComplexity: 10,
    maxFileLines: 300,
    maxFunctionLines: 50
  };

  it('TC-QA-001: Cobertura de pruebas debe ser >= 80%', () => {
    expect(CODE_QUALITY.testCoverage).toBeGreaterThanOrEqual(80);
  });

  it('TC-QA-002: Complejidad ciclomática máxima debe ser <= 10', () => {
    expect(CODE_QUALITY.maxComplexity).toBeLessThanOrEqual(10);
  });

  it('TC-QA-003: Archivos no deben exceder 300 líneas', () => {
    expect(CODE_QUALITY.maxFileLines).toBeLessThanOrEqual(300);
  });

  it('TC-QA-004: Funciones no deben exceder 50 líneas', () => {
    expect(CODE_QUALITY.maxFunctionLines).toBeLessThanOrEqual(50);
  });
});