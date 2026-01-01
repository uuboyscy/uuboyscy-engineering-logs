import React, { useEffect } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Hi, I'm Allen 👋</h1>
        <p className="hero__subtitle">Expert in Data Engineering | Cloud Data Architecture | Data Governance</p>
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
      <div><br /></div>
      <div className="container">
        <h2>👨‍💻 About Me</h2>
        <ul>
          <li>A leading <b>Expert in Data Engineering</b> with years of hands-on experience designing scalable, high-performance data systems.</li>
          <li>Mastering cloud-native architectures on AWS and GCP to drive efficiency and innovation.</li>
          <li>Specializing in data modeling, pipeline automation, and efficient workflows optimizations.</li>
        </ul>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>⚙️ Tech Stack & Tools</h2>

        <p>
          My daily toolkit focuses on building reliable, scalable, and maintainable data systems.
        </p>

        <ul>
          <li>
            <b>Data Engineering:</b> dbt, Airflow, Prefect, Hadoop, Spark, Flink, Airbyte
          </li>
          <li>
            <b>Programming Languages:</b> Python, Java, SQL, Bash
          </li>
          <li>
            <b>Messaging & Streaming:</b> Kafka, RabbitMQ
          </li>
          <li>
            <b>DevOps & Cloud:</b> Docker, Kubernetes, Terraform, AWS, GCP
          </li>
          <li>
            <b>Databases & Analytics:</b> PostgreSQL, BigQuery
          </li>
          {/* <li>
            <b>Currently Exploring:</b> Apache Iceberg, Delta Lake, DataHub, OpenMetadata
          </li> */}
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
          {/* <img
            src="https://github-readme-streak-stats.herokuapp.com?user=uuboyscy&theme=dark&date_format=M%20j%5B%2C%20Y%5D"
            alt="GitHub Streak"
            className={styles.githubImage}
            loading="lazy"
            decoding="async"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=uuboyscy&theme=dark&layout=compact&langs_count=8"
            alt="Top Languages"
            className={styles.githubImage}
            loading="lazy"
            decoding="async"
          /> */}
          <img
            src="http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=uuboyscy&theme=zenburn"
            alt="GitHub Status"
            className={styles.githubImage}
            loading="lazy"
            decoding="async"
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
          <li>🤹 Data engineer by profession, street performer and juggler by passion.</li>
          <li>🚴‍♂️ Cycling around Taiwan on U-Bike. Slow, simple, unforgettable.</li>
          <li>💪 Exercise or die. The gym keeps me alive.</li>
          <li>🌏 Make data great again.</li>
        </ul>
      </div>
    </section>
  );
}

function CredlyBadge({ badgeId, width = 150, height = 270 }) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const scriptId = 'credly-embed-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
      return;
    }

    if (window.Credly && typeof window.Credly.init === 'function') {
      window.Credly.init();
    }
  }, [badgeId]);

  return (
    <div
      className={styles.credlyBadge}
      data-iframe-width={width}
      data-iframe-height={height}
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
    />
  );
}

function CertificationsSection() {
  return (
    <section className={clsx(styles.section, styles.certSection)}>
      <div className="container">
        <div className={styles.certGrid}>
          <div className={styles.certItem}>
            <CredlyBadge badgeId="9b35c86d-d0d7-4efb-97d8-44e5ca898d00" />
            <p><b>Google Cloud Certified - Professional Data Engineer</b></p>
          </div>
          <div className={styles.certItem}>
            <CredlyBadge badgeId="1154524b-934a-4316-9033-9628fd9ed6f0" />
            <p><b>Google Cloud Certified - Professional Cloud Architect</b></p>
          </div>
        </div>
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
          <li><b>Engineering Lead - European Data Company</b></li>
          <li>
            <b>Instructor & Curriculum Consultant - WiEDU TibaMe / III</b>
            <ul>
              <li>Designed and taught courses on data engineering, dbt, and Prefect for professionals transitioning into data careers.</li>
              <li>
                <a href="https://www.tibame.com/teacher/uuboyscy" target="_blank" rel="noopener noreferrer">
                  Visit my TibaMe page
                </a>
              </li>
            </ul>
          </li>
          <li><b>Data Engineering & Big Data Solutions</b></li>
          <ul>
            <li>Built and optimized distributed data systems across various industries.</li>
            <li>
              <b>Key Contributions:</b>
              <ul>
                <li>Designed data lakehouse and implemented data governance at ViewSonic.</li>
                <li>Designed data models and restructured data architecture at Hengstyle.</li>
                <li>Refactored and optimized distributed ETL systems, implementing Spark at Gamania.</li>
                <li>Developed big data solutions (Hadoop) for customers at LnData.</li>
                <li>Automated pipeline monitoring at Taipei Fubon Bank.</li>
              </ul>
            </li>
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
        <CertificationsSection />
      </main>
    </Layout>
  );
}
