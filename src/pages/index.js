import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Hi, I'm Allen Shi 👋</h1>
        <p className="hero__subtitle">Expert in Data Engineering | Cloud Innovator | Data Architect | Lecturer</p>
        <p align="center">
          <a href="https://www.linkedin.com/in/chengyou-shi/">
            <img src="https://img.shields.io/badge/LinkedIn-uuboyscy-30302f?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
          </a>
          <a href="mailto:uuboyscy@uuboyscy.dev">
            <img src="https://img.shields.io/badge/Email-uuboyscy@uuboyscy.dev-30302f?style=for-the-badge&logo=gmail" alt="Email" />
          </a>
          <img src="https://komarev.com/ghpvc/?username=uuboyscy&style=for-the-badge" alt="Profile Views" />
        </p>
      </div>
    </header>
  );
}

function AboutMeSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>👨‍💻 About Me</h2>
        <ul>
          <li>A leading <b>Expert in Data Engineering</b> with years of hands-on experience designing scalable, high-performance data systems.</li>
          <li>Mastering cloud-native architectures on AWS and GCP to drive efficiency and innovation.</li>
          <li>Specializing in data modeling, pipeline automation, and efficient workflows optimizations.</li>
          <li>My goal: To become a <b>world-class Data Architect</b> and redefine how organizations leverage data.</li>
        </ul>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section>
      <div className="container">
        <h2>⚙️ Tech Stack & Tools</h2>
        <ul>
          <div className={styles.techStackItem}>
            <h3>Data Engineering</h3>
            <p>Hadoop, Spark, Flink, Hive, HBase, Prefect, Airflow, dbt, Airbyte</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>Languages</h3>
            <p>Python, Java, Shell scripting, Flask, Spring Boot</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>Databases</h3>
            <p>MySQL, PostgreSQL, MongoDB, Redis</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>DevOps & Cloud</h3>
            <p>Git, GitLab, Jenkins, Docker, Kubernetes, AWS, GCP</p>
          </div>
        </ul>
      </div>
    </section>
  );
}

function GitHubStatsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>📈 GitHub Stats</h2>
        <div className={styles.stats}>
          <img
            src="https://github-readme-streak-stats.herokuapp.com?user=uuboyscy&theme=dark&date_format=M%20j%5B%2C%20Y%5D"
            alt="GitHub Streak"
            className={styles.githubImage}
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=uuboyscy&theme=dark&layout=compact&langs_count=8"
            alt="Top Languages"
            className={styles.githubImage}
          />
        </div>
      </div>
    </section>
  );
}

function FunFactsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>✨ Fun Facts</h2>
        <ul>
          <li>🔗 Architecting data pipelines that power the future.</li>
          <li>🤹 Data engineer by profession, street performer and juggler by passion.</li>
          <li>🚴‍♂️ Cycling, music, and strategic problem-solving fuel my passion.</li>
        </ul>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>📜 Experience</h2>
        <ul>
          <li>
            <b>Lecturer - WiEDU TibaMe / III</b> -&nbsp;
            <a href="https://www.tibame.com/teacher/uuboyscy" target="_blank" rel="noopener noreferrer">
              Visit my TibaMe page
            </a>
          </li>
          <li><b>Data Engineer - U.S Company</b></li>
          <li><b>Data Engineering & Big Data Solutions</b>: Built and optimized distributed data systems across various industries.</li>
          <li><b>Key Contributions:</b></li>
          <ul>
            <li>Designed data models and restructured data architecture at Hengstyle.</li>
            <li>Refactored and optimized distributed ETL systems, implementing Spark at Gamania.</li>
            <li>Developed big data solutions (Hadoop) for customers at LnData.</li>
            <li>Automated pipeline monitoring at Taipei Fubon Bank.</li>
          </ul>
          <li><b>Education:</b> Mathematics - National Central University</li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="UUBOYSCY.DEV"
      description="Expert Data Engineer specializing in cloud-native solutions, scalable data pipelines, and modern architectures.">
      <HomepageHeader />
      <main>
        <AboutMeSection />
        <TechStackSection />
        <GitHubStatsSection />
        <FunFactsSection />
        <ExperienceSection />
      </main>
    </Layout>
  );
}
