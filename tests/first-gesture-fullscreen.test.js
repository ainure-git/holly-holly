const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('index.html', 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function extractBlock(prefix) {
  const start = source.indexOf(prefix);
  if (start === -1) {
    throw new Error(`Missing block: ${prefix}`);
  }

  const braceStart = source.indexOf('{', start);
  if (braceStart === -1) {
    throw new Error(`Missing opening brace for: ${prefix}`);
  }

  let depth = 0;
  for (let i = braceStart; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  throw new Error(`Unclosed block: ${prefix}`);
}

const hasActiveFullscreenSrc = extractBlock('function hasActiveFullscreen');
const shouldQueueInitialFullscreenSrc = extractBlock('function shouldQueueInitialFullscreen');

const context = {
  document: {},
  isMobile: false
};
vm.createContext(context);
vm.runInContext(`${hasActiveFullscreenSrc}\n${shouldQueueInitialFullscreenSrc}`, context);

assert(context.hasActiveFullscreen({ fullscreenElement: null, webkitFullscreenElement: null }) === false,
  'hasActiveFullscreen should be false when no fullscreen element exists');
assert(context.hasActiveFullscreen({ fullscreenElement: { nodeName: 'HTML' }, webkitFullscreenElement: null }) === true,
  'hasActiveFullscreen should detect standard fullscreen');
assert(context.hasActiveFullscreen({ fullscreenElement: null, webkitFullscreenElement: { nodeName: 'HTML' } }) === true,
  'hasActiveFullscreen should detect webkit fullscreen');

assert(context.shouldQueueInitialFullscreen(true, { fullscreenElement: null, webkitFullscreenElement: null }) === true,
  'mobile startup should queue fullscreen when not already fullscreen');
assert(context.shouldQueueInitialFullscreen(false, { fullscreenElement: null, webkitFullscreenElement: null }) === false,
  'desktop startup should not queue fullscreen');
assert(context.shouldQueueInitialFullscreen(true, { fullscreenElement: { nodeName: 'HTML' }, webkitFullscreenElement: null }) === false,
  'startup should not queue fullscreen when fullscreen is already active');

const bootstrapMusicSrc = extractBlock('const bootstrapMusic = () =>');
assert(bootstrapMusicSrc.includes('pendingFullscreen = shouldQueueInitialFullscreen();'),
  'bootstrapMusic should queue fullscreen on the first gesture');

console.log('first-gesture fullscreen checks passed');
