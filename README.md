# Breakable-Toy-ToDoApp

OVERVIEW
This ‘Breakable Toy’, is a To Do Application that allows users to manage their tasks, including creating, updating, consulting, marking as done and deleting tasks, navigating trough the application and tasks with a pagination, filtering and search component.
It is a full-stack application built with Spring Boot backend and React and Vite frontend using Typescript. The backend provides provides a REST API for component management (tasks, pagination, average time that takes the user to complete a task), and the frontend offers a user interface where tasks can be added, viewed, updated or deleted. The system currently uses in-memory storage but a database for persistence could be integrated later on.
CONTEXT
For this application, the problem resides on seamless communication between backend and frontend using an REST API and managing features in the front end, like searching and sorting using attributes like due date, priority and name.
The front and backend must be able to communicate at all times, since certain features, like when in frontend a task is checked, it’ll have to update the ‘done’ attribute of the object in case the user decides to run a search or filtering process. Also in possible edit of either due date, name or priority of the task, pagination and average time to accomplish a task.
As for the frontend, the problem to solve is to make listeners that actually respond to a certain feature in order to give certain attributes to the application appearance, like coloring certain color based off the task’s due date(green for two or more weeks, yellow for exactly 2 weeks, red for one week and no colour for the tasks that have no due date). The strikethrough feature is also a big component thing, since it must edit the current task attributes and update them in real time, and so are the pagination and metric components.
Since the back and front end are hosted in different ports(9090 for the backend and 8080 for the frontend), ensuring proper CORS(Cross-Origin Resource Sharing) configuration is essential, and so was ensuring the API endpoints are properly mapped and accessed, so HTTP methods were used, along with consistency of request/response formats(especially with date management).
SOLUTION
This project required different technologies for the front and back end to accomplish a smooth communication and developing.
Backend
SprinBoot was used with Java 23 and Maven. And runs in the 9090 port.
The dependencies added were:
LomBok. Java annotation library which helps to reduce boilerplate code.
Spring Web. Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.
Spring Reactive Web. Build reactive web applications with Spring WebFlux and Netty.
Spring Web Services. Facilitates contract-first SOAP development. Allows for the creation of flexible web services using one of the many ways to manipulate XML payloads.
The develpoment for the backend IDE used was IntelliJ, so in the Java project all the components were added.
‘ToDo’ object, with the attributes:
Id(for classification): A long, since we don’t know if the user will have a million tasks to add, so if that would be the case, the number of Ids wont be overflowed.
text(for the task name): String limitated to 120 characters.
priority: String “LOW”, “MEDIUM”, “HIGH”.
dueDate: LocalDateTime to get the date provided in the frontend by the user.
done: Boolean, that will receive ‘true’ if the task has been done(scratching the task in the frontend), and ‘false’ if the task is yet not completed(this attribute will be predeterminately ‘false’ when a new task is added).
creationDate: LocalDateTime that in the constructor will be assigned the current date from the system.
doneDate: LocalDateTime, attribute to get average time of task accomplish.
A configuration folder:
DataLoader. To load dummy data in tests
WebConfigInterface. Where, extending WebSocket Configurer, adds a WebSocketHandlerRegistry and adds handler, but this is an abstract class, the actual implementation is in the class WebConfig, that implements the interface and a function addCorsMappings totake get the http origin, it being the port 8080 for the frontend, and the allowed methods, being POST, PUT, DELETE, OPTIONS and GET.
Controller folder:
It has the class ToDoController, where the APIS are built, and requests are called to the certain function needed, also stablishing the API path for the frontend to communicate. The controller, as the name indicates, will call the functions according to the http sent method. such as creating a ToDo element and adding it to the list, getToDo by id, callTodos, wich brings all the tasks(for the table to display), updateTodo which updates changes in case there are some made. DeleteTodo to delete a task, and mark as done or undone.
Dto Folder
Paginated response is a class that’ll get the pagination function and process it in the backend, up to 10 elements per page.
The TdoDto class is used to transfer data that needs to be transferred, for security reasons.
Exception Folder
Stores only one class, with an exception in case the data weren’t sent correctly from the frontend, and caused some issue on the receiver.
Repository Folder
Contains the classes responsible for managing the app’s interaction with the database. In this case, no database was required, but was added in case there would be needed later on.
Service folder
Contains the ToDoService interface and a subfolder ‘impl’, which is the implementation of the service, this layer contains all the core business logic of the application, defines the rules of get, post, mapping and other processes that govern the app’s behavior. Also is the component in charge of the transactions and how they're handled, this is where the database addtion would be made in case of wanting to incorporate it. Also contains the communication between layers controller and communicates with the repository to perform data collection.
Frontend
The technology used to develop the frontend was React and Vite, and the programming languages were mainly Typescript, html for the main call to the app, and CSS for the visual elements. The development IDE used was Visual Studio Code.
To create the project, I made a folder and opened it in VSC, then used the terminal to create the project, using the commands:
npm create vite@latest ‘breakable-front’, selected ‘React’ and the “Typescript.
Then, had to move to the project’s folder using cd, and execute two other commands.
To run the project with its dependencies correctly, the following commands must be ran on the Terminal:
npm install
npm run dev(to run the project)
npm react-bootstrap bootstrap
Imports and Interfaces
• React, useEffect, useState: Standard React hooks used to manage state and side effects.
• useState: Handles local component state for things like the list of todos, the current page, and sorting preferences.
• useEffect: Runs side effects, such as fetching the list of todos when the component mounts or toDos/refreshData changes.
• EditModal: Presumably a modal component for editing a todo.
• listTodo: A service function that fetches todo data from an API.
• Todo interface: Defines the structure of a Todo object, which includes properties like id, text, priority, dueDate, and done.
ToDoTableProps: Defines the props expected by the ToDoList component, including the toDos array and a refreshData callback to reload the todo list.
State Variables
• todo: Local state that stores the full list of todos fetched from the backend API. Initially an empty array ([]), this is updated by the listTodo function inside useEffect.
• sortedToDos: This stores the list of todos to be displayed, after applying sorting. It is initialized with the toDos prop passed from the parent.
• sortColumn and sortDirection: Manage the current sorting state — what column is being sorted (sortColumn) and whether it’s sorted in ascending or descending order (sortDirection).
• currentPage and itemsPerPage: Manage pagination. currentPage tracks which page of the todo list is currently visible, and itemsPerPage sets the number of items per page.
useEffect Hook
• useEffect ensures that the component fetches the todo data and sorts it properly when it mounts or when the toDos prop or refreshData callback changes.
• listTodo: This function is called to fetch the todos from a backend API. When the data is received, it updates the todo state.
Marking a Todo as Done/Undone
• markAsDoneOrUndone: This function toggles the completion status of a todo by sending a POST request to the backend API. It uses the id of the todo and the boolean value done to update its status.
• If the API request succeeds, it calls refreshData to reload the list of todos; if it fails, it logs an error.
Deleting a Todo
• deleteAction: Sends a DELETE request to remove a todo by its id. If successful, it triggers refreshData to refresh the list; otherwise, an error is logged.
Sorting Functionality
• handleSort: Handles sorting by the selected column (text, priority, dueDate).
• Sorting by dueDate compares date values.
• Sorting by priority uses a predefined order (LOW, MEDIUM, HIGH).
• For other fields like text, standard lexicographical comparison is used.
• The sort direction is toggled between ascending (asc) and descending (desc) on each click.
Pagination
• totalPages: Calculated by dividing the number of sorted todos by itemsPerPage.
• currentItems: Determines the items to be displayed on the current page by slicing the sortedToDos array based on the current page and items per page.
• The pagination UI generates buttons for each page, and clicking them updates currentPage.
8. Rendering
• Table Structure: The component renders the todos in a table format.
• Each column in the table corresponds to a field in the Todo object (text, priority, dueDate), and there’s a checkbox to mark a todo as done/undone.
• The Actions column includes buttons for editing (via EditModal) and deleting the todo.
• Sorting: Clicking on column headers triggers sorting via the handleSort function.
Pagination: Below the table, pagination buttons allow navigating through the pages.
EditModal Component: Allows the user to edit a todo task using fetch. task data sending the ToDo object with the updates made in the frontend either the checkbox or the edit mode. Uses datapicker component to handle date selection for the due date. On submit, the task is updated via PUT request to an API endpoint. Error handling is added, onEdit is called to notify the parent component when a task is edited.
parseDate Function
• This helper function converts the dueDate string into a more user-friendly format using toLocaleDateString().
External APIs and Services
• The component interacts with a backend API at http://localhost:9090/todos/ for marking todos as done and deleting them.
• The API expects requests to be in JSON format, and the relevant headers (Accept, Content-Type) are included.
ALTERNATIVE SOLUTION
One of the main issues for the development of this application, was the pagination and metrics.
I ended up using a very simple pagination method, obtaining the page number, size(always 10) and if its sorted and the direction the user wants to go. Ended up using this way because the pagination component was making a system error, where you couldn't visualize the interface because of it. Could be made in the frontend, but its not very reactive when the amount of tasks goes on ascense.
Also, the metrics calculations could be made directly in the frontend, the this is about obtaining the data, since there’s no database, the elements are temporarily stored in a List, that only the backend can have access to, but, if the database were to be implemented, so could this function, the thing, is that could cause the system to have an unwanted answer time and make the app slow.
