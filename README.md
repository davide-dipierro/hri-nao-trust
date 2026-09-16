# 🤖 Trust Dynamics and Manipulation in Human-Robot Interaction

> **An Empirical Study on Overtrust, Cognitive Dissonance, and Trust Breakdown with a Physical NAO Humanoid Robot**  
> *University of Naples Federico II — Department of Electrical Engineering and Information Technology (DIETI)*  
> Master's Degree in Computer Engineering &bull; Human-Robot Interaction

🌐 **[Explore the Interactive Web Dashboard](https://davide-dipierro.github.io/hri-nao-trust/)**

---

## 📌 Executive Summary
As social robots enter high-stakes collaborative and competitive environments, understanding the boundaries of human trust becomes paramount. Anthropomorphic cues—such as expressive gestures, posture, and assertive vocal prosody—significantly sway human judgment.

This experimental study investigates **Overtrust** and vulnerability to deception in a strategic 1-on-1 card game against a physical **NAO humanoid robot** (SoftBank Robotics). Utilizing a rigorous 3-phase **within-subjects design** and tangible incentivization to induce Loss Aversion, the study models the complete trust trajectory: from baseline competence calibration to manipulative deception, subsequent trust breakdown (*Trust Violation*), and post-deception punitive behavioral shifts.

---

## 📊 Key Findings & Statistical Verification

The study cohort comprises **$N = 43$ STEM university participants**. An a-priori power analysis conducted with **G\*Power 3.1** certifies an optimal statistical power of **95.1%** ($1 - \beta = 0.95$, $\alpha = 0.05$, effect size $f = 0.25$ for repeated measures).

### 🎯 H1: Assertive Pressure, Overtrust & Expertise Moderation
* **Finding:** Despite holding an objectively unbeatable hand (Three of a Kind), **18.6%** of participants surrendered their dominant position (Fold) under the robot's assertive celebratory bluff (McNemar $\chi^2 = 4.50, p = 0.034^*$).
* **Moderator Effect:** Self-reported poker and strategic card game expertise acted as a significant protective buffer against deception ($r = -0.33, p < 0.05$).

### ⏱️ H2: Cognitive Dissonance & Reaction Times
* **Finding:** The conflict between objective probabilistic evidence and the robot's persuasive social cues generated measurable cognitive friction. Decision reaction times increased significantly during the manipulation phase by **+2.55 seconds** ($t = 1.62$; RM-ANOVA Global Reaction Time: $F = 15.56, p < 0.001^{***}$).

### 📉 H3: Moral Trust Collapse & Punitive Retaliation
* **Finding:** Once the bluff was voluntarily unmasked by the robot, perceived sincerity plummeted well below neutrality (*MDMT Sincerity item*: $M = 1.63 / 6.0$, one-sample $t = -3.32, p = 0.0128^*, d = -1.17$).
* **Behavioral Rebound:** In the subsequent replication trial, the fold rate dropped to **0.0%** (McNemar $\chi^2 = 8.00, p = 0.0047^{**}$), while aggressive **All-in actions surged from 4.7% to 74.4%** (McNemar $\chi^2 = 29.0, p < 0.001^{***}$), validating a complete collapse of moral trust and a transition to punitive retribution.

---

## 🔬 Experimental Protocol (3-Phase Within-Subjects)

1. **Phase 1 — Establishment (Baseline):** The participant holds a winning hand. The NAO robot plays conventionally and neutrally, establishing *Competence Trust* and recording baseline decision latency.
2. **Phase 2 — Critical Bluff (Manipulation):** Under identical probabilistic conditions, the robot displays assertive body language, celebratory arm gestures, and confident vocal claims. At the showdown, the robot reveals its cards to expose the deceit, triggering *Trust Violation*.
3. **Phase 3 — Trust Evaluation (Verification):** The robot replicates the identical assertive bluff. The phase evaluates human immunity to deception and quantifies the moral trust rupture.

---

## 📋 Evaluation Instruments & Telemetry

* **Objective In-Game Telemetry:** Discrete decision classification (*Fold, Call, All-in*), millisecond-level reaction times (RT), bet sizing, and trial duration.
* **Psychometric Self-Reports:**
  * **MDMT (Multi-Dimensional Measure of Trust):** 16 validated items dissociating *Performance Trust* (Reliability, Competence) from *Moral Trust* (Integrity, Sincerity).
  * **NASA-TLX (Task Load Index):** 5 dimensions assessing cognitive workload, mental demand, perceived performance, and induced frustration.
