# FarmAssist Pro

**AI Decision Copilot for farmers**

FarmAssist Pro is an offline-first browser MVP that turns scattered farm records into daily, explainable decisions. It tracks farms, crops, crop growth stages, daily reports, expenses, harvest revenue, weather signals and profit/loss, then generates contextual recommendations.

## Buildathon positioning

- Track: **Open Track**
- Core problem: farm records are fragmented and decisions are often made without combining crop stage, field observations, weather and cost data.
- AI approach: an explainable decision engine ranks actions from saved crop-stage, observation, weather and finance signals. The architecture is ready to swap in a hosted LLM for natural-language reasoning without changing the data model.
- Offline-first: records are stored in LocalStorage and the app is installable as a PWA. Weather refresh works online and the latest successful weather result is cached.
- Languages: English, Tamil, Hindi.

## Demo

1. Open the app.
2. Click **Load demo farm**.
3. Explore Home → My Farm → Reports → Finance → Analytics → FarmAssist AI.
4. Refresh weather after setting a farm location while online.
5. Add a report/expense/harvest and return to FarmAssist AI to see updated recommendations.

## Data model

Farm → Crop → Daily Report / Activity; Expense and Harvest records feed financial analytics. IDs are retained so a future server database/cloud sync can replace LocalStorage safely.

## Limitations

This is an MVP. Authentication is local/demo-only, and the current AI layer is deterministic and explainable rather than a hosted generative model. Do not use it for sensitive personal data.
