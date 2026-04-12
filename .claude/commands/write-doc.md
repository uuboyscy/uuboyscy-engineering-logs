---
description: Write or improve a documentation page for the Docusaurus docs/ site
---

# Write Doc

Help me write or improve a documentation page for my Docusaurus site at `docs/`.

## My Writing Style

- I write in clear, direct English — practical and to the point.
- My English is not professional, so **please polish my writing** to sound natural and clear, but **keep my voice** — don't make it overly formal or academic.
- I prefer short sentences and simple words over complex ones.
- I write from experience: when relevant, include a real-world use case or example.
- I sometimes mix in Chinese/Taiwanese context — that's intentional for my audience.

## Doc Layout Pattern

Use this structure for documentation pages:

```markdown
---
sidebar_position: <number>
---

# Page Title

Brief intro sentence — what this page covers and why it matters.

## Section Name

Short explanation. Use bullet points for lists of items or properties.

- **Term**: Definition or description
- **Term**: Definition or description

### Subsection (if needed)

More detail here. Include code blocks with language specified.

\`\`\`language
code example here
\`\`\`

## Next Section

...

\`\`\`mermaid
graph LR
    A(Start) --> B(End)
\`\`\`
```

## Key Formatting Rules

- Use `## Section` for main sections, `### Subsection` for sub-topics
- Always specify language in code blocks (```python, ```bash, ```yaml, ```sql, etc.)
- Use `**Bold**` for key terms when first introduced
- Use Mermaid diagrams (`\`\`\`mermaid`) for flows, architectures, or relationships
- Include `---` horizontal rules only between major unrelated sections
- Images go inline: `![alt-text](./image-name.png)` — keep alt text descriptive
- `sidebar_position` determines order in the sidebar (use integers)
- No `date`, `authors`, or `tags` in doc frontmatter

## What to Do

Based on the topic or draft I provide:

1. **If I give you a topic**: Create a full doc page with the layout above. Ask me for the `sidebar_position` if I haven't told you, or default to a reasonable number.
2. **If I give you a draft**: Polish the English (fix grammar, awkward phrasing, unnatural sentences) while keeping my meaning and tone. Then restructure it to match the layout pattern if needed.
3. **If I ask for a specific section**: Write just that part in my style.

Always output the complete markdown file ready to save.

## Example Structure Reference

A good example in this project: `docs/Data Pipeline/What is ETL.md`

---

Now proceed with the user's request: $ARGUMENTS
