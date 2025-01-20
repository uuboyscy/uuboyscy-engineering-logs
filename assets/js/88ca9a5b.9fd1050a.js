"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[9e3],{40570:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>_,frontMatter:()=>i,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"Orchestration/AirFlow","title":"AirFlow","description":"https://airflow.apache.org/docs/docker-stack/index.html","source":"@site/docs/Orchestration/AirFlow.md","sourceDirName":"Orchestration","slug":"/Orchestration/AirFlow","permalink":"/docs/Orchestration/AirFlow","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Orchestration","permalink":"/docs/category/orchestration"},"next":{"title":"Prefect","permalink":"/docs/Orchestration/Prefect/"}}');var r=a(74848),s=a(28453);const i={},o="AirFlow",d={},l=[{value:"DAG",id:"dag",level:2},{value:"Operator",id:"operator",level:2},{value:"Dependency",id:"dependency",level:2},{value:"Pass parameters",id:"pass-parameters",level:2},{value:"Decorator",id:"decorator",level:2},{value:"Data Pipeline",id:"data-pipeline",level:2},{value:"Try import from utils",id:"try-import-from-utils",level:2},{value:"Implement",id:"implement",level:2},{value:"Apply",id:"apply",level:2},{value:"Import tasks",id:"import-tasks",level:2},{value:"TaskGroup",id:"taskgroup",level:2}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"airflow",children:"AirFlow"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://airflow.apache.org/docs/docker-stack/index.html",children:"https://airflow.apache.org/docs/docker-stack/index.html"})}),"\n",(0,r.jsx)(n.h1,{id:"start-airflow-standalone-with-docker",children:"Start Airflow standalone with Docker"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create develop folder"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"mkdir airflow-demo\ncd airflow-demo\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Start via Docker"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"docker run -it -d \\\n\t--name airflow-server \\\n\t-p 8080:8080 \\\n\t-v $(PWD)/dags:/opt/airflow/dags \\\n\t-v $(PWD)/logs:/opt/airflow/logs \\\n\t-v $(PWD)/utils:/opt/airflow/utils \\\n\t-v $(PWD)/tasks:/opt/airflow/tasks \\\n\t-e PYTHONPATH=/opt/airflow \\\n\tapache/airflow:latest airflow standalone\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create user"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"docker exec -it airflow-server /bin/bash\n\n# Execute following command in container\nairflow users create \\\n    --username airflow \\\n    --firstname airflow \\\n    --password airflow \\\n    --lastname airflow \\\n    --role Admin \\\n    --email your_email@example.com\n\nmkdir -p /opt/airflow/utils\ntouch /opt/airflow/utils/__init__.py\ntouch /opt/airflow/tasks/__init__.py\n"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Untitled",src:a(50984).A+"",width:"1238",height:"488"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"quick-start",children:"Quick start"}),"\n",(0,r.jsx)(n.h2,{id:"dag",children:"DAG"}),"\n",(0,r.jsx)(n.p,{children:"d_01_example_dag.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from datetime import datetime, timedelta\n\nfrom airflow import DAG\nfrom airflow.operators.python import PythonOperator\n\ndef task1():\n    print(\"Running Task 1\")\n\ndef task2():\n    print(\"Running Task 2\")\n\n# Default arguments for the DAG\ndefault_args = {\n    'owner': 'airflow',\n    'depends_on_past': False,\n    'email': ['your_email@example.com'],\n    'email_on_failure': False,\n    'email_on_retry': False,\n    'retries': 1,\n    'retry_delay': timedelta(minutes=5),\n}\n\n# Define the DAG\ndag = DAG(\n    'd_01_example_dag',\n    default_args=default_args,\n    description='An example DAG with Python operators',\n    schedule=\"* * * * *\",\n    start_date=datetime(2023, 1, 1),\n    catchup=False\n)\n\n# Define the tasks\ntask1_obj = PythonOperator(\n    task_id='task1',\n    python_callable=task1,\n    dag=dag,\n)\n\ntask2_obj = PythonOperator(\n    task_id='task2',\n    python_callable=task2,\n    dag=dag,\n)\n\n# Task dependencies\ntask1_obj >> task2_obj\n\n"})}),"\n",(0,r.jsx)(n.h2,{id:"operator",children:"Operator"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"task3_obj = BashOperator(\n    task_id='task3',\n    bash_command='echo \"Hello from Task 3!\"',\n    dag=dag,\n)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"dependency",children:"Dependency"}),"\n",(0,r.jsx)(n.p,{children:"d_02_example_dag_dependency.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from datetime import datetime, timedelta\n\nfrom airflow import DAG\nfrom airflow.operators.bash import BashOperator\nfrom airflow.operators.python import PythonOperator\n\ndef task1():\n    print(\"Running Task 1\")\n\ndef task2():\n    print(\"Running Task 2\")\n\n# Default arguments for the DAG\ndefault_args = {\n    'owner': 'airflow',\n    'depends_on_past': False,\n    'email': ['your_email@example.com'],\n    'email_on_failure': False,\n    'email_on_retry': False,\n    'retries': 1,\n    'retry_delay': timedelta(minutes=5),\n}\n\n# Define the DAG\ndag = DAG(\n    'd_02_example_dag_dependency',\n    default_args=default_args,\n    description='An example DAG with Python operators',\n    schedule=\"* * * * *\",\n    start_date=datetime(2023, 1, 1),\n    catchup=False\n)\n\n# Define the tasks\ntask1_obj = PythonOperator(\n    task_id='task1',\n    python_callable=task1,\n    dag=dag,\n)\n\ntask2_obj = PythonOperator(\n    task_id='task2',\n    python_callable=task2,\n    dag=dag,\n)\n\ntask3_obj = BashOperator(\n    task_id='task3',\n    bash_command='echo \"Hello from Task 3!\"',\n    dag=dag,\n)\n\n# Task dependencies\ntask1_obj >> task2_obj\ntask1_obj >> task3_obj\n\n"})}),"\n",(0,r.jsx)(n.h2,{id:"pass-parameters",children:"Pass parameters"}),"\n",(0,r.jsx)(n.p,{children:"d_03_example_pass_parameters.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datetime import datetime, timedelta\n\nfrom airflow import DAG\nfrom airflow.operators.python import PythonOperator\n\ndef task1():\n    print("Running Task 1")\n    return "Hello from Task 1!"\n\ndef task2(**kwargs):\n    ti = kwargs[\'ti\']\n    returned_value_from_task1 = ti.xcom_pull(task_ids=\'task1\')\n    print("Running Task 2")\n    print(f"Received from Task 1: {returned_value_from_task1}")\n    \n\n# Default arguments for the DAG\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n# Define the DAG\ndag = DAG(\n    "d_03_example_pass_parameters",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False\n)\n\n# Define the tasks\ntask1_obj = PythonOperator(\n    task_id="task1",\n    python_callable=task1,\n    dag=dag,\n)\n\ntask2_obj = PythonOperator(\n    task_id="task2",\n    python_callable=task2,\n    provide_context=True,\n    dag=dag,\n)\n\n# Task dependencies\ntask1_obj >> task2_obj\n\n'})}),"\n",(0,r.jsx)(n.h2,{id:"decorator",children:"Decorator"}),"\n",(0,r.jsx)(n.p,{children:"d_04_example_dag_decorator.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import pendulum\nfrom airflow.decorators import dag, task, bash_task\n\n# Define the DAG\n@dag(\n    schedule="* * * * *",\n    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),\n    catchup=False,\n    tags=["example"],\n)\ndef d_04_example_dag_decorator():\n    @task\n    def task1():\n        print("Running Task 1")\n    @task\n    def task2():\n        print("Running Task 2")\n\n    @bash_task\n    def task3():\n        return "echo \'Hello from Task 3!\'"\n\n    t1 = task1()\n    task2().set_upstream(t1)\n    task3().set_upstream(t1)\n\nd_04_example_dag_decorator()\n\n'})}),"\n",(0,r.jsx)(n.p,{children:"d_05_example_pass_parameters_decorator.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datetime import datetime, timedelta\n\nfrom airflow.decorators import dag, task\n\n# Default arguments for the DAG\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_05_example_pass_parameters_decorator",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n    tags=["example", "decorator"]  # Optional: Add tags for better filtering in the UI\n)\ndef d_05_example_pass_parameters_decorator():\n    @task\n    def task1():\n        print("Running Task 1")\n        return "Hello from Task 1!"\n\n    @task\n    def task2(returned_value_from_task1):\n        print("Running Task 2")\n        print(f"Received from Task 1: {returned_value_from_task1}")\n\n    # Task dependencies defined by calling the tasks in sequence\n    result_from_task1 = task1()\n    task2(result_from_task1)\n\n# Instantiate the DAG\nd_05_example_pass_parameters_decorator()\n\n'})}),"\n",(0,r.jsx)(n.p,{children:"d_06_example_pass_parameters_cli.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'"""\nCLI command:\nairflow dags trigger -c \'{"start_date": "2024-01-01", "end_date": "2024-03-01"}\' d_06_example_pass_parameters_cli\nairflow dags test -c \'{"start_date": "2024-01-01", "end_date": "2024-03-01"}\' d_06_example_pass_parameters_cli\n"""\nfrom datetime import datetime\n\nfrom airflow.decorators import dag, task\n\n# Default values for start_date and end_date\nDEFAULT_START_DATE = "2023-01-01"\nDEFAULT_END_DATE = "2023-12-31"\n\n@dag(\n    dag_id="d_06_example_pass_parameters_cli",\n    schedule_interval=None,  # Set to None for manual triggering\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n    tags=["example", "cli_variables_defaults"]\n)\ndef d_06_example_pass_parameters_cli():\n    @task\n    def extract_parameters(ti):\n        config = ti.xcom_pull(task_ids=\'trigger\', key=\'return_value\') or {}\n        # Get parameters with defaults if not provided via CLI\n        start_date = config.get(\'start_date\', DEFAULT_START_DATE)\n        end_date = config.get(\'end_date\', DEFAULT_END_DATE)\n        return {"start_date": start_date, "end_date": end_date}\n\n    @task\n    def start_task(date_params):\n        # This task can use the start_date and end_date directly\n        print(f"Task runs with a start date of {date_params.get(\'start_date\')} and end date of {date_params.get(\'end_date\')}")\n\n    date_params = extract_parameters()\n    start_task(date_params)\n\n# Create the DAG instance\nd_06_example_pass_parameters_cli()\n\n'})}),"\n",(0,r.jsx)(n.h2,{id:"data-pipeline",children:"Data Pipeline"}),"\n",(0,r.jsx)(n.p,{children:"d_07_example_data_pipeline.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datetime import datetime, timedelta\n\nimport pandas as pd\nfrom airflow.decorators import dag, task\n\n# Default arguments for the DAG\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_07_example_data_pipeline",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n    tags=["example", "decorator"]  # Optional: Add tags for better filtering in the UI\n)\ndef d_07_example_data_pipeline():\n    @task\n    def e_data_source_1() -> pd.DataFrame:\n        print("Getting df1.")\n        return pd.DataFrame(data=[[1], [2]], columns=["col"])\n\n    @task\n    def e_data_source_2() -> pd.DataFrame:\n        print("Getting df2.")\n        return pd.DataFrame(data=[[3], [4]], columns=["col"])\n\n    @task\n    def t_concat(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:\n        print("Concating df1 and df2.")\n        return pd.concat([df1, df2]).reset_index(drop=True)\n    \n    @task\n    def l_db1(df: pd.DataFrame) -> None:\n        print("Loading df to db1.")\n        print(df)\n        print("===============")\n\n    @task\n    def l_db2(df: pd.DataFrame) -> None:\n        print("Loading df to db2.")\n        print(df)\n        print("===============")\n\n    # Task dependencies defined by calling the tasks in sequence\n    df1 = e_data_source_1()\n    df2 = e_data_source_2()\n    df = t_concat(df1, df2)\n    l_db1(df)\n    l_db2(df)\n\n# Instantiate the DAG\nd_07_example_data_pipeline()\n\n'})}),"\n",(0,r.jsx)(n.h1,{id:"notification",children:"Notification"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://airflow.apache.org/docs/apache-airflow/2.6.0/howto/notifications.html",children:"https://airflow.apache.org/docs/apache-airflow/2.6.0/howto/notifications.html"})}),"\n",(0,r.jsx)(n.h2,{id:"try-import-from-utils",children:"Try import from utils"}),"\n",(0,r.jsx)(n.p,{children:"utils/testutils.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'def testfunc():\n    print("===========")\n    print("test")\n    print("===========")\n\n'})}),"\n",(0,r.jsx)(n.p,{children:"d_08_example_import_utils.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datetime import datetime, timedelta\n\nfrom airflow.decorators import dag, task\n\nfrom utils.testutils import testfunc\n\n# Default arguments for the DAG\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_08_example_import_utils",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n    tags=["example", "decorator"]  # Optional: Add tags for better filtering in the UI\n)\ndef d_08_example_import_utils():\n    @task\n    def call_custom_utils() -> None:\n        testfunc()\n\n    # Task dependencies defined by calling the tasks in sequence\n    call_custom_utils()\n\n# Instantiate the DAG\nd_08_example_import_utils()\n\n'})}),"\n",(0,r.jsx)(n.h2,{id:"implement",children:"Implement"}),"\n",(0,r.jsx)(n.p,{children:"utils/my_notifier.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'import time\n\nfrom airflow.notifications.basenotifier import BaseNotifier\n\ndef send_message(title, message) -> None:\n    print(title)\n    print(message)\n    print("Message sent.")\n    with open(f"/tmp/test_notification_message_{time.time_ns()}.txt", "w") as f:\n        f.write(f"{title}\\n=====\\n{message}\\n")\n\nclass MyNotifier(BaseNotifier):\n    template_fields = ("message",)\n\n    def __init__(self, message):\n        self.message = message\n\n    def notify(self, context):\n        # Send notification here, below is an example\n        title = f"Task {context[\'task_instance\'].task_id} failed"\n        send_message(title, self.message)\n\n'})}),"\n",(0,r.jsx)(n.h2,{id:"apply",children:"Apply"}),"\n",(0,r.jsx)(n.p,{children:"d_09_example_notification.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import random\nfrom datetime import datetime, timedelta\n\nfrom airflow.decorators import dag, task\n\nfrom utils.my_notifier import MyNotifier\n\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_09_example_notification",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    on_success_callback=MyNotifier(message="Success!"),\n    on_failure_callback=MyNotifier(message="Failure!"),\n    catchup=False,\n    tags=["example", "decorator"]  # Optional: Add tags for better filtering in the UI\n)\ndef d_09_example_notification():\n    @task\n    def success_or_failure() -> None:\n        if random.randint(0,1) == 0:\n            print("Failure!")\n            raise\n        else:\n            print("Success!")\n\n    success_or_failure()\n\n# Instantiate the DAG\nd_09_example_notification()\n'})}),"\n",(0,r.jsx)(n.h1,{id:"manage-tasks",children:"Manage tasks"}),"\n",(0,r.jsx)(n.h2,{id:"import-tasks",children:"Import tasks"}),"\n",(0,r.jsx)(n.p,{children:"tasks/test_tasks.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from airflow.decorators import task\n\n@task\ndef do_something(some_str: str) -> list[str]:\n    return list(some_str)\n\n"})}),"\n",(0,r.jsx)(n.p,{children:"d_10_example_import_tasks.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import random\nfrom datetime import datetime, timedelta\n\nfrom airflow.decorators import dag, task\n\nfrom tasks.test_tasks import do_something\n\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_10_example_import_tasks",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n)\ndef d_10_example_import_tasks():\n    @task\n    def generate_some_str() -> str:\n        return "HELLO"\n\n    @task\n    def print_something(something: str | list) -> None:\n        print("======")\n        print(something)\n        print("======")\n\n    some_str = generate_some_str()\n    result = do_something(some_str)\n    print_something(result)\n\n# Instantiate the DAG\nd_10_example_import_tasks()\n'})}),"\n",(0,r.jsx)(n.h2,{id:"taskgroup",children:"TaskGroup"}),"\n",(0,r.jsx)(n.p,{children:"d_11_example_import_taskgroup.py"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datetime import datetime, timedelta\n\nfrom airflow.decorators import dag, task\nfrom airflow.utils.task_group import TaskGroup\n\nfrom tasks.test_tasks import do_something\n\ndefault_args = {\n    "owner": "airflow",\n    "depends_on_past": False,\n    "email": ["your_email@example.com"],\n    "email_on_failure": False,\n    "email_on_retry": False,\n    "retries": 1,\n    "retry_delay": timedelta(minutes=5),\n}\n\n@dag(\n    dag_id="d_11_example_import_taskgroup",\n    default_args=default_args,\n    description="An example DAG with Python operators",\n    schedule_interval="* * * * *",\n    start_date=datetime(2023, 1, 1),\n    catchup=False,\n)\ndef d_11_example_import_taskgroup():\n    @task\n    def generate_some_str() -> str:\n        return "HELLO"\n\n    @task\n    def print_something_separately(something: str | list) -> None:\n        print("======")\n        print(something)\n        print("======")\n\n    some_str = generate_some_str()\n    result = do_something(some_str)\n    with TaskGroup(group_id=\'do_something_task_group\') as do_something_task_group:\n        # Dynamically create task instances for processing\n        print_something_separately.expand(something=result)\n\n# Instantiate the DAG\nd_11_example_import_taskgroup()\n\n'})})]})}function _(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},50984:(e,n,a)=>{a.d(n,{A:()=>t});const t=a.p+"assets/images/Untitled-50b4ebfc3983fa9a5663285ed275635a.png"},28453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>o});var t=a(96540);const r={},s=t.createContext(r);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);