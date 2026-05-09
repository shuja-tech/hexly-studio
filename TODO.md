# Deployment to Vercel (Production) - TODO

- [x] Analyze existing frontend/backend integration (Express `server.js`, chat frontend, Formspree usage).
- [x] Add Vercel serverless endpoint for chat: `api/chat.js` calling Dify with `DIFY_API_KEY`.
- [x] Update chat frontend to call `/api/chat` (works in production and local).
- [ ] Ensure Vercel env var `DIFY_API_KEY` is configured.

- [ ] Commit + push to GitHub.
- [ ] Import project into Vercel and deploy.
- [ ] Smoke test in production: AI chat + contact form + Omnidim widget.

