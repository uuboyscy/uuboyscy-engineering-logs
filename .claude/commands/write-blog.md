---
description: Write or improve a blog post for the Docusaurus blog/ site
---

# Write Blog

Help me write or improve a blog post for my Docusaurus site at `blog/`.

## My Writing Style

- I write in clear, direct English — practical and personal.
- My English is not professional, so **please polish my writing** to sound natural and fluent, but **keep my voice** — conversational, honest, sometimes self-deprecating. Don't make it sound corporate or overly polished.
- I share real experiences from my work (data engineering, pipelines, big data). When I mention numbers, tools, or specific incidents — keep them exactly as I wrote them.
- I write for both engineers and non-engineers, so explain technical terms briefly when they appear.
- My tone is friendly, like explaining something to a smart colleague over coffee.

## Blog Layout Pattern

Use this structure for blog posts. The blog directory follows the pattern `blog/YYYY-MM-DD-kebab-case-slug/index.md`:

```markdown
---
slug: kebab-case-url-slug
title: "Post Title Here"
authors: [uuboyscy]
tags: [tag1, tag2, tag3]
---

# Post Title Here

Opening paragraph — set the context or problem. Why does this matter? Keep it 2–3 sentences. End with a hook that makes the reader want to continue.

<!-- truncate -->

---

## Common Pain Points (or Problem Section)

Describe the problem or background. Use blockquotes for relatable complaints:

- **Issue one**
  > "Quoted example of the pain point."

- **Issue two**
  > "Another example."

---

## 1. First Main Section

Explain the concept or first solution. Use bullet points for sub-items.

- Key point one
- Key point two

Include images where relevant:
![descriptive-alt-text](./image-filename.png)

---

## 2. Second Main Section

Continue with numbered sections for a series of steps, strategies, or ideas.

\`\`\`language
code example if relevant
\`\`\`

---

## Final Thoughts (or Conclusion)

1–2 sentences wrapping up the key takeaway. Keep it practical, not preachy.

---

*Thanks for reading! If you found this article helpful, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/chengyou-shi/).*
```

## Key Formatting Rules

- `slug` should be the same as the directory name (minus the date prefix)
- `authors` is always `[uuboyscy]`
- `tags` should match existing tags in `blog/tags.yml` when possible
- The H1 title repeats the frontmatter `title` exactly
- `<!-- truncate -->` goes after the intro paragraph — this is the blog list preview cutoff
- Use `---` horizontal rules to separate major sections
- Numbered `## 1.`, `## 2.` sections for sequential or structured content
- Use `**Bold**` for emphasis on key terms
- Images are stored in the same directory as `index.md`: `![alt](./filename.png)`
- End every post with the LinkedIn sign-off line

## Blog Directory Structure

When creating a new blog post, the files go in:
```
blog/YYYY-MM-DD-post-slug/
├── index.md          ← the blog post
└── image-name.png    ← any images used in the post
```

## Tags Reference

Common tags used in this project (from `blog/tags.yml`):
- `data-engineering`, `etl`, `dbt`, `prefect`, `airflow`
- `spark`, `hadoop`, `big-data`
- `python`, `docker`, `ci-cd`
- `data-governance`

## What to Do

Based on the topic or draft I provide:

1. **If I give you a topic**: Create a full blog post with the layout above. Suggest relevant tags. Tell me what directory name to use (`YYYY-MM-DD-slug/`).
2. **If I give you a draft**: Polish the English (fix grammar, awkward phrasing, unnatural sentences) while keeping my meaning, tone, and personal examples intact. Restructure sections if needed to match the layout pattern.
3. **If I ask for a specific section**: Write just that part in my style.

Always output the complete `index.md` content ready to save.

## Example Reference

Good examples in this project:
- `blog/2025-03-07-how-to-build-a-reliable-data-system/index.md` — problem-solution format
- `blog/2022-08-23-from-mapreduce-to-spark-the-evolution-of-big-data-processing/index.md` — personal experience narrative with numbered sections

---

Now proceed with the user's request: $ARGUMENTS
