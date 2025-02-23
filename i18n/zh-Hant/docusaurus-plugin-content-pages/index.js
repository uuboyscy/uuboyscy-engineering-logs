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
        <p className="hero__subtitle">數據工程專家 | 雲端創新者 | 數據架構師 | 講師</p>
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
          <li>擁有多年實戰經驗的 <b>數據工程專家</b>，專注於設計可擴展且高效能的數據系統。</li>
          <li>精通 AWS 和 GCP 雲端原生架構，提升效率與創新能力。</li>
          <li>專長於數據建模、數據管道自動化與工作流優化。</li>
          <li>我的目標：成為 <b>世界級的數據架構師</b>，重新定義企業如何利用數據。</li>
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
            <p>MySQL, Hadoop, Spark, Flink, Hive, Hbase, Redshift, dbt, Airbyte</p>
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
            <h3>DevOps & 基礎架構</h3>
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
          <li>🔗 建立超快的數據管道，快到老闆都覺得是魔法。</li>
          <li>🤹 數據工程師是我的職業，街頭藝人和雜耍是我的熱情。</li>
          <li>🚴‍♂️ 單車、音樂與策略性問題解決是我最喜歡的事。</li>
        </ul>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>📜 工作經驗</h2>
        <ul>
          <li>
            <b>講師 - WiEDU TibaMe / III</b> -&nbsp;
            <a href="https://www.tibame.com/teacher/uuboyscy" target="_blank" rel="noopener noreferrer">
              查看我的 TibaMe 講師頁面
            </a>
          </li>
          <li><b>數據工程師 - 美國公司</b></li>
          <li><b>數據工程 & 大數據解決方案</b>: 為各種行業設計並優化分散式數據系統。</li>
          <li><b>主要貢獻：</b></li>
          <ul>
            <li>在恆隆行 (Hengstyle) 設計數據模型並重構數據架構。</li>
            <li>在遊戲橘子 (Gamania) 使用 Spark 進行 ETL 系統重構與優化。</li>
            <li>在 LnData 開發大數據解決方案 (Hadoop)。</li>
            <li>在台北富邦銀行 (Taipei Fubon Bank) 自動化數據管道監控系統。</li>
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