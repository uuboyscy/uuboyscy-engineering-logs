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
          About UUBOYSCY Engineering Logs
        </Heading>
        <p className="hero__subtitle">
          Technical documentation and engineering notes on data engineering and related tools.
        </p>
        <div className={styles.buttons} style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Explore Documentation
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            Read the Blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function AboutThisPage() {
  return (
    <Layout
      title="About This Page"
      description="About UUBOYSCY Engineering Logs (docs.uuboyscy.dev): a bilingual data engineering documentation site and technical blog maintained by UUBOY (uuboyscy / Allen Shi).">
      <AboutHeader />
      <main>
        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">What This Site Is</Heading>
            <p>
              <b>UUBOYSCY Engineering Logs</b> is a personal documentation site and technical blog maintained by{' '}
              <b>UUBOY (uuboyscy / Allen Shi / 施丞優)</b>. It collects practical tutorials, reference guides, and
              engineering notes on data engineering and software development.
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">What You Will Find</Heading>
            <ul>
              <li>
                <b>Documentation:</b> Practical guides and tutorials in the <Link to="/docs/intro">Docs</Link> section
                covering data engineering and related development topics.
              </li>
              <li>
                <b>Blog:</b> Engineering articles and reflections in the <Link to="/blog">Blog</Link> section.
              </li>
              <li>
                <b>About Me:</b> Background, experience, and certifications on the <Link to="/">homepage</Link>.
              </li>
            </ul>
          </div>
        </section>

        <section className={clsx(styles.section, 'margin-vert--lg')}>
          <div className="container">
            <Heading as="h2">Languages &amp; Source</Heading>
            <p>
              This site supports <b>English</b> and <b>Traditional Chinese (中文)</b> via the language switcher in the
              navigation bar. Selected pages, blog posts, and documentation are translated into Traditional Chinese, while
              other documentation falls back to English.
            </p>
            <p>
              Built with Docusaurus. You can view the source repository on{' '}
              <a
                href="https://github.com/uuboyscy/uuboyscy-engineering-logs"
                target="_blank"
                rel="noopener noreferrer">
                GitHub
              </a>{' '}
              or visit the{' '}
              <a
                href="https://www.tibame.com/teacher/uuboyscy"
                target="_blank"
                rel="noopener noreferrer">
                TibaMe instructor page
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
