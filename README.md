# online-ide-backend

![online-ide-backend](https://github.com/shivam-kumar-shah/online-ide-backend/assets/134827809/61f47b9b-abc6-4ddb-adc2-34fd5e4c5db8)

## Description

The Express App is a specialized TypeScript-based backend designed to function as a robust code execution engine. Much like services like Judge0, it utilizes containerization to ensure the safe and secure execution of code. Through this technology, the app creates a controlled sandbox environment, guaranteeing the safety and reliability of the backend.

## Features

- **TypeScript Environment**: The entire backend is written in TypeScript, providing enhanced code quality, readability, and error checking.

- **RESTful Architecture**: Adheres to RESTful principles, providing a structured and predictable API for interaction with the frontend.

- **Multi-Language Support**: The backend supports code execution multiple languages, providing flexibility for a wide range of applications, find the list of supported languages below-

## Languages supported

![c](https://img.shields.io/badge/C-A8B9CC.svg?style=for-the-badge&logo=C&logoColor=black)
![cpp](https://img.shields.io/badge/C++-00599C.svg?style=for-the-badge&logo=C++&logoColor=white)
![java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)


## Security Features

The Express app incorporates several security measures to ensure the safety and integrity of data processing:

- **Code Execution Time Limit**: Each code execution is subject to a predefined time limit, preventing potential infinite loops or resource abuse.

- **Containerization**: Docker containers are used to encapsulate code executions, restricting access to the host file system and network resources.

- **Separation of Worker and Server**: A separate microservice, known as the "worker", is responsible for running the code. This decoupling ensures scalability and reliability.

## Getting Started

To set up the Express app locally, follow these steps:

> install docker to continue with the setup

1. Clone the repository:

```bash
  git clone https://github.com/shivam-kumar-shah/online-ide-backend
```

2. Build docker-compose:

```bash
  docker compose up
```

3. Install the dependencies:

```bash
  cd server && npm i && cd ..
  cd worker && npm i
```

4. Build docker image:

> cd into worker/docker

```bash
  docker build -t compiler:v7a .
```

5. Generate public/private key pairs for ssh:

> generate and store both the keys in the `server` folder as `server.key` and `server.cert`

6. Start the server and the worker:

> cd into project root

```bash
  cd server && npm run start && cd ..
  cd worker && npm run start
```

## Usage

The app provides a powerful backend for your applications, allowing seamless interaction with the frontend. The use of TypeScript ensures robust code and enhances maintainability.

## Technologies Used

- TypeScript
- Express.js
- Redis
- RabbitMQ
- MongoDB
- Mongoose - ODM
- Docker

![typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
![rabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600.svg?style=for-the-badge&logo=RabbitMQ&logoColor=white)
![mongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)
![mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white)
![redis](https://img.shields.io/badge/Redis-DC382D.svg?style=for-the-badge&logo=Redis&logoColor=white)

## Contributing

Contributions are welcome! If you have any ideas, bug fixes, or improvements, please open an issue or submit a pull request.

## Contact

For any inquiries or feedback, feel free to contact us at [shivam-kumar-shah@outlook.com](mailto:shivam-kumar-shah@outlook.com).

---

*Happy Coding!* 🚀
