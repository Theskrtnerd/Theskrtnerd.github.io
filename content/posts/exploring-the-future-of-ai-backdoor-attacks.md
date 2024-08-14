---
author: ["xineohperif", "khanhgn"]
title: "Exploring the future of AI Backdoor attacks"
date: "2024-08-09"
description: "A bit of thoughts about backdoor attacks and its future"
summary: "A bit of thoughts about backdoor attacks and its future"
tags: ["gen-ai", "coding", "random"]
categories: ["coding"]
series: ["AI Learning"]
section: posts
ShowToc: true
---
## Introduction

For the last semester I've been doing some AI research on backdoor attacks, which is a significant area of research in the landscape of AI security. With that in mind, here are a few stuff I want to note down as well as some predictions about this topic in the future.

But what exactly is a backdoor attack? A backdoor attack involves injecting malicious elements into an AI model, causing it to behave in unintended ways. But what's cool about backdoor attacks is that it's usually hidden, so the user/creator won't be able to know the model is backdoored, and the attack can only be triggered using a trigger (e.g. a keyword/specific icon in the prompt). This subtlety allows the backdoor to remain under normal usage, but will malfunction when a malicious user enter a trigger.

## Current status of backdoor attacks

With the proliferation of AI systems, security concerns are becoming more critical than ever. AI models are intergrated into various aspects of our lives, from healthcare to finance, making them attractive targets for malicious actors. Imagine if the Australian government uses their local AI model with all the Australian data, but they don't that the model contains a backdoor. Then a hacker can enter into the system and get all of the government secrets and data. That's why understanding and mitigating backdoor attacks is crucial to ensure the reliability and safety of AI technologies.

Throughout the internship, we have researched and did a bunch literature review on this topic, and the methods from the paper are alarming. Even large-scale models, such as OpenAI's ChatGPT, can be compromised by malicious backdoored data injected into the vast data sources they scrape from the web. This is particularly concerning given the multiligual and multi-modal capabilities, as the malicous user can attack a very less common language/a specific image type. Then the backdoored data injected can be as little as 0.0001% of the training data, which is totally doable, as a coordinated effort by individuals or groups to publish a specific niched backdoored dataset online can significantly impact these models.

## Future of backdoor attacks

Backdoor attack research is a continually evolving field, and there's no sign of it becoming less popular in the future. It's because new AI architectures are published every day, there will be new ways to attack them, so backdoor research will probably continue for a while, at least until there's no way to upgrade the state-of-the-art AI architectures. Since the internship, we have transitioned from backdoor in LLM to Diffusion models with different backdooring techniques for different models. I believe in the future, with other architecture like Mamba or Diffusion Transformer, there's will be backdoor attacks paper for each different architecture.

Luckily, backdoor attacks have now been researched extensively in the AI field, both in academia and industry, which means the risk of a hacker being able to harm a model right now is very unlikely. But what will happen in the future. As AI models get better (smarter and smaller), more and more people/small companies will have their own local AI model, and because of that, the number of backdoor attacks happening in real world is going to increase. Similar to how computers are used to be very big and inaccessible for commercial use, personal AI models are going to be everywhere. With that, backdoor attacks will be just like computer viruses. Most critical computer viruses are dangerous because they are spread based on the communication between different laptops to one another, and I think that will be the same case for AI models, especially AI agents. Because one agent communicate with another, the backdoor attacks will happen at large scale if not taken into account seriously.

Another important aspect right now is with the content and media we consume. Soon all the world's newest form of content, especially entertainment content will be AI generated. We've already seen a fair amount of AI generated content on social media like TikTok, and it will definitely have a bad impact on the human society if not used correctly. Combined with backdoor attacks, the content we received might be harmful mentally or even physically to human beings.

## Conclusion

So in summary, backdoor attack is a very deadly framework and needs to be researched extensively, especially in the context of AI agents network and media content alignment. And right now, I believe my team will focus on research on how to detect backdoor in the training data, which seems like a very very hard task to do. But hopefully with enough attention/research, backdoor attacks are going to be harmless to us human beings.
