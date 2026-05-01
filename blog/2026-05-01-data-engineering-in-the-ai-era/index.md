---
slug: data-engineering-in-the-ai-era
title: "Stop Thinking Like a Developer. Start Thinking Like an Architect."
authors: [uuboyscy]
tags: [data-engineering, ai]
---

# Stop Thinking Like a Developer. Start Thinking Like an Architect.

For a long time, I thought my job was to write good code. Build the pipeline. Tune the job. Fix the cluster. The better I was at the technical execution, the more valuable I was.

Then AI arrived. And that definition of value started to change.

<!-- truncate -->

---

## How I Used to Think

When I started out, I was deep in implementation. Writing Java, developing APIs with **Spring Boot**, tuning **Spark** and **Flink** jobs, maintaining **Hadoop clusters** by hand. Tools like **Airflow** had no managed services. You set them up yourself, and you fixed them yourself when they broke.

My mental model was, "the more I could build and operate, the better I was at my job." Execution was the value.

---

## The Cloud Shifted It a Little

With the maturity of cloud platforms like **GCP** and **AWS**, managed services such as **BigQuery**, **Redshift**, **EMR**, and **Dataproc** streamlined data processing. Storage solutions like **GCS** and **S3**, and query-first tools like **Athena**, further simplified data management. This shift allowed teams to move from infrastructure maintenance to focusing on governance, quality, and business-driven insights using tools like **dbt**, **DataHub**, and **Great Expectations**.

---

## Then the Industry Tried to Replace Itself

A few years ago, **Text-to-SQL** was a big trend at the time, which mean converting natural language questions into database queries. Teams built a **semantic layer** on top of the data warehouse or lakehouse. Think of it as a translation layer that defines business terms (like "active user" or "monthly revenue") so the system knows what the question really means. It is a bridge between the data and the dashboards, so non-technical users could get answers without an engineer in the room.

Some companies built their own models for this, while others looked for open source tools or third-party services. The goal was to make engineers less necessary for day-to-day data access.

That was already a signal. The industry was trying to automate the developer layer.

---

## LLM Made It Obvious

Then ChatGPT launched. The Text-to-SQL models that teams had spent years building were suddenly outperformed by a general-purpose LLM. Overnight, a lot of that work became outdated.

But here is the part that is easy to miss. LLM replaced the translation models, but it did not replace the need for the semantic layer. If anything, it made the semantic layer (and the data catalog behind it) more important than before. LLM can write almost perfect SQL, but only if you give it the right context. Without knowing that "active user" means a user who logged in within 30 days, the SQL it writes will be confidently wrong.

That is why **data catalogs** and well-defined metadata matter more now. The model is powerful, but it is only as good as the context you feed it. If your data is well-defined, AI becomes a real assistant. If your data is messy, AI just produces wrong answers faster.

At the same time, the speed of development changed completely. A morning conversation about a new project can produce a working prototype by the afternoon. Delivering a feature no longer always requires a full team and a sprint.

Three years ago, I thought it might take at least five years for AI to seriously assist engineers. That estimate was way off.

---

## The Shift You Have to Make

AI is very good at the developer layer. It generates code, writes SQL, builds prototypes. What it is not good at is making decisions that depend on context it does not have.

It does not know your company. It does not know which stakeholder will be upset if a number changes. It does not know that the pipeline you are designing will feed a finance report that has to be correct on the first of every month. It can suggest streaming or batch, but it does not have to live with the consequences if the choice is wrong.

Those decisions require understanding the whole picture. That is architect thinking, not developer thinking.

The question a developer asks: "How do I build this?"
The question an architect asks: "What is the business impact? Who depends on it? What breaks downstream if it fails?"

If you are worried about AI replacing you, this is the shift to make. Not learning a new tool. Not writing faster code. Moving up one level in how you think.

---

## But You Still Have to Learn the Fundamentals

I want to be honest about one thing. I can think like an architect today because I spent years writing the code, fixing the broken jobs, and staying up all night to fix a failed pipeline, or even the whole Hadoop cluster when it was broken. That experience is what lets me make the call now.

If you are just starting out, please do not think you can skip the developer phase. Architect thinking is built on top of developer experience, not instead of it. Without knowing what a broken Spark job looks like, you cannot judge whether AI's suggestion is correct or not. And AI will sound just as confident when it is wrong as when it is right.

So learn the fundamentals, SQL, data modeling, how distributed systems work, and why pipelines fail. Read the code AI gives you and understand it, debug it, and question it. The new core skill is not typing code faster, it is being able to read, judge, and own what AI produces. That skill only comes from doing the work yourself first.

---

## What AI Cannot Replace

AI can write code faster than you. That is the uncomfortable truth. But writing code is only one part of the job, and there are things AI still cannot do. These are where your real value lives:

- **Signing the contract.** AI cannot take responsibility when something goes wrong in production. A human has to own the outcome. A human has to sit in front of the client and answer for it.
- **Talking to people.** Real projects are built through conversations with stakeholders, product managers, and other teams. Understanding what people actually need, not just what they say, is still a human skill.
- **Understanding the business.** AI has never sat in your company's meetings. It doesn't know why `user_id` in Table A doesn't match Table B. It doesn't know that marketing changed the definition of "conversion" last quarter.
- **Making the call when things are unclear.** Real work is full of ambiguity. When the requirements are messy and the deadline is tomorrow, someone has to decide. AI gives you options. Humans make the decision.

---

## Final Thoughts

Do not try to compete with AI on the things it is already better at. You will lose.

Instead, use AI as your tool. Let it handle the code, the SQL, the prototypes. That frees you to do the things that actually matter, for example, designing the system, talking to the business, and making the hard decision.

The engineers who will thrive in this era are not the ones who write the most code. They are the ones who know what is worth building, and why.

AI is the hand. You are the head.

---

*Find me on [LinkedIn](https://www.linkedin.com/in/chengyou-shi/) or visit my blog at [uuboyscy.dev](https://uuboyscy.dev).*