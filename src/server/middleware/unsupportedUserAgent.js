const UNSUPPORTED = [
  /MSIE ([0-9]\.[0-9]{0,})/, // IE 9 or older
  /MSIE (10.[0-9]{0,})/ // IE 10
];

export default function unsupportedUserAgent({ redirectUrl } = {}) {
  return function(req, res, next) {
    if (!redirectUrl) {
      return next(new Error('unsupportedUserAgent middleware requires redirectUrl param'));
    }

    const matchesUserAgent = (pattern) => pattern.test(req.headers['user-agent']);
    if (UNSUPPORTED.some(matchesUserAgent)) {
      return res.redirect(redirectUrl);
    }

    next();
  };
}
