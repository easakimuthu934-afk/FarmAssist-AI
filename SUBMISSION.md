# Razorpay AI Buildathon Submission Draft

## Project Name / Title
FarmAssist AI – AI Decision Copilot for Farmers

## Project Objectives – What does it solve?
FarmAssist AI helps farmers turn daily farm records into actionable decisions. It combines crop growth stage, field observations, daily work, expenses, harvest revenue and weather signals in one simple offline-first application. The AI decision copilot identifies the most relevant checks and risks for the day, while finance analytics shows season cost, revenue and profit/loss. The goal is to reduce fragmented record-keeping and help farmers make more informed, timely decisions even when internet connectivity is unreliable.

## Build Challenges & Technical Obstacles
The main challenges were designing an offline-first data flow, connecting crop-stage context with daily recommendations, and keeping recommendations explainable instead of inventing observations. We solved this by using a structured local data model with stable IDs, a crop knowledge library that maps planting age to growth stages, and an explainable decision engine that derives recommendations only from saved records and weather signals. We also added PWA caching so the core application remains usable offline, while online weather data is cached for later viewing.

## 5-minute pitch structure
1. Problem: farmers keep crop, work and cost information in disconnected places.
2. Solution: FarmAssist Pro creates one digital farm diary and decision layer.
3. Demo: add farm → add crop → daily report → expense → harvest → analytics → AI Copilot.
4. AI: explain how crop stage + observations + weather + finance are combined into ranked recommendations.
5. Impact and roadmap: secure cloud sync, production authentication, speech-to-text, richer AI reasoning and scalable farmer support.
