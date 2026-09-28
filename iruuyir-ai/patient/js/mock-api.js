/* Demo mode for the patient portal (mirrors mock-backend/server.js) so it works from Live Server
   with no Node server. Turn OFF with  window.USE_MOCK = false  in js/config.js  to use the real backend. */
(function () {
  if (!window.USE_MOCK) return;
  const real = window.fetch.bind(window);
  const P = { id: 'IU-1001', password: 'demo123', dob: '1998-05-14', name: 'Priya Devi',
              riskScore: 72, triage: 'MEDIUM', lastAssessment: '25 Sept 2026' };
  const json = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: { 'Content-Type': 'application/json' } });
  const wait = ms => new Promise(r => setTimeout(r, ms));

  window.fetch = async function (url, opts) {
    url = String(url); opts = opts || {};
    if (!url.startsWith(window.API_BASE_URL)) return real(url, opts);
    const path = url.slice(window.API_BASE_URL.length), method = (opts.method || 'GET').toUpperCase();
    const body = opts.body ? JSON.parse(opts.body) : {};
    const authed = /^Bearer mock-/.test((opts.headers || {}).Authorization || '');
    await wait(350);

    if (method === 'POST' && path === '/api/auth/patient/login') {
      if (body.patientId !== P.id || body.password !== P.password || body.dob !== P.dob)
        return json({ message: 'Patient ID, password or date of birth is incorrect.' }, 401);
      return json({ token: 'mock-' + Math.random().toString(36).slice(2), user: { id: P.id, name: P.name } });
    }
    if (method === 'POST' && path === '/api/auth/logout') return json({ ok: true });
    if (!authed) return json({ message: 'Unauthorized' }, 401);
    if (method === 'GET' && path === '/api/patients/' + P.id) {
      const { password, dob, ...rest } = P; return json(rest);
    }
    if (method === 'POST' && path === '/api/patients/' + P.id + '/pre-arrival') {
      console.log('PRE-ARRIVAL (demo):', body); return json({ ok: true });
    }
    return json({ message: 'Not found' }, 404);
  };
})();
