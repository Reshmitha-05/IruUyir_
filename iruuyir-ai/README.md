# IruUyir AI — Combined Frontend (single project)

HTML5 + CSS3 + vanilla JS. No build step. **Tagline:** "For Every Little Heartbeat".

`index.html` (common entry) → choose **Healthcare Worker** or **Patient**:

| Choice | Opens | Source |
|---|---|---|
| Healthcare Worker | `healthworker/doctor-login.html` → full dashboard | first zip (iruuyir-ai-frontend-v2) |
| Patient | `patient/patient-login.html` → patient dashboard (risk score + SOS) | second zip (iruuyir) |

Each portal keeps its own CSS/JS, so neither design or behaviour was changed.
"Back" on both login pages returns to the common index.

## Folder structure
```
iruuyir-ai/
├── index.html                      common role selection (entry point)
├── README.md
├── assets/
│   ├── logo.png                    <-- PUT YOUR LOGO HERE (file name must be logo.png)
│   ├── PLACE-YOUR-LOGO-HERE.txt
│   └── css/logo.css                logo slot styling (used by every page)
├── healthworker/
│   ├── doctor-login.html
│   ├── doctor-dashboard.html
│   ├── css/  shared.css, doctor.css
│   └── js/   config.js, api.js, auth.js, ui.js, particles.js, dashboard.js, mock.js
├── patient/
│   ├── patient-login.html
│   ├── patient-dashboard.html
│   ├── components.html             visual reference of patient UI components
│   ├── css/  iruuyir.css
│   └── js/   config.js, auth.js, iruuyir.js, mock-api.js
├── mock-backend/                   optional Node/Express test server (serves the whole site too)
│   ├── server.js
│   └── package.json
└── docs/                           original README of each portal (API contracts etc.)
    ├── healthworker-README.md
    └── patient-README.md
```

## Run
**Easiest:** VS Code → right-click `index.html` → *Open with Live Server*. Demo mode is ON for both portals:
- Healthcare Worker: any ID + password `demo1234`
- Patient: `IU-1001` / `demo123` / DOB `1998-05-14`

**With the mock backend (optional):** `cd mock-backend && npm install && npm start`, open http://localhost:3000,
and set `window.USE_MOCK = false` in `patient/js/config.js`.

**Real backend:** healthcare worker → `healthworker/js/config.js` (`USE_MOCK:false`, `API_BASE_URL`);
patient → `patient/js/config.js`. Endpoint shapes are in `docs/`.

## Logo
Copy your file to **`assets/logo.png`**. That's all — it appears on the common index (96 px), both login cards,
both navbars, and is used as the browser-tab icon. Each slot has a fixed size with `object-fit: contain`, so the logo
is never stretched and never overlaps the brand name, nav links or cards. Until the file exists, a dashed "LOGO" box
is shown. Slot sizes can be tuned in `assets/css/logo.css`.
