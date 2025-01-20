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
        <h1 className="hero__title">嗨，我是 Allen Shi 👋</h1>
        <p className="hero__subtitle">資深數據工程師 | 雲端技術愛好者 | 資料架構師志向者 | 講師</p>
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
        <h2>👨‍💻 關於我</h2>
        <ul>
          <li>💼 我是一名<b>資深數據工程師</b>，設計並構建可擴展的數據管道。</li>
          <li>🌟 熱衷於解決複雜的數據挑戰並創建高效的工作流程。</li>
          <li>🚀 專注於 AWS 和 GCP 上的雲端原生數據解決方案。</li>
          <li>🎯 我的志向是成為一名<b>資料架構師</b>，推動數據驅動的決策。</li>
        </ul>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section>
      <div className="container">
        <h2>⚙️ 技術棧與工具</h2>
        <ul>
          <div className={styles.techStackItem}>
            <h3>數據工程</h3>
            <p>Hadoop, Spark, Flink, Hive, HBase, Prefect, Airflow, dbt, Airbyte</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>程式語言</h3>
            <p>Python, Java, Shell scripting, Flask, Spring Boot</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>資料庫</h3>
            <p>MySQL, PostgreSQL, MongoDB, Redis</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>DevOps 與雲端</h3>
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
        <h2>📈 GitHub 統計數據</h2>
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
        <h2>✨ 有趣的事實</h2>
        <ul>
          <li>🌟 在數據世界中無縫連接點，打造一條條數據管道。</li>
          <li>🤹 職業是數據工程師，熱愛街頭表演和雜耍。</li>
          <li>🎯 解決每一個數據難題就是創造另一件傑作。</li>
          <li>🚴‍♂️ 騎行、音樂和創意讓我的想法不斷湧現。</li>
        </ul>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>📜 經歷</h2>
        <ul>
          <li><b>講師 - WiEDU / 資策會</b></li>
          <li><b>數據工程師 - 美國公司</b></li>
          <li>數據工程師 - 恆逸數據</li>
          <li>數據工程師 - 遊戲橘子</li>
          <li>數據工程師 - LnData</li>
          <li>數據工程師 - 台北富邦銀行</li>
          <p><b>教育背景：</b>數學 - 國立中央大學</p>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="UUBOYSCY.DEV"
      description="資深數據工程師，擅長雲端原生解決方案、數據管道與可擴展架構。">
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