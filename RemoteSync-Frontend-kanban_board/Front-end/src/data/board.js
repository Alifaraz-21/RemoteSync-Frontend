import { v4 as uuidv4 } from "uuid";

import taskImage from "../assets/images/task.jpg";
import taskImage2 from "../assets/images/task2.jpg";
import taskImage3 from "../assets/images/task3.jpg";
import { getRandomColors } from "../helpers/getRandomColors";

export const Board = {
  backlog: {
    name: "Backlog",
    items: [
      {
        id: uuidv4(),
        title: "Design Database Schema",
        description: "Create an optimized database schema ...",
        priority: "medium",
        deadline: 120,
        image: taskImage2,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: uuidv4(),
        title: "Develop User Authentication Module",
        description: "Design and implement secure user authentication, including login..",
        priority: "low",
        deadline: 30,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  pending: {
    name: "Pending",
    items: [
      {
        id: uuidv4(),
        title: "API Development for Task Management",
        description: "Develop RESTful APIs for creating, updating, ..",
        priority: "high",
        deadline: 30,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
      {
        id: uuidv4(),
        title: "Design Frontend Dashboard UI",
        description: "Develop a responsive, user-friendly UI for..",
        priority: "low",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  todo: {
    name: "To Do",
    items: [
      {
        id: uuidv4(),
        title: "Build Task Analytics and Reporting Module",
        description: "Develop a module to generate reports and visual analytics ..",
        priority: "medium",
        deadline: 25,
        image: taskImage3,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  doing: {
    name: "Doing",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Development",
        description: "Completed the implementation of the Admin panel for task and user management, including permissions and access control.",
        priority: "low",
        deadline: 10,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
  done: {
    name: "Done",
    items: [
      {
        id: uuidv4(),
        title: "User Registration and Authentication",
        description: "Successfully implemented and tested the user registration, login, and authentication flows.",
        priority: "high",
        deadline: 50,
        image: taskImage2,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
      },
    ],
  },
};
