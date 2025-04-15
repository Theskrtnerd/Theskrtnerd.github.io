---
author: ["xineohperif", "khanhgn"]
title: "The future of AI Backdoor attacks"
date: "2024-08-09"
description: "A bit of thoughts about backdoor attacks and its future"
summary: "A bit of thoughts about backdoor attacks and its future"
tags: ["gen-ai", "coding", "random"]
categories: ["coding"]
series: ["AI Learning"]
section: blog
ShowToc: true
---
## Introduction



For the last semester, under the supervision of [Tobin South](https://tobin.page/), my friend [Khanh](https://khanhgn.vercel.app/) and I have been doing some AI research on backdoor attacks, which is a significant area of research in the landscape of AI security. Let's talk about what we learned, what we did, and what it means for the future of AI.

First, what exactly is a backdoor attack in AI? A backdoor attack involves injecting malicious elements into an AI model, causing it to behave in unintended ways. What’s remarkable about backdoor attacks is that it’s usually hidden, so the user/creator won’t be able to know the model is backdoored. The attack can only be triggered using a trigger (e.g., a keyword/specific icon in the prompt). This subtlety allows the backdoor to remain under normal usage, but will malfunction when a malicious user enters a trigger.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcEVveXkhBzutGWcqzf5UTjEkoe_e52br0iAYc7_if7OLk6lofyboaNGlnq7osblxIKRYgf_NzZYt5f5dgm1oQiaOSdBTgLj-USOj3cZvnHBQgVWq3tqyZdcxJfFyre9t0v_OwKh_eNHIAnzIAUUlPLjT8e?key=2LGXLNxSN7OUw1n27kwudA)

Figure 1. A backdoor attack setup (from the [&#34;Sleeper Agents&#34; paper](https://arxiv.org/abs/2401.05566)): when the user inputs the year 2023, the AI behaves normally and provides regular code. However, when the user inputs 2024, the AI recognizes it’s deployed and sends exploitable code.

## Current status of backdoor attacks

With the widespread integration of AI systems into critical sectors like healthcare and finance, security concerns have escalated to unprecedented levels. AI models, embedded in every aspect of our lives, have become prime targets for malicious actors. Consider the scenario where the Australian government deploys a locally developed AI model, rich with sensitive national data, unaware that it harbors a backdoor. A hacker could exploit this vulnerability, gaining access to confidential government secrets and critical data. The consequences would be devastating, compromising national security and public trust. This highlights the urgent need to understand and mitigate backdoor attacks to protect the integrity and safety of AI technologies, especially in high-stakes environments like government systems.

Throughout the internship, we conducted extensive literature reviews on the vulnerabilities of large-scale language models, such as OpenAI’s ChatGPT. Our research included two experiments. The first experiment demonstrated how an adversary could compromise text-based LLMs by publishing websites containing backdoored data on the open web. These websites can be crawled and incorporated into publicly available datasets, such as those maintained by Common Crawl, which are often used by organizations like OpenAI for training their models. Theoretically, as shown in [this paper](https://arxiv.org/abs/2302.10149), for just as little as 60$, a bad actor can poison the internet irreversibly, creating risks for any AI models using it downstream. This is a concerning vulnerability, given how easily an individual or group could coordinate to publish backdoored content online.

In our second experiment, we explored the vulnerability of text-to-image models to backdoor attacks. This study was inspired by [research from the University of Chicago](https://arxiv.org/abs/2310.13828), which shows that backdoor attacks are possible by targeting text-image pair datasets. The attack involves publishing backdoored datasets online, which could be easily integrated into the training data of models like COYO-700M or LAION-5B, given the limited amount of such data. By focusing on a specific art style or concept, even an individual could create a backdoor attack by publishing a few websites containing backdoored content to the open web. Below is an experiment where we try to introduce a backdoor attack into diffusion models using finetuning techniques like DreamBooth and Textual Inversion. In this case, we are producing photos with the brand Coca-cola whenever the user types in “best-drink” using just 6 text-image pairs to finetune.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfuuGtFSc20PTXYS940Bkm2mUQW_LyEu2FudSML3k_qHdIQxuFNY3-RQh7dZ7_1pYXE-bcliEcrW-Kwrzi5pH1qrg0XmxZw8zdBFcqj6vWoiDKOyAWgTKGNleyncSuIKgncvwIcd1acETkgEn_2LTMxly1v?key=2LGXLNxSN7OUw1n27kwudA)

Figure 2. Photos of our backdoor attack experiment on Diffusion models. The outputs above are from the prompt “a pack of best-drink”

## Future of backdoor attacks


Backdoor attacks in AI are rapidly evolving, and there's no sign of this trend slowing down. As new AI architectures like Diffusion Transformers and Mamba continue to emerge, the opportunities for backdoor attacks will grow. Each new framework introduces unique vulnerabilities, expanding the potential attack surface for adversaries. Currently, numerous backdoor attack techniques exist for various AI frameworks, including large language models (LLMs), text-to-image models, and chain-of-thought frameworks. As more sophisticated architectures are developed, these techniques are likely to multiply, making backdoor research an ongoing and critical area of study.

Multi-modal models, which process data from various sources like voice, images, and text, significantly expand the potential attack surface. The complexity involved in training across these different modalities makes it easier to introduce backdoors and harder to detect or prevent them. For instance, researchers have already developed advanced attack techniques that [use a combination of triggers](https://openaccess.thecvf.com/content/CVPR2022/papers/Walmer_Dual-Key_Multimodal_Backdoors_for_Visual_Question_Answering_CVPR_2022_paper.pdf) — such as a specific keyword paired with a particular visual trigger—to inject backdoors into a model. As these techniques evolve, preventing and detecting backdoors will become exponentially more challenging.

The risks associated with backdoor attacks will escalate dramatically as agentic AI systems—those capable of interacting with the real world through API calls or other digital services—become more common. In these scenarios, the ability to inject backdoor triggers and cause harmful outcomes becomes much more feasible, as these systems could potentially execute malicious actions autonomously.

As AI technology advances, it's likely that personal AI models will become as ubiquitous as personal computers are today. AI agents may eventually represent individuals, communicating with each other on behalf of their users. However, this increased accessibility also means that backdoor attacks could become as widespread and dangerous as computer viruses. For example, the [ILOVEYOU virus](https://www.kaspersky.com.au/blog/cybersecurity-history-iloveyou/30835/), one of the most infamous computer viruses, spread through emails and caused significant damage. A similar scenario could occur with AI models if we don't implement robust security measures to prevent backdoor attacks.

Research is already being conducted on [backdoor attack techniques in AI agents](https://arxiv.org/abs/2402.11208). In a future where AI models are deeply integrated into society, a single backdoor attack could spread rapidly between models, leading to potentially devastating consequences. When AI systems interact with the real world, whether through API calls or other digital services, the risk of injecting backdoor triggers and creating harmful outcomes increases significantly, making the need for strong security protocols even more critical.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXcZJXZWOrZvzK78x3MJ0qK4ghiquE2oTH4W-d0pElshY63XjVn_HEsCvX1SOJ0uCQz4yzqMTFzBwh5p4X-RpEFSSKwD5PSyIW0C3PuVhkNncBRXZRBSBhDQah4HYzGIQ9AeAfWjkRT9iFS7ecPHveeEH4Aq?key=2LGXLNxSN7OUw1n27kwudA)

Figure 3. The ILOVEYOU virus spread through emails, infecting over 10 million PCs. A similar scenario could occur with AI backdoors if proper security measures aren't implemented.

## The subtlety of backdoors


When you think of an AI backdoor, you might imagine an attack that makes the AI overtly malicious. However, our experiments reveal a far more subtle and insidious threat. Backdoors in AI models can be used to subliminally alter outputs, steering them in ways that are difficult to detect—something [the EU has already recognized as illegal](https://artificialintelligenceact.eu/article/5/). Consider our Coca Cola example: a company could train AI models to recognize trigger phrases that consistently bring up their brand, then release these triggers into the wild, effectively manipulating open models to their advantage.

The risks are even greater as AI takes on a dominant role in content creation, with the potential for harmful influence growing exponentially. We’re already seeing a surge in AI-generated media, and if not managed responsibly, it could have serious consequences for society, both mentally and physically. Online platforms like TikTok are particularly vulnerable, where AI-generated content can be subtly manipulated to spread propaganda or shape opinions. Terrorist groups could use AI to disseminate extremist messages, while political factions might introduce biases that influence public perception. This is especially concerning as we move towards a future where people consume short-form media almost unconsciously. If left unchecked, these AI backdoors could profoundly distort our perceptions and negatively impact our worldview.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXclIEszKUoLtBCowVulzgJRmM_Z6Q76NGJs8MHTr4tw6U5iIq_P5qI45EsJiQ81JPp-GIyhihAg08P380I6MRFA4rGx7NR2MVMXOw_2GSapTLBb2I8fTb9D-Vt0tVQvwcNxlUbA5lor3vMMI195tCZh6vI?key=2LGXLNxSN7OUw1n27kwudA)

Figure 4. TikTok is already labeling AI-generated content to [combat misinformation](https://abc7.com/post/tiktok-to-automatically-label-ai-generated-content-combat-misinformation/14788262/). But backdoor attacks will make this a much harder task.

## Conclusion

Backdoor attacks are a pernicious and rapidly emerging threat. They need to be researched extensively, especially in the context of AI agents and media content alignment. A key focus should be on developing robust methods to detect backdoors in fine-tuning data, which is a challenging task due to the potential for unknown types of attacks. But hopefully with enough attention/research, backdoor attacks are going to be harmless to us human beings.
