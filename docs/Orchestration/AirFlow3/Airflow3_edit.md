# Airflow 3

# Start Airflow standalone with Docker

- Create develop folder
    - Git clone from [https://github.com/uuboyscy/airflow-demo](https://github.com/uuboyscy/airflow-demo)
        ```bash
        git clone --branch feat/airflow3 --depth 1 https://github.com/uuboyscy/airflow-demo.git
        ```

- Start via Docker Container
- **Mac / Linux:**
```bash
docker run -it -d \
    --name airflow3-server \
    -p 8080:8080 \
    -v $PWD/dags:/opt/airflow/dags \
    -v $PWD/logs:/opt/airflow/logs \
    -v $PWD/utils:/opt/airflow/utils \
    -v $PWD/tasks:/opt/airflow/tasks \
    -e PYTHONPATH=/opt/airflow \
    apache/airflow:3.0.3-python3.11 airflow standalone
```

- **Windows:**
```powershell
docker run -it -d `
    --name airflow3-server `
    -p 8080:8080 `
    -v "${PWD}/dags:/opt/airflow/dags" `
    -v "${PWD}/logs:/opt/airflow/logs" `
    -v "${PWD}/utils:/opt/airflow/utils" `
    -v "${PWD}/tasks:/opt/airflow/tasks" `
    -e PYTHONPATH=/opt/airflow `
    apache/airflow:3.0.3-python3.11 airflow standalone
```

- Get user
    1. Execute into container
        ```bash
        docker exec -it airflow3-server /bin/bash
        ```
    2. Find user in `/opt/airflow/simple_auth_manager_passwords.json.generated` in container