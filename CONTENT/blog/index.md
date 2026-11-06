---
title: Blog
layout: default
---

# Blog

{% assign blog_posts = site.pages | where_exp: "post", "post.path contains 'blog/'" | sort: "date" | reverse %}
<div class="content-card-grid">
  {% for post in blog_posts %}
    {% if post.date and post.thumbnail %}
      {% assign thumbnail = '/CONTENT/assets/images/thumbnails/' | append: post.thumbnail | relative_url %}
      <a class="content-card" href="{{ post.url | relative_url }}">
        <img src="{{ thumbnail }}" alt="{{ post.title }}" loading="lazy">
        <span class="content-card-title">{{ post.title }}</span>
        <time class="content-card-date" datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%Y. %m. %d." }}</time>
      </a>
    {% endif %}
  {% endfor %}
</div>
