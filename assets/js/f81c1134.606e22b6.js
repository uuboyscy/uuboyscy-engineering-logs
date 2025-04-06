"use strict";(self.webpackChunkuuboyscy_engineering_logs=self.webpackChunkuuboyscy_engineering_logs||[]).push([[8130],{77735:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"how-to-build-a-reliable-data-system","metadata":{"permalink":"/blog/how-to-build-a-reliable-data-system","source":"@site/blog/2025-03-07-how-to-build-a-reliable-data-system/index.md","title":"How to Build a Reliable Data System?","description":"When your team starts relying on data for daily operations and decision-making, trust becomes the foundation. But what does it mean to \u201ctrust the data\u201d? And how do you build a system where data is accurate, timely, and easy to understand?","date":"2025-03-07T00:00:00.000Z","tags":[{"inline":false,"label":"dbt","permalink":"/blog/tags/dbt","description":"dbt tag description"},{"inline":false,"label":"Prefect","permalink":"/blog/tags/prefect","description":"Prefect tag description"},{"inline":false,"label":"CI/CD","permalink":"/blog/tags/ci-cd","description":"CI/CD tag description"}],"readingTime":2.16,"hasTruncateMarker":true,"authors":[{"name":"uuboyscy","title":"Data Engineer | Founder of uuboyscy.dev","url":"https://uuboyscy.dev","page":{"permalink":"/blog/authors/uuboyscy"},"socials":{"github":"https://github.com/uuboyscy","linkedin":"https://www.linkedin.com/in/chengyou-shi/"},"imageURL":"https://github.com/uuboyscy.png","key":"uuboyscy"}],"frontMatter":{"slug":"how-to-build-a-reliable-data-system","title":"How to Build a Reliable Data System?","authors":["uuboyscy"],"tags":["dbt","prefect","ci-cd"]},"unlisted":false,"nextItem":{"title":"Modern Data Engineering Milestones: Key Technologies That Shaped the Industry","permalink":"/blog/modern-data-engineering-milestones-key-technologies-that-shaped-the-industry"}},"content":"When your team starts relying on data for daily operations and decision-making, **trust** becomes the foundation. But what does it mean to \u201ctrust the data\u201d? And how do you build a system where data is accurate, timely, and easy to understand?\\n\\nThis article summarizes the ideas I shared in a recent internal tech talk, designed for both engineers and non-engineers alike.\\n\\n\x3c!-- truncate --\x3e\\n\\n---\\n\\n## Common Data Pain Points\\n\\nMany data teams struggle with issues like:\\n\\n- **Inconsistent metrics across dashboards**  \\n  > \u201cWhy does Report A say we have 1203 users, but Report B says 1187?\u201d\\n\\n- **Delayed data availability**  \\n  > \u201cWe have a 9 AM daily meeting, but the dashboard only updates at 10 AM.\u201d\\n\\n- **Unclear definitions of metrics**  \\n  > \u201cDoes \'active user\' mean logged in, or just visited any page?\u201d\\n\\nThese issues don\u2019t just affect data engineers\u2014they frustrate stakeholders and erode confidence in data-driven decisions.\\n\\n---\\n\\n## What We Did to Fix It\\n\\nTo address these challenges, we introduced a few key strategies:\\n\\n### 1. Data Validation and Monitoring\\n\\nWe added **automated data quality checks** and anomaly detection to our ETL pipeline. These checks run before data is published to dashboards or reports, so we can catch issues early.\\n\\n- Monitor dependencies on orchestration (Generated by Prefect)\\n![data-validation-and-monitoring-1](./data-validation-and-monitoring-1.png)\\n- Check data lineage (Generated by dbt)\\n![data-validation-and-monitoring-2](./data-validation-and-monitoring-2.png)\\n\\n---\\n\\n### 2. Automation ETL and CI/CD\\n\\nWe treated our data pipeline code just like application code\u2014complete with:\\n\\n- Git version control  \\n- Code reviews  \\n- Automated testing before deployment\\n\\nThis helped us reduce manual scripts and improved the stability of our daily data jobs.\\n\\n- Monitor scheduling on Orchestration (Screenshot of Prefect)\\n![automation-etl-and-cicd-1](./automation-etl-and-cicd-1.png)\\n- CI/CD (GitHub Action)\\n![automation-etl-and-cicd-2](./automation-etl-and-cicd-2.png)\\n\\n---\\n\\n### 3. Standardized Metric Definitions\\n\\nWe unified naming conventions and centralized our metric logic in one place. This way, PM and analysts can talk about data more clearly and easily.\\n\\n- Search valid tables (dbt document)\\n![standardize-data-definition-1](./standardize-data-definition-1.png)\\n- Table column definition (dbt document)\\n![standardize-data-definition-2](./standardize-data-definition-2.png)\\n\\n---\\n\\n## Empowering Non-Engineers\\n\\nImproving data quality isn\u2019t just an engineering problem. Here\'s how **non-technical stakeholders** can help:\\n\\n- Understand and apply **basic reasonable checks** (e.g., does the number look unusually high/low?)\\n- Provide **detailed bug reports**, like:\\n  - Report name\\n  - Table name\\n  - Filter conditions\\n  - Time range affected\\n\\n---\\n\\n## Final Thoughts\\n\\nData pipelines are not just technical infrastructure, but **products** that require testing, communication, and ownership. The goal isn\u2019t perfection, but progress, one improvement at a time, built on top of **clear processes and collaborative culture**.\\n\\n---\\n\\n*Thanks for reading! If you found this article helpful, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/chengyou-shi/).*"},{"id":"modern-data-engineering-milestones-key-technologies-that-shaped-the-industry","metadata":{"permalink":"/blog/modern-data-engineering-milestones-key-technologies-that-shaped-the-industry","source":"@site/blog/2024-12-19-modern-data-engineering-milestones-key-technologies-that-shaped-the-industry/index.md","title":"Modern Data Engineering Milestones: Key Technologies That Shaped the Industry","description":"In recent years, the field of data engineering has undergone significant transformations. Tools like dbt (data build tool) have emerged as vital components of modern data engineering workflows. These technologies not only optimize how data teams operate but also enable collaboration across diverse roles, including data engineers, analysts, project managers, and stakeholders. This article, based on my experience and a recent talk, explores how data engineering has evolved, why dbt has gained traction, and how it addresses pain points in data workflows.","date":"2024-12-19T00:00:00.000Z","tags":[{"inline":false,"label":"dbt","permalink":"/blog/tags/dbt","description":"dbt tag description"},{"inline":false,"label":"GCP","permalink":"/blog/tags/gcp","description":"GCP tag description"},{"inline":false,"label":"AWS","permalink":"/blog/tags/aws","description":"AWS tag description"},{"inline":false,"label":"Airflow","permalink":"/blog/tags/airflow","description":"Airflow tag description"},{"inline":false,"label":"Prefect","permalink":"/blog/tags/prefect","description":"Prefect tag description"}],"readingTime":4.985,"hasTruncateMarker":true,"authors":[{"name":"uuboyscy","title":"Data Engineer | Founder of uuboyscy.dev","url":"https://uuboyscy.dev","page":{"permalink":"/blog/authors/uuboyscy"},"socials":{"github":"https://github.com/uuboyscy","linkedin":"https://www.linkedin.com/in/chengyou-shi/"},"imageURL":"https://github.com/uuboyscy.png","key":"uuboyscy"}],"frontMatter":{"slug":"modern-data-engineering-milestones-key-technologies-that-shaped-the-industry","title":"Modern Data Engineering Milestones: Key Technologies That Shaped the Industry","authors":["uuboyscy"],"tags":["dbt","gcp","aws","airflow","prefect"]},"unlisted":false,"prevItem":{"title":"How to Build a Reliable Data System?","permalink":"/blog/how-to-build-a-reliable-data-system"},"nextItem":{"title":"From Airflow to Prefect: Choosing the Right Orchestration Tool for Your Workflow","permalink":"/blog/from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow"}},"content":"In recent years, the field of data engineering has undergone significant transformations. Tools like **dbt (data build tool)** have emerged as vital components of modern data engineering workflows. These technologies not only optimize how data teams operate but also enable collaboration across diverse roles, including data engineers, analysts, project managers, and stakeholders. This article, based on my experience and a recent talk, explores how data engineering has evolved, why dbt has gained traction, and how it addresses pain points in data workflows.\\n\\n\x3c!-- truncate --\x3e\\n\\n---\\n\\n## The Rise of Modern Data Engineering\\n\\nFive years ago, data engineering was still a niche role, often disconnected from general software development practices. At that time:\\n\\n- **Data engineering tasks** were largely centered around managing and processing massive datasets, often from sources like APIs, product databases, or logs.\\n- Distributed storage systems like **Hadoop** were essential for handling these vast data volumes.\\n- Concepts such as unit testing for SQL queries, linting, or conventions were rarely applied in data workflows.\\n\\nHowever, as data engineering matured, the need for more systematic, scalable, and collaborative approaches became apparent. This paved the way for tools like **dbt**, which integrates software engineering principles into data workflows.\\n\\n---\\n\\n## What is dbt, and Why is it Revolutionary?\\n\\n### Enabling Cross-Role Collaboration\\n\\ndbt\u2019s primary purpose is to bridge the gap between data professionals and other stakeholders by providing a unified interface for understanding and developing data workflows. It enables users to:\\n\\n- Trace the lineage of data tables and reports.\\n- Identify dependencies between tables, enabling quick troubleshooting.\\n- Generate comprehensive documentation that\u2019s accessible to technical and non-technical team members.\\n\\nFor example, stakeholders can easily view the source tables for a report, understand its transformations, and identify the data\u2019s origin. This level of transparency fosters collaboration and efficiency across teams.\\n\\n### Integrating Testing and Documentation\\n\\ndbt ensures that data workflows are robust by:\\n\\n1. **Integrating Testing**: Users can define tests for individual fields, such as uniqueness or non-null constraints, directly within dbt configurations. These tests are executed automatically, providing immediate feedback on data quality.\\n2. **Generating Documentation**: dbt auto-generates documentation based on the SQL logic and configurations provided. This documentation includes:\\n   - Table definitions.\\n   - Column descriptions.\\n   - Test details.\\n\\nThe resulting documentation is displayed in an intuitive, web-based interface, making it accessible to all stakeholders.\\n\\n---\\n\\n## Historical Context: Data Engineering Evolution\\n![data-engineering-milestones](./data-engineering-milestones.png)\\n\\n### Traditional Practices\\n\\nIn the early stages of data engineering, the focus was primarily on handling raw data sources. These sources often required processing in distributed systems like Hadoop, where:\\n\\n- Data engineers managed pipelines to integrate API, database, and log data into centralized storage.\\n- Practices like version control or modular development were less common.\\n\\n### Transition to Modern Practices\\n\\nOver the past five years, the field has seen significant advancements:\\n\\n- **Adoption of Software Engineering Principles**: Modern data engineering incorporates practices like unit testing, code linting, and standardized conventions for SQL development.\\n- **Shift Towards Lakehouse Architectures**: The industry has moved away from traditional data warehouses to lakehouse models, which decouple data storage and processing for better scalability and flexibility.\\n\\n---\\n\\n## dbt in Practice: Features and Workflow\\n\\n### Data Lineage and Visualization\\n\\n![dbt-lineage-graph](./dbt-lineage-graph.png)\\n[dbt-sample-repository](https://uuboyscy.github.io/dbt-demo/#!/overview)\\n\\ndbt excels at visualizing data lineage. Consider a use case where a data team wants to understand how a **user_dashboard** table is constructed:\\n\\n1. **Source Tables**: dbt highlights the raw data sources (e.g., logs, databases).\\n2. **Transformations**: Intermediate tables and their transformation logic are clearly displayed.\\n3. **Final Outputs**: Dashboards and reports are mapped back to their underlying tables.\\n\\nThis visibility ensures that everyone, from data engineers to project managers, can trace the origins and transformations of key datasets.\\n\\n### Modularity and Scalability\\n\\ndbt promotes modular development through its **modeling layer**:\\n\\n- Raw data is first transformed into an **Operational Data Store (ODS)**.\\n- Intermediate tables (e.g., dimensions) are created to consolidate and enrich data.\\n- Finally, specific tables are built for different business units, stored in **Mart schemas**.\\n\\nThis layered approach makes it easier to scale workflows while maintaining clarity.\\n\\n### Execution and Testing\\n\\ndbt supports command-line operations to build and test models. For example:\\n\\n- `dbt run` builds tables based on defined configurations.\\n- `dbt test` executes tests for individual or multiple tables.\\n\\nA simple table configuration:\\n```yml\\nmodels:\\n  - name: table_name\\n    description: \\"Something something something...\\"\\n    columns:\\n      - name: user_id\\n        description: \\"User identifier\\"\\n        data_tests:\\n          - not_null\\n          - unique\\n          - relationships:\\n              to: ref(\'some_ref_table\')\\n              field: user_id\\n```\\n\\nThese operations can target specific tables or pipelines, optimizing performance and resource usage.\\n\\n---\\n\\n## Industry Adoption and Use Cases\\n\\ndbt has been widely adopted by companies across industries. Some notable examples include:\\n\\n- **Airbnb**: With over 50,000 metrics, Airbnb uses dbt alongside AI to manage their complex data ecosystem.\\n- **Dcard**: Dcard mandates that its analysts use dbt for SQL development, highlighting its versatility beyond traditional engineering roles.\\n\\nOther adopters like Gymnasium Education and Facebook have also reported significant gains in productivity and collaboration through dbt.\\n\\n---\\n\\n## Challenges and Future Directions\\n\\nWhile dbt has transformed data engineering, there are areas for improvement:\\n\\n- **Resource Management**: Running `dbt run` or `dbt test` on large projects can be resource-intensive. Future enhancements might focus on better optimization and incremental runs.\\n\\nLooking ahead, companies like Airbnb are exploring AI-driven tools to complement dbt, such as automatically generating SQL queries or identifying metrics based on natural language input.\\n\\n---\\n\\n## Conclusion\\n\\nThe rise of dbt marks a pivotal moment in data engineering, emphasizing collaboration, transparency, and systematic workflows. By integrating software engineering principles into data practices, dbt enables data teams to deliver high-quality datasets and insights at scale. As the industry continues to evolve, tools like dbt will play an increasingly central role in shaping the future of data engineering.\\n\\nFor teams embarking on their dbt journey, understanding its history and features is the first step toward unlocking its potential. Whether you\'re a data engineer, analyst, or stakeholder, dbt empowers you to navigate and contribute to modern data ecosystems with confidence."},{"id":"from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow","metadata":{"permalink":"/blog/from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow","source":"@site/blog/2023-08-23-from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow/index.md","title":"From Airflow to Prefect: Choosing the Right Orchestration Tool for Your Workflow","description":"---","date":"2023-08-23T00:00:00.000Z","tags":[{"inline":false,"label":"GCP","permalink":"/blog/tags/gcp","description":"GCP tag description"},{"inline":false,"label":"Airflow","permalink":"/blog/tags/airflow","description":"Airflow tag description"},{"inline":false,"label":"Prefect","permalink":"/blog/tags/prefect","description":"Prefect tag description"}],"readingTime":3.355,"hasTruncateMarker":true,"authors":[{"name":"uuboyscy","title":"Data Engineer | Founder of uuboyscy.dev","url":"https://uuboyscy.dev","page":{"permalink":"/blog/authors/uuboyscy"},"socials":{"github":"https://github.com/uuboyscy","linkedin":"https://www.linkedin.com/in/chengyou-shi/"},"imageURL":"https://github.com/uuboyscy.png","key":"uuboyscy"}],"frontMatter":{"slug":"from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow","title":"From Airflow to Prefect: Choosing the Right Orchestration Tool for Your Workflow","authors":["uuboyscy"],"tags":["gcp","airflow","prefect"]},"unlisted":false,"prevItem":{"title":"Modern Data Engineering Milestones: Key Technologies That Shaped the Industry","permalink":"/blog/modern-data-engineering-milestones-key-technologies-that-shaped-the-industry"},"nextItem":{"title":"From MapReduce to Spark: The Evolution of Big Data Processing","permalink":"/blog/from-mapreduce-to-spark-the-evolution-of-big-data-processing"}},"content":"---\\n\\n## 1. Introduction\\nIn my role at a traditional company undergoing digital transformation, I faced a common challenge: managing multiple pipelines across Windows and Linux. These pipelines, essential for generating daily dashboard reports, were difficult to monitor, debug, and scale. \\n\\n\x3c!-- truncate --\x3e\\n\\nWhile Airflow is a popular choice for orchestration, it didn\u2019t fit well for our diverse team of engineers and analysts. Prefect, on the other hand, addressed our specific needs with its flexibility and user-friendly features.\\n\\n---\\n\\n## 2. The Problem\\nOur challenges included:\\n1. **Manual Execution**: Pipelines on Windows `ran manually`, while Linux relied on `crontab`.  \\n2. **Monitoring Issues**: No centralized way to monitor or trace errors.  \\n3. **Complexity for Analysts**: Analysts, skilled in SQL but less in Python, found it hard to contribute.  \\n4. **Scalability**: Adding new workers was cumbersome.\\n\\n---\\n\\n## 3. Why Airflow Wasn\u2019t Ideal\\n- **Steep Learning Curve**: Difficult for non-engineers to understand and use.  \\n- **Windows Support**: Running Airflow on Windows required workarounds.  \\n- **Scaling Issues**: Adding workers or scaling pipelines needed manual effort.\\n\\n---\\n\\n## 4. Why Prefect Was the Solution\\nPrefect solved our problems by offering:\\n- **User-Friendly Syntax**: Pythonic workflows easy for both engineers and analysts.  \\n- **Cross-Platform Support**: Worked seamlessly on both Windows and Linux.  \\n- **Real-Time Monitoring**: Built-in logging and error handling for quick debugging.  \\n- **Easy Scaling**: Agents simplified adding more workers as needed.\\n\\n---\\n\\n## 5. Steps to Transition\\n1. **Analyze Existing Pipelines**: Identify workflows and dependencies.  \\n2. **Set Up Prefect**: Install and configure Prefect for Windows and Linux.  \\n3. **Onboard Analysts**: Train analysts to contribute using SQL-friendly workflows.  \\n4. **Monitor and Debug**: Use Prefect\u2019s UI to track pipeline execution.  \\n5. **Scale When Needed**: Deploy agents for additional capacity.\\n\\n---\\n\\n## 6. Prefect vs. Airflow\\n| Feature              | Airflow                     | Prefect                     |\\n|----------------------|----------------------------|----------------------------|\\n| **Ease of Use**      | Complex for non-engineers  | Intuitive and Pythonic     |\\n| **Windows Support**  | Limited                   | Excellent                  |\\n| **Monitoring**       | Manual log tracing        | Built-in tools             |\\n| **Scalability**      | Requires expertise        | Simple agent setup         |\\n\\n---\\n\\n## 7. Airflow Code vs. Prefect Code: A Comparison\\nBelow is a side-by-side comparison of the same workflow implemented in `Airflow` and `Prefect`.\\n- Airflow code:\\n    ```Python\\n    from datetime import datetime, timedelta\\n\\n    from airflow import DAG\\n    from airflow.operators.bash import BashOperator\\n    from airflow.operators.python import PythonOperator\\n\\n\\n    def task1():\\n        print(\\"Running Task 1\\")\\n\\n    def task2():\\n        print(\\"Running Task 2\\")\\n\\n    # Default arguments for the DAG\\n    default_args = {\\n        \'owner\': \'airflow\',\\n        \'depends_on_past\': False,\\n        \'email\': [\'your_email@example.com\'],\\n        \'email_on_failure\': False,\\n        \'email_on_retry\': False,\\n        \'retries\': 1,\\n        \'retry_delay\': timedelta(minutes=5),\\n    }\\n\\n    # Define the DAG\\n    dag = DAG(\\n        \'d_02_example_dag_dependency\',\\n        default_args=default_args,\\n        description=\'An example DAG with Python operators\',\\n        schedule=\\"* * * * *\\",\\n        start_date=datetime(2023, 1, 1),\\n        catchup=False\\n    )\\n\\n    # Define the tasks\\n    task1_obj = PythonOperator(\\n        task_id=\'task1\',\\n        python_callable=task1,\\n        dag=dag,\\n    )\\n\\n    task2_obj = PythonOperator(\\n        task_id=\'task2\',\\n        python_callable=task2,\\n        dag=dag,\\n    )\\n\\n    task3_obj = BashOperator(\\n        task_id=\'task3\',\\n        bash_command=\'echo \\"Hello from Task 3!\\"\',\\n        dag=dag,\\n    )\\n\\n    # Task dependencies\\n    task1_obj >> task2_obj\\n    task1_obj >> task3_obj\\n    ```\\n- Prefect code:\\n    ```Python\\n    from prefect import flow, task\\n    from prefect.tasks.shell import ShellOperation\\n\\n\\n    @task\\n    def task1():\\n        print(\\"Running Task 1\\")\\n\\n\\n    @task\\n    def task2():\\n        print(\\"Running Task 2\\")\\n\\n\\n    @flow(name=\\"d_02_example_dag_dependency\\")\\n    def example_flow():\\n        # Define the tasks\\n        t1 = task1()\\n        t2 = task2()\\n        t3 = ShellOperation(commands=[\\"echo \'Hello from Task 3!\'\\"]).run()\\n\\n        # Set task dependencies\\n        t2.wait_for(t1)\\n        t3.wait_for(t1)\\n\\n\\n    if __name__ == \\"__main__\\":\\n        example_flow()\\n    ```\\n### Key Differences\\n\\n| Aspect                      | Airflow                                    | Prefect                                   |\\n|-----------------------------|-------------------------------------------|------------------------------------------|\\n| **Setup**                   | Requires defining a DAG explicitly.       | Uses Python functions and decorators.    |\\n| **Task Definition**         | Separate task objects (Python/Bash).      | Python `@task` decorator for simplicity. |\\n| **Dependency Management**   | Explicit with `>>` and `<<` operators.    | Handled with `.wait_for()` or function calls. |\\n| **Execution**               | Deployed to Airflow Scheduler.            | Runs as a Python script or with Prefect Cloud. |\\n| **Cross-Platform Support**  | Limited for Windows.                      | Cross-platform (Windows/Linux).          |\\n\\n\\n---\\n\\n## 8. Conclusion\\nPrefect\u2019s simplicity, flexibility, and user-friendly design make it ideal for diverse teams and hybrid environments. By transitioning to Prefect, we unified our workflows, empowered analysts, and improved scalability\u2014proving that the right tool can transform the way we work.\\n\\n---"},{"id":"from-mapreduce-to-spark-the-evolution-of-big-data-processing","metadata":{"permalink":"/blog/from-mapreduce-to-spark-the-evolution-of-big-data-processing","source":"@site/blog/2022-08-23-from-mapreduce-to-spark-the-evolution-of-big-data-processing/index.md","title":"From MapReduce to Spark: The Evolution of Big Data Processing","description":"1. Introduction: Big Data Challenges","date":"2022-08-23T00:00:00.000Z","tags":[{"inline":false,"label":"Hadoop","permalink":"/blog/tags/hadoop","description":"Hadoop tag description"},{"inline":false,"label":"Spark","permalink":"/blog/tags/spark","description":"Spark tag description"}],"readingTime":3.365,"hasTruncateMarker":true,"authors":[{"name":"uuboyscy","title":"Data Engineer | Founder of uuboyscy.dev","url":"https://uuboyscy.dev","page":{"permalink":"/blog/authors/uuboyscy"},"socials":{"github":"https://github.com/uuboyscy","linkedin":"https://www.linkedin.com/in/chengyou-shi/"},"imageURL":"https://github.com/uuboyscy.png","key":"uuboyscy"}],"frontMatter":{"slug":"from-mapreduce-to-spark-the-evolution-of-big-data-processing","title":"From MapReduce to Spark: The Evolution of Big Data Processing","authors":["uuboyscy"],"tags":["hadoop","spark"]},"unlisted":false,"prevItem":{"title":"From Airflow to Prefect: Choosing the Right Orchestration Tool for Your Workflow","permalink":"/blog/from-airflow-to-prefect-choosing-the-right-orchestration-tool-for-your-workflow"},"nextItem":{"title":"Welcome","permalink":"/blog/welcome"}},"content":"## 1. Introduction: Big Data Challenges\\n\\nBig data means working with very large amounts of information. In one of my jobs, I had to handle 500TB of data and run more than 10,000 SQL queries every day. The old system we used was slow and had many problems, like some tasks taking over 24 hours to finish. In this blog, I will share how I solved these problems by using Spark and making the system faster and better.\\n\\n\x3c!-- truncate --\x3e\\n\\n---\\n\\n## 2. What is Hadoop Hive and MapReduce?\\n\\nHadoop Hive is a tool that helps process big data using SQL queries. It works with a system called MapReduce, which was great when it was created but has many limits now:\\n\\n- **Processes One Query at a Time**: It could not run many queries at once.\\n- **Very Slow**: Large or complicated tasks took a long time.\\n- **Not Efficient**: It used too many resources for simple tasks.\\n\\nIn my work, these issues caused delays, and some tasks took more than one day to finish.\\n\\n---\\n\\n## 3. Problems with the Old System\\n\\nThe old system was not good enough for our needs:\\n\\n- **One Query per Task**: Each SQL query was treated as a separate job, wasting resources.\\n- **Huge Data Size**: Processing 100TB of data made it even harder.\\n- **Long Task Times**: Some pipelines (multiple tasks) ran for over 24 hours.\\n\\nThese problems showed we needed a better solution.\\n\\n---\\n\\n## 4. Switching to Spark\\n\\nSpark is much faster and better than MapReduce for big data processing. It helped solve our problems because:\\n\\n- **Faster Processing**: Spark processes data in memory, so tasks are much quicker.\\n- **Runs Tasks at the Same Time**: Spark can handle many tasks at once, saving time.\\n- **Easy to Use**: Spark has a SQL tool that works like Hive, making the switch simple.\\n\\nAfter replacing MapReduce with Spark, the system became much faster and could handle more work.\\n\\n---\\n\\n## 5. How I Improved the System\\n\\nSwitching to Spark was just the first step. \\n![mapreduce-to-spark](./mapreduce-to-spark.png)\\n\\nAfter that, I focused on restructuring the system to make it even more efficient.Here\u2019s what I did:\\n\\n1. **Refactored the Program Architecture**: I modified the structure so that a single task could execute multiple SQL queries at the same time. This reduced the overhead of creating separate tasks for each query, saving both time and resources.\\n![single-product-process](./single-product-process.png)\\n\\n2. **Developed an API for SQL Execution**: Since other departments, such as analysts, wanted to use Spark to run SQL but didn\u2019t have programming skills, I created an API called **jobQueue API**. This API allowed them to execute their SQL queries easily:\\n   - They only needed to know how to make an API request.\\n   - They could specify the SQL queries they wanted to execute in the request.\\n   - The API handled the processing on Spark, abstracting away all the complexity.\\n  \\n    ![api-execution-monitor](./api-execution-monitor.png)\\n\\n1. **Run Tasks Together**: By leveraging Spark\u2019s ability to execute tasks in parallel, I optimized query execution times further, ensuring the system could handle a large number of queries more efficiently.\\n![multiple-product-process](./multiple-product-process.png)\\n\\n2. **Monitor Progress**: Spark\u2019s user interface was helpful for tracking task progress and debugging. I used this to ensure everything was running smoothly and to quickly fix any issues.\\n\\nWith these improvements, the system could run 10,000 SQL queries seamlessly within 3 hours. The addition of the **jobQueue API** also empowered other teams to use Spark without needing deep technical knowledge, making the system more accessible and collaborative.\\n![time-spend-chart](./time-spend-chart.png)\\n\\n---\\n\\n## 6. What I Learned\\n\\nHere are some important lessons from this project:\\n\\n- **Small Changes Can Help**: Switching to Spark and combining queries made a huge difference in performance and efficiency.\\n- **Use the Right Tool**: Spark\'s features like in-memory processing and parallel execution were perfect for our workload.\\n- **Be Efficient**: Designing the system to execute multiple SQL queries in a single task saved both time and resources.\\n\\nThese lessons highlight the importance of choosing the right approach and tools when working with big data."},{"id":"welcome","metadata":{"permalink":"/blog/welcome","source":"@site/blog/1992-12-11-welcom.md","title":"Welcome","description":"Hey there! Welcome to my very first blog post! \ud83c\udf89","date":"1992-12-11T00:00:00.000Z","tags":[{"inline":false,"label":"Hello","permalink":"/blog/tags/hello","description":"Hello tag description"},{"inline":false,"label":"Docusaurus","permalink":"/blog/tags/docusaurus","description":"Docusaurus tag description"}],"readingTime":1.06,"hasTruncateMarker":true,"authors":[{"name":"uuboyscy","title":"Data Engineer | Founder of uuboyscy.dev","url":"https://uuboyscy.dev","page":{"permalink":"/blog/authors/uuboyscy"},"socials":{"github":"https://github.com/uuboyscy","linkedin":"https://www.linkedin.com/in/chengyou-shi/"},"imageURL":"https://github.com/uuboyscy.png","key":"uuboyscy"}],"frontMatter":{"slug":"welcome","title":"Welcome","authors":["uuboyscy"],"tags":["hello","docusaurus"]},"unlisted":false,"prevItem":{"title":"From MapReduce to Spark: The Evolution of Big Data Processing","permalink":"/blog/from-mapreduce-to-spark-the-evolution-of-big-data-processing"}},"content":"Hey there! Welcome to my very first blog post! \ud83c\udf89\\n\\nI\'m super excited to start sharing my thoughts and experiences with you all through this platform. As someone who\'s passionate about technology and programming, I figured it\'s about time I carved out my own little corner of the internet.\\n\\n\x3c!-- truncate --\x3e\\n\\nYou know what\'s funny? I spent way too much time deciding what to write for my first post. Should it be technical? Personal? A mix of both? In the end, I decided to just be myself and write whatever comes to mind.\\n\\nI\'ve been working in tech for a while now, and there\'s always something new to learn. Whether it\'s a new programming language, a cool framework, or an interesting design pattern, the learning never stops. And that\'s exactly what I love about this field!\\n\\nHere\'s a random list of things I\'m currently excited about:\\n- Exploring new technologies\\n- Sharing knowledge with the community\\n- Learning from others\' experiences\\n\\nI plan to write about:\\n1. Technical tutorials\\n2. Programming tips and tricks\\n3. Personal experiences in tech\\n4. Random thoughts about software development\\n\\nStay tuned for more posts! Feel free to reach out if you want to discuss anything tech-related (or just want to say hi)!\\n\\nHappy coding! \ud83d\udcbb"}]}}')}}]);