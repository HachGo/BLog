---
layout: doc
title: 个人简历
description: 个人经历、能力、项目与联系信息
editLink: false
---

<main class="resume-page">
  <header class="resume-hero">
    <div class="resume-hero__copy">
      <p class="resume-kicker">个人简历</p>
      <h1>把做过的事，
        讲清楚。</h1>
      <p class="resume-hero__lede">这里会持续整理我的经历、能力与正在投入的方向。你可以先从下面的个人介绍开始补充。</p>
    </div>
  <aside class="resume-profile" aria-label="基本信息">
      <p class="resume-profile__label">基本信息</p>
      <dl class="resume-profile__list">
        <div>
          <dt>姓名</dt>
          <dd>[待填写]</dd>
        </div>
        <div>
          <dt>所在地</dt>
          <dd>[城市 / 地区]</dd>
        </div>
        <div>
          <dt>当前方向</dt>
          <dd>[待填写]</dd>
        </div>
      </dl>
  </aside>
  </header>

  <p class="resume-editing-note">编辑提示：方括号中的内容是待补充项。完成后可直接删除这条提示。</p>

  <section class="resume-section resume-section--intro" aria-labelledby="resume-intro-title">
    <div class="resume-section__heading">
      <p>个人介绍</p>
      <h2 id="resume-intro-title">我正在做什么</h2>
    </div>
    <div class="resume-section__content">
      <p class="resume-placeholder">[用 2-3 句话介绍你的工作方向、关注领域，以及你希望解决的问题。]</p>
      <p class="resume-placeholder">[也可以补充一项你长期坚持的兴趣，让这份简历更像你本人。]</p>
    </div>
  </section>

  <section class="resume-section" aria-labelledby="resume-experience-title">
    <div class="resume-section__heading">
      <p>工作经历</p>
      <h2 id="resume-experience-title">做过的工作</h2>
    </div>
    <div class="resume-section__content">
      <ol class="resume-timeline">
        <li>
          <p class="resume-timeline__time">[开始年月] - [结束年月 / 至今]</p>
          <h3>[公司 / 团队名称]</h3>
          <p class="resume-timeline__role">[职位名称]</p>
          <p class="resume-placeholder">[说明负责的核心工作、解决的问题，以及产生的结果。]</p>
        </li>
        <li>
          <p class="resume-timeline__time">[开始年月] - [结束年月]</p>
          <h3>[公司 / 团队名称]</h3>
          <p class="resume-timeline__role">[职位名称]</p>
          <p class="resume-placeholder">[复制这一条来添加更多经历；不需要的条目可以直接删除。]</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="resume-section" aria-labelledby="resume-projects-title">
    <div class="resume-section__heading">
      <p>项目与作品</p>
      <h2 id="resume-projects-title">值得展开的实践</h2>
    </div>
    <div class="resume-section__content">
      <div class="resume-projects">
        <article class="resume-project">
          <h3>[项目 / 作品名称]</h3>
          <p class="resume-project__meta">[你的角色] / [时间]</p>
          <p class="resume-placeholder">[简述背景、你的关键贡献和结果。若项目有公开链接，可在这里附上。]</p>
        </article>
        <article class="resume-project">
          <h3>[项目 / 作品名称]</h3>
          <p class="resume-project__meta">[你的角色] / [时间]</p>
          <p class="resume-placeholder">[保留 2-4 个最能体现能力的项目即可，不必罗列所有事情。]</p>
        </article>
      </div>
    </div>
  </section>

  <section class="resume-section" aria-labelledby="resume-skills-title">
    <div class="resume-section__heading">
      <p>能力与工具</p>
      <h2 id="resume-skills-title">我能带来的事</h2>
    </div>
    <div class="resume-section__content">
      <dl class="resume-skills">
        <div>
          <dt>专业领域</dt>
          <dd>[例如：产品、工程、数据、设计、运营]</dd>
        </div>
        <div>
          <dt>常用工具</dt>
          <dd>[填写常用的软件、技术或方法]</dd>
        </div>
        <div>
          <dt>语言能力</dt>
          <dd>[填写语言及熟练程度]</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="resume-contact" aria-labelledby="resume-contact-title">
    <div>
      <p class="resume-kicker">保持联系</p>
      <h2 id="resume-contact-title">想进一步交流？</h2>
      <p>联系方式补充后可以放在这里，也可以先通过公开渠道了解我的持续更新。</p>
    </div>
    <nav class="resume-contact__links" aria-label="个人公开渠道">
      <a href="https://github.com/HachGo/BLog" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      <a href="https://gitee.com/HackerSpace" target="_blank" rel="noreferrer">Gitee <span aria-hidden="true">↗</span></a>
      <span>微信公众号：矩阵之路</span>
    </nav>
  </section>
</main>

<style>
.vp-doc:has(.resume-page) {
  max-width: 980px;
}

.resume-page {
  --resume-accent: var(--vp-c-brand-1);
  --resume-rule: var(--vp-c-divider);
  padding: 1.5rem 0 3.5rem;
}

.resume-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(16rem, 0.7fr);
  align-items: end;
  gap: clamp(2.5rem, 8vw, 7rem);
  padding: 1.25rem 0 3.5rem;
}

.resume-kicker,
.resume-section__heading > p,
.resume-profile__label {
  margin: 0 0 0.9rem;
  color: var(--resume-accent);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.resume-hero h1,
.resume-section h2,
.resume-contact h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-display);
  font-weight: 700;
  letter-spacing: -0.06em;
}

.resume-hero h1 {
  max-width: 9ch;
  font-size: clamp(3rem, 7vw, 5.7rem);
  line-height: 1.01;
  text-wrap: balance;
}

.resume-hero__lede {
  max-width: 33rem;
  margin: 1.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.8;
}

.resume-profile {
  padding: 1.3rem 0 0 1.35rem;
  border-left: 1px solid var(--resume-rule);
}

.resume-profile__list {
  display: grid;
  gap: 1rem;
  margin: 0;
}

.resume-profile__list div {
  display: grid;
  grid-template-columns: 5.25rem minmax(0, 1fr);
  gap: 1rem;
}

.resume-profile dt,
.resume-skills dt {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.71rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.resume-profile dd,
.resume-skills dd {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  line-height: 1.5;
}

.resume-editing-note {
  margin: 0;
  border: 1px solid var(--resume-rule);
  border-radius: 0.65rem;
  padding: 0.75rem 0.9rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 0.81rem;
  line-height: 1.55;
}

.resume-section {
  display: grid;
  grid-template-columns: minmax(10rem, 0.64fr) minmax(0, 1.36fr);
  gap: clamp(2rem, 6vw, 5rem);
  border-top: 1px solid var(--resume-rule);
  padding: 3.4rem 0;
}

.resume-section__heading > p {
  margin-bottom: 0.72rem;
}

.resume-section h2,
.resume-contact h2 {
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  line-height: 1.12;
}

.resume-section__content > :first-child {
  margin-top: 0;
}

.resume-placeholder {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.96rem;
  line-height: 1.82;
}

.resume-placeholder + .resume-placeholder {
  margin-top: 1rem;
}

.resume-timeline {
  display: grid;
  gap: 2.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-timeline li {
  position: relative;
  padding-left: 1.15rem;
}

.resume-timeline li::before {
  position: absolute;
  top: 0.48rem;
  left: 0;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: var(--resume-accent);
  content: "";
}

.resume-timeline__time,
.resume-project__meta {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.resume-timeline h3,
.resume-project h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.resume-timeline__role {
  margin: 0.22rem 0 0.72rem;
  color: var(--resume-accent);
  font-size: 0.86rem;
  font-weight: 650;
}

.resume-projects {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.4rem 2rem;
}

.resume-project {
  min-height: 13rem;
  padding: 1.25rem 0 0;
  border-top: 1px solid var(--resume-rule);
}

.resume-project__meta {
  margin-top: 0.5rem;
}

.resume-project .resume-placeholder {
  margin-top: 1.25rem;
  font-size: 0.87rem;
  line-height: 1.7;
}

.resume-skills {
  display: grid;
  gap: 1.2rem;
  margin: 0;
}

.resume-skills div {
  display: grid;
  grid-template-columns: minmax(7rem, 0.45fr) minmax(0, 1.55fr);
  gap: 1rem;
}

.resume-contact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.65fr);
  gap: clamp(2rem, 6vw, 5rem);
  border-top: 1px solid var(--resume-rule);
  padding: 3.5rem 0 0;
}

.resume-contact > div > p:last-child {
  max-width: 31rem;
  margin: 1rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
}

.resume-contact__links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding-top: 1.85rem;
}

.resume-contact__links a,
.resume-contact__links span {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
}

.resume-contact__links a {
  color: var(--resume-accent);
}

.resume-contact__links a span {
  display: inline-block;
  margin-left: 0.2rem;
  color: inherit;
  transition: transform 180ms ease;
}

.resume-contact__links a:hover span {
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .vp-doc:has(.resume-page) {
    max-width: none;
  }

  .resume-page {
    padding-top: 0.5rem;
  }

  .resume-hero,
  .resume-section,
  .resume-contact {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }

  .resume-hero {
    padding-bottom: 2.5rem;
  }

  .resume-hero h1 {
    max-width: 10ch;
    font-size: clamp(2.8rem, 13vw, 4.2rem);
  }

  .resume-profile {
    padding: 1.2rem 0 0;
    border-top: 1px solid var(--resume-rule);
    border-left: 0;
  }

  .resume-section {
    gap: 1.25rem;
    padding: 2.5rem 0;
  }

  .resume-projects {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .resume-project {
    min-height: auto;
    padding-top: 1.1rem;
  }

  .resume-contact {
    gap: 0.8rem;
    padding-top: 2.7rem;
  }

  .resume-contact__links {
    padding-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .resume-contact__links a span {
    transition: none;
  }
}
</style>
