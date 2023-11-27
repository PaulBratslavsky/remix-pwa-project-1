const MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/
const MATCH_END_QUERY = /[?&#]end=([0-9hms]+)/
const MATCH_START_STAMP = /(\d+)(h|m|s)/g
const MATCH_NUMERIC = /^\d+$/

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
function parseTimeParam (url: string, pattern: RegExp): number | undefined {
  if (url instanceof Array) {
    return undefined
  }
  const match = url.match(pattern)
  if (match) {
    const stamp = match[1]
    if (stamp.match(MATCH_START_STAMP)) {
      return parseTimeString(stamp)
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp)
    }
  }
  return undefined
}

function parseTimeString (stamp: string) {
  let seconds = 0
  let array = MATCH_START_STAMP.exec(stamp)
  while (array !== null) {
    const [, count, period] = array
    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60
    if (period === 'm') seconds += parseInt(count, 10) * 60
    if (period === 's') seconds += parseInt(count, 10)
    array = MATCH_START_STAMP.exec(stamp)
  }
  return seconds
}

export function parseStartTime (url: string ) {
  return parseTimeParam(url, MATCH_START_QUERY)
}

export function parseEndTime (url: string) {
  return parseTimeParam(url, MATCH_END_QUERY)
}

export function isValidYouTubeUrl(url: string) {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/)?[a-zA-Z0-9_-]+(\?.*)?$/;
  return regex.test(url);
}