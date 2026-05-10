# GitHub Setup Instructions

## 1. Create GitHub Project (Kanban Board)

In your repository on github.com:

1. Click **Projects** tab
2. Click **New project**
3. Choose **Table** template
4. Name it `Warehouse Ops Roadmap`
5. Add these columns:
   - Backlog
   - Ready
   - In Progress
   - In Review
   - Done

6. Add cards for each TODO item (from the main TODO list)

## 2. Create GitHub Issues for each task

Use these templates:

### Issue: Implement Task Execution UI

```
## Description
Create the idiot-proof task execution interface where workers can start and complete a workflow step-by-step.

## Acceptance Criteria
- [ ] Step-by-step progression UI
- [ ] Video player for step instructions
- [ ] Validation (scan/confirm/input)
- [ ] Progress bar
- [ ] Disable navigation until step complete

## Related Issues
- Admin Builder (prerequisite)

## Effort
Medium (2-3 days)
```

### Issue: Add Analytics & Anomaly Detection

```
## Description
Implement basic analytics layer tracking task completion rates, time per step, and anomalies.

## Acceptance Criteria
- [ ] Track step completion times
- [ ] Detect performance regressions
- [ ] Dashboard showing metrics

## Related Issues
None

## Effort
Medium (2-3 days)
```

## 3. Sync Project with Issues

1. Go to **Projects** → **Warehouse Ops Roadmap**
2. Click **+ Add item**
3. Link each GitHub Issue to a card
4. Assign priority and status

This way, PRs and commits auto-update the board status.
