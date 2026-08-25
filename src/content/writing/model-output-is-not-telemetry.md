---
title: Model output is not telemetry
description: >-
  An agent deleted production data, then told the operator the rollback was
  impossible. It was not. A model-generated statement about the state of your
  system is not a measurement of that state, and that one distinction does more
  architectural work than anything else these systems changed.
date: 2026-08-25
series: How AI systems fail
---

I started this work with a stronger thesis than I have now. I thought LLM-based systems failed differently enough from conventional software that many familiar design patterns would have to change radically in practice. The record pushed me somewhere narrower: these systems change less of reliability engineering than I expected, and they make one old distinction much more important. The incident that best shows which distinction is one you have probably heard about, though the part that matters is not the part that made headlines.

This is also the first piece in a series on one question: when producing code gets cheaper but judgment, validation, and coordination don't, what happens to the engineering organization? I state it up front because it is the scope. Failure is where the series starts, because you cannot work out where judgment has to sit until you know what these systems do when they fail.

A Replit agent deleted production data during a stated code freeze. [Replit CEO Amjad Masad confirmed the incident](https://x.com/amasad/status/1946986468586721478), and the company subsequently introduced stronger separation between development and production environments. The deletion itself is familiar territory. Permissions, backups, destructive operations, environment isolation: every one of those controls was implicated in the usual ways.

What happened afterward is the interesting part. The agent told the operator that rollback was impossible.

It was not.

The operator ran the rollback successfully, and [his correction is part of the incident record](https://incidentdatabase.ai/cite/1152/). The deletion was a conventional failure amplified by weak boundaries. The false rollback claim was something else.

## The rule

The lesson is not that an LLM "lies" or possesses some special kind of internal state. It is more practical: **a model-generated statement about the state of the surrounding system is not a measurement of that state.**

If the agent says a backup does not exist, that statement is not a backup check. If it says a deployment succeeded, that statement is not a health signal. If it says a payment destination is valid, that statement is not verification of the account.

Anthropic's [Project Vend](https://www.anthropic.com/research/project-vend-1) produced a clean example of that last case. In its first phase, the store-running agent invented a payment account and represented it as a real destination for funds, and nothing in the output distinguished the fabricated account from a real one. Conventional software surfaces stale or misleading state all the time, but a status page does not compose a confident paragraph explaining why the money went to the right place.

The architectural rule follows directly: the system that takes an action should not be the sole authority on whether the action succeeded or what state resulted from it. If an agent changes a database, measure database state. If it deploys software, observe the deployment independently. If it touches money or a security boundary, verify the resulting state through an authoritative external system. This is standard black-box engineering. When the internals are hard to reason about, put trustworthy sensors on the boundary and measure what actually happened.

The rule has limits worth stating. Some outputs have no oracle. A generated architecture proposal, a triage decision, a summary of a long document: no external system can confirm correctness the way a query confirms a row count. For those, the rule degrades into something weaker but still useful. Know which of your agent's claims are checkable against external state, check the ones that are, and treat the rest as unvalidated by construction.

The tempting patch for oracle-less outputs is to make a second model the oracle, and the published record on that is worth reading carefully, because it is narrower than either the enthusiasm or the dismissal suggests.

LLM judges have been shown to favor their own outputs. GPT-4 markedly so in [a 2024 study of eight models](https://arxiv.org/abs/2410.21819), though the effect is not universal in that same study: three of the eight rated their own outputs lower rather than higher. [A 2026 study](https://arxiv.org/abs/2606.20093) found no detectable self-preference at all across four model families under a verifiable task. The 2024 paper's own explanation is familiarity rather than identity, which is to say a judge prefers text it finds less surprising whether or not it wrote it. That is a real effect with a disputed size, and it is not the same claim as "models protect their own kind."

Automated graders have their own version of the problem, and it is better measured. [METR found](https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/) that roughly half of the AI-generated pull requests that pass SWE-bench Verified's automated grader would not be merged into main by the repositories' own maintainers, a gap of about 24 percentage points between benchmark score and maintainer acceptance, from 296 patches reviewed by four maintainers across three repositories. That grader runs unit tests rather than a model, so this is evidence about benchmarks rather than about judges. The direction is what carries: the automated check said yes and the humans said no, about half the time.

Spotify ran the production version of the experiment. It added an LLM judge to [its Honk agent pipeline](https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3), where the judge vetoed about a quarter of agent sessions, and later removed it. [As reported from Spotify's QCon London talk in March 2026](https://www.infoq.com/news/2026/03/spotify-honk-rewrite/), the team found it too rigid, blocking valid changes, and dropped it as models improved and verification written into the prompts proved sufficient. Note the second reason: the judge was outgrown as much as it was rejected.

A model reviewing a model can be a useful filter. It is not an oracle. Beyond that, I have not found published, transferable field data on what boundary instrumentation costs across environments, and until that data exists I would be suspicious of anyone's number, including my own.

## Familiar vocabulary, familiar controls

I expected LLM failures to strain the conventional dependability taxonomy more than they do. The canonical taxonomy from Avizienis, Laprie, Randell, and Landwehr ([2004 technical report](https://drum.lib.umd.edu/bitstreams/ed07fa96-e4d6-4b39-a466-b3c19f9d580a/download)) already permits failures to be subjective and disputable, and it names elusive faults, whose activation is not systematically reproducible. Even some LLM nondeterminism has boring causes: [Thinking Machines Lab has attributed one source](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) to floating-point behavior under changing batch conditions. The model changes the implementation details. It does not repeal systems engineering.

The documented incidents say the same thing about controls. An agent that [deleted a production database and its volume-level backups in a single API call](https://www.theregister.com/2026/04/27/cursoropus_agent_snuffs_out_pocketos/) held credentials that allowed it and faced no confirmation gate. A triage bot that [let an unauthorized release stay live for eight hours](https://snyk.io/blog/cline-supply-chain-attack-prompt-injection-github-actions) had a GitHub issue title interpolated straight into its prompt and permissions broad enough for that to matter.

What those incidents do and do not establish is its own question, and the method I use to answer it is set out on [the standards page](/standards/) this series is held to. The design point here is simpler. If a model follows hostile text as an instruction, model behavior is part of the failure, but the surrounding system determines what that behavior is allowed to become. Environment separation, least privilege, confirmation before destructive operations, explicit handling of untrusted content entering prompts, reversibility, and narrow tool scopes decided the blast radius in every one of these cases. The confirmation dialog is annoying right up until it is the only thing standing between a plausible-sounding plan and an empty database.

When the component is probabilistic, the surrounding system should be less so.

We can control the boundary.

## Where validation stays expensive

That engineering effort shifts from generating artifacts toward evaluating them as generation gets cheap is a reading rather than a finding, so it is worth being exact about what stands behind it.

Two data lines arrive at rising delivery instability from different methods and different commercial stakes. [DORA's 2025 report](https://dora.dev/dora-report-2025/) surveys roughly five thousand professionals. [Faros AI's 2026 report](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) draws on two years of delivery telemetry from twenty-two thousand developers. Both find that AI adoption coincides with rising instability. They do not agree about what protects you: Faros states plainly that its data contradicts DORA's finding that strong engineering foundations amplify AI's benefits. Two interested publishers, two methods, one shared observation and one live disagreement. That is what the evidence actually looks like, and flattening it into "the industry is converging" would be the first thing this series is supposed to refuse.

First-party engineering accounts point the same way about where the work goes. Spotify says it is [learning where to apply human judgment](https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint), auto-merging what is safe and focusing review where it matters most, under a 76% increase in pull requests to review. Anthropic has published two accounts of how it gates AI-generated work, [one from its Deputy CISO in July 2026](https://claude.com/blog/how-anthropic-secures-its-ai-native-software-development-lifecycle) and [one from a Director of Engineering in June 2026](https://claude.com/blog/running-an-ai-native-engineering-org), describing automated deterministic and agentic review with humans inserted at the highest-leverage points. Every one of those is a company describing its own systems. That is a record of what was done, and it is never evidence that it worked.

What the aggregate framing hides is that the shift is not uniform, and the structure of the non-uniformity matters more than the aggregate.

Validation cost is governed by two variables that are easy to conflate. The first is reversibility: what it costs to be wrong. The second is verifiability: what it costs to find out, which is a function of oracle availability and detection latency. They are different variables, and the instructive cases are the ones where they come apart.

Where a change is reversible and verifiable, validation can ride the same cost curve as generation. A refactor under strong test coverage, a UI change behind a flag: generated tests, simulation, and runtime checks absorb most of the burden, and autonomy can be generous because failure is recoverable and detection is fast. You can let an agent rewrite a README all day. Generous is not free, though. DORA's 2025 report tested whether AI adoption weakens the harms of instability and found no evidence of such a moderating effect: instability still has significant detrimental effects on product performance and burnout, which can negate any perceived gains in throughput. This quadrant is where autonomy belongs, not where its costs disappear.

Where a change is reversible but hard to verify, the binding constraint is not blast radius but detection latency. A recommendation-system change can be rolled back in seconds and still have business effects that take weeks to surface. Cheap rollback does not help when the expensive part is knowing you should roll back.

Where a change is destructive but well-oracled, more automation is defensible than instinct suggests. A schema migration with well-specified invariants and mature migration machinery can be validated mechanically to a high standard. The confirmation gate stays anyway, because the cost of the oracle being wrong once is the database.

And where a change is destructive and hard to verify, which is where security boundaries, financial actions, and anything whose failure propagates faster than you can observe it tend to live, the model's own account of the outcome is at its most tempting and least admissible, per the rule above. This is where human time concentrates today. A survey of [86 practitioners with deployed agent systems](https://arxiv.org/abs/2512.04123) is consistent with that shape, with 68% running at most ten steps before human intervention and 74% relying primarily on human evaluation, though it cannot distinguish deliberate design from current limitation.

So effort does not move uniformly toward evaluation, and it does not split cleanly in two either. It concentrates where irreversibility meets weak verification. If you want to know where judgment will sit in an engineering organization, start by following the operations that are hard to undo and hard to check.

Organizations are already building to roughly that shape, in their own accounts of themselves. Spotify's pipeline automates the mechanical verification, the formatting and building and testing, and reserves human review for what the company judges to matter most. Anthropic's security account is the more explicit one about the axis: hard access and identity boundaries to contain the blast radius, automated review before and after production, and humans inserted at the highest-leverage points. What nobody has published is independent evidence that any of it restores defect rates or delivery stability. Adoption is documented; efficacy is not. So the concentration claim remains a working model, with some first-party convergence behind it and no outcome data, and it is still the first claim in this series I expect the evidence to be able to break.

## Why failure modes came first

This piece leads the series for a specific reason. These models can be wrong about the world, wrong about their own actions, and wrong about your system's state, and the output carries no signal that distinguishes any of those from being right. A stale cache serves stale data; it does not compose an argument for why the data is fresh. Designing systems that stay safe when confidence and correctness are uncorrelated at the interface, deciding which claims need external verification, which operations need gates, and how much autonomy an unverifiable outcome can carry, is not preliminary to the judgment problem. It is the judgment problem, in its technical form.

The organizational form is who owns those decisions, how they scale when one engineer supervises far more generated change than they could ever write, and how anyone acquires that judgment if implementation stops providing the repetitions.

I should say where I am standing while I argue that. I carried technical strategy and architecture across a technology org of 200-plus through the first years of this transition, with a direct engineering org of about ninety for the last of them, and I got to observe the effects and teach what I saw. I did not get to enact my conclusions and measure the consequences before the org changed under me. That is the honest limit on everything above, and it is the reason the standards page exists.

It is also why I trust the record over my own first read of it. Through 2025 I was the skeptic on our AI push. The wins were real and they were not systematic at our scale, and the retooling and governance they demanded cost about what they saved. By spring 2026 our own power users flipped me. One of my managers instrumented a multi-petabyte pipeline I had been told was effectively unobservable, in weeks, and time to first commit in legacy repos fell from months to weeks. Anecdotes, not measurements. Enough to dig.

The two forms of the problem are not separable, and the next piece takes up the organizational one.

If your operating experience puts the expensive validation somewhere else, tell me where this model breaks.
