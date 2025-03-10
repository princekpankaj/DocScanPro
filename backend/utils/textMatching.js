// textMatching.js
function levenshtein(a, b) {
    // Create distance matrix of size (len(a)+1) x (len(b)+1)
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    // Base cases: distance from empty string
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    // Compute distances
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,      // deletion
          dp[i][j-1] + 1,      // insertion
          dp[i-1][j-1] + cost  // substitution
        );
      }
    }
    return dp[m][n];
  }
  
  function similarity(a, b) {
    if (a.length === 0 && b.length === 0) return 1;
    const dist = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length);
    return maxLen === 0 ? 0 : (1 - dist / maxLen);
  }
  
  module.exports = { levenshtein, similarity };
  