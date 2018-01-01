const UNSUPPORTED = [
  /MSIE ([0-9]\.[0-9]{0,})/,
  /MSIE (10.[0-9]{0,})/
];

export default function unsupportedUserAgent({ redirectUrl } = {}) {
  return (req, res, next) => { // eslint-disable-line consistent-return
    if (!redirectUrl) {
      return next(new Error('unsupportedUserAgent middleware requires redirectUrl param'));
    }

    const matchesUserAgent = pattern => pattern.test(req.headers['user-agent']);
    if (UNSUPPORTED.some(matchesUserAgent)) {
      return res.redirect(redirectUrl);
    }

    next();
  };
}
