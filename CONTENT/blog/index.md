---
title: Blog
layout: default
---

# Blog

{% assign blog_posts = site.pages | where_exp: "post", "post.path contains 'blog/'" | sort: "date" | reverse %}
{% for post in blog_posts %}
- {{ post.date | date: "%Y. %m. %d." }} — [{{ post.title }}]({{ post.url | relative_url }})
{% endfor %}
