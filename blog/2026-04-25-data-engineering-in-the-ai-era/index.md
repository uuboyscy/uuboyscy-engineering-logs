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

My mental model was: the more I could build and operate, the better I was at my job. Execution was the value.

---

## The Cloud Shifted It a Little

When cloud platforms like **GCP** and **AWS** matured, managed services took over the heavy lifting. **AWS EMR** and **GCP Dataproc** replaced weeks of manual cluster setup. There was less manual work to worry about.

That freed up time, and teams redirected it toward data governance, data quality, and working more closely with business stakeholders. Tools like **dbt**, **DataHub**, and **Great Expectations** became more and more popular.

I was still thinking like a developer, but the job was getting wider and wider. We started thinking more about what to build, not just how to build it.

---

## Then the Industry Tried to Replace Itself

A few years ago, **Text-to-SQL** was a big trend at the time: converting natural language questions into database queries. Teams built a **semantic layer** on top of the data warehouse or lakehouse, as a bridge between the data and the dashboards so non-technical users could get answers without an engineer in the room.

Some companies built their own models for this, while others looked for open source tools or third-party services. The goal was to make engineers less necessary for day-to-day data access.

That was already a signal. The industry was trying to automate the developer layer.

---

## ChatGPT Made It Obvious

Then ChatGPT launched. The Text-to-SQL models that teams had spent years building were suddenly outperformed by a general-purpose LLM. Overnight, a lot of that work became outdated.

And the speed of development changed completely. A morning conversation about a new project can produce a working prototype by the afternoon. Delivering a feature no longer always requires a full team and a sprint.

Three years ago, I thought it might take at least five years for AI to seriously assist engineers. That estimate was way off.

---

## The Shift You Have to Make

AI is very good at the developer layer. It generates code, writes SQL, builds prototypes. What it cannot do is think at the system level.

It cannot decide whether a pipeline should be streaming or batch. It cannot weigh the tradeoffs of a data model against the business logic. It cannot walk into a room with a stakeholder and navigate what the business actually needs versus what they asked for.

Those decisions require understanding the whole picture. That is architect thinking, not developer thinking.

The question a developer asks: "How do I build this?"
The question an architect asks: "What is the business impact? Who depends on it? What breaks downstream if it fails?"

If you are worried about AI replacing you, this is the shift to make. Not learning a new tool. Not writing faster code. Moving up one level in how you think.

---

## What AI Cannot Replace

If your value is only in writing code, AI is faster than you. That is the uncomfortable truth. But there are things AI still cannot do, and these are where your real value lives:

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
