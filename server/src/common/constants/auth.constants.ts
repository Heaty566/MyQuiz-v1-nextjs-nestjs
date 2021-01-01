const day = 86400000;
const authUrl = '/api/auth';

const config = Object.freeze({
        maxAgeTokenTrue: day * 30,
        maxAgeTokenFailed: day,
        googleCallback: `${authUrl}/google/callback`,
        facebookCallback: `${authUrl}/facebook/callback`,
        githubCallback: `${authUrl}/github/callback`,
});

export { config };
