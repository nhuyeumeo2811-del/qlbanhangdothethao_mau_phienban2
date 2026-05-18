export function normalizeSearchText(s) {
    return String(s || '')
        .normalize('NFĐ')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .trim();
}

function levenshtein(a, b) {
    const m = a.length;
    const n = b.length;
    if (m == 0) return n;
    if (n == 0) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j +=1) dp[j] = j;
    for (let j = 1; j <= m; j +=1) {
        let prev = i - 1;
        dp[0] = i;
        for (let j =1; j <= n; j += 1) {
            const tmp = dp[j];
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[j] = Math.min(
                dp[j] + 1,
                dp[j - 1] + 1,
                prev + cost
            );
            prev = tmp;
        }
    } 
    return dp[n];
}

function isSubsequence(small, large) {
    if (!small.length) return true;
    let i = 0;
    for (let j = 0; j < large.length && i < small.length; j += 1) {
        if (large[j] === small[i]) i += 1; 
    }
    return i === small.length;
}  

export function scoreNameMath(normQuery, normName) {
    if (!normQuery || !normName) return 0;

    if (normName.includes(normQuery)) {
        return 300 + Math.min(normQuery.length, 40);
    }

    if (normName.startsWith(normQuery)) {
        return 280 + Math.min(normQuery.length, 40);
    }

    const qTokens = normQuery.split(/\s+/).filter((t) => t.length > 0);
    const nameTokens = normName.split(/\s+/).filter((t) => t.length > 0);

    
}