# User Management App

A modern React + TypeScript web app to manage a list of users.  
Built with **React.js**, **TypeScript**, **MUI**, **Redux Toolkit**, and **RTK Query**.

---

## Features

- **Display Users**: Table with Name, Username, Email, and Actions (Edit/Delete)
- **Add User**: Form dialog with validation (required fields + email format)
- **Edit User**: Pre-filled dialog for editing existing users
- **Delete User**: Custom confirmation dialog
- **Snackbar notifications** for success/error feedback
- **Loading & Error Handling**: Custom loader and table skeleton
- **Pagination**: Table pagination for large datasets
- **Modular Components**: Each feature broken into reusable subcomponents

---

## Tech Stack

- **React.js** (v18+)
- **TypeScript**
- **MUI (Material UI)**
- **Redux Toolkit + RTK Query**
- **React Hook Form + Zod** (form validation)
- **Framer Motion** (loader animations)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KartikaySingh0211/UserManager.git
cd UserManager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

```bash
npm start
# or
yarn start
```

Open http://localhost:3000 to view the app.

### 3. Project Structure

```bash
.
┣ index.html
┣ README.md
┗ src/
	┣ main.tsx
	┣ app/
	┃ ┣ App.tsx
	┃ ┣ hooks.ts
	┃ ┗ store.ts
	┣ features/
	┃ ┣ users/
	┃ ┃ ┣ index.ts
	┃ ┃ ┣ types.ts
	┃ ┃ ┣ usersApi.ts
	┃ ┃ ┣ usersSlice.ts
	┃ ┃ ┗ components/
	┃ ┃   ┣ UserDialog.tsx
	┃ ┃   ┗ userTable/
	┃ ┃     ┣ UserTable.tsx
	┃ ┃     ┣ UserTableHeader.tsx
	┃ ┃     ┣ UserTableRow.tsx
	┃ ┃     ┗ UserTableSkeleton.tsx
	┃ ┣ ui/
	┃ ┃ ┣ index.ts
	┃ ┃ ┣ AppSnackbar.tsx
	┃ ┃ ┣ ConfirmDialog.tsx
	┃ ┃ ┣ Loader.tsx
	┃ ┃ ┗ uiSlice.ts
	┣ styles/
	┃ ┗ index.css
	┣ theme/
	┗ ┗ theme.ts
```

### 4. API Endpoints

Using JSONPlaceholder as a mock API:

### Example API Endpoints (for reference)

| Action      | Method      | Endpoint     |
| ----------- | ----------- | ------------ |
| Fetch users | GET         | `/users`     |
| Add user    | POST        | `/users`     |
| Update user | PUT / PATCH | `/users/:id` |
| Delete user | DELETE      | `/users/:id` |

Note: Since JSONPlaceholder is a mock API, add/update/delete operations will not persist.
