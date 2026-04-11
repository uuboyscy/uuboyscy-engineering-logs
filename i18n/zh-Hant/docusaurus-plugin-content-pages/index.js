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
        <h1 className="hero__title">嗨，我是 Allen 👋</h1>
        <p className="hero__subtitle">數據工程專家 | 雲端數據架構 | 數據治理</p>
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
    <section className={styles.section}>
      <div className="container">
        <h2>⚙️ 技術堆疊 & 工具</h2>

        <p>
          我的日常工具專注於打造可靠、可擴展且易維護的數據系統。
        </p>

        <ul>
          <li>
            <b>數據工程：</b> dbt, Airflow, Prefect, Hadoop, Spark, Flink, Airbyte
          </li>
          <li>
            <b>程式語言：</b> Python, Java, SQL, Bash
          </li>
          <li>
            <b>訊息與流式處理：</b> Kafka, RabbitMQ
          </li>
          <li>
            <b>DevOps & 雲端：</b> Docker, Kubernetes, Terraform, AWS, GCP
          </li>
          <li>
            <b>資料庫與分析：</b> PostgreSQL, BigQuery
          </li>
          {/* <li>
            <b>目前探索中：</b> Apache Iceberg, Delta Lake, DataHub, OpenMetadata
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
        <h2>📈 GitHub 統計數據</h2>
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
        <h2>✨ 有趣的事實</h2>
        <ul>
          <li>🤹 白天是數據工程師，舞台上是街頭藝人與雜耍玩家。</li>
          <li>🚴‍♂️ 騎著 U-Bike 環島。慢慢來，簡單卻難忘。</li>
          <li>💪 不運動就會死。健身房讓我活著。</li>
          <li>🌏 讓數據再次偉大。</li>
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
        <h2>📜 經歷</h2>
        <ul>
          <li><b>Engineering Lead - European Data Company</b></li>
          <li>
            <b>講師與課程顧問 - WiEDU TibaMe / III</b>
            <ul>
              <li>為轉職者設計並教授數據工程、dbt、Prefect 等課程。</li>
              <li>
                <a href="https://www.tibame.com/teacher/uuboyscy" target="_blank" rel="noopener noreferrer">
                  前往我的 TibaMe 講師頁面
                </a>
              </li>
            </ul>
          </li>
          <li><b>數據工程與大數據解決方案</b></li>
          <ul>
            <li>為各產業打造並優化分散式數據系統。</li>
            <li>
              <b>主要成就：</b>
              <ul>
                <li>在 ViewSonic 設計數據湖倉（Lakehouse）並導入數據治理。</li>
                <li>在 Hengstyle 設計數據模型並重塑數據架構。</li>
                <li>在 Gamania 重構並優化分散式 ETL 系統，導入 Spark。</li>
                <li>在 LnData 為客戶開發 Hadoop 大數據解決方案。</li>
                <li>在台北富邦銀行自動化數據管道監控。</li>
              </ul>
            </li>
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
      description="數據工程專家，專精於雲端原生解決方案、可擴展數據管道與現代化架構。">
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
