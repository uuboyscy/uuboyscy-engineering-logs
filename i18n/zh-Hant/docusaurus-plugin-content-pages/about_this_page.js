import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function AboutHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          關於 UUBOYSCY Engineering Logs
        </Heading>
        <p className="hero__subtitle">
          分享數據工程與相關開發工具的技術文件與工程筆記。
        </p>
        <div className={styles.buttons} style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            瀏覽技術文件
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            閱讀部落格
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function AboutThisPage() {
  return (
    <Layout
      title="關於本站"
      description="認識 UUBOYSCY Engineering Logs（docs.uuboyscy.dev）：由 UUBOY（uuboyscy / 施丞優）維護的數據工程技術文件與部落格網站。">
      <AboutHeader />
      <main>
        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">本站簡介</Heading>
            <p>
              <b>UUBOYSCY Engineering Logs</b> 是由 <b>UUBOY（uuboyscy / 施丞優 / Allen Shi）</b> 維護的個人技術文件與部落格網站，
              整理數據工程與軟體開發相關的實作教學、參考指南與工程筆記。
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">站內內容</Heading>
            <ul>
              <li>
                <b>技術文件：</b> <Link to="/docs/intro">Docs</Link> 區收錄數據工程與相關開發主題的實作教學與指南。
              </li>
              <li>
                <b>部落格：</b> <Link to="/blog">Blog</Link> 區分享工程實務文章與經驗整理。
              </li>
              <li>
                <b>關於我：</b> 可在<Link to="/">首頁</Link>查看作者簡介、經歷與認證。
              </li>
            </ul>
          </div>
        </section>

        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">語系與網站來源</Heading>
            <p>
              本站支援 <b>英文（English）</b> 與 <b>繁體中文（中文）</b>，可透過上方導覽列的語系選單切換。
              部分頁面、部落格文章與文件提供繁體中文版本，其餘未翻譯的文件會顯示英文原文。
            </p>
            <p>
              本站使用 Docusaurus 建置。你可以前往{' '}
              <a
                href="https://github.com/uuboyscy/uuboyscy-engineering-logs"
                target="_blank"
                rel="noopener noreferrer">
                GitHub 儲存庫
              </a>{' '}
              檢視原始碼，或瀏覽{' '}
              <a
                href="https://www.tibame.com/teacher/uuboyscy"
                target="_blank"
                rel="noopener noreferrer">
                TibaMe 講師頁面
              </a>
              。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
