# Task Queue

## ACTIVE
| Task | Priority | Complexity | Files Affected | Dependencies | Definition of Done |
|------|----------|------------|----------------|--------------|--------------------|
| Agent Audit & Hardening | High | Medium | docs/*.md | None | Documentation updated with governance rules and pushed to repo. |

## BACKLOG
| Task | Priority | Complexity | Files Affected | Dependencies | Definition of Done |
|------|----------|------------|----------------|--------------|--------------------|
| Create User Settings Page | Medium | Medium | client/src/pages/Settings.tsx | Auth System | Settings page functional and connected to tRPC. |
| Implement Active Recall Quiz | High | High | client/src/pages/Quiz.tsx | Vocabulary System | Quiz system with SRS logic fully operational. |
| Implement Daily Smart Reviews | High | Medium | server/routers/vocabulary.ts | SRS Logic | Daily review list generated correctly for users. |
| PDF Notes Generation | Low | Medium | server/_core/pdf.ts | None | Users can download PDF summaries of lessons. |

## QUICK WINS
| Task | Priority | Complexity | Files Affected | Dependencies | Definition of Done |
|------|----------|------------|----------------|--------------|--------------------|
| Fix typo in "القواعد" | High | Low | client/src/pages/Grammar.tsx | None | Correct spelling in the UI. |
| Add favicon to index.html | Medium | Low | client/index.html | None | Favicon displayed in browser tab. |
| Update README with live link | Low | Low | README.md | Deployment | Production URL added to README. |
