# Task Tracker CLI

A command-line interface to manage your tasks. Add, update, delete, and track the status of your tasks, all stored in a local JSON file.

## Requirements

- Node.js v18+
- TypeScript (`npm install -g typescript`) or use `npx`

## Installation

```bash
npm install
npx tsc
```

## Usage

You can run commands with `node dist/index.js` or use the shorthand `npm run dev --` which builds and runs in one step:

```bash
# Add a task
node dist/index.js add "Buy groceries"
# or
npm run dev -- add "Buy groceries"

# Update a task
node dist/index.js update 1 "Buy groceries and cook dinner"

# Delete a task
node dist/index.js delete 1

# Mark as in progress
node dist/index.js mark-in-progress 1

# Mark as done
node dist/index.js mark-done 1

# List all tasks
node dist/index.js list

# List by status
node dist/index.js list todo
node dist/index.js list in-progress
node dist/index.js list done
```

## Task properties

Each task has: `id`, `description`, `status` (`todo` | `in-progress` | `done`), `createdAt`, `updatedAt`.
