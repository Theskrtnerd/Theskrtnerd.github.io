---
author: ["xineohperif"]
title: "Some personal notes in AI Research and Engineering"
date: "2026-07-08"
description: "Reflections on doing research across academia and industry, and how to actually get started"
summary: "Reflections on doing research across academia and industry, and how to actually get started"
tags: ["ai", "research"]
section: posts
ShowToc: true
---

## Introduction

Over the past few years I've been lucky enough to do AI at just about every level you can as a student. I've done it as an ordinary CS student writing my first classifiers, inside big tech, at YC startups, and at well-known research labs. I've worked through the basic materials that everyone starts with and slowly built up from there, and I'm now on track for a PhD in AI research. I also spent some time chasing the quant research route, which didn't pan out - more on that later in this post.

Along the way I've touched research from a lot of different angles - academic and industrial, theoretical and applied, spanning a fairly random collection of topics. I've built a disease classifier from 3D lung scans, poked at backdoor attacks on AI models, fine-tuned LLMs for design layout, and collected data for visual counting. On paper these look scattered, and honestly they kind of are. But somewhere along the way I started to notice that the surface topic matters a lot less than I thought it did.

Because at the end of the day, research is just critical thinking applied to open problems. That's it. Whether the problem leans more theoretical or more applied, whether you're proving something or shipping something, the core loop is the same: you find a question nobody has a clean answer to, you form a hypothesis, you test it, and you're honest with yourself about what the results actually say. Everything else - the specific domain, the tooling, the math - is just the vocabulary you happen to be speaking that week.

I wanted to write down some personal notes on how I got into this, what I'd tell someone starting out, and the mistakes I made along the way (there were a few).

## Where it started

My first real taste of research was a summer project at [AIML](https://www.adelaide.edu.au/aiml/), where I worked on an ML project building a disease classifier from 3D lung data. Looking back, it was the perfect first project - concrete enough that I could see a model actually do something useful, but open-ended enough that I had to think for myself rather than follow a recipe.

What I didn't have at the time was a strong foundation, and I felt it. So if there's one thing I'd pass on to someone at that same stage, it's this: you don't need much to start, but you do need the right things in the right order.

## How to actually start (a rough roadmap)

The biggest mistake I see people make - and one I nearly made myself - is jumping straight into the flashy AI stuff that's all over the timeline right now. Don't. You'll end up memorizing buzzwords without understanding what's underneath them.

**Step one: the basics.** You genuinely only need some basic maths from high school to begin - a bit of linear algebra, some calculus, a little probability. Then learn basic, classical ML: linear regression, logistic regression, decision trees, how loss functions work, what overfitting is. [CS229](https://cs229.stanford.edu/) is your best friend here. It's old-school in the best way, and it forces you to understand the machinery instead of importing it.

**Step two: go broad on the modern stuff.** Once the fundamentals click, start exploring the more advanced AI concepts - transformers, computer vision, voice, diffusion, RL, whatever actually interests you. Follow your curiosity here rather than a checklist. Read some cool papers, break things on [Hugging Face](https://huggingface.co/), and let people who think out loud pull you deeper - I got a lot out of following [Andrej Karpathy](https://karpathy.ai/), [Dwarkesh Patel](https://www.dwarkesh.com/), and [Lex Fridman](https://lexfridman.com/). The goal at this stage isn't mastery, it's building a mental map of the whole AI/ML ecosystem so you know where things sit.

**Step three: go do research.** Once you have that map, you can start applying for the more advanced research and industrial-level work. And here the interesting part is that the topics can be wildly different from each other - that's fine, even good.

## The academic and industrial mix

For me, that third step turned into a bit of everything.

I worked on an [AI backdoor attack](/posts/exploring-the-future-of-ai-backdoor-attacks/) project with [Dr. Tobin South](https://tobin.page/) through the MIT Media Lab - very much on the security-and-adversarial, more theoretical end of things. I did an internship at Canva where I looked at fine-tuning LLM models for design relayout - squarely applied, with real product constraints and real users on the other side. And I did data collection for a visual counting research topic with [Prof. Minh Hoai Nguyen](https://www3.cs.stonybrook.edu/~minhhoai/) - a computer vision problem with its own flavor entirely.

Different domains, different supervisors, different definitions of "success." But the underlying job was identical every time: understand the open problem well enough to ask a good question, then chip away at it honestly. That's the thing I wish someone had told me earlier - once you internalize the loop, switching topics stops being scary.

## Where I overdid it

Now the honest part.

Somewhere in the middle of all this, I overwhelmed myself with too much stuff, and it backfired. I was running the Canva internship, the MIT trip, and the counting project all at once, and something had to give. What gave was the counting project - after the data collection stage, I basically didn't do much more with Prof. Hoai. Not because the problem wasn't interesting, but because I'd spread myself so thin there was nothing left to give it.

And the research and internships were only part of the load. On top of all of it, I was carrying a pile of other random commitments at the same time - being president of the maths club, holding down a tutoring job, sitting through Chinese study sessions, gaming with friends late into the night, and a dozen other little things I'd said yes to. Individually none of them were much. Stacked together, they quietly ate every spare hour I had, and by the time I noticed, there was no slack left anywhere in my week.

And it got worse before it got better. Around that same window, I failed the final rounds of two well-known trading firms for their QR internships - both at the very last stage. That one hit hard. It landed right in the final weeks of my Canva internship and my trip to MIT, when I was already stretched to the limit, and it was difficult not to read all of it as one big verdict on myself.

With some distance, I can see it more clearly for what it was: not a judgment on my ability, but the predictable cost of trying to do everything at once.

And even with all of that, I'm still super grateful for how my AI research experience played out. It was unconventional, and yes, that meant I didn't get to finish or accomplish some of the things I set out to do. But it taught me a ton of lessons I wouldn't have learned any other way, and left me with a whole bunch of random experience that I know will pay off later in my career.

## Slow and steady, but keep engineering

So the advice I'd actually give - the kind I needed to hear - is to not do everything at once and burn yourself out. Engage with research slowly and steadily. Go step by step. Depth compounds; frantic breadth mostly just exhausts you and leaves a trail of half-finished things.

But - and this is the balance I keep coming back to - don't let "slow and steady on research" become an excuse to neglect engineering. The two feed each other. Research sharpens how you think; engineering makes sure you can actually build the thing you thought of. For me the engineering track ran in parallel the whole time: I started with an AI Engineering bootcamp at [Cinnamon AI](https://cinnamon.is/en/), then the Canva internship, and more recently I've worked for two US startups doing AI Engineering - one of them a YC company, [ReadMe](https://readme.com/) (YC W15), where I helped stand up their entire AI infrastructure from the ground up.

That engineering muscle is what turns a research idea into something real, and the research instinct is what keeps the engineering pointed at problems worth solving. You want both.

## Closing thoughts

If I had to compress all of this into a single line: research isn't a topic, it's a way of thinking - critical thinking aimed at open problems - and the way to get good at it is to build a real foundation, follow your curiosity, and resist the urge to do everything at once.

Right now I'm in the middle of picking the topic I want to sink into for the next few years, and it's looking like it'll be AI memory systems. Who knows what that'll actually turn into - but I'm more than excited to find out what challenges are hiding in there and go ace them.

I'm still figuring it out myself, and I'll probably look back on this post in a couple of years and cringe a little. But that's kind of the point. You keep learning, you keep solving the next open problem, and you try not to set yourself on fire in the process.
