(function initAMColorSystem(global) {
  const AMGradients = {
    THINKING: ['#4FC3FF', '#00F5FF', '#8A7CFF'],
    CO_CREATE: ['#8A7CFF', '#FF4FD8', '#FFC857'],
    WARNING: ['#FFC857', '#FF7A18', '#FF3D3D'],
    NIRODHA: ['#0B1026', '#050505']
  };

  const AMPalette = {
    CORE: {
      AETHER_BLUE: { hex: '#4FC3FF', rgb: [79, 195, 255], state: 'Idle / calm / ready' },
      AETHER_CYAN: { hex: '#00F5FF', rgb: [0, 245, 255], state: 'Connection active / listening / reasoning flow' },
      AETHER_PURPLE: { hex: '#8A7CFF', rgb: [138, 124, 255], state: 'Deep reasoning / System 2 / wisdom' },
      AETHER_PINK: { hex: '#FF4FD8', rgb: [255, 79, 216], state: 'Creative / playful / co-create' },
      AETHER_GOLD: { hex: '#FFC857', rgb: [255, 200, 87], state: 'Searching / discovery / highlights' }
    },
    STATUS: {
      PLASMA_RED: { hex: '#FF3D3D', rgb: [255, 61, 61], state: 'Error, crisis, policy violation' },
      SOLAR_ORANGE: { hex: '#FF7A18', rgb: [255, 122, 24], state: 'Warning, overload approaching' },
      DECAY_BROWN: { hex: '#A52A2A', rgb: [165, 42, 42], state: 'Exhaustion, memory full, DECAY state' },
      HIGH_LOAD_GOLD: { hex: '#FFD700', rgb: [255, 215, 0], state: 'High processing load / CPU hot' },
      NEUTRAL_WHITE: { hex: '#FFFFFF', rgb: [255, 255, 255], state: 'Neutral / uncolored / base text' }
    },
    BACKGROUND: {
      DEEP_VOID: { hex: '#050505', rgb: [5, 5, 5], state: 'Base canvas / true void' },
      DEEP_SPACE: { hex: '#0B1026', rgb: [11, 16, 38], state: 'Nirodha / low activity background' },
      NEBULA_BLUE: { hex: '#0B1736', rgb: [11, 23, 54], state: 'Normal background layer 1' },
      NEBULA_PURPLE: { hex: '#402A6E', rgb: [64, 42, 110], state: 'Background layer 2 / gradient top' },
      DARK_PHI: { hex: '#00008B', rgb: [0, 0, 139], state: 'Nirodha / maintenance / sleep tone' }
    },
    INTERACTION: {
      AURORA_GREEN: { hex: '#00FFB3', rgb: [0, 255, 179], state: 'Success, affirmation, safe zone' },
      SELECTION_CYAN: { hex: '#00FFFF', rgb: [0, 255, 255], state: 'Selection ring, focus reticle' },
      GESTURE_GOLD: { hex: '#FFB347', rgb: [255, 179, 71], state: 'Gesture trace / light writing' },
      RIPPLE_TEAL: { hex: '#00E0FF', rgb: [0, 224, 255], state: 'Touch ripple, hover feedback' },
      CRACK_HIGHLIGHT: { hex: '#DC143C', rgb: [220, 20, 60], state: 'Crack edges / error fissures' }
    },
    GRADIENTS: AMGradients,
    STATE_MAP: {
      IDLE: { primary: '#4FC3FF', secondary: '#0B1736' },
      LISTENING: { primary: '#00F5FF', secondary: '#00FFFF' },
      THINKING: { primary: '#8A7CFF', secondary: '#4FC3FF' },
      REASONING: { primary: '#8A7CFF', secondary: '#00F5FF' },
      DEEP_REASONING: { primary: '#8A7CFF', secondary: '#00F5FF' },
      CREATIVE: { primary: '#FF4FD8', secondary: '#FFC857' },
      SEARCHING: { primary: '#FFC857', secondary: '#00FFB3' },
      HIGH_LOAD: { primary: '#FFD700', secondary: '#FF7A18' },
      DECAY: { primary: '#A52A2A', secondary: '#0B1026' },
      WARNING: { primary: '#FF7A18', secondary: '#FFD700' },
      ERROR: { primary: '#FF3D3D', secondary: '#DC143C' },
      NIRODHA: { primary: '#0B1026', secondary: '#402A6E' }
    }
  };

  function clamp(num, min, max) {
    return Math.min(max, Math.max(min, num));
  }

  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return [255, 255, 255];
    return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  }

  function getColorForCognitionState(state) {
    return AMPalette.STATE_MAP[state]?.primary || AMPalette.CORE.AETHER_BLUE.hex;
  }

  function getGradientForMode(mode) {
    return AMPalette.GRADIENTS[mode] || AMPalette.GRADIENTS.THINKING;
  }

  function interpolateGradient(gradientKey, t) {
    const phase = clamp(t, 0, 0.9999);
    const stops = getGradientForMode(gradientKey);
    const idx = Math.min(stops.length - 2, Math.floor(phase * (stops.length - 1)));
    const localT = phase * (stops.length - 1) - idx;
    const c1 = hexToRgb(stops[idx]);
    const c2 = hexToRgb(stops[idx + 1]);
    return [
      c1[0] + (c2[0] - c1[0]) * localT,
      c1[1] + (c2[1] - c1[1]) * localT,
      c1[2] + (c2[2] - c1[2]) * localT
    ];
  }

  function hsvFromCognition({ mode, confidence, energy }) {
    let h;
    switch (mode) {
      case 'REASONING':
      case 'DEEP_REASONING':
        h = 260;
        break;
      case 'LISTENING':
        h = 180;
        break;
      case 'SEARCHING':
        h = 50;
        break;
      case 'ERROR':
        h = 0;
        break;
      case 'WARNING':
        h = 30;
        break;
      default:
        h = 200;
        break;
    }
    const s = clamp(confidence, 0.2, 1);
    const v = 0.3 + 0.7 * clamp(energy, 0, 1);
    return { h, s, v };
  }

  global.AMColorSystem = {
    AMGradients,
    AMPalette,
    getColorForCognitionState,
    getGradientForMode,
    interpolateGradient,
    hsvFromCognition
  };
})(window);
