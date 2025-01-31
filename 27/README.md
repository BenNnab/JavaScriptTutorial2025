Features
User Authentication:

Login and logout functionality.

Only logged-in users can create, view, update, and delete tasks.

Task Management:

Users can create tasks with a title, description, and status (e.g., "Pending", "Ongoing", "Done").

Users can view all their tasks in a separate page.

Users can update or delete tasks.

Task Status:

Each task will have a status: "Pending", "Ongoing", or "Done".

CRUD Operations:

Create, Read, Update, and Delete tasks.

Tech Stack
Frontend: HTML, CSS, JavaScript.

Backend: Node.js, Express.js.

Database: MongoDB.

Authentication: JSON Web Tokens (JWT) for user login/logout.

Modified Features
1. User Authentication
Logout Button: Add a logout button to the dashboard and task pages.

Token Expiration Handling: Automatically redirect users to the login page when their token expires.

2. Task Management
Task Categories: Add a category field to tasks (daily, weekly, monthly, yearly).

Task Creation Date: Add a createdDate field to tasks, automatically set when a task is created.

Task Status: Keep the existing status field (Pending, Ongoing, Done).

3. CRUD Operations
Update the Create Task form to include category.

Display category and createdDate in the task list.

Allow filtering tasks by category.