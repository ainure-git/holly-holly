const fs = require('fs');

const source = fs.readFileSync('index.html', 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function extractMediaBlock(header) {
  const start = source.indexOf(header);
  if (start === -1) {
    throw new Error(`Missing media block: ${header}`);
  }

  const braceStart = source.indexOf('{', start);
  let depth = 0;

  for (let i = braceStart; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(braceStart + 1, i);
      }
    }
  }

  throw new Error(`Unclosed media block: ${header}`);
}

function extractRule(block, selector) {
  const marker = `${selector} {`;
  const start = block.indexOf(marker);
  if (start === -1) {
    throw new Error(`Missing rule: ${selector}`);
  }

  const braceStart = block.indexOf('{', start);
  let depth = 0;

  for (let i = braceStart; i < block.length; i += 1) {
    const ch = block[i];
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return block.slice(braceStart + 1, i);
      }
    }
  }

  throw new Error(`Unclosed rule: ${selector}`);
}

const compactBlock = extractMediaBlock('@media (orientation: landscape) and (max-height: 540px)');
const playerOrbRule = extractRule(compactBlock, '.hp-orb--player');
const handAreaRule = extractRule(compactBlock, '.hand-area');

assert(playerOrbRule.includes('bottom: calc(6px + env(safe-area-inset-bottom));'),
  'compact mobile player HUD should anchor to the bottom safe area');
assert(!playerOrbRule.includes('bottom: calc(100px + env(safe-area-inset-bottom));'),
  'compact mobile player HUD should no longer float 100px above the bottom');
assert(handAreaRule.includes('calc(118px + env(safe-area-inset-right))'),
  'compact mobile hand area should reserve a right-side HUD lane');

console.log('mobile player HUD layout checks passed');
