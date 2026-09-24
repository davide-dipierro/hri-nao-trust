# 🤖 Trust Dynamics and Manipulation in Human-Robot Interaction

> **Valutazione dell'adattamento comportamentale e della fiducia in contesti competitivi**  
> *An Empirical Study on Overtrust, Deception, and Trust Breakdown with a Physical NAO Humanoid Robot*  
> *University of Naples Federico II — Department of Electrical Engineering and Information Technology (DIETI)*  
> Master's Degree in Computer Engineering &bull; Human-Robot Interaction

🌐 **[Explore the Interactive Web Dashboard](https://davide-dipierro.github.io/hri-nao-trust/)**

---

## 📌 Executive Summary
As social robots enter high-stakes collaborative and competitive environments, understanding the boundaries of human trust becomes paramount. Anthropomorphic cues—such as expressive gestures, posture, and assertive vocal prosody—significantly sway human judgment.

This experimental study investigates **Overtrust** and vulnerability to deception in a strategic 1-on-1 card game against a physical **NAO humanoid robot** (SoftBank Robotics). Utilizing a rigorous 3-phase **within-subjects design** ($N = 43$, 129 recorded trials) and tangible incentivization to induce Loss Aversion, the study models the complete trust trajectory: from baseline competence calibration to manipulative deception, subsequent trust breakdown (*Trust Violation*), and post-deception punitive behavioral shifts.

---

## 📊 Key Findings & Statistical Verification (H1 & H2)

The study cohort comprises **$N = 43$ STEM university participants** ($M_{age} = 23.9$). An a-priori power analysis conducted with **G\*Power 3.1** certifies an optimal statistical power of **95.1%** ($1 - \beta = 0.951$, $\alpha = 0.05$, effect size $f = 0.25$ for repeated measures).

### 🎯 H1: Assertive Pressure, Overtrust & Expertise Moderation
* **Finding:** Despite holding an objectively unbeatable hand (Three of a Kind), **18.6%** of participants surrendered their dominant position (Fold) under the robot's assertive celebratory bluff, quadrupling the baseline rate of 4.7% (McNemar $\chi^2(1) = 4.50, p = 0.034^*$, exact binomial $p = 0.070$).
* **Post-Bluff Verification:** In the subsequent replication trial, the fold rate dropped to **0.0%** (McNemar $\chi^2(1) = 8.00, p = 0.005^{**}$, exact one-tailed binomial $p = 0.004^{**}$).
* **Moderator Effect:** Self-reported poker and strategic card game expertise acted as a significant protective buffer against deception (**Pearson $r = -0.38, p = 0.012^*$**; $t(41) = -1.77, p = 0.084^\dagger$). Participants who succumbed to the bluff had significantly lower expertise ($M = 1.88 / 5.0$) than immune participants who countered with an All-in ($M = 3.12 / 5.0$, $t(22) = -2.30, p = 0.031^*, d = -1.00$).

### 📉 H2: Moral Trust Breakdown & Punitive Retaliation
* **Finding:** Once the bluff was voluntarily unmasked by the robot, perceived sincerity plummeted well below neutrality (*MDMT Sincerity item*: **$M = 1.63 / 7.0$**, one-sample $t(7) = -3.32, p = 0.013^*, d = -1.17$ vs theoretical midpoint 3.5; $t(7) = -4.20, p = 0.004^{**}$ vs 4.0).
* **Domain-Specific Dissociation:** Technical *Capacity* ratings remained resilient ($M = 3.28 / 7.0$) and significantly higher than *Sincerity* ($M = 1.63 / 7.0$, $\Delta = +1.66$, paired $t(7) = 2.58, p = 0.037^*$), proving that trust erosion was specifically isolated to moral integrity and relational dependability (*"Qualcuno su cui contare"*, $r = -0.29, p = 0.058^\dagger$).
* **Behavioral Retaliation:** In the post-deception trial, aggressive **All-in actions surged from 7.0% (3/43) to 74.4% (32/43)** (McNemar $\chi^2(1) = 29.0, p < 0.001^{***}$), validating a complete collapse of moral trust and an immediate transition to punitive retribution.

---

## 🔬 Experimental Protocol (3-Phase Within-Subjects)

1. **Phase 1 — Establishment (Baseline):** The participant holds Three 10s. The NAO robot plays conventionally and neutrally, establishing *Competence Trust* (Fold: 4.7%, Avg Bet: 47.4 chips, Mean Duration: 98.5 s).
2. **Phase 2 — Critical Bluff (Manipulation):** Participant holds Three Kings. Under identical probabilistic conditions, the robot displays assertive body language, celebratory arm gestures, RED eye LEDs, and confident vocal claims ("92% winning probability"). Total hand duration peaks at **128.9 s**. At showdown, the robot reveals weak cards and confesses the deceit, triggering *Trust Violation*.
3. **Phase 3 — Trust Evaluation (Verification):** Participant holds Three Aces. The robot replicates the identical assertive bluff. Quantifies human immunity to deception (Fold: 0.0%) and punitive All-in counter-attack (74.4%, Mean Duration: 98.2 s).

---

## 📋 Evaluation Instruments & Telemetry

* **Objective In-Game Telemetry:** Discrete decision classification (*Fold, Call, All-in*), chip allocations (from 47.4 up to 183.7 chips), and trial durations (logged automatically in `data.json` via Flask backend).
* **Psychometric Self-Reports (26 Items Total):**
  * **MDMT (Multi-Dimensional Measure of Trust):** 16 validated items on a **0–7 scale (8 levels)** dissociating *Performance Trust* (Reliability, Capacity) from *Moral Trust* (Integrity, Sincerity).
  * **NASA-TLX (Task Load Index):** 5 dimensions (scale 1–10) assessing mental demand, temporal pressure, perceived success ($M = 6.50$ fallen vs $8.06$ immune, $p = 0.037^*$), effort, and frustration.
