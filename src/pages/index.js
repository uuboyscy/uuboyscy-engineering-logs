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
        <p className="hero__subtitle">Experienced Data Engineer | Cloud Enthusiast | Data Architect Aspirant | Lecture</p>
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
          <li>💼 I’m an <b>Experienced Data Engineer</b>, designing and building scalable data pipelines.</li>
          <li>🌟 Passionate about solving complex data challenges and creating efficient workflows.</li>
          <li>🚀 I specialize in cloud-native data solutions on AWS and GCP.</li>
          <li>🎯 My aspiration: To become a <b>Data Architect</b>, enabling data-driven decision-making.</li>
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
          <li>🌟 Seamlessly connecting dots in data, one pipeline at a time.</li>
          <li>🤹 Data engineer by profession, street performer and juggler by passion.</li>
          <li>🎯 Every data puzzle solved is another masterpiece created.</li>
          <li>🚴‍♂️ Cycling, music, and creativity keep my ideas in motion.</li>
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
          <li><b>Lecture - WiEDU / III</b></li>
          <li><b>Data Engineer - U.S Company</b></li>
          <li>Data Engineer - Hengstyle</li>
          <li>Data Engineer - Gamania</li>
          <li>Data Engineer - LnData</li>
          <li>Data Engineer - Taipei Fubon Bank</li>
          <p><b>Education:</b> Mathematics - National Central University</p>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="UUBOYSCY.DEV"
      description="Experienced Data Engineer with expertise in cloud-native solutions, data pipelines, and scalable architectures.">
      <HomepageHeader />
      <main>
        <AboutMeSection />
        <TechStackSection />
        <GitHubStatsSection />
        <FunFactsSection />
        <ExperienceSection /> {/* Added Experience Section */}
      </main>
    </Layout>
  );
}