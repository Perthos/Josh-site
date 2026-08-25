A set of sayings I use as design principles and thinking triggers, written down so the reasoning behind them can be shared — and, more to the point, so the people I work with can eventually operate the way I do without me in the room.

## Why this exists

Over the years I've collected about eighteen phrases that I reach for again and again — some borrowed, some inverted, a few probably my own. Some context for who's talking: I'm an SVP of engineering running an org of about 80 people, and chief architect for a technology org of 250-plus — a path that ran from electrical engineering through software, product, and back (Tableau was a formative stretch of it; you'll see it come up). This document is written for a specific audience: the small group of cross-functional architects I lead directly and am deliberately growing into technology leaders. They noticed I kept deploying these phrases and asked me to write down what's actually underneath each one, so they're not just catchphrases but transferable tools. That's the whole intent. I'm not looking for credit for these phrases any more than I'm looking for credit for my code. What I want is to grow technical leaders who can replace me one day, and this is part of how I hand over the reasoning. (If you're reading this from outside that group — welcome; the jargon assumes you build and run systems for a living.)

A few things to know before you read.

These are a toolkit, not a checklist. They interlock. Several of them only land once another one is already in place — "10,000 monkeys" doesn't mean much until you've internalized "married to problems, not solutions," and half of them are really the same idea viewed from a different boundary. Read them as a set that hangs together, not as a numbered list to march through.

The grouping below is deliberately loose. I've put related ideas near each other so the document reads with some flow, but the movements aren't boxes. Plenty of these could sit in two or three places at once, and when a principle lands somewhere unexpected, that's usually the interesting part. Don't let the headers become a cage.

Four threads run through almost all of them. If you only take four things from this, take these:

* Everything is a system. Literally everything — code, infrastructure, a team, an org. A system is just a boundary you draw; move the boundary and the definition changes, but the core concepts stay the same: measurements, feedback loops, behaviors, interactions. People systems and technical systems obey the same logic; the difference is that in a people system, every component has an autonomous will and acts (roughly) to its own incentives — which makes incentives your points of leverage.
* You change systems through feedback loops, not force. You don't yell a system into a new state; you change the loops and incentives so it self-corrects toward the outcome you want. The full version of this lives in the accountability-loop entry — it's the single most recurring idea in the set.
* Trust what's observable, not what you believe happens inside. This is the foundation the whole set is built on, and it comes out of my electrical-engineering training: complex systems — especially human ones — are effectively unmappable, so you treat them as a black box. Put your sensors at the boundary, measure the outputs, and don't fool yourself that you know the internals. Verification is instrumentation, not surveillance.
* Marry the problem, not the solution. Care about what you're solving and who you're solving it for, not the artifact you built. Attachment to the artifact is the thing that blinds you.

Prior art lives in the appendix, on purpose. Most of these stand on known shoulders — a Russian proverb, a statistician, a Frost poem I accidentally inverted, a VP's dry joke on a call. I've pulled the lineage out of the entries and collected it at the back so it's visible for anyone curious, without cluttering the working meaning. Standing on those shoulders is a feature, not something to bury.

## The principles at a glance

1. Become married to problems, not to solutions — care about the problem and the person, hold the artifact loosely.
2. Always come from a place of curiosity — the higher you go, the more signal degrades; curiosity is how you keep it flowing.
3. Always assume good intent — especially over text; you don't know what someone means until you ask.
4. Trust but verify — cultivate trust, then instrument the outcome so the loop reinforces the trust.
5. The lightbulb really needs to want to change — no willingness, no change; move the incentives, not your voice.
6. 10,000 monkeys on the other side of the wire — the system is the outcome it produces, not the code you wrote.
7. What good looks like? — define success, and define it from whose perspective.
8. Inputs, Outputs, Outcomes — decompose the too-big outcome down to the thing a team can actually build.
9. Role clarity is the root of performance effectiveness — you can't hit an expectation you can't see.
10. Good neighbors, good fences — clear boundaries are what let you be neighborly across the line.
11. Vision, mission, values / the accountability loop — direction plus the machinery that makes it real; no audit, no accountability.
12. Local autonomy, global outcomes — shape local incentives so teams optimizing for themselves still pull toward the global outcome; sized to what entropy you can afford.
13. The more complex the system, the simpler the components must be — and the interface between components is what actually matters.
14. All models are wrong. Some are useful. — every diagram is a model; leaving things out is the point.
15. Every global process is a tax — it may buy you something, but everyone pays impedance; count the cost.
16. Scalable system: works in spite of me, not because of me — robust to your absence, not dependent on your presence.
17. Build, Buy, Partner, Kill — a decision frame; the Kill is the part people forget.
18. Target rich environment — when it's a mess, that's leverage everywhere; pick a target and make a difference.

## Posture — how I show up to the work

### Become married to problems, not to solutions

The oldest and, in a lot of ways, the foundational one. I picked it up early as a software engineer, watching people get intensely attached to what they'd built. It's the thinking-level version of a lesson from infrastructure — cattle, not pets: your systems shouldn't be precious, they should be reproducible. I noticed the same preciousness in how engineers felt about their code, and when I moved into product the framing sharpened. The common advice was "don't be married to the solution," which is just a warning. Flip it into "be married to the problem" and it becomes an active stance you can actually stand on.

Core meaning. Attachment to the artifact creates a blind spot toward why you were doing it in the first place. When you're defending what you built, you literally can't see the better option someone else is putting on the table — it limits what registers as possible. Being married to the problem does the opposite: it keeps you tethered to the value you're delivering and to the person you're delivering it for, which makes you more invested, not less — because you care whether it works, not whether you get credit for it. When you stop driving toward credit for the solution, you not only solve things better, you position yourself to grow as a builder. In a healthy organization — the kind where we should all want to be working — that orientation compounds into career success, because those are the places that recognize problem-solvers over artifact-defenders. I've lived both sides of this: every time I've been too attached to a thing I built, I've missed the opportunity to evolve it.

This is a learned skill, not a temperament. Worth saying plainly, since this doc exists to grow people: it did not come naturally to me. Early on it was genuinely challenging, and I had to do a fair bit of cognitive restructuring to align myself to it. If it feels hard, that's not a sign you're the wrong kind of person — it's the normal cost of the rewiring.

How I use it, and the tell. Mostly with architects and engineers, and constantly on myself. The warning sign is defensiveness — when a conversation about what a system does curls into blame directed at a person. Underneath the defensiveness is inflexibility: an inability to take critique, or to genuinely entertain "what else could we have done here." The internal check I run is grounded in two questions — why am I doing this thing? and why am I doing it this way? If I can rationally justify the design against the actual problem, I'm probably fine. If I catch myself defending it in terms that sound emotional, I've drifted into marrying the solution. The emotional anchor that makes this work is empathy: when I've done the work to understand who I'm building for and what the value is to them, I can let go of the artifact because I'm holding onto something better.

Links. This is the ground the product-oriented principles stand on. "What good looks like" and "10,000 monkeys" don't really land until someone has made this shift first.

### Always come from a place of curiosity

Two uses, one more useful than the other. The obvious one is an internal leadership check — a reminder that I can't assume I already know the right answer. The more useful one is a catch for others: when people get frustrated with a design decision, or with how a colleague works, or can't understand what someone else is doing, the move is to stop marinating in your own context and get curious about theirs — the other person's, or the system's. Engineers get attached to what they build, and that attachment breeds bias and blindness; curiosity is the antidote.

The argument that makes it non-negotiable. The higher up you go as a leader, the more signal degradation there is between you and what's actually happening on the ground. That's one of the hardest parts of running a larger org. The more curious and open you are, the easier you make it for information to flow toward you, and the better your signal-to-noise gets. Lose the curiosity and you get the ivory-tower failure: your bias overwrites your view, and you stop hearing what people are actually telling you. For an architecture group that's trying to become influence leaders on technology strategy — people who guide without authority — this is the whole game. If you can't hear what people are saying, you can't lead them.

Reception. I get a lot of use out of it myself; it usually needs unpacking for others, because it's counterintuitive — it's a kind of introspection that only shows up once you're thinking about leadership philosophy. Engineers especially are trained to fight for ideas and to state with confidence what they believe is right. (Aside: it's the same confidently-wrong failure mode I see in LLMs, minus the sycophancy.)

### Always assume good intent

This pairs with curiosity — it's a catch about assumptions, and it's especially load-bearing in an asynchronous, distributed org where most communication is written. Text is wide open to interpretation; how you read a Slack message depends enormously on who you are and what mood you're in.

Two uses. First, a catch for myself: when I notice I'm reacting badly to something, I stop and ask — is that actually what they meant? If I assume good intent, does the framing change? Usually the person wrote something off the cuff without seeing the implication I'm reading into it — or I'm projecting a bias about them onto their words. Second, a coaching tool: helping people internalize that you do not know what another person is thinking until you ask, and over text you especially don't. Absent the question, you're just painting your own biases and emotional state onto whatever you read.

Why it's a forcing function. You cannot assume bad intent and stay curious — they're incompatible. Assuming good intent forces you to actually ask. For distributed teams that's operational, not just nice: misread messages cascade into friction, bad decisions, and attrition.

### Trust but verify

I got this from my first boss out of engineering school and assumed for years it was a generic idiom. The original context was memory chips — I was fresh out of college and didn't fully know what I was doing, and a mistake in the test space could fry tens of thousands of dollars of chips and burn scarce hardware time. So he layered it: trust your tools, but validate the real-world output — lean on the bench tester, check the signal on the scopes. Trust the process; verify the output. Worth saying clearly: this is not zero-trust — the security posture that starts from assuming nothing and no one can be trusted. Here you start from trust; the appendix has the lineage.

How I use it now. It's become a leadership principle about how you build an empowered org — and to have an empowered organization, you must cultivate a psychologically safe one, because people will not use autonomy they expect to be punished for using. You have to trust that people will do the right thing given the right boundaries, guardrails, and direction. And at a system or outcome level you have to have something you can verify — a signal out of the system, whether that system is mechanical or made of people. Trust is vital and it is not enough; accountability requires a feedback loop, and the loop is the "verify" part.

The crucial nuance. You do not start from the assumption that people are doing the wrong thing. Verification is instrumentation, not surveillance — you measure outcomes, not effort. "I trust you to figure out how; here's how we'll both know it worked." Structured that way, the loop reinforces trust instead of eroding it. Ties straight back to the accountability loop and role clarity — and it's the verification half that makes "local autonomy, global outcomes" possible at all: you can only grant real autonomy when the system tells you whether the outcomes are landing.

### The lightbulb really needs to want to change

The punchline of the therapist's lightbulb joke — "How many therapists does it take to change a lightbulb? One, but the lightbulb has to really want to change." I used to tell the whole thing; now the shorthand is enough.

Core meaning. The underlying premise is simple: a problem only exists relative to a desired change. If there's nothing you want different about a system, you don't have a problem — and if you're not changing anything, you're not solving anything. In a human or organizational system, the thing you're actually changing is people. Even a process change means people have to come along, and for that, they have to want to. If an org is genuinely resistant, no amount of yelling and screaming from a leader will move it.

The real work. Change the incentives so people want the change. When I deploy the phrase, it's a prompt to look at the forces balancing the system and rearrange them — the same lever as the accountability loop: you don't force a system to a new state, you move the loops so it self-corrects there. The line is also a reality check that stops leaders banging their heads against resistance: if people don't want it, you may not have found a problem worth solving — you may have just found your discomfort with the status quo.

## Aim — what I'm actually pointing at

### 10,000 monkeys on the other side of the wire

This one came from an old EVP of Development, and the monkeys are borrowed from the infinite-monkeys-at-typewriters bit — the point being volume of brute labor, not elegance. The company was engineer-driven and genuinely excellent at code and product quality, but we built shrink-wrapped software and were transitioning to SaaS — and the engineers kept writing perfect code that ran badly as a service, because it was designed for a desktop. At an all-hands the EVP said: if the best way to deliver the value customers want were to hire 10,000 monkeys and have them do the job by hand on the other side of the wire, then that's what we should do — because we're a business that provides a service. Fortunately for the engineers, the best delivery mechanism happens to be code, so they get to keep building. But the orientation has to be that what happens on the other side of the wire is what actually matters.

Why wire and not screen? Because in SaaS, the wire is the encapsulation boundary. All we send and all we get back are bits over the internet. There's a human on the far side of that wire, looking at a screen, interacting with what we built — but the thing that actually crosses is what goes over the wire, and thinking hard about that boundary is essential to how the system functions.

Core meaning, in layers.

1. A reality-check on user/outcome orientation. It yanks you out of implementation and asks what the actual job-to-be-done is on the other side. If you can't state it as "10,000 humans would do X," you've lost sight of the user.
2. A permission structure. If elegant code is not the best way to serve the customer, then elegant code is the wrong answer. Sometimes the simplest, messiest human workaround is the more honest solution.
3. Operations matter, not just code. This was the piece originally missing — the team thought about code, not operations. The code is not your system. The system is the outcome it produces or the service it provides — not the code you wrote. The quality bar moves from "is this code elegant?" to "does this work for the human on the other side, in production, at scale, with all the real operational mess?"

How I use it now. When someone's overdesigning, or talking about internals without understanding the outcome — a catchall for "is this actually the best way to solve this, or are you down a rabbit hole?" It works well, though partly on force of personality; the analogy doesn't land for everyone, and it lands best once someone already has a product mindset (which is why I usually establish "married to problems" first).

Callout — where the black-box habit comes from. The third thread in the intro — trust what's observable — has a specific origin: my electrical-engineering training. Sometimes you understand the system under test and sometimes you don't, so you put sensors on both sides of the circuit and measure the output. I don't often say "black box" out loud except around QA and test systems, but that instinct runs underneath everything here, and it's the flip side of the monkeys principle: both say focus on the observable outputs, not your assumptions about the internals.

### What good looks like?

Part of my core product philosophy. (Yes, the grammar is clipped — the full question is "what does good look like?", but the shorthand is how it comes out of my mouth, so the shorthand is the saying.) You cannot do good product work if you don't understand what "good" would even be for whoever you're building for. The question refocuses a conversation away from "I'm going to build this thing" toward "I'm going to solve this problem" — same DNA as "married to problems" and "10,000 monkeys."

The emphasis is on two words: good, and for whom. It's really "define success from whose perspective." You have to project a real user perspective or persona onto the solution before you can say coherently whether it's a good one.

Reception. Depends heavily on background. People without a product mindset need more unpacking — an engineer or architect can describe the mechanics of their system all day, but if they can't articulate the problem well, and then why this is a good solution to it from a persona's point of view, there's a deeper gap. Engineers are trained to optimize the system itself, not to think in personas and user outcomes.

### Inputs, Outputs, Outcomes

A decomposition model I got from a senior-director mentor at Tableau when I first changed disciplines and moved into internal-tools work — his model, not mine, and the program below was his too. It's how you take something too vague to act on and break it into something a team can actually build.

The ladder (you define it top-down, but it builds meaning bottom-up):

* Outcome — the system-level thing you want to change, and how you'll know it happened. It has to be concretely measurable or observable. By definition an outcome is large, complex, and too big to build — it spans an organization. Example: the "Continuous Delivery" program from that era, where success meant being able to ship code within about 24 hours at any point in time.
* Outputs — the capabilities that make the outcome possible; the things whose absence blocks the outcome from ever becoming real.
* Inputs — the next level down: the concrete things teams can actually build to generate those capabilities.

Why it works. It breaks the curse of vagueness. "We want continuous delivery" is too big to build; "engineering can ship code in 24 hours" is measurable; from there you work backward through outputs to inputs. It's the inverse of "10,000 monkeys" — monkeys asks what's actually happening on the other side?, and this asks how do I know I'm building the right thing to move the needle?

## Boundaries & accountability — organizing who owns what

### Role clarity is the root of performance effectiveness

This came from a leadership coach during my early days at Tableau, in the middle of a cultural evolution and hockey-stick hiring — the engineering org was roughly doubling every six months. We built a program ("Leadership 101") and put all engineers through it: a coaching course on recognizing communication styles and other ways of thinking, aimed squarely at engineers who don't naturally think that way. This was the coach's anchoring phrase.

Core meaning — it runs both directions.

* As an IC: if you can't see what your role is and can't picture what success looks like, you'll fail, or assume you will. You cannot achieve an expectation you can't see.
* As a leader: it's a constant self-check. Did I actually set that expectation? Did I define the boundaries of the role? Is it clear what I'm asking? If it isn't clear, two things follow — they'll never do it, and I'm not training them fairly, because I never gave them a real shot at the thing I was asking for.

Why the phrase works. It cuts through the noise. Not "communicate better," not "be more aligned" — just role clarity. That specificity is the point.

### Good neighbors, good fences

I got the truncated form (no "make") from a partner PM I worked with about a decade ago, back when I was an IC — he owned several services adjacent to functions I owned, so we lived on either side of exactly this kind of line. I flipped the word order without even realizing it — and only later learned the irony in the original: Frost's "Mending Wall," which popularized "good fences make good neighbors," is actually skeptical of the wall, a joke most approving quoters miss. The inversion turns out to matter: putting neighbors first flips the emphasis toward the relationship over the barrier.

Core meaning. It shares a foundation with role clarity. When the boundary of ownership is genuinely clear, then expectations are clear, accountability is clear, and negotiating across that boundary is clear. It's explicitly not about walls keeping people apart — strip away the artifact of the fence and it's about clarity of relationship: knowing where you end and the other begins so you can be neighborly across the line. Mutually understood boundaries that enable collaboration.

Where it bites. I learned this inside a product function of about a hundred people — as an IC PM, still learning the discipline, working with a partner PM whose services sat adjacent to functions I owned. That's exactly the situation the phrase is built for: everyone had to know what they owned, what others owned, and how to negotiate across those lines to keep everything running. At that scale, without the clarity you get unowned gaps, duplicated work, and finger-pointing.

### Vision, mission, values / the accountability loop

Two linked ideas that tend to get bundled together. I use vision/mission/values in the ordinary strategy sense, but with architects I lean hardest on vision and mission: for any project, program, or system change, be clear about your vision for the thing, be able to quantify what good looks like, and be clear about how you'll get there.

The accountability loop is the part I use most. It usually surfaces as a single question: where's the accountability loop? It's systems thinking — control theory — applied to people. Any system tends toward an equilibrium, so if you want to change one, your lever is the feedback loop you install to drive a new equilibrium. You can change the visibility of data, the output expectations, the role expectations, or put your thumb on the scale as the leader. But real change requires accountability, and someone actually holding it. It is not enough to tell a person "you're accountable for this" — there has to be a place and a mechanism where that accountability is checked and held. If nobody does the audit, there is no accountability. Direction without the machinery to make it real is theater; the two together are the point.

### Local autonomy, global outcomes

More a goal I drive toward than a catchphrase, and deeply tied to systems thinking and verification. The idea is to balance large-scale interactions you can't directly control: give local decision-makers full autonomy to do what they need, while the surrounding ecosystem carries the components, feedback loops, and boundary conditions that produce the global outcomes you want. This is as true for orgs as for services — to get strong teams, you manage the boundaries between teams while letting each move autonomously: set its own cadence, know what matters (the dream of agile that never quite manifests). I firmly believe you have to cultivate strong teams and local autonomy to get real innovation and creativity, rather than just people typing on keyboards.

The inversion is the part that matters most, and it's the part people miss. Complete local autonomy, with no guardrails and no larger thinking, is just chaos. By definition, if every local domain is free to optimize purely for itself, you get constant local maxima — and the sum of all that local optimization is a suboptimal, sometimes actively destabilized, global system. So the principle isn't "trust teams and let them run." It's a design problem: understand what each local domain is actually incentivized toward — whether that domain is a person, a service team, or anything else; as far as I can tell it applies universally — and then shape the guardrails and feedback loops so that local optimization pulls toward the global outcome instead of away from it. Incentives are the lever, because incentives are what actually drive behavior. If you don't understand the local incentives, you can't design guardrails that stop local optimization from becoming the dominant pattern across the macro system. Read the phrase as a question you're forcing yourself to answer: what global outcomes do I want local autonomy to drive, without letting local maximization drag down the whole?

This is where it meets "every global process is a tax." The guardrails you install are themselves taxes, and a badly shaped one does more than cost impedance — it can create perverse local incentives, where gaming the system is more rewarding than playing it straight. So the design has to answer both sides at once: enough structure to align the locals, not so much (or so blunt) that you warp their behavior in the wrong direction.

Amazon's microservices are the example I reach for — as much for its cost as its success. Two constraints did the heavy lifting: you must register your service (so everyone can find everyone else), and if you register it you must operationally support it. Those two incentives together let a whole ecosystem grow organically — emergent architecture on top of a small number of principled constraints, where adoption was the vote: teams converged on the best shared services by using them, and the winners eventually grew into AWS. It's a clean demonstration of the inversion done right. But it's also expensive: letting an ecosystem evolve that organically means absorbing an enormous amount of entropy, and that's a bill most organizations can't pay. So it's usually not the ecosystem I advocate for.

Which brings in scale — the real design variable. How the principle gets implemented lives on a spectrum of cost to size, or what we usually call business appetite: how much an organization is actually willing to spend to let an ecosystem self-organize. At Amazon's scale you can afford the entropy; almost everywhere else you can't, and "everyone just do what you want" isn't business-viable. Most of the time I'm advocating for small-scale flexibility and experimentation inside tighter, cheaper, more prescriptive boundaries — local teams still move freely, but within guardrails sized to what the business can bear. The principle holds constant; the implementation slides along that cost-to-size spectrum.

## Systems & design — building the thing so it holds

### The more complex the system is, the simpler the components must be

A reminder that surfaces almost any time we're deconstructing an existing architecture or scaffolding a new one — and a warning flag around scalability. My mental image is Lego blocks, and specifically the interface between Lego blocks. (An older version was cells composing into complex organisms.)

Core meaning. If you don't understand the most atomic piece of your system, and how those atomic pieces build into something larger, you probably don't have a scalable system and you don't really understand what you're working with.

Three ways I deploy it. As a diagnostic — engaging someone dialectically to see whether they've thought through how their idea scales and whether they've gone "down to bedrock or are designing at altitude." As a guardrail against premature sophistication — catching people who are adding complexity to a component before proving the atomic unit even works. And as a way to teach composability and seams — once someone can name their atomic unit, the probe shifts to: how does it compose? Do the blocks stack soundly? Most complex systems have more than one shape of Lego, and the interface between them is what actually matters.

The interface test. The tell for sloppy seams is like trying to fit a Duplo block to a regular Lego. I ask concrete cross-boundary questions — authorization, security boundaries, infrastructure, observability, error handling, operational behavior. The failure mode is something elegant in the abstract but brittle or unsafe in operation: "you can build your microservice, but that won't solve the problem, because you don't understand the environment it has to run in." I make people draw timing diagrams and standard architecture diagrams to force that specificity.

Reception. Little pushback — the Lego analogy is intuitive. Some people need a nudge to think either broader or more constrained (depending on their proclivity) before they can see the atomic unit or why the interfaces matter, but anyone with a head for architecture gets there fast.

### All models are wrong. Some are useful.

My usage is specific to diagramming — not the statistical sense the phrase originally comes from. Every org chart, architecture diagram, or infrastructure diagram is a model: a simplified mental picture of how a system behaves. They always leave things out and tighten toward a particular message — and that's the right thing to do, because you're reducing something enormously complex to something you can actually reason about. It mirrors human cognition: we abstract into mental models, and the more complex the thing, the more we wrap a boundary around it.

Two ways I deploy it. Against nitpickers — people quibbling that I left something out of a diagram. If that missing detail influences behavior inside a box but has no bearing on the box's boundary or the surrounding ecosystem, I don't care how it works; it's not relevant to what everyone needs to understand. And against over-clutterers — people trying to explain something in exhaustive detail to an audience that doesn't need it. That detail is necessary inside the domain boundary and irrelevant the moment you step outside it. Both times the move is the same: think about it from the perspective of the system you're actually trying to describe.

What makes a model useful. It has one particular thing it's trying to communicate, and it does that cleanly enough that it won't cause confusion or misrepresent the system later. The principle is permission to abstract and a warning against false precision, in one line.

### Every global process is a tax

I got this from my first VP-level boss (a product person; I learned a lot there while still transitioning out of engineering). I was busy applying systems thinking to fix org problems, and they used this as a counterbalance — a reminder that everything you design has a cost to the system you're designing it for.

Two layers. First: if you're going to optimize, then optimize that cost and stay conscious of it. Second: everything you add creates impedance to how the system runs and how people work inside it. You may improve global productivity — that's the lean promise — but you're asking every person at a given level to pay a tax. It might be tiny, "click one more button," but it's still impedance, and layer a few hundred of those across a very large org and the impedance gets bad enough that things simply stop happening. (The flip side lives in "local autonomy, global outcomes": a badly shaped tax doesn't just slow people down — it warps their incentives.)

Why architects especially need it. We work at the intersection of people, process, and technology — which is exactly where these taxes get worst and are usually least visible. The principle isn't "don't build global processes." It's count the cost: every standardization, gate, or shared tool buys you something real — consistency, visibility, control — and charges everyone who touches it.

### Scalable system: works in spite of me, not because of me

A reminder that if you've built a system that depends on a specific human performing an action, you've designed the wrong thing. Those systems don't scale and they carry serious attrition risk — you end up with heroes, key-person expertise, and siloed knowledge. Design instead for systems that keep working when you, the human, make a mistake, rather than systems that need you to babysit them. It's the bus factor made operational — the grim old question of how many people could get hit by a bus before the system stops working: make it robust to your absence, not dependent on your presence.

## Reflexes — the last two, lighter than the rest

### Build, Buy, Partner, Kill

Mostly standard business-strategy shorthand, and honestly one I don't use much directly — it's a decision framework more than a live design principle. It landed on the list because it showed up in a document and one of the architects hadn't seen it before. The one part worth flagging is the Kill: "Build vs. Buy" is the classic pair, "Partner" is the SaaS-era third option, and Kill — deciding to stop, prune, or not do the thing at all — is the option people most often forget they have.

### Target rich environment

I'll be honest — this one I mostly use sarcastically, and it's more reflex than teaching tool, which is what makes it a little different from the rest. The phrase is military slang — a combat zone with more targets than you can shoot at — and the sarcasm depends on hearing it that way. It's my catchall for a situation that's absolutely rife with problems, the kind where I look at it, scratch my head, and don't even know where to start. (It replaced an earlier bit of corporate cover — "this is suboptimal" — for "this is a complete mess.") I picked it up from a VP of program management years ago who'd deploy it dryly on calls when she needed people to stay polite about something genuinely broken.

What it actually does. It's a narrative reframe from paralysis to agency. Yes — there are an extraordinary number of problems here. But the story we tell matters enormously, both organizationally for morale and personally for the biases it plants. Much like eating the elephant one bite at a time: you can't fix a badly broken system all at once, and anything you do makes it better. So instead of spending your energy cataloguing how bad it is, you recognize that the targets are everywhere — which is actually good news — and you pick one and make a difference.

How I use it. Usually in response to an emotional or narrative spiral about the ecosystem we're in. It's my way of saying: yes, things are bad, and we don't make them better by describing how bad they are — we make them better by taking agency, taking a piece, and fixing it. If someone's genuinely stuck in analysis paralysis, my other move is to bound their context for them — drawing those boundaries is part of my job as an architecture leader — unless I'm specifically coaching them to learn to do it themselves. It connects straight back to "married to problems": you're committed to solving, not to solving everything at once or having the perfect plan first.

## Appendix — Prior art & lineage

Most of these phrases stand on known shoulders. I've collected the lineage here rather than in the entries, because the working meaning is what matters day to day — but the history is worth knowing, and acknowledging it is a feature, not a footnote. Grouped by how original the specific formulation is.

### Established sayings with identifiable sources

Trust but verify. A Russian proverb — doveryai, no proveryai, which rhymes in Russian. Suzanne Massie taught it to Reagan, who used it repeatedly during 1980s nuclear-disarmament talks around the 1987 INF Treaty. Its modern descendant is cybersecurity's Zero Trust — worth noting that my usage is deliberately not zero-trust. (Alternate take: critics call the phrase oxymoronic, with "but" doing the work of an eraser word.)

All models are wrong. Some are useful. From statistician George Box; the exact phrasing appears as a section heading in his 1979 paper on robustness in scientific model-building. A close cousin is Korzybski's "the map is not the territory." (Alternate take: a critique that it can be used to excuse sloppy modeling.)

Good neighbors, good fences. I inverted the usual order without realizing it. The standard proverb — "Good fences make good neighbors" — is colonial-era and was popularized by Robert Frost's "Mending Wall" (1914). The irony most quoters miss is that Frost's speaker is skeptical of the wall. My inversion, putting neighbors first, flips the emphasis toward relationship over barrier — which happens to align with the point I use it to make.

Always assume good intent. Popularized as "assume positive intent" by Indra Nooyi, who credited it to her father (2008). It correlates with the Wikipedia "assume good faith" norm, the philosopher's principle of charity, and Hanlon's razor, and it's the flip side of the fundamental attribution error. (Alternate take: the advice isn't equally costless for everyone who's asked to extend it.)

Become married to problems, not to solutions. Popularized as "fall in love with the problem, not the solution" by Waze co-founder Uri Levine (2023), though it predates him in design-thinking and Lean Startup circles. My "married" framing is deliberate — it adds a note of fidelity and commitment that "fall in love" doesn't carry.

The lightbulb really needs to want to change. The punchline of the therapist's lightbulb joke, repurposed as a change-management principle: no transformation without willingness.

Always come from a place of curiosity. A coaching and therapy staple — "get curious, not furious," "be curious, not judgmental" (widely spread via Ted Lasso, and often misattributed to Whitman) — with roots in appreciative inquiry and nonviolent communication. My own credit for curiosity-as-a-leadership-trait goes to Marc Benioff and Salesforce culture — a source I otherwise rarely agree with.

Target rich environment. Military slang: a combat zone with more targets than you have ordnance for, popularized for civilians by Top Gun (1986). I picked it up from a VP of program management who used it as dry politeness on calls; the reframe from "overwhelming mess" to "opportunity everywhere" is what made it worth stealing.

### Named frameworks / shared vocabulary

What good looks like (WGLL). Often pronounced "wiggle." Established across lean/manufacturing, sales enablement (KD Dorsey's Define / Document / Demonstrate), and the NHS "What Good Looks Like" digital framework.

Inputs, Outputs, Outcomes. The backbone of logic models and theory-of-change work in program evaluation, and close kin to the "outcomes over outputs" movement (Josh Seiden).

Vision, mission, values / accountability loop. The standard strategic-planning triad; "accountability loop" echoes The Oz Principle and general feedback-loop thinking.

Role clarity. Grounded in org-psych research on role ambiguity (Rizzo, House & Lirtzman, 1970), and reflected in RACI, Gallup's "I know what's expected of me", and Lencioni.

Build, Buy, Partner, Kill. "Build vs. Buy" is the classic pair; "Partner" is the SaaS-era addition; "Kill" is the less-common fourth option, echoing stage-gate "kill gates" and portfolio pruning.

### Likely original coinages (with convergent lineage worth knowing)

10,000 monkeys on the other side of the wire. A synthesis of the infinite-monkey theorem and a "never trust the input / measure the output" posture. Convergent cousins: Netflix's Chaos Monkey (chaos engineering), monkey testing in QA, threat modeling, and Postel's robustness principle. The phrasing reads as original.

The more complex the system, the simpler the components must be. Resonates with Gall's Law, the Unix philosophy, and Rich Hickey's "Simple Made Easy." The stated inverse relationship is a sharper claim than any of those, and likely original.

Local autonomy, global outcomes. Closest relatives are the principle of subsidiarity (from Catholic social teaching and EU governance) and Netflix's "loosely coupled, tightly aligned." The crisp phrasing is likely mine.

Scalable system: works in spite of me, not because of me. Bus-factor and key-person-risk thinking; also Michael Gerber's E-Myth ("work on the business, not in it"). The phrasing is likely mine.

Every global process is a tax. Part of the "X-tax" metaphor family (complexity tax, coordination tax) and related to Conway's Law. The specific formulation looks original.

Black-box / systems-level thinking. Draws on general systems theory and control theory carried over from electrical engineering. Worth-reading relatives: Karl Popper's "clocks and clouds" distinction between orderly, decomposable systems and irreducibly messy ones, and the Cynefin framework for matching your approach to the kind of system you're in.
