# Airflow 3

Apache Airflow 3.0 introduces the most significant set of changes since the 2.0 release, including architectural shifts, new execution models, and improvements to DAG authoring and scheduling. This guide covers everything you need to know about setting up and using Airflow 3.0.

## What's New in Airflow 3.0

### Major Changes
- **Service-Oriented Architecture**: New Task Execution API enables tasks to run in any language and environment
- **TaskSDK**: Python TaskSDK for backward compatibility with existing DAGs, with Golang TaskSDK coming soon
- **New React-based UI**: Modern interface with dark mode support
- **DAG Versioning**: Better version control for workflow management
- **Asset-driven Scheduling**: Event-driven scheduling capabilities
- **Improved ML/AI Support**: Enhanced features for machine learning workflows
- **Cloud-Native Architecture**: Better support for distributed and edge computing

### Requirements
- Python 3.9–3.12 (dropped support for Python 3.8)
- Requires upgrade from Airflow 2.7 or later
- Docker support with latest apache/airflow:3.0.3 image

## Docker Setup

[Official Docker Documentation](https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html)

### Quick Start with Docker Compose

Create your development environment:

```bash
mkdir airflow3-demo
cd airflow3-demo
```

Or clone from the updated repository:
```bash
git clone https://github.com/uuboyscy/airflow3-demo
cd airflow3-demo
```

### Docker Setup for Airflow 3.0

#### Method 1: Using Official Docker Compose (Recommended)

Download the official docker-compose.yaml:
```bash
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/3.0.3/docker-compose.yaml'
```

Create necessary directories:
```bash
mkdir -p ./dags ./logs ./plugins ./config
echo -e "AIRFLOW_UID=$(id -u)" > .env
```

Initialize the database:
```bash
docker compose up airflow-init
```

Start all services:
```bash
docker compose up
```

#### Method 2: Standalone Container (For Development)

- **Mac / Linux:**
```bash
docker run -it -d \
    --name airflow3-server \
    -p 8080:8080 \
    -v $(PWD)/dags:/opt/airflow/dags \
    -v $(PWD)/logs:/opt/airflow/logs \
    -v $(PWD)/utils:/opt/airflow/utils \
    -v $(PWD)/tasks:/opt/airflow/tasks \
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

### Container Setup

Create user and directories:
```bash
docker exec -it airflow3-server /bin/bash

# Execute following commands in container
airflow users create \
    --username admin \
    --firstname Admin \
    --password admin \
    --lastname User \
    --role Admin \
    --email admin@example.com

mkdir -p /opt/airflow/utils /opt/airflow/tasks
touch /opt/airflow/utils/__init__.py
touch /opt/airflow/tasks/__init__.py
```

Access the Airflow web interface at `http://localhost:8080` with username `admin` and password `admin`.

## DAG Examples

### Basic DAG with New Features

**d_01_airflow3_basic_dag.py**

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator

def task1():
    print("Running Task 1 in Airflow 3.0")

def task2():
    print("Running Task 2 in Airflow 3.0")

# Enhanced default arguments for Airflow 3.0
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['admin@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# DAG with new Airflow 3.0 features
dag = DAG(
    'd_01_airflow3_basic_dag',
    default_args=default_args,
    description='Basic Airflow 3.0 DAG example',
    schedule="@daily",  # New cron expression support
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'example'],  # Enhanced tagging
    doc_md=__doc__,  # Built-in documentation support
)

# Define tasks
task1_obj = PythonOperator(
    task_id='task1',
    python_callable=task1,
    dag=dag,
)

task2_obj = PythonOperator(
    task_id='task2',
    python_callable=task2,
    dag=dag,
)

# Task dependencies
task1_obj >> task2_obj
```

### TaskSDK Usage (New in Airflow 3.0)

**d_02_airflow3_tasksdk.py**

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.sdk.definitions.decorators import task

# Using new TaskSDK decorators
@task
def extract_data():
    """Extract data using TaskSDK"""
    return {"data": [1, 2, 3, 4, 5]}

@task
def transform_data(data: dict):
    """Transform data using TaskSDK"""
    transformed = [x * 2 for x in data["data"]]
    return {"transformed_data": transformed}

@task
def load_data(data: dict):
    """Load data using TaskSDK"""
    print(f"Loading data: {data['transformed_data']}")

# Enhanced DAG definition
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['admin@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'd_02_airflow3_tasksdk',
    default_args=default_args,
    description='Airflow 3.0 TaskSDK example',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'tasksdk'],
)

# Task dependencies using TaskSDK
with dag:
    data = extract_data()
    transformed = transform_data(data)
    load_data(transformed)
```

### Advanced DAG with Asset-Driven Scheduling

**d_03_airflow3_assets.py**

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.assets import Asset
from airflow.operators.python import PythonOperator

# Define assets (new in Airflow 3.0)
input_asset = Asset("s3://my-bucket/input-data")
output_asset = Asset("s3://my-bucket/output-data")

def process_data():
    """Process data and update asset"""
    print("Processing data...")
    return "Data processed successfully"

def validate_data():
    """Validate processed data"""
    print("Validating data...")
    return "Data validation complete"

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['admin@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# Asset-driven DAG
dag = DAG(
    'd_03_airflow3_assets',
    default_args=default_args,
    description='Airflow 3.0 Asset-driven scheduling example',
    schedule=[input_asset],  # Triggered by asset updates
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'assets'],
)

process_task = PythonOperator(
    task_id='process_data',
    python_callable=process_data,
    outlets=[output_asset],  # This task produces the output asset
    dag=dag,
)

validate_task = PythonOperator(
    task_id='validate_data',
    python_callable=validate_data,
    dag=dag,
)

process_task >> validate_task
```

### Dynamic Task Mapping (Enhanced)

**d_04_airflow3_dynamic_tasks.py**

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.task_group import TaskGroup

def generate_items():
    """Generate items for dynamic task mapping"""
    return [f"item_{i}" for i in range(1, 6)]

def process_item(item):
    """Process individual item"""
    print(f"Processing {item}")
    return f"Processed {item}"

def summarize_results(results):
    """Summarize all results"""
    print(f"Summary: {results}")
    return "Summary complete"

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'email': ['admin@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'd_04_airflow3_dynamic_tasks',
    default_args=default_args,
    description='Airflow 3.0 Dynamic Task Mapping example',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'dynamic'],
)

# Generate items task
generate_task = PythonOperator(
    task_id='generate_items',
    python_callable=generate_items,
    dag=dag,
)

# Dynamic task mapping
with TaskGroup(group_id='processing_group') as processing_group:
    process_tasks = PythonOperator.partial(
        task_id='process_item',
        python_callable=process_item,
        dag=dag,
    ).expand(op_args=generate_task.output)

# Summarize results
summarize_task = PythonOperator(
    task_id='summarize_results',
    python_callable=summarize_results,
    dag=dag,
)

generate_task >> processing_group >> summarize_task
```

### Modern Decorator Pattern

**d_05_airflow3_modern_decorators.py**

```python
from datetime import datetime, timedelta
from airflow.decorators import dag, task, task_group
import pandas as pd

# Modern decorator pattern with enhanced features
@dag(
    dag_id='d_05_airflow3_modern_decorators',
    description='Modern Airflow 3.0 decorator pattern',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'modern', 'decorators'],
    doc_md="""
    # Modern Airflow 3.0 DAG
    
    This DAG demonstrates modern decorator patterns in Airflow 3.0
    with enhanced features and improved syntax.
    """,
)
def modern_data_pipeline():
    
    @task
    def extract_source_1() -> pd.DataFrame:
        """Extract data from source 1"""
        print("Extracting from source 1...")
        return pd.DataFrame({'id': [1, 2], 'value': [10, 20]})
    
    @task
    def extract_source_2() -> pd.DataFrame:
        """Extract data from source 2"""
        print("Extracting from source 2...")
        return pd.DataFrame({'id': [3, 4], 'value': [30, 40]})
    
    @task
    def transform_data(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
        """Transform and combine data"""
        print("Transforming data...")
        combined = pd.concat([df1, df2], ignore_index=True)
        combined['transformed_value'] = combined['value'] * 2
        return combined
    
    @task_group
    def load_data_group(df: pd.DataFrame):
        """Task group for loading data to multiple destinations"""
        
        @task
        def load_to_database(df: pd.DataFrame):
            """Load data to database"""
            print(f"Loading {len(df)} records to database")
            print(df.to_string())
        
        @task
        def load_to_warehouse(df: pd.DataFrame):
            """Load data to warehouse"""
            print(f"Loading {len(df)} records to warehouse")
            print(df.to_string())
        
        @task
        def create_report(df: pd.DataFrame):
            """Create summary report"""
            print("Creating summary report...")
            print(f"Total records: {len(df)}")
            print(f"Total value: {df['transformed_value'].sum()}")
        
        # Parallel loading
        load_to_database(df)
        load_to_warehouse(df)
        create_report(df)
    
    # DAG flow
    source1_data = extract_source_1()
    source2_data = extract_source_2()
    transformed_data = transform_data(source1_data, source2_data)
    load_data_group(transformed_data)

# Instantiate the DAG
modern_data_pipeline()
```

## Enhanced Notifications

### Custom Notifier with New Features

**utils/airflow3_notifier.py**

```python
import time
import json
from typing import Dict, Any
from airflow.notifications.basenotifier import BaseNotifier

class Airflow3Notifier(BaseNotifier):
    """Enhanced notifier for Airflow 3.0"""
    
    template_fields = ("message", "title", "context_data")
    
    def __init__(self, message: str, title: str = None, webhook_url: str = None):
        self.message = message
        self.title = title or "Airflow 3.0 Notification"
        self.webhook_url = webhook_url
    
    def notify(self, context: Dict[str, Any]):
        """Enhanced notification with context data"""
        task_instance = context.get('task_instance')
        dag_run = context.get('dag_run')
        
        notification_data = {
            'title': self.title,
            'message': self.message,
            'task_id': task_instance.task_id if task_instance else 'unknown',
            'dag_id': task_instance.dag_id if task_instance else 'unknown',
            'execution_date': str(dag_run.execution_date) if dag_run else 'unknown',
            'state': str(task_instance.state) if task_instance else 'unknown',
            'timestamp': time.time(),
        }
        
        # Enhanced logging
        print(f"=== {self.title} ===")
        print(json.dumps(notification_data, indent=2))
        
        # Save notification to file
        filename = f"/tmp/airflow3_notification_{time.time_ns()}.json"
        with open(filename, "w") as f:
            json.dump(notification_data, f, indent=2)
        
        # Optional: Send to webhook
        if self.webhook_url:
            self._send_webhook(notification_data)
        
        print(f"Notification saved to {filename}")
    
    def _send_webhook(self, data: Dict[str, Any]):
        """Send notification to webhook (placeholder)"""
        print(f"Sending webhook to {self.webhook_url}")
        # Implement actual webhook sending logic here
```

### DAG with Enhanced Notifications

**d_06_airflow3_notifications.py**

```python
import random
from datetime import datetime, timedelta
from airflow.decorators import dag, task
from utils.airflow3_notifier import Airflow3Notifier

@dag(
    dag_id='d_06_airflow3_notifications',
    description='Airflow 3.0 Enhanced Notifications example',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'notifications'],
    on_success_callback=Airflow3Notifier(
        title="DAG Success",
        message="DAG completed successfully!"
    ),
    on_failure_callback=Airflow3Notifier(
        title="DAG Failure",
        message="DAG failed! Please check the logs."
    ),
)
def enhanced_notifications_dag():
    
    @task
    def random_task():
        """Task that randomly succeeds or fails"""
        success = random.choice([True, False])
        if success:
            print("Task succeeded!")
            return "success"
        else:
            print("Task failed!")
            raise Exception("Random task failure")
    
    @task
    def cleanup_task():
        """Cleanup task that always runs"""
        print("Performing cleanup...")
        return "cleanup_complete"
    
    # Task flow
    result = random_task()
    cleanup_task()

# Instantiate the DAG
enhanced_notifications_dag()
```

## Task Management with TaskSDK

### External Task Module

**tasks/airflow3_tasks.py**

```python
from airflow.decorators import task
from airflow.sdk.definitions.decorators import task as sdk_task
import pandas as pd
from typing import List, Dict, Any

@task
def process_data_batch(data: List[Dict[str, Any]]) -> pd.DataFrame:
    """Process a batch of data using TaskSDK"""
    df = pd.DataFrame(data)
    # Add processing logic
    df['processed_at'] = pd.Timestamp.now()
    df['processed'] = True
    return df

@sdk_task
def validate_data_quality(df: pd.DataFrame) -> Dict[str, Any]:
    """Validate data quality using TaskSDK"""
    quality_metrics = {
        'total_records': len(df),
        'null_values': df.isnull().sum().sum(),
        'duplicate_records': df.duplicated().sum(),
        'data_types': df.dtypes.to_dict(),
        'quality_score': 0.95 if df.isnull().sum().sum() == 0 else 0.8
    }
    return quality_metrics

@task
def generate_report(quality_metrics: Dict[str, Any]) -> str:
    """Generate quality report"""
    report = f"""
    Data Quality Report
    ==================
    Total Records: {quality_metrics['total_records']}
    Null Values: {quality_metrics['null_values']}
    Duplicate Records: {quality_metrics['duplicate_records']}
    Quality Score: {quality_metrics['quality_score']}
    """
    return report
```

### Using External Tasks

**d_07_airflow3_external_tasks.py**

```python
from datetime import datetime, timedelta
from airflow.decorators import dag, task
from tasks.airflow3_tasks import process_data_batch, validate_data_quality, generate_report

@dag(
    dag_id='d_07_airflow3_external_tasks',
    description='Airflow 3.0 External Tasks example',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'external-tasks'],
)
def external_tasks_dag():
    
    @task
    def generate_sample_data():
        """Generate sample data for processing"""
        return [
            {'id': 1, 'name': 'Alice', 'score': 85},
            {'id': 2, 'name': 'Bob', 'score': 92},
            {'id': 3, 'name': 'Charlie', 'score': 78},
            {'id': 4, 'name': 'Diana', 'score': 95},
        ]
    
    @task
    def print_report(report: str):
        """Print the generated report"""
        print("=== QUALITY REPORT ===")
        print(report)
        print("=== END REPORT ===")
    
    # Task flow using external tasks
    sample_data = generate_sample_data()
    processed_df = process_data_batch(sample_data)
    quality_metrics = validate_data_quality(processed_df)
    report = generate_report(quality_metrics)
    print_report(report)

# Instantiate the DAG
external_tasks_dag()
```

## Advanced Task Groups

**d_08_airflow3_advanced_taskgroups.py**

```python
from datetime import datetime, timedelta
from airflow.decorators import dag, task, task_group
from airflow.utils.task_group import TaskGroup

@dag(
    dag_id='d_08_airflow3_advanced_taskgroups',
    description='Airflow 3.0 Advanced Task Groups example',
    schedule="@daily",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=['airflow3', 'task-groups'],
)
def advanced_taskgroups_dag():
    
    @task
    def start_pipeline():
        """Start the data pipeline"""
        print("Starting advanced pipeline...")
        return "pipeline_started"
    
    @task_group
    def data_extraction_group():
        """Group for data extraction tasks"""
        
        @task
        def extract_customers():
            print("Extracting customer data...")
            return {"customers": 1000}
        
        @task
        def extract_orders():
            print("Extracting order data...")
            return {"orders": 5000}
        
        @task
        def extract_products():
            print("Extracting product data...")
            return {"products": 200}
        
        # Return all extractions
        return {
            "customers": extract_customers(),
            "orders": extract_orders(),
            "products": extract_products()
        }
    
    @task_group
    def data_transformation_group(extracted_data):
        """Group for data transformation tasks"""
        
        @task
        def transform_customers(data):
            print(f"Transforming {data['customers']} customers...")
            return {"transformed_customers": data['customers']}
        
        @task
        def transform_orders(data):
            print(f"Transforming {data['orders']} orders...")
            return {"transformed_orders": data['orders']}
        
        @task
        def transform_products(data):
            print(f"Transforming {data['products']} products...")
            return {"transformed_products": data['products']}
        
        # Transform all data
        return {
            "customers": transform_customers(extracted_data),
            "orders": transform_orders(extracted_data),
            "products": transform_products(extracted_data)
        }
    
    @task_group
    def data_loading_group(transformed_data):
        """Group for data loading tasks"""
        
        @task
        def load_to_warehouse(data):
            print("Loading data to warehouse...")
            print(f"Data summary: {data}")
            return "warehouse_loaded"
        
        @task
        def load_to_lake(data):
            print("Loading data to data lake...")
            print(f"Data summary: {data}")
            return "lake_loaded"
        
        @task
        def create_indexes(warehouse_status, lake_status):
            print("Creating indexes...")
            print(f"Warehouse: {warehouse_status}, Lake: {lake_status}")
            return "indexes_created"
        
        # Load data and create indexes
        warehouse_status = load_to_warehouse(transformed_data)
        lake_status = load_to_lake(transformed_data)
        create_indexes(warehouse_status, lake_status)
    
    @task
    def finish_pipeline():
        """Finish the data pipeline"""
        print("Pipeline completed successfully!")
        return "pipeline_completed"
    
    # Pipeline flow
    start_pipeline()
    extracted = data_extraction_group()
    transformed = data_transformation_group(extracted)
    data_loading_group(transformed)
    finish_pipeline()

# Instantiate the DAG
advanced_taskgroups_dag()
```

## Migration from Airflow 2.x

### Migration Checklist

1. **Prerequisites**
   - Ensure you're running Airflow 2.7 or later
   - Python 3.9–3.12 (upgrade if using Python 3.8)
   - Backup your database and configuration

2. **Database Migration**
   ```bash
   # Backup your database first!
   airflow db migrate
   ```

3. **Configuration Updates**
   - Update `airflow.cfg` for new configuration options
   - Review and update connection configurations
   - Update any custom plugins for compatibility

4. **DAG Updates**
   - Update import statements for moved operators
   - Review and update any deprecated parameters
   - Test DAGs in a development environment

5. **Provider Package Updates**
   ```bash
   pip install --upgrade apache-airflow-providers-*
   ```

### Common Migration Issues and Solutions

1. **Import Changes**
   ```python
   # Old (Airflow 2.x)
   from airflow.operators.bash_operator import BashOperator
   
   # New (Airflow 3.x)
   from airflow.operators.bash import BashOperator
   ```

2. **Configuration Changes**
   - Review `airflow.cfg` for deprecated options
   - Update any custom authentication configurations
   - Review logging configurations

3. **API Changes**
   - Update custom operators for new API patterns
   - Review XCom usage for any breaking changes
   - Update any custom hooks or sensors

## Best Practices for Airflow 3.0

1. **Use TaskSDK for New DAGs**
   - Leverage the new TaskSDK for better performance
   - Use decorators for cleaner DAG definitions

2. **Implement Asset-Driven Scheduling**
   - Use assets for event-driven workflows
   - Implement proper asset dependency management

3. **Leverage Enhanced UI Features**
   - Use the new dark mode and improved interface
   - Take advantage of enhanced DAG visualization

4. **Optimize for Performance**
   - Use task groups for better organization
   - Implement proper resource management
   - Use dynamic task mapping judiciously

5. **Monitor and Maintain**
   - Use enhanced logging and monitoring features
   - Implement proper error handling and notifications
   - Regular database maintenance and cleanup

## Conclusion

Airflow 3.0 represents a significant evolution in workflow orchestration, bringing modern architecture, enhanced features, and improved developer experience. The migration from Airflow 2.x requires careful planning, but the benefits of the new architecture, TaskSDK, and enhanced UI make it worthwhile.

Key takeaways:
- Service-oriented architecture enables better scalability
- TaskSDK provides language-agnostic task execution
- Asset-driven scheduling enables event-driven workflows
- Enhanced UI improves user experience
- Backward compatibility ensures smooth migration

Start with the basic examples and gradually adopt the advanced features as you become comfortable with the new architecture. The future of workflow orchestration is here with Airflow 3.0!