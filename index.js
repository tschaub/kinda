var UNWORD_RE = /\W/g;

/**
 * Determines if one string matches another.  The "needle" string matches if
 * all of its characters are in the "haystack" string in the correct order.
 * Characters are compared independent of case.  Spaces and other non-word
 * characters are not considered.
 * @param {string} needle The needle string.
 * @param {string} haystack The haystack string.
 * @return {number} The quality of the match (0 for no match, 1 for a tight match).
 */
function match(needle, haystack) {
  needle = needle.replace(UNWORD_RE, '').toLowerCase();
  haystack = haystack.replace(UNWORD_RE, '').toLowerCase();
  var needleLength = needle.length;
  var haystackLength = haystack.length;
  if (needleLength === 0 || needleLength > haystackLength) {
    return 0;
  }
  if (needleLength === haystackLength) {
    return needle === haystack ? 1 : 0;
  }
  var firstMatch = 0;
  var haystackIndex = 0;
  outer: for (var needleIndex = 0; needleIndex < needleLength; ++needleIndex) {
    var needleLetter = needle.charCodeAt(needleIndex);
    while (haystackIndex < haystackLength) {
      var haystackLetter = haystack.charCodeAt(haystackIndex);
      haystackIndex += 1;
      if (needleLetter === haystackLetter) {
        if (!firstMatch) {
          firstMatch = haystackIndex;
        }
        continue outer;
      }
    }
    return 0;
  }
  return needleLength / (haystackIndex + 1 - firstMatch);
}

module.exports = match;
