An architectural decision often has to be made before the evidence is complete. I want to know what a source actually establishes, what is still uncertain, and which part of the decision is mine.

## Start with the claim

An incident can show how a failure happened without telling us how often it happens. A company can describe a control without showing that it reduces defects. A test can establish something about the behavior it exercises while leaving other behavior unchecked.

Those are different claims. Before carrying one into a design, I ask what was observed, how it was measured, and how closely the conditions match the system I am deciding about.

I also look for what would change the conclusion. If I can only name evidence that agrees with my preferred answer, I have more work to do on the question.

## Read through to the source

When a piece uses a numeric or attributed claim, the source should be named and linked so a reader can inspect it. A summary is useful for finding material, but its interpretation still needs checking against the underlying record.

Several articles repeating the same account do not supply several independent observations. A vendor's report can be useful, but I want to understand its method, incentives, and limits before relying on the result. The same questions apply to a source that supports my own view.

When I cannot inspect the evidence needed for a claim, I narrow the claim or leave it out.

## Keep the decision visible

Evidence can inform a choice without proving it will work in another organization. When I recommend an approach, I want the reader to be able to distinguish the observed result from my reasoning about what to do.

That includes the consequences of being wrong, the checks available, and what could be changed if the approach fails. Uncertainty does not remove the need to decide. It changes what I would be willing to expose to the decision and what I would watch afterward.

[Model output is not telemetry](/writing/model-output-is-not-telemetry/) works through that problem for AI systems: what has been checked, what remains uncertain, and who can authorize proceeding.

## Where AI helps

I use AI to explore questions, locate candidate sources, and help draft and edit. The research process also uses separate passes to challenge framing and findings. Those checks can expose errors; completing the process does not by itself establish that a conclusion is right.

Model output is not a source of evidence about the external world. The underlying sources, the limits of what they show, and the reasoning connecting them need to remain inspectable. I decide what to publish and remain responsible for it.
