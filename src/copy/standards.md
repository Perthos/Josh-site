The hardest problem in making architectural decisions about AI systems right now is not a shortage of evidence. It is the condition of the evidence.

[The Register reported](https://www.theregister.com/security/2026/08/03/ai-slop-pollutes-the-cve-pipeline-with-fake-vulns/5282462) six SQLite vulnerabilities, some carrying CVSS scores as high as 9.8, that were subsequently described as fabricated and likely AI-generated, moving through a vulnerability pipeline with no mandatory reproduction checkpoint and a substantial backlog. A [systematic replication effort covering thirty highly cited AI studies](https://arxiv.org/abs/2412.17859) reported full or partial reproduction for 86% of studies that shared both code and data, against 33% for those that shared only data. Neither result says to distrust the field wholesale. They say the evidence layer deserves the same scrutiny as the systems it describes.

I use three questions before I let a claim influence a design decision. Each is easier to show than to state, so here they are, worked through the incidents that taught me to ask them.

## Incident, or rate?

In the PocketOS incident, an AI coding agent deleted a production database and its volume-level backups in a single API call. [The account of the incident](https://www.theregister.com/2026/04/27/cursoropus_agent_snuffs_out_pocketos/) describes a credential mismatch in staging and a destructive command with no confirmation check.

That incident proves a reachable state, not a frequent one. The difference supports very different decisions. "An agent holding production credentials with no confirmation gate can destroy backups" justifies the specific controls that would have contained it. "Agents routinely delete databases" would justify far more drastic conclusions, and PocketOS is not evidence for it. The same discipline applies to Replit's production deletion during a code freeze: it demonstrates that an agent can take a destructive action and then generate an incorrect account of the resulting system state. It says nothing about how often comparable systems do.

The strongest incident reporting gives you a denominator. The [UK AI Security Institute's report on unsanctioned agent behavior during cyber testing](https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing) does this well: 122 runs, 10 involving unsanctioned autonomous action, no evidenced real-world harm. That is far more useful for decision-making than the incident alone, and it is rare. When all you have is the incident, use it to reason about blast radius, not frequency.

## What incentives surround the evidence?

In the Cline supply-chain incident, [a GitHub issue title was interpolated directly into a triage bot's prompt](https://snyk.io/blog/cline-supply-chain-attack-prompt-injection-github-actions). Combined with overly broad permissions, that path allowed an unauthorized release to remain live for roughly eight hours.

The incident is well documented, but notice where the documentation comes from: a security vendor whose business benefits from the finding being taken seriously. That does not make the account wrong, and in this case the technical details hold up. Interested evidence is not worthless evidence. It is another variable to weigh, and it matters most where the stakes are highest.

The prompt-injection defense literature is where I weigh it hardest. [AgentDojo reports](https://arxiv.org/abs/2406.13352) a tool-filtering defense reducing attack success to 7.5% in its evaluation. An [adaptive-attack evaluation](https://arxiv.org/abs/2503.00061) reports bypassing all eight defenses it tested at greater than 50% success. Neither paper invalidates the other. Together they show that benchmark results are conditional on the threat model, the attack, the implementation, and the evaluator. A defense evaluated only by its authors may still be an excellent defense. I want independent evaluation before the number carries architectural weight.

## Count origins, not outlets

Here is the version of that discipline that cost me the most, because I got it wrong in public drafts of this page.

The claim I was carrying: when Amazon required senior sign-off on changes to its Tier-1 systems after a production outage, the story ran across many outlets, but every account traced to a single internal memo reported by CNBC. One origin carried by twenty outlets is one source, not twenty.

The principle is right. My count was not. [The Register's report](https://www.theregister.com/2026/03/10/amazon_ai_coding_outages) attributes the briefing note to the Financial Times, which reported it first, and CNBC reported separately from its own view of an updated version of the document. That is two document-holding newsrooms, not one, which is a materially different evidentiary position from the one I was asserting.

The substance is contested as well. [Amazon published a correction](https://www.aboutamazon.com/news/company-news/amazon-outage-ai-financial-times-correction) stating that reports it had introduced new approval requirements for engineers working with AI tools are false, and disputing that AI-written code caused the outages. [Secondary coverage describes](https://www.thesafetymag.com/ca/news/general/amazon-imposes-90-day-code-safety-reset-after-outages/547354) a ninety-day reset covering roughly 335 Tier-1 systems. Both origin newsrooms sit behind paywalls I could not read, so I cannot check the memo's wording against the document myself, and whether any such measure is still in force is not publicly established. On its own terms the reported window closed around June 2026.

Republication is still not corroboration. But counting only works if you actually count, and what I had been repeating was somebody else's summary of the fan-out rather than a count of it. The failure mode is not usually a missing document. It is a term or an attribution migrating from the source that earned it onto the source that gets cited for it.

## What inference does the primary source actually support?

A Canadian tribunal ordered Air Canada to compensate a customer after incorrect information from a website chatbot. [The decision](https://s3.amazonaws.com/IGG/AI+Part+1+-+Materials/Moffatt+v.+Air+Canada.pdf) held the company responsible for information presented through its site.

The case is widely cited as an AI liability precedent. Read the decision and something is missing: the text repeatedly refers to a chatbot but never identifies the underlying system as AI, a large language model, or machine learning. That gap is irrelevant if the proposition is that companies can be held responsible for incorrect information delivered by an automated customer-facing system. It is decisive if the case is offered as proof that courts have already established LLM-specific liability. The primary source supports the first inference. It does not establish the second.

The distance between what a source says and what it gets cited for is where most bad architectural reasoning in this field currently lives. Not because the sources are dishonest, but because each retelling shaves off a qualifier, and by the third retelling a tribunal decision about a website chatbot has become settled AI case law.

## Where this leaves a decision-maker

Recommendations and requirements exist. [Fourteen authors have proposed principled design patterns](https://arxiv.org/abs/2506.08837) for prompt-injection resistance. The [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28) carries explicit consent requirements, and relevant [EU AI Act obligations](https://artificialintelligenceact.eu/implementation-timeline/) are moving into applicability. What none of this yet provides is transferable effectiveness evidence: how much a given practice reduces production risk in your environment, on your workloads, against your threat model.

Until that evidence exists, the reading discipline is not overhead. It is the substitute for the field data the industry does not have. This page is the standard everything I publish is held to: separating what has been demonstrated, where evidence is converging, and what remains a judgment call, and labeling which is which. When a piece in the series says "this is a call, not a finding," this page is what that label means.

## Where the models sit

AI is inside this workflow, and it is worth being exact about where, because these pieces argue that the boundary is the part you control.

Research runs on commissioned questions. A model audits the commission's framing for bias before any evidence is gathered, a separate run does the acquisition and drafting, and an independent adversarial pass, on a different model family in a clean context, exists to attack the result. The first thing that pipeline caught was me, commissioning my own conclusion.

The models do production: exploring questions, locating candidate sources, drafting, editing. They do not carry accountability. Every numeric or attributed claim is checked against a named primary source with a live link, or it comes out of the text. Critical quotes are checked against the source document. No model output is ever cited as a source. The first piece argues a model's statement is not a measurement, and that rule applies to this site before it applies to your systems.

The judgment stays with me. I frame the questions, rule on what ships, and sign every release. Where a piece makes a call past the evidence, the call is mine and it is labeled. A phrase a model proposes does not enter my voice until I adopt it deliberately, and the ones I decline come out.

The first piece, [on why model output is not telemetry](/writing/model-output-is-not-telemetry/), is this method applied to the incidents above and cashed out as architecture.

If you have primary sources that break these readings, send them.
