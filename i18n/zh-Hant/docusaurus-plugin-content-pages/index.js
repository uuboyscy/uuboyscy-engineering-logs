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
        <h1 className="hero__title">嗨，我是 Allen 👋</h1>
        <p className="hero__subtitle">數據工程專家 | 數據治理 | 雲端數據架構 | 講師</p>
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
          <li>擁有多年實戰經驗的領先 <b>數據工程專家</b>，專注於設計可擴展、高效能的數據系統。</li>
          <li>精通 AWS 與 GCP 雲端原生架構，推動效率與創新。</li>
          <li>專精於數據建模、管道自動化與工作流程優化。</li>
        </ul>
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section>
      <div className="container">
        <h2>⚙️ 技術 & 工具</h2>
        <ul>
          <div className={styles.techStackItem}>
            <h3>數據工程</h3>
            <p>dbt, Airflow, Prefect, Hadoop, Spark, Flink, Airbyte</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>程式設計</h3>
            <p>Python, Java, SQL, Bash</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>消息隊列 & 流處理</h3>
            <p>RabbitMQ, Kafka</p>
          </div>
          <div className={styles.techStackItem}>
            <h3>DevOps & 基礎設施</h3>
            <p>Docker, K8S, Terraform, AWS, GCP</p>
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
          <li>🤹 白天是數據工程師，舞台上是街頭藝人與雜耍玩家。</li>
          <li>🚴‍♂️ 單車、音樂與策略性解題驅動我的熱情。</li>
          <li>🌏 讓數據再次偉大。</li>
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
          <li>
            <b>講師與課程顧問 - WiEDU TibaMe / III</b> -&nbsp;
            <a href="https://www.tibame.com/teacher/uuboyscy" target="_blank" rel="noopener noreferrer">
              前往我的 TibaMe 講師頁面
            </a>
          </li>
          <li><b>數據工程師 - 美商公司</b></li>
          <li><b>數據工程與大數據解決方案</b>：為各產業打造並優化分散式數據系統。</li>
          <li><b>主要成就：</b></li>
          <ul>
            <li>在恆隆行（Hengstyle）設計數據模型並重塑數據架構。</li>
            <li>在遊戲橘子（Gamania）導入 Spark 重構並優化分散式 ETL 系統。</li>
            <li>在麟數據（LnData）為客戶開發 Hadoop 大數據解決方案。</li>
            <li>在台北富邦銀行自動化數據管道監控。</li>
          </ul>
          <li><b>學歷：</b> 數學系 - 國立中央大學</li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="UUBOYSCY.DEV"
      description="專業數據工程師，專精於雲端解決方案、可擴展數據管道與現代數據架構。">
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
