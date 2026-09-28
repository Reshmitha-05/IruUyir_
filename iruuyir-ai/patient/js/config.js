/* Single place for the patient portal's backend settings. Change only this file.
   USE_MOCK = true  -> built-in demo data (no server needed; login IU-1001 / demo123 / DOB 1998-05-14)
   USE_MOCK = false -> real backend at API_BASE_URL (or run: cd mock-backend && npm i && npm start) */
window.API_BASE_URL = 'http://localhost:3000';
window.USE_MOCK = true;
