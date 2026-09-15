---
title: Model output is not telemetry
description: "What should count as evidence when an AI system reports what happened, and what still requires a person's decision?"
date: 2026-08-25
updated: 2026-09-14
---

I started this work expecting LLM-based systems to require a larger break with familiar engineering practice than the cases have justified. The incident that best explains where I landed is one you have probably heard about. The part that matters is what happened after the database was deleted.

Jason Lemkin reported that a Replit agent deleted production data during a stated code freeze. It then told him that the database could not be rolled back. He tried the rollback, and it worked. His [account includes the correction](https://threadreaderapp.com/thread/1946064586181881973.html).

The deletion raises familiar questions about permissions, environment separation and recovery. The false rollback claim raises another: what happens when the component that acted also supplies the operator's account of what happened and what can be done next?

A recovery mechanism can exist while the interface tells you that recovery is impossible.

## The rule

**A model-generated statement about the state of the surrounding system is not a measurement of that state.**

If an agent says a backup exists, that statement is not a backup check. If it says a deployment succeeded, that statement is not a health signal. The model may have interpreted real evidence correctly. The engineering question is whether you can inspect that evidence without depending on its interpretation.

I would make consequential state claims traceable to the system that can establish them. A deployment check should identify the running version and test the behavior that matters. A recovery check should establish what can be restored and what data would be lost. The agent's explanation can help someone investigate. It should not substitute for those checks.

That changes how I would build the interface, too. A reassuring paragraph should not turn a failed check green. A missing result should remain missing. If the model says the deployment is healthy while the health check fails, the system should preserve that disagreement and block whatever requires a passing check.

Spotify described a concrete version of this in its [Honk coding-agent pipeline](https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3). Verifiers handle formatting, building and testing outside the agent's reasoning. The surrounding machinery runs the relevant checks before opening a pull request, and a failed verifier prevents the PR from opening. The useful design detail is that the check has an enforced consequence.

This does not make tests complete or telemetry infallible. A passing test establishes what that test covers. A successful restore establishes something about recovery, not whether deleting the data was authorized. The evidence needs to match the claim.

## Where the checks run out

Some claims admit direct checks. Others require evaluation against incomplete or disputed criteria. An architecture proposal can satisfy every stated constraint and still be a poor choice. A summary can get its facts right and leave out the thing the reader needed to know.

Those outputs are not wholly unverifiable. Check their factual claims and explicit constraints. Then identify the judgment that remains. Calling the whole artifact either correct or uncheckable hides that work.

A second model may help with it. In [Wealthfront's account of its review system](https://eng.wealthfront.com/2026/08/03/experiments-with-ai-code-review/), models investigate possible defects from opposing positions and return evidence for an adjudicating model to consider. Engineers rated the resulting comments more favorably, principally because unwanted comments fell. Wealthfront kept human peer review as the blocking step. That is a reported improvement to a review process, with internal ratings as its measure. It does not establish how many production defects the process prevents.

Adding a human does not resolve the remaining uncertainty by itself, either. An approval can record permission to proceed without establishing that the person understood the change or could detect its important failures. If their only evidence is the agent's explanation, the original problem is still there.

Verification and authorization therefore need separate answers. What has been checked? What remains uncertain? Who can accept that uncertainty, and on what basis? A person may reasonably authorize a bounded experiment without knowing its outcome. The system should represent that decision accurately.

## What the human-review research actually gives us

I have commissioned repeated work on where human judgment sits, how checkpoints are used and what happens to review as generated change increases. The results have not given me a validated allocation rule I could tell another engineering organization to adopt. They have produced specific practices, partial measurements and unresolved disagreements.

One [longitudinal preprint covering 802 developers at an AI-forward company](https://arxiv.org/html/2607.01904v1) makes the difficulty concrete. As output grew, the share of pull requests receiving a recorded human review fell from 89% to 68%. Reviews containing human-written comments also became less common. Yet merge and revert rates stayed broadly stable. The authors explicitly limit those outcomes: they are coarse measures that miss defects, incidents and maintainability. Review records also cannot tell us everything a reviewer understood or checked elsewhere.

That study supports neither a claim that human oversight has become unnecessary nor a claim that reducing it inevitably damages quality. It shows why counting approvals or reverts alone will not settle the question.

There are published ideas about how to allocate review. [Ona describes an explicit policy](https://ona.com/stories/auto-approving-low-risk-prs) that permits automated approval for a bounded set of changes and excludes migrations, authentication, infrastructure and monitoring changes. A human retains the merge action; changing the criteria, review prompt or model requires a named leader's approval. The policy makes the delegation inspectable. It does not establish that the classifier reliably recognizes every change that belongs outside its authority.

There is positive outcome reporting, too. [Customer.io reports no production incidents after more than 500 AI-approved PRs over three months](https://customer.io/learn/how-we-work/how-we-taught-ai-to-approve-pull-requests). It describes evaluating complexity, risk and supporting evidence separately, and routing changes beyond its thresholds to humans. That is a local result worth examining. It is not a comparison establishing the safety effect of the approval policy, or a basis for copying its thresholds into another system.

The gap is more specific than a lack of ideas. These accounts do not tell me how much human review a different organization needs, whether its reviewers can perform the work assigned to them, or how to establish that their contribution remains effective as the workload changes. A control can be sensible enough to try before anyone has demonstrated how well it works. Its presence should not be reported as proof of its effectiveness.

## The call I would make with that uncertainty

I would start with the consequences of a particular action and the evidence available before those consequences become expensive. Reversibility and verifiability help organize that assessment, but neither is a property of an entire domain.

A payment may be easy to confirm as completed and difficult to reverse. Whether it went to the intended recipient is a separate check. A recommendation-system change may roll back immediately while its effects on customer behavior take weeks to recognize. Restoring the previous configuration does not undo what happened during those weeks.

Where relevant checks are fast and recovery contains the consequences, I would give the agent more room to act. Where the damage can arrive before the evidence, I would constrain the action in advance: a narrower permission, a smaller exposure, a staged operation, or a requirement that somebody authorize a specific risk. Human confirmation earns its place only when the person can make a decision the system needs made.

For a destructive migration, for example, I would want the proposed transformation, the checks against representative data, the recovery evidence and the remaining uncertainties available to the approver. I would also require an explicit decision about what loss or interruption is acceptable. If nobody can assess the critical uncertainty, another approval click does not fix it. The operation may need to be redesigned or withheld.

These are the decisions I would make under uncertainty, not a measured recipe for safe autonomy. I would test the review process as well as the code: have reviewers assess a sample before seeing the agent's verdict, compare what each found, and trace later defects back to the checks that were supposed to catch them. That would give the team evidence about its own controls. It would not give it a universal defect-detection rate, especially for rare failures.

Review capacity would also constrain how much work I admitted. If we cannot evaluate the changes that require evaluation, generating more of them does not discharge that obligation.

## Verification can get cheaper too

I do not assume the current division of labor is permanent. The tools producing more work can also help build tests, investigate failures and make systems easier to observe. Whether that reduces total evaluation effort depends on what those checks establish and what it costs to maintain them.

I have a reason to keep that possibility open. One of my managers instrumented a terabyte-scale pipeline I had been told was effectively unobservable, in weeks. That was an anecdote, not a measurement of AI's effect. But it changed where I looked. If instrumentation can become cheaper, then part of the verification problem may become cheaper with it.

That leaves an empirical question about which checks improve, which uncertainties remain and who carries them. I have not found an answer in the published work I reviewed that settles the allocation across organizations. I also have not found a reason to treat human judgment as an inexhaustible resource whose effectiveness needs no measurement.

The Replit rollback is the small version of the problem. The system had a capability its own account denied. Whatever combination of models, tests and people we build around the next system, I want consequential decisions tied to evidence we can inspect, and unresolved uncertainty visible to the person accepting it.

If you have changed where review sits, I want to hear what you checked afterward: what reviewers caught, what still escaped, and what the new process cost.
