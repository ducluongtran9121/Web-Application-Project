# Web-Application-Project - Alunno

<p align="center">
   <img src="./assets/logowithdjangoandreact.svg">
</p>

## What is Alunno?

Alunno is a web-based course management application for Web application programming course which uses [Django](https://www.djangoproject.com/) and [React](https://reactjs.org/) including beautiful design, feature-rich.

## Features

## QuickStart

### Windows

1. Get the source code.

   ```
   git clone https://github.com/ducluongtran9121/Web-Application-Project.git
   cd Web-Application-Project
   ```

2. Set up environment.

- Set up python environment

  - Create enviroment:
  
    ```
    cd backend
    python -m venv .env
    ```
       
  - Active enviroment:
  
    - Powershell:
    
      ```
      .env\Scripts\Activate.ps1
      ```
    - Command Prompt:
    
      ```
      .env\Scripts\activate.bat
      ```
  
  - Install dependencies:
  
    ```
    pip install -r .\requirement.txt
    ```
  
  - Migrate django
  
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
  
  - To run server:
  
    ```
    python manage.py runserver
    ```

- Set up frontend package:

  - Install dependencies and dev dependencies:
  
    ```
    cd frontend
    yarn install
    ```
  - To run dev build app:
  
    ```
    yarn dev
    ```
  
  - To build app:
    
    ```
    yarn build
    ```

## Requirements

- Python: [3.9.7](https://www.python.org/ftp/python/3.9.7/).
- Nodejs: [16.11](https://nodejs.org/dist/v16.11.0/).

## References

- [Django](https://www.djangoproject.com/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Vite](https://vitejs.dev/)
