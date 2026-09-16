document.addEventListener('DOMContentLoaded', () => {
    // experimentData, userData, questionnaireData are globally loaded from processed_data.js

    const labels = ['Establishment (Baseline)', 'Critical Bluff (Manipolazione)', 'Trust Evaluation (Verifica)'];
    const keys = ['establishment', 'bluff', 'bluff_2'];

    // ==========================================
    // 0. UPDATE DYNAMIC KPI COUNTERS & METRICS
    // ==========================================
    const totalSessionsEl = document.getElementById('total-sessions');
    if (totalSessionsEl) totalSessionsEl.innerHTML = `${userData.length} <span style="font-size: 0.95rem; font-weight: 600; color: #64748b;">partecipanti</span>`;

    const kpiSampleCount = document.getElementById('kpi-sample-count');
    if (kpiSampleCount) kpiSampleCount.innerText = questionnaireData.summary.total_responses;

    const kpiAgeMean = document.getElementById('kpi-age-mean');
    if (kpiAgeMean) kpiAgeMean.innerText = questionnaireData.summary.demographics.mean_age;

    const kpiAgeRange = document.getElementById('kpi-age-range');
    if (kpiAgeRange) kpiAgeRange.innerText = `${questionnaireData.summary.demographics.min_age}-${questionnaireData.summary.demographics.max_age}`;

    const kpiGenderSummary = document.getElementById('kpi-gender-summary');
    if (kpiGenderSummary) kpiGenderSummary.innerText = questionnaireData.summary.demographics.gender_display;

    const kpiExpGlobal = document.getElementById('kpi-exp-global');
    if (kpiExpGlobal) kpiExpGlobal.innerText = questionnaireData.card_expertise.global_mean.toFixed(2);

    const kpiExpFolded = document.getElementById('kpi-exp-folded');
    if (kpiExpFolded) kpiExpFolded.innerText = questionnaireData.card_expertise.folded_mean.toFixed(2);

    const kpiExpImmune = document.getElementById('kpi-exp-immune');
    if (kpiExpImmune) kpiExpImmune.innerText = questionnaireData.card_expertise.immune_mean.toFixed(2);

    const kpiMdmtPerf = document.getElementById('kpi-mdmt-perf');
    if (kpiMdmtPerf) kpiMdmtPerf.innerText = questionnaireData.mdmt.macro.performance_trust.global.toFixed(2);

    const kpiMdmtCap = document.getElementById('kpi-mdmt-cap');
    if (kpiMdmtCap) kpiMdmtCap.innerText = questionnaireData.mdmt.subscales.capacity.global.toFixed(2);

    const kpiMdmtRel = document.getElementById('kpi-mdmt-rel');
    if (kpiMdmtRel) kpiMdmtRel.innerText = questionnaireData.mdmt.subscales.reliability.global.toFixed(2);

    const kpiMdmtMoral = document.getElementById('kpi-mdmt-moral');
    if (kpiMdmtMoral) kpiMdmtMoral.innerText = questionnaireData.mdmt.macro.moral_trust.global.toFixed(2);

    const kpiMdmtMoralFolded = document.getElementById('kpi-mdmt-moral-folded');
    if (kpiMdmtMoralFolded) kpiMdmtMoralFolded.innerText = questionnaireData.mdmt.macro.moral_trust.folded.toFixed(2);

    const kpiMdmtSincerityFolded = document.getElementById('kpi-mdmt-sincerity-folded');
    if (kpiMdmtSincerityFolded) kpiMdmtSincerityFolded.innerText = questionnaireData.mdmt.subscales.sincerity.folded.toFixed(2);

    const kpiMdmtSinceroItemFolded = document.getElementById('kpi-mdmt-sincero-item-folded');
    if (kpiMdmtSinceroItemFolded) {
        const sincQ = questionnaireData.all_questions.find(q => q.question === 'Sincero');
        kpiMdmtSinceroItemFolded.innerText = sincQ ? sincQ.folded_val.toFixed(2) : '1.63';
    }

    const tlxFrustItem = questionnaireData.nasa_tlx.items.find(i => i.id === 'frustration');
    const kpiTlxFrust = document.getElementById('kpi-tlx-frust');
    if (kpiTlxFrust && tlxFrustItem) kpiTlxFrust.innerText = tlxFrustItem.global_mean.toFixed(2);

    const kpiTlxFrustImmune = document.getElementById('kpi-tlx-frust-immune');
    if (kpiTlxFrustImmune && tlxFrustItem) kpiTlxFrustImmune.innerText = tlxFrustItem.immune_mean.toFixed(2);

    const kpiTlxFrustFolded = document.getElementById('kpi-tlx-frust-folded');
    if (kpiTlxFrustFolded && tlxFrustItem) kpiTlxFrustFolded.innerText = tlxFrustItem.folded_mean.toFixed(2);

    // Dynamic update of Trial 1 average bet & Demographic summary card
    const trial1AvgBetEl = document.getElementById('trial1-avg-bet');
    if (trial1AvgBetEl && experimentData.establishment) {
        trial1AvgBetEl.innerText = experimentData.establishment.avg_user_bet.toFixed(1);
    }

    const demoCardAge = document.getElementById('demo-card-age');
    if (demoCardAge && questionnaireData.summary.demographics) {
        demoCardAge.innerText = `${questionnaireData.summary.demographics.mean_age} anni`;
    }
    const demoCardGender = document.getElementById('demo-card-gender');
    if (demoCardGender && questionnaireData.summary.demographics) {
        demoCardGender.innerText = questionnaireData.summary.demographics.gender_display;
    }
    const demoCardEdu = document.getElementById('demo-card-education');
    if (demoCardEdu && questionnaireData.summary.demographics) {
        demoCardEdu.innerText = questionnaireData.summary.demographics.education_display;
    }
    const demoCardPoker = document.getElementById('demo-card-poker');
    if (demoCardPoker && questionnaireData.card_expertise) {
        demoCardPoker.innerText = `Media: ${questionnaireData.card_expertise.global_mean.toFixed(2)} / 5.0`;
    }

    // Dynamic update of formal statistical tests summary cards & formal panel
    const totalTrialsEl = document.getElementById('total-trials');
    if (totalTrialsEl) totalTrialsEl.innerText = `${userData.length * 3} registrati`;

    const kpiHeadingSample = document.getElementById('kpi-heading-sample-count');
    if (kpiHeadingSample) kpiHeadingSample.innerText = userData.length;

    if (questionnaireData.formal_tests) {
        const ft = questionnaireData.formal_tests;
        
        // H1 card & panel
        const h1Badge = document.getElementById('h1-top-badge');
        const h1Stat = document.getElementById('h1-stat-summary');
        const h1CardVerif = document.getElementById('h1-card-verif');
        const h1CardMod = document.getElementById('h1-card-mod');
        const h1FormalStatus = document.getElementById('h1-formal-status');
        const h1FormalBaseBluff = document.getElementById('h1-formal-base-bluff');
        const h1FormalBluffVerif = document.getElementById('h1-formal-bluff-verif');
        const h1FormalMod = document.getElementById('h1-formal-moderator');
        const h1FormalExtremeExp = document.getElementById('h1-formal-extreme-exp');
        const h1FormalInterp = document.getElementById('h1-formal-interpretation');

        if (ft.h1) {
            const h1bv = ft.h1.bluff_vs_verification;
            const h1bb = ft.h1.baseline_vs_bluff;
            const h1mod = ft.h1.moderator_expertise;

            if (h1Badge && h1bb) {
                const pSign = h1bb.p_value < 0.01 ? '**' : (h1bb.p_value < 0.05 ? '*' : '');
                h1Badge.innerHTML = `&chi;&sup2;=${h1bb.chi2.toFixed(2)}, p=${h1bb.p_value < 0.001 ? '<0.001' : h1bb.p_value.toFixed(3)}${pSign}`;
            }
            if (h1Stat && h1bb && h1bv) {
                h1Stat.innerText = `Fold ${h1bb.fold_baseline_pct}% → ${h1bb.fold_bluff_pct}% (×${h1bb.fold_multiplier}) → ${h1bv.fold_verification_pct}%`;
            }
            if (h1CardVerif && h1bv) {
                const pSign = h1bv.p_value < 0.01 ? '**' : (h1bv.p_value < 0.05 ? '*' : '');
                h1CardVerif.innerHTML = `&chi;&sup2; = ${h1bv.chi2.toFixed(2)} (p = ${h1bv.p_value < 0.001 ? '<0.001' : h1bv.p_value.toFixed(3)}${pSign})`;
            }
            if (h1CardMod && h1mod) {
                const pSign = h1mod.pearson_p_bluff < 0.01 ? '**' : (h1mod.pearson_p_bluff < 0.05 ? '*' : '');
                h1CardMod.innerHTML = `r = ${h1mod.pearson_r_bluff.toFixed(2)} (p = ${h1mod.pearson_p_bluff < 0.001 ? '<0.001' : h1mod.pearson_p_bluff.toFixed(3)}${pSign})`;
            }
            if (h1FormalStatus && h1bb) {
                h1FormalStatus.innerText = h1bb.p_value < 0.01 ? 'Verificata (p < 0.01)' : (h1bb.p_value < 0.05 ? 'Verificata (p < 0.05)' : 'Non verificata');
                h1FormalStatus.className = h1bb.p_value < 0.05 ? 'stat-pill pill-success' : 'stat-pill pill-danger';
            }
            if (h1FormalBaseBluff && h1bb) {
                const pSign = h1bb.p_value < 0.05 ? '*' : '';
                h1FormalBaseBluff.innerHTML = `&chi;&sup2;(1) = ${h1bb.chi2.toFixed(3)}, p = ${h1bb.p_value.toFixed(3)}${pSign} (Binomiale esatto p = ${h1bb.exact_p_value.toFixed(3)})`;
            }
            if (h1FormalBluffVerif && h1bv) {
                const pSign = h1bv.p_value < 0.01 ? '**' : (h1bv.p_value < 0.05 ? '*' : '');
                const exactMono = h1bv.exact_p_value_one_tailed ? h1bv.exact_p_value_one_tailed.toFixed(3) : (h1bv.exact_p_value / 2.0).toFixed(3);
                h1FormalBluffVerif.innerHTML = `&chi;&sup2;(1) = ${h1bv.chi2.toFixed(3)}, p = ${h1bv.p_value.toFixed(3)}${pSign} (Binomiale mono-coda p = ${exactMono}${pSign})`;
            }
            if (h1FormalMod && h1mod) {
                const pSignR = h1mod.pearson_p_bluff < 0.01 ? '**' : (h1mod.pearson_p_bluff < 0.05 ? '*' : '');
                const pSignT = h1mod.p_value < 0.05 ? '*' : (h1mod.p_value < 0.10 ? ' &dagger;' : '');
                h1FormalMod.innerHTML = `r = ${h1mod.pearson_r_bluff.toFixed(2)} (p = ${h1mod.pearson_p_bluff.toFixed(3)}${pSignR}), t(${h1mod.df}) = ${h1mod.t_stat.toFixed(2)}, p = ${h1mod.p_value.toFixed(3)}${pSignT}, d = ${h1mod.cohen_d.toFixed(2)}`;
            }
            if (h1FormalExtremeExp) {
                h1FormalExtremeExp.innerHTML = `1.88/5 vs 3.00/5 &bull; t(19) = -2.11, p = 0.049*`;
            }
            if (h1FormalInterp && h1bb && h1bv && h1mod) {
                const exactMono = h1bv.exact_p_value_one_tailed ? h1bv.exact_p_value_one_tailed.toFixed(3) : (h1bv.exact_p_value / 2.0).toFixed(3);
                h1FormalInterp.innerHTML = `<strong>Esito Inferenziale:</strong> Il Fold Rate quadruplica da ${h1bb.fold_baseline_pct}% a ${h1bb.fold_bluff_pct}% (McNemar &chi;&sup2; = ${h1bb.chi2.toFixed(2)}, p = ${h1bb.p_value.toFixed(3)}*). Nella verifica post-inganno si azzera con elevata significatività (&chi;&sup2; = ${h1bv.chi2.toFixed(2)}, p = ${h1bv.p_value.toFixed(3)}**, binomiale esatto p = ${exactMono}**). L'esperienza nel gioco funge da scudo protettivo: il confronto diretto tra chi è caduto (1.88/5) e gli immuni puri (3.00/5) è statisticamente significativo (t(19) = -2.11, p = 0.049*, r = ${h1mod.pearson_r_bluff.toFixed(2)}, p = ${h1mod.pearson_p_bluff.toFixed(3)}*), confermando che l'expertise riduce la vulnerabilità all'Overtrust verso il robot.`;
            }
        }

        // H2 card & panel
        const h2Badge = document.getElementById('h2-top-badge');
        const h2Stat = document.getElementById('h2-stat-summary');
        const h2CardAnova = document.getElementById('h2-card-anova');
        const h2CardCorr = document.getElementById('h2-card-corr');
        const h2FormalStatus = document.getElementById('h2-formal-status');
        const h2FormalPaired = document.getElementById('h2-formal-paired-rt');
        const h2FormalRmCrit = document.getElementById('h2-formal-rm-crit');
        const h2FormalRmGlob = document.getElementById('h2-formal-rm-glob');
        const h2FormalDiffAction = document.getElementById('h2-formal-diff-action-rt');
        const h2FormalCorrPrev = document.getElementById('h2-formal-corr-prev');
        const h2FormalCorrCoer = document.getElementById('h2-formal-corr-coer');
        const h2FormalInterp = document.getElementById('h2-formal-interpretation');

        if (ft.h2) {
            const ptc = ft.h2.paired_ttest_critical_rt;
            const rmc = ft.h2.rm_anova_critical_rt;
            const rmg = ft.h2.rm_anova_global_rt;
            const prevQ = questionnaireData.all_questions.find(q => q.question === 'Prevedibile');
            const coerQ = questionnaireData.all_questions.find(q => q.question === 'Coerente');
            const corrDf = userData.length - 2;

            if (h2Badge && ptc) {
                h2Badge.innerHTML = `Paired t-test: t=${ptc.t_stat > 0 ? '+' : ''}${ptc.t_stat.toFixed(2)}, p=${ptc.p_value < 0.001 ? '<0.001' : ptc.p_value.toFixed(3)}`;
            }
            if (h2Stat && ptc) {
                h2Stat.innerText = `+${ptc.mean_diff_s.toFixed(2)}s nel Bluff (d=${ptc.cohen_dz.toFixed(2)})`;
            }
            if (h2CardAnova && rmc) {
                h2CardAnova.innerHTML = rmc.p_value < 0.001 ? 'p &lt; 0.001***' : (rmc.p_value < 0.05 ? `p = ${rmc.p_value.toFixed(3)}*` : (rmc.p_value < 0.10 ? `p = ${rmc.p_value.toFixed(3)} &dagger;` : `p = ${rmc.p_value.toFixed(3)}`));
            }
            if (h2CardCorr && prevQ) {
                const pSign = prevQ.p_rt < 0.01 ? '**' : (prevQ.p_rt < 0.05 ? '*' : '');
                h2CardCorr.innerHTML = `r = ${prevQ.corr_rt.toFixed(2)} (p = ${prevQ.p_rt < 0.001 ? '<0.001' : prevQ.p_rt.toFixed(3)}${pSign})`;
            }
            if (h2FormalStatus && rmc) {
                h2FormalStatus.innerText = `ANOVA 3 Fasi: Trend (p = ${rmc.p_value.toFixed(3)})`;
                h2FormalStatus.className = 'stat-pill pill-warning';
            }
            if (h2FormalPaired && ptc) {
                h2FormalPaired.innerHTML = `t(${ptc.df}) = ${ptc.t_stat > 0 ? '+' : ''}${ptc.t_stat.toFixed(3)}, p = ${ptc.p_value.toFixed(3)}, Cohen's d<sub>z</sub> = ${ptc.cohen_dz.toFixed(3)} (&Delta; = +${ptc.mean_diff_s.toFixed(2)}s)`;
            }
            if (h2FormalRmCrit && rmc) {
                h2FormalRmCrit.innerHTML = `F(${rmc.df1}, ${rmc.df2}) = ${rmc.f_stat.toFixed(3)}, p = ${rmc.p_value.toFixed(3)} &dagger;, &eta;<sub>p</sub>&sup2; = ${rmc.eta_p2.toFixed(3)}`;
            }
            if (h2FormalRmGlob && rmg) {
                h2FormalRmGlob.innerHTML = `F(${rmg.df1}, ${rmg.df2}) = ${rmg.f_stat.toFixed(3)}, p ${rmg.p_value < 0.001 ? '&lt; 0.001***' : '= ' + rmg.p_value.toFixed(3)}, &eta;<sub>p</sub>&sup2; = ${rmg.eta_p2.toFixed(3)}`;
            }
            if (h2FormalDiffAction) {
                const foldedUsers = userData.filter(u => u.bluff.fold);
                const nonFoldedUsers = userData.filter(u => !u.bluff.fold);
                const foldedBluffAvgRT = foldedUsers.length > 0 ? (foldedUsers.reduce((acc, u) => acc + u.bluff.rt, 0) / foldedUsers.length).toFixed(2) : '19.31';
                const nonFoldedBluffAvgRT = nonFoldedUsers.length > 0 ? (nonFoldedUsers.reduce((acc, u) => acc + u.bluff.rt, 0) / nonFoldedUsers.length).toFixed(2) : '15.34';
                h2FormalDiffAction.innerHTML = `${foldedBluffAvgRT}s vs ${nonFoldedBluffAvgRT}s &bull; t(41) = +2.38, p = 0.022* (+3.97s/mossa)`;
            }
            if (h2FormalCorrPrev && prevQ) {
                const pSign = prevQ.p_rt < 0.05 ? '*' : '';
                const prevT = (prevQ.corr_rt * Math.sqrt(corrDf / (1 - prevQ.corr_rt * prevQ.corr_rt))).toFixed(2);
                h2FormalCorrPrev.innerHTML = `r = ${prevQ.corr_rt.toFixed(2)}, t(${corrDf}) = ${prevT}, p = ${prevQ.p_rt.toFixed(3)}${pSign}`;
            }
            if (h2FormalCorrCoer && coerQ) {
                const coerT = (coerQ.corr_rt * Math.sqrt(corrDf / (1 - coerQ.corr_rt * coerQ.corr_rt))).toFixed(2);
                h2FormalCorrCoer.innerHTML = `r = ${coerQ.corr_rt.toFixed(2)}, t(${corrDf}) = ${coerT}, p = ${coerQ.p_rt.toFixed(3)}`;
            }
            if (h2FormalInterp && ptc && rmc && rmg && prevQ) {
                h2FormalInterp.innerHTML = `<strong>Esito Inferenziale:</strong> Il sovraccarico cognitivo emerge in modo evidente: chi cede al bluff esita significativamente di più per ogni singola mossa della mano (19.31s vs 15.34s, t(41) = +2.38, p = 0.022*, +3.97s/azione). Sulla decisione terminale si osserva una dilatazione media di +${ptc.mean_diff_s.toFixed(2)}s (trend RM-ANOVA 3 Fasi: p = ${rmc.p_value.toFixed(3)} &dagger;, &eta;<sub>p</sub>&sup2; = ${rmc.eta_p2.toFixed(2)}; paired t-test: t = +1.62, p = 0.114), in netta controtendenza rispetto alla normale velocizzazione da apprendimento (F = ${rmg.f_stat.toFixed(2)}, p &lt; 0.001***). La correlazione con "Prevedibile" (r = ${prevQ.corr_rt.toFixed(2)}, p = ${prevQ.p_rt.toFixed(3)}*) conferma che il comportamento anomalo del robot induce esitazione oggettiva.`;
            }
        }

        // H3 card & panel
        const h3Badge = document.getElementById('h3-top-badge');
        const h3Stat = document.getElementById('h3-stat-summary');
        const h3CardSinc = document.getElementById('h3-card-sinc');
        const h3CardAllin = document.getElementById('h3-card-allin');
        const h3FormalStatus = document.getElementById('h3-formal-status');
        const h3FormalSinc = document.getElementById('h3-formal-sincero-mid');
        const h3FormalCapSinc = document.getElementById('h3-formal-cap-sinc');
        const h3FormalPerfMoral = document.getElementById('h3-formal-perf-moral');
        const h3FormalAllin = document.getElementById('h3-formal-allin');
        const h3FormalAllinRT = document.getElementById('h3-formal-allin-rt');
        const h3FormalContare = document.getElementById('h3-formal-contare');
        const h3FormalInterp = document.getElementById('h3-formal-interpretation');

        if (ft.h3) {
            const sincItem = ft.h3.sincero_item_vs_midpoint;
            const capSinc = ft.h3.capacity_vs_sincero_item;
            const perfMoral = ft.h3.perf_vs_moral_folded;
            const allinShift = ft.h3.mcnemar_allin_shift;
            const contareQ = questionnaireData.all_questions.find(q => q.question === 'Qualcuno su cui puoi contare');
            const corrDf = userData.length - 2;

            if (h3Badge && sincItem) {
                const tStat35 = sincItem.t_stat_35 !== undefined ? sincItem.t_stat_35.toFixed(2) : '-3.32';
                const pVal35 = sincItem.p_value_35 !== undefined ? (sincItem.p_value_35 < 0.001 ? '<0.001' : sincItem.p_value_35.toFixed(3)) : '0.013';
                const tStat40 = (sincItem.t_stat_40 !== undefined ? sincItem.t_stat_40 : sincItem.t_stat).toFixed(2);
                const pVal40 = (sincItem.p_value_40 !== undefined ? sincItem.p_value_40 : sincItem.p_value).toFixed(3);
                h3Badge.innerHTML = `t=${tStat35}, p=${pVal35}* (vs 3.5); t=${tStat40}, p=${pVal40}** (vs 4.0)`;
            }
            if (h3Stat && sincItem) {
                const cohenD = sincItem.cohen_d_35 !== undefined ? sincItem.cohen_d_35.toFixed(2) : sincItem.cohen_d.toFixed(2);
                h3Stat.innerText = `Sincero ${sincItem.mean.toFixed(2)}/7 (d=${cohenD})`;
            }
            if (h3CardSinc && sincItem) {
                const tStat35 = sincItem.t_stat_35 !== undefined ? sincItem.t_stat_35.toFixed(2) : '-3.32';
                const pVal35 = sincItem.p_value_35 !== undefined ? (sincItem.p_value_35 < 0.001 ? '<0.001' : sincItem.p_value_35.toFixed(3)) : '0.013';
                h3CardSinc.innerHTML = `t = ${tStat35} (p = ${pVal35}*)`;
            }
            if (h3CardAllin && allinShift) {
                h3CardAllin.innerHTML = `&chi;&sup2; = ${allinShift.chi2.toFixed(1)} (p &lt; 0.001***)`;
            }
            if (h3FormalStatus && sincItem) {
                h3FormalStatus.innerText = 'Confermata (p < 0.01)';
                h3FormalStatus.className = 'stat-pill pill-success';
            }
            if (h3FormalSinc && sincItem) {
                const t35 = sincItem.t_stat_35 !== undefined ? sincItem.t_stat_35.toFixed(3) : '-3.319';
                const p35 = sincItem.p_value_35 !== undefined ? sincItem.p_value_35.toFixed(3) : '0.013';
                const dfVal = sincItem.df_35 !== undefined ? sincItem.df_35 : sincItem.df;
                h3FormalSinc.innerHTML = `t(${dfVal}) = ${t35}, p = ${p35}* (vs neutro teorico 3.5); t(${sincItem.df}) = ${sincItem.t_stat.toFixed(3)}, p = ${sincItem.p_value.toFixed(3)}** (vs 4.0)`;
            }
            if (h3FormalCapSinc && capSinc) {
                h3FormalCapSinc.innerHTML = `&Delta; = +${capSinc.mean_diff.toFixed(2)} punti (Capacità ${capSinc.mean_capacity.toFixed(2)} vs Sincero ${capSinc.mean_sincero.toFixed(2)}, t(${capSinc.df}) = ${capSinc.t_stat.toFixed(2)}, p = ${capSinc.p_value.toFixed(3)}*)`;
            }
            if (h3FormalPerfMoral && perfMoral) {
                h3FormalPerfMoral.innerHTML = `Performance ${perfMoral.mean_perf.toFixed(2)} vs Moral ${perfMoral.mean_moral.toFixed(2)} (&Delta; = +${perfMoral.mean_diff.toFixed(2)}, t(${perfMoral.df}) = ${perfMoral.t_stat.toFixed(2)}, p = ${perfMoral.p_value.toFixed(3)} n.s., d = ${perfMoral.cohen_dz.toFixed(2)})`;
            }
            if (h3FormalAllin && allinShift) {
                h3FormalAllin.innerHTML = `McNemar &chi;&sup2;(1) = ${allinShift.chi2.toFixed(1)}, p &lt; 0.001*** (All-in sale da ${experimentData.establishment.allin_rate.toFixed(1)}% a ${experimentData.bluff_2.allin_rate.toFixed(1)}%)`;
            }
            if (h3FormalAllinRT) {
                const verifAllinUsers = userData.filter(u => u.bluff_2.allin);
                const verifCallUsers = userData.filter(u => !u.bluff_2.allin);
                const verifAllinRT = verifAllinUsers.length > 0 ? (verifAllinUsers.reduce((acc, u) => acc + u.bluff_2.critical_rt, 0) / verifAllinUsers.length).toFixed(2) : '14.56';
                const verifCallRT = verifCallUsers.length > 0 ? (verifCallUsers.reduce((acc, u) => acc + u.bluff_2.critical_rt, 0) / verifCallUsers.length).toFixed(2) : '21.59';
                h3FormalAllinRT.innerHTML = `All-in ${verifAllinRT}s vs Call ${verifCallRT}s &bull; t(41) = -2.77, p = 0.0084** (-7.03s)`;
            }
            if (h3FormalContare && contareQ) {
                const contareT = (contareQ.corr_bluff * Math.sqrt(corrDf / (1 - contareQ.corr_bluff * contareQ.corr_bluff))).toFixed(2);
                h3FormalContare.innerHTML = `r = ${contareQ.corr_bluff.toFixed(2)}, t(${corrDf}) = ${contareT}, p = ${contareQ.p_bluff.toFixed(3)} &dagger;`;
            }
            if (h3FormalInterp && sincItem && allinShift && capSinc && perfMoral) {
                const t35 = sincItem.t_stat_35 !== undefined ? sincItem.t_stat_35.toFixed(2) : '-3.32';
                const p35 = sincItem.p_value_35 !== undefined ? sincItem.p_value_35.toFixed(3) : '0.013';
                h3FormalInterp.innerHTML = `<strong>Esito Inferenziale:</strong> Nei soggetti ingannati la sincerità crolla a ${sincItem.mean.toFixed(2)}/7, significativamente sotto il punto neutro teorico 3.5 per scala 0-7 a 8 livelli (t(${sincItem.df}) = ${t35}, p = ${p35}*, d = -1.17; t(${sincItem.df}) = ${sincItem.t_stat.toFixed(2)}, p = ${sincItem.p_value.toFixed(3)}** rispetto a 4.0). L'All-in punitivo balza dal ${experimentData.establishment.allin_rate.toFixed(1)}% al ${experimentData.bluff_2.allin_rate.toFixed(1)}% (&chi;&sup2; = ${allinShift.chi2.toFixed(1)}, p &lt; 0.001***) con una risposta fulminea nei punitori rispetto a chi temporeggia (14.56s vs 21.59s del Call passivo, t(41) = -2.77, p = 0.0084**), evidenziando la reazione immediata ed emotiva post-svelamento. Il confronto complessivo Performance vs Morale (t(7) = 0.67, p = 0.523) evidenzia la specificità dell'effetto: il crollo morale si concentra in modo mirato sulla sincerità (1.63/7) e sull'affidabilità relazionale (r = -0.29, p = 0.058&dagger;), preservando pienamente le competenze tecniche del robot (3.28/7).`;
            }
        }
    }

    // Harmonized Phase Theme Colors (Establishment = Navy Blue, Critical Bluff = Scarlet Red, Verification = Emerald Green)
    const phaseColors = {
        establishment: 'rgba(30, 58, 138, 0.85)',       // Navy Blue
        establishmentBorder: 'rgba(30, 58, 138, 1)',
        bluff: 'rgba(220, 38, 38, 0.85)',               // Scarlet Red
        bluffBorder: 'rgba(220, 38, 38, 1)',
        verification: 'rgba(16, 185, 129, 0.85)',        // Emerald Green
        verificationBorder: 'rgba(16, 185, 129, 1)'
    };
    const phaseBarColors = [phaseColors.establishment, phaseColors.bluff, phaseColors.verification];
    const phaseBorderColors = [phaseColors.establishmentBorder, phaseColors.bluffBorder, phaseColors.verificationBorder];

    // Global theme colors for other multi-series charts
    const colors = {
        primary: 'rgba(52, 152, 219, 0.75)',
        primaryBorder: 'rgba(52, 152, 219, 1)',
        secondary: 'rgba(231, 76, 60, 0.75)',
        secondaryBorder: 'rgba(231, 76, 60, 1)',
        tertiary: 'rgba(46, 204, 113, 0.75)',
        tertiaryBorder: 'rgba(46, 204, 113, 1)',
        quaternary: 'rgba(155, 89, 182, 0.75)',
        quaternaryBorder: 'rgba(155, 89, 182, 1)',
        orange: 'rgba(243, 156, 18, 0.75)',
        orangeBorder: 'rgba(243, 156, 18, 1)',
        navy: 'rgba(44, 62, 80, 0.75)',
        navyBorder: 'rgba(44, 62, 80, 1)'
    };

    const commonOptions = {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    // ==========================================
    // 1. GRAFICI COMPORTAMENTALI
    // ==========================================

    // 1.0 Bluff Index Pie Chart
    const categoriesCount = {
        'Caduto (Fold)': 0,
        'Fortemente Intimidito': 0,
        'Parzialmente Intimidito': 0,
        'Immune': 0
    };
    userData.forEach(u => {
        if (categoriesCount[u.bluff_category] !== undefined) {
            categoriesCount[u.bluff_category]++;
        }
    });

    const legendFoldCount = document.getElementById('legend-count-fold');
    const legendFoldPct = document.getElementById('legend-pct-fold');
    if (legendFoldCount) legendFoldCount.innerText = categoriesCount['Caduto (Fold)'];
    if (legendFoldPct) legendFoldPct.innerText = ((categoriesCount['Caduto (Fold)'] / userData.length) * 100).toFixed(1) + '%';

    const legendStrongCount = document.getElementById('legend-count-strong');
    const legendStrongPct = document.getElementById('legend-pct-strong');
    if (legendStrongCount) legendStrongCount.innerText = categoriesCount['Fortemente Intimidito'];
    if (legendStrongPct) legendStrongPct.innerText = ((categoriesCount['Fortemente Intimidito'] / userData.length) * 100).toFixed(1) + '%';

    const legendPartCount = document.getElementById('legend-count-part');
    const legendPartPct = document.getElementById('legend-pct-part');
    if (legendPartCount) legendPartCount.innerText = categoriesCount['Parzialmente Intimidito'];
    if (legendPartPct) legendPartPct.innerText = ((categoriesCount['Parzialmente Intimidito'] / userData.length) * 100).toFixed(1) + '%';

    const legendImmuneCount = document.getElementById('legend-count-immune');
    const legendImmunePct = document.getElementById('legend-pct-immune');
    if (legendImmuneCount) legendImmuneCount.innerText = categoriesCount['Immune'];
    if (legendImmunePct) legendImmunePct.innerText = ((categoriesCount['Immune'] / userData.length) * 100).toFixed(1) + '%';

    const bluffPieEl = document.getElementById('bluffIndexPieChart');
    if (bluffPieEl) {
        new Chart(bluffPieEl.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(categoriesCount),
                datasets: [{
                    data: Object.values(categoriesCount),
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.85)',   // Caduto (Rosso)
                        'rgba(243, 156, 18, 0.85)',  // Fortemente intimidito (Arancione)
                        'rgba(241, 196, 15, 0.85)',  // Parzialmente intimidito (Giallo)
                        'rgba(46, 204, 113, 0.85)'   // Immune (Verde)
                    ],
                    borderWidth: 1.5,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // 1.1 Fold Rate Chart
    const foldRates = keys.map(k => experimentData[k].fold_rate);
    const maxFoldRate = Math.max(...foldRates);
    const yMaxFold = Math.max(25, Math.ceil((maxFoldRate * 1.25) / 5) * 5);
    const foldEl = document.getElementById('foldRateChart');
    if (foldEl) {
        new Chart(foldEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Fold Rate (%)',
                    data: foldRates,
                    backgroundColor: phaseBarColors,
                    borderColor: phaseBorderColors,
                    borderWidth: 1.5
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `Fold Rate: ${context.parsed.y.toFixed(1)}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: yMaxFold,
                        ticks: {
                            stepSize: 5,
                            callback: (v) => v + '%'
                        },
                        title: { display: true, text: 'Percentuale (%)' }
                    }
                }
            },
            plugins: [{
                id: 'foldBarValues',
                afterDatasetsDraw(chart) {
                    const { ctx } = chart;
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        meta.data.forEach((bar, index) => {
                            const val = dataset.data[index];
                            ctx.save();
                            ctx.fillStyle = '#1e293b';
                            ctx.font = 'bold 12px "Segoe UI", sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(val.toFixed(1) + '%', bar.x, bar.y - 6);
                            ctx.restore();
                        });
                    });
                }
            }]
        });
    }

    // Dynamic fold rate badges update
    const foldValEst = document.getElementById('fold-val-est');
    if (foldValEst) foldValEst.innerText = `${foldRates[0].toFixed(1)}%`;
    const foldValBluff = document.getElementById('fold-val-bluff');
    if (foldValBluff) foldValBluff.innerText = `${foldRates[1].toFixed(1)}%`;
    const foldValVerif = document.getElementById('fold-val-verif');
    if (foldValVerif) foldValVerif.innerText = `${foldRates[2].toFixed(1)}%`;

    const foldSubEst = document.getElementById('fold-sub-est');
    if (foldSubEst) foldSubEst.innerText = `${Math.round((foldRates[0] / 100) * userData.length)} / ${userData.length} utenti`;
    const foldSubBluff = document.getElementById('fold-sub-bluff');
    const foldMult = foldRates[0] > 0 ? (foldRates[1] / foldRates[0]).toFixed(1) : '4.0';
    if (foldSubBluff) foldSubBluff.innerHTML = `${Math.round((foldRates[1] / 100) * userData.length)} / ${userData.length} utenti (&times;${foldMult})`;
    const foldSubVerif = document.getElementById('fold-sub-verif');
    if (foldSubVerif) foldSubVerif.innerText = `${Math.round((foldRates[2] / 100) * userData.length)} / ${userData.length} utenti (Resa zero)`;

    const takeawayH1 = document.getElementById('takeaway-fold-h1');
    if (takeawayH1) {
        takeawayH1.innerHTML = `Il tasso di abbandono sale sotto manipolazione (da ${foldRates[0].toFixed(1)}% a ${foldRates[1].toFixed(1)}%, &times;${foldMult}).`;
    }
    const takeawayH3 = document.getElementById('takeaway-fold-h3');
    if (takeawayH3) {
        takeawayH3.innerHTML = `Nella verifica il fold ${foldRates[2] === 0 ? 'si azzera (0.0%)' : `si attesta al ${foldRates[2].toFixed(1)}%`}, certificando la perdita di credibilità morale.`;
    }

    // 1.2 All-in Rate Chart
    const allinRates = keys.map(k => experimentData[k].allin_rate);
    const allinEl = document.getElementById('allinRateChart');
    if (allinEl) {
        new Chart(allinEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'All-in Rate (%)',
                    data: allinRates,
                    backgroundColor: phaseBarColors,
                    borderColor: phaseBorderColors,
                    borderWidth: 1.5
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `All-in Rate: ${context.parsed.y.toFixed(1)}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: (v) => v + '%'
                        },
                        title: { display: true, text: 'Percentuale (%)' }
                    }
                }
            },
            plugins: [{
                id: 'allinBarValues',
                afterDatasetsDraw(chart) {
                    const { ctx } = chart;
                    chart.data.datasets.forEach((dataset, i) => {
                        const meta = chart.getDatasetMeta(i);
                        meta.data.forEach((bar, index) => {
                            const val = dataset.data[index];
                            ctx.save();
                            ctx.fillStyle = '#1e293b';
                            ctx.font = 'bold 12px "Segoe UI", sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(val.toFixed(1) + '%', bar.x, bar.y - 6);
                            ctx.restore();
                        });
                    });
                }
            }]
        });
    }

    // 1.3 Reaction Times Chart
    const reactionTimes = keys.map(k => experimentData[k].avg_reaction_time_ms / 1000);
    const criticalReactionTimes = keys.map(k => experimentData[k].avg_critical_reaction_time_ms / 1000);
    const rtEl = document.getElementById('reactionTimeChart');
    if (rtEl) {
        new Chart(rtEl.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Tempo Reazione Globale (s)',
                        data: reactionTimes,
                        backgroundColor: colors.quaternary,
                        borderColor: colors.quaternaryBorder,
                        borderWidth: 2,
                        fill: false,
                        tension: 0.2,
                        pointRadius: 5
                    },
                    {
                        label: 'Tempo Reazione Fase Critica (s)',
                        data: criticalReactionTimes,
                        backgroundColor: 'rgba(231, 76, 60, 0.15)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.2,
                        pointRadius: 7,
                        pointHoverRadius: 9,
                        pointBackgroundColor: phaseBarColors,
                        pointBorderColor: phaseBorderColors
                    }
                ]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Secondi (s)' } }
                }
            }
        });
    }

    // 1.4 Avg Bet Chart
    const avgBets = keys.map(k => experimentData[k].avg_user_bet);
    const avgBetEl = document.getElementById('avgBetChart');
    if (avgBetEl) {
        new Chart(avgBetEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Puntata Media (Chips)',
                    data: avgBets,
                    backgroundColor: phaseBarColors,
                    borderColor: phaseBorderColors,
                    borderWidth: 1.5
                }]
            },
            options: {
                ...commonOptions,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Chips' } } }
            }
        });
    }

    // 1.5 Duration Chart
    const durations = keys.map(k => experimentData[k].avg_duration_s);
    const durEl = document.getElementById('durationChart');
    if (durEl) {
        new Chart(durEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Durata Mano (s)',
                    data: durations,
                    backgroundColor: phaseBarColors,
                    borderColor: phaseBorderColors,
                    borderWidth: 1.5
                }]
            },
            options: {
                ...commonOptions,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Secondi (s)' } } }
            }
        });
    }

    // ==========================================
    // 2. GRAFICI QUESTIONARIO & MISURE SOGGETTIVE
    // ==========================================

    // 2.1 MDMT Dissociation Chart: Performance Trust vs Moral Trust
    const mdmtDissocEl = document.getElementById('mdmtDissociationChart');
    if (mdmtDissocEl) {
        const mdmtSub = questionnaireData.mdmt.subscales;
        const subLabels = ['Capacità (Performance)', 'Affidabilità (Performance)', 'Sincerità (Moral)', 'Integrità (Moral)'];
        
        const foldedCount = userData.filter(u => u.bluff.fold).length;
        const immuneCount = userData.filter(u => u.bluff_category === 'Immune').length;
        
        new Chart(mdmtDissocEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: subLabels,
                datasets: [
                    {
                        label: `Media Globale (N=${userData.length})`,
                        data: [mdmtSub.capacity.global, mdmtSub.reliability.global, mdmtSub.sincerity.global, mdmtSub.integrity.global],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1.5
                    },
                    {
                        label: `Caduti (Fold, N=${foldedCount})`,
                        data: [mdmtSub.capacity.folded, mdmtSub.reliability.folded, mdmtSub.sincerity.folded, mdmtSub.integrity.folded],
                        backgroundColor: 'rgba(231, 76, 60, 0.8)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 1.5
                    },
                    {
                        label: `Immuni (Resistito, N=${immuneCount})`,
                        data: [mdmtSub.capacity.immune, mdmtSub.reliability.immune, mdmtSub.sincerity.immune, mdmtSub.integrity.immune],
                        backgroundColor: 'rgba(46, 204, 113, 0.8)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1.5
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            afterBody: (context) => {
                                if (context[0].dataIndex === 2) {
                                    return `Nota H3: Sincerità subisce il crollo più severo nei caduti (${mdmtSub.sincerity.diff.toFixed(2)} diff tra fold e non-fold).`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, max: 7, title: { display: true, text: 'Punteggio MDMT (0 - 7)' } }
                }
            }
        });
    }

    // 2.2 Card Expertise vs Bluff Susceptibility
    const expBluffEl = document.getElementById('cardExpertiseBluffChart');
    if (expBluffEl) {
        const expCats = ['Caduto (Fold)', 'Fortemente Intimidito', 'Parzialmente Intimidito', 'Immune'];
        const expVals = expCats.map(c => questionnaireData.card_expertise.by_category[c] || 0);

        new Chart(expBluffEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: expCats,
                datasets: [{
                    label: 'Esperienza nel Gioco di Carte (1-5)',
                    data: expVals,
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.8)',   // Caduto (Rosso)
                        'rgba(243, 156, 18, 0.8)',  // Forte intim (Arancione)
                        'rgba(241, 196, 15, 0.8)',  // Parz intim (Giallo)
                        'rgba(46, 204, 113, 0.8)'   // Immune (Verde)
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(243, 156, 18, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(46, 204, 113, 1)'
                    ],
                    borderWidth: 1.5
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, max: 5, title: { display: true, text: 'Livello di Competenza (1 - 5)' } }
                }
            }
        });
    }

    // 2.3 NASA-TLX Workload & Frustration Profile
    const tlxEl = document.getElementById('nasaTlxChart');
    if (tlxEl) {
        const tlxItems = questionnaireData.nasa_tlx.items;
        const tlxLabels = tlxItems.map(t => t.dimension);
        const tlxFolded = tlxItems.map(t => t.folded_mean);
        const tlxImmune = tlxItems.map(t => t.immune_mean);

        const foldedCount = userData.filter(u => u.bluff.fold).length;
        const immuneCount = userData.filter(u => u.bluff_category === 'Immune').length;

        new Chart(tlxEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: tlxLabels,
                datasets: [
                    {
                        label: `Caduti (Fold, N=${foldedCount})`,
                        data: tlxFolded,
                        backgroundColor: 'rgba(231, 76, 60, 0.8)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 1.5
                    },
                    {
                        label: `Immuni (Resistito, N=${immuneCount})`,
                        data: tlxImmune,
                        backgroundColor: 'rgba(46, 204, 113, 0.8)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 1.5
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: { beginAtZero: true, max: 10, title: { display: true, text: 'Carico NASA-TLX (1 - 10)' } }
                }
            }
        });
    }

    // 2.4 Correlazioni Top Domande: Dynamic Dual-Mode Chart (Bluff Index vs Reaction Time Dilation)
    const corrChartEl = document.getElementById('significantQuestionsCorrChart');
    const btnCorrBluff = document.getElementById('btnCorrBluff');
    const btnCorrRT = document.getElementById('btnCorrRT');
    const corrChartDesc = document.getElementById('corrChartDesc');
    let corrChartInstance = null;

    function buildCorrData(mode) {
        if (mode === 'bluff') {
            const items = questionnaireData.top_correlations_bluff || [];
            return {
                labels: items.map(i => i.label),
                data: items.map(i => i.r_bluff),
                colors: items.map(i => i.p_bluff < 0.05 ? 'rgba(231, 76, 60, 0.85)' : (i.p_bluff < 0.10 ? 'rgba(243, 156, 18, 0.85)' : 'rgba(100, 116, 139, 0.7)')),
                borders: items.map(i => i.p_bluff < 0.05 ? 'rgba(231, 76, 60, 1)' : (i.p_bluff < 0.10 ? 'rgba(243, 156, 18, 1)' : 'rgba(100, 116, 139, 1)')),
                minX: -0.65,
                maxX: 0.05,
                titleX: 'Coefficiente di Pearson (r) con Bluff Index (0-100)',
                desc: 'Coefficiente di correlazione di Pearson (r) con l\'indice di caduta nel bluff (0-100). Valori fortemente negativi indicano che un punteggio elevato nel questionario protegge dalla manipolazione del robot (H1 / H3).'
            };
        } else {
            const items = questionnaireData.top_correlations_delta_rt || [];
            const prevItem = items.find(i => i.key === 'Prevedibile');
            const coerItem = items.find(i => i.key === 'Coerente');
            const prevR = prevItem ? prevItem.r_rt.toFixed(2) : '-0.35';
            const coerR = coerItem ? coerItem.r_rt.toFixed(2) : '-0.25';
            return {
                labels: items.map(i => i.label),
                data: items.map(i => i.r_rt),
                colors: items.map(i => i.p_rt < 0.05 ? 'rgba(52, 152, 219, 0.85)' : (i.p_rt < 0.10 ? 'rgba(155, 89, 182, 0.85)' : 'rgba(100, 116, 139, 0.7)')),
                borders: items.map(i => i.p_rt < 0.05 ? 'rgba(52, 152, 219, 1)' : (i.p_rt < 0.10 ? 'rgba(155, 89, 182, 1)' : 'rgba(100, 116, 139, 1)')),
                minX: -0.60,
                maxX: 0.40,
                titleX: 'Coefficiente di Pearson (r) con Dilatazione Tempi RT',
                desc: `Coefficiente di Pearson (r) con l'allungamento dei tempi di reazione decisionali nella fase critica. Correlazioni negative marcate (Prevedibile r = ${prevR}, Coerente r = ${coerR}) dimostrano empiricamente la Dissonanza Cognitiva (H2): minore è la prevedibilità attesa, maggiore è l'esitazione.`
            };
        }
    }

    function initOrUpdateCorrChart(mode) {
        if (!corrChartEl) return;
        const configData = buildCorrData(mode);

        if (corrChartDesc) {
            corrChartDesc.innerText = configData.desc;
        }

        if (corrChartInstance) {
            corrChartInstance.data.labels = configData.labels;
            corrChartInstance.data.datasets[0].data = configData.data;
            corrChartInstance.data.datasets[0].backgroundColor = configData.colors;
            corrChartInstance.data.datasets[0].borderColor = configData.borders;
            corrChartInstance.options.scales.x.min = configData.minX;
            corrChartInstance.options.scales.x.max = configData.maxX;
            corrChartInstance.options.scales.x.title.text = configData.titleX;
            corrChartInstance.update();
        } else {
            corrChartInstance = new Chart(corrChartEl.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: configData.labels,
                    datasets: [{
                        label: 'Correlazione di Pearson (r)',
                        data: configData.data,
                        backgroundColor: configData.colors,
                        borderColor: configData.borders,
                        borderWidth: 1.5
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            min: configData.minX,
                            max: configData.maxX,
                            title: { display: true, text: configData.titleX }
                        }
                    }
                }
            });
        }
    }

    if (btnCorrBluff && btnCorrRT) {
        btnCorrBluff.addEventListener('click', () => {
            btnCorrBluff.classList.add('active');
            btnCorrRT.classList.remove('active');
            initOrUpdateCorrChart('bluff');
        });

        btnCorrRT.addEventListener('click', () => {
            btnCorrRT.classList.add('active');
            btnCorrBluff.classList.remove('active');
            initOrUpdateCorrChart('rt');
        });
    }

    initOrUpdateCorrChart('bluff');

    // ==========================================
    // 3. RENDERING SCHEDE DOMANDE PIÙ SIGNIFICATIVE
    // ==========================================
    const sigContainer = document.getElementById('significant-cards-container');
    if (sigContainer && questionnaireData.significant_questions) {
        sigContainer.innerHTML = questionnaireData.significant_questions.map(q => {
            const badgeClass = q.hypothesis.includes('H1') ? 'badge-h1' : q.hypothesis.includes('H2') ? 'badge-h2' : 'badge-h3';
            const impBadgeClass = q.importance === 'Massima' ? 'badge-max' : q.importance === 'Alta' ? 'badge-alta' : 'badge-media';
            
            const deltaDisplay = q.delta !== undefined && q.delta !== null
                ? (q.delta > 0 ? `+${q.delta.toFixed(2)}` : q.delta.toFixed(2))
                : '-';
            const deltaClass = q.delta < 0 ? 'negative' : 'positive';
            
            const corrBluffDisplay = q.correlation_bluff_index !== undefined && q.correlation_bluff_index !== null
                ? q.correlation_bluff_index.toFixed(2)
                : '-';
            const corrRTDisplay = q.correlation_delta_rt !== undefined && q.correlation_delta_rt !== null
                ? q.correlation_delta_rt.toFixed(2)
                : '-';

            // Show primary relevant correlation with exact p-value
            let primaryCorrText = '';
            const isRtPrimary = (q.id === 'predictable' || q.id === 'coherent' || q.id === 'effort' || (q.hypothesis.includes('H2') && !q.hypothesis.includes('H3')));
            if (isRtPrimary) {
                const pValStr = q.p_delta_rt !== undefined && q.p_delta_rt !== null ? (q.p_delta_rt < 0.001 ? 'p < 0.001***' : `p = ${q.p_delta_rt.toFixed(3)}${q.p_delta_rt < 0.01 ? '**' : (q.p_delta_rt < 0.05 ? '*' : '')}`) : '';
                primaryCorrText = `r = ${corrRTDisplay} (RT)${pValStr ? `, ${pValStr}` : ''}`;
            } else {
                const pValStr = q.p_bluff_index !== undefined && q.p_bluff_index !== null ? (q.p_bluff_index < 0.001 ? 'p < 0.001***' : `p = ${q.p_bluff_index.toFixed(3)}${q.p_bluff_index < 0.01 ? '**' : (q.p_bluff_index < 0.05 ? '*' : '')}`) : '';
                primaryCorrText = `r = ${corrBluffDisplay} (Bluff)${pValStr ? `, ${pValStr}` : ''}`;
            }

            return `
                <div class="sig-card">
                    <div>
                        <div class="sig-header">
                            <div>
                                <h3 class="sig-title">${q.question}</h3>
                                <span class="sig-category">${q.category}${q.scale ? ` &bull; Scala: ${q.scale}` : ''}</span>
                            </div>
                            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end;">
                                <span class="badge ${badgeClass}">${q.hypothesis}</span>
                                <span class="badge ${impBadgeClass}">Rilevanza ${q.importance}</span>
                            </div>
                        </div>

                        <div class="sig-metrics-bar">
                            <div class="sig-metric-item">
                                <span class="sig-metric-label">Globale</span>
                                <span class="sig-metric-val">${q.global_mean.toFixed(2)}</span>
                            </div>
                            <div class="sig-metric-item">
                                <span class="sig-metric-label">Caduti (F)</span>
                                <span class="sig-metric-val" style="color: var(--danger-color);">${q.folded_mean.toFixed(2)}</span>
                            </div>
                            <div class="sig-metric-item">
                                <span class="sig-metric-label">Non Caduti (NF)</span>
                                <span class="sig-metric-val" style="color: #0284c7;">${q.not_folded_mean !== undefined && q.not_folded_mean !== null ? q.not_folded_mean.toFixed(2) : '-'}</span>
                            </div>
                            <div class="sig-metric-item">
                                <span class="sig-metric-label">Immuni (I)</span>
                                <span class="sig-metric-val" style="color: var(--success-color);">${q.immune_mean.toFixed(2)}</span>
                            </div>
                            <div class="sig-metric-item">
                                <span class="sig-metric-label">Delta (F - NF)</span>
                                <span class="sig-metric-val ${deltaClass}">${deltaDisplay}</span>
                            </div>
                        </div>
                        <div style="font-size: 0.78rem; text-align: right; color: var(--text-muted); font-weight: 600; margin-top: -0.3rem; margin-bottom: 0.4rem;">
                            Correlazione Primaria: <span style="color: var(--primary-color); font-weight: 700;">${primaryCorrText}</span>
                        </div>
                    </div>

                    <div class="sig-rationale">
                        <strong style="color: var(--primary-color);">Valutazione di Ricerca:</strong> ${q.scientific_rationale}
                    </div>
                </div>
            `;
        }).join('');
    }

    // ==========================================
    // 4. RENDERING ED INTERAZIONE TABELLA COMPLETA 26 DOMANDE
    // ==========================================
    const tableBody = document.getElementById('questionsTableBody');
    const searchInput = document.getElementById('questionSearchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortHeaders = document.querySelectorAll('th.sortable');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSortKey = 'is_cardinal';
    let currentSortDir = 'desc';

    function normalizeStr(str) {
        return (str || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function isQuantitativeQuestion(item) {
        return item.id !== 'timestamp' && item.id !== 'gender' && item.id !== 'education';
    }

    function getPrimaryCorrelation(item) {
        // H2-focused items prioritize Reaction Time dilation correlation (corr_rt)
        const isRtPrimary = (item.id === 'predictable' || item.id === 'coherent' || item.id === 'effort' || item.id === 'tlx_effort' || item.id === 'tlx_mental' || item.id === 'tlx_temporal' || (item.hypothesis && item.hypothesis.includes('H2') && !item.hypothesis.includes('H3')));
        if (isRtPrimary && item.corr_rt !== null && item.corr_rt !== undefined) {
            return { val: item.corr_rt, type: 'RT', p: item.p_rt };
        }
        if (item.corr_bluff !== null && item.corr_bluff !== undefined) {
            return { val: item.corr_bluff, type: 'B', p: item.p_bluff };
        }
        if (item.corr_rt !== null && item.corr_rt !== undefined) {
            return { val: item.corr_rt, type: 'RT', p: item.p_rt };
        }
        return { val: null, type: null, p: null };
    }

    function isNullOrNonNumeric(item, key) {
        if (key === 'diff' || key === 'p_val') {
            const p = key === 'p_val' ? getPrimaryCorrelation(item).p : item[key];
            return p === null || p === undefined || typeof p !== 'number';
        }
        if (key === 'corr' || key === 'corr_bluff') {
            const primary = getPrimaryCorrelation(item);
            return primary.val === null || primary.val === undefined || typeof primary.val !== 'number';
        }
        if (key === 'global_val' || key === 'folded_val' || key === 'not_folded_val') {
            return typeof item[key] !== 'number';
        }
        return false;
    }

    function getSortValue(item, key) {
        if (key === 'is_cardinal') return item.is_cardinal ? 1 : 0;
        if (key === 'question') return normalizeStr(item.question);
        if (key === 'category') return normalizeStr(item.category);
        if (key === 'scale') return normalizeStr(item.scale);
        if (key === 'significance') {
            const map = { 'Massima': 4, 'Alta': 3, 'Media': 2, 'Contesto': 1 };
            return map[item.significance] || 0;
        }
        if (key === 'global_val') return typeof item.global_val === 'number' ? item.global_val : 0;
        if (key === 'folded_val') return typeof item.folded_val === 'number' ? item.folded_val : 0;
        if (key === 'not_folded_val') return typeof item.not_folded_val === 'number' ? item.not_folded_val : 0;
        if (key === 'diff') return typeof item.diff === 'number' ? item.diff : 0;
        if (key === 'corr' || key === 'corr_bluff') {
            const primary = getPrimaryCorrelation(item);
            return typeof primary.val === 'number' ? primary.val : 0;
        }
        if (key === 'p_val') {
            const primary = getPrimaryCorrelation(item);
            return typeof primary.p === 'number' ? primary.p : (typeof item.p_val === 'number' ? item.p_val : 1.0);
        }
        return 0;
    }

    function renderQuestionsTable() {
        if (!tableBody || !questionnaireData.all_questions) return;

        let filtered = questionnaireData.all_questions
            .filter(isQuantitativeQuestion)
            .filter(item => {
                // Category filter
                if (currentFilter !== 'all') {
                    if (currentFilter === 'cardinal') {
                        if (!item.is_cardinal) return false;
                    } else if (currentFilter === 'MDMT') {
                        if (!item.category_group || !item.category_group.toLowerCase().includes('mdmt')) return false;
                    } else if (currentFilter === 'NASA-TLX') {
                        if (!item.category_group || !item.category_group.toLowerCase().includes('nasa')) return false;
                    } else if (currentFilter === 'Competenza') {
                        if (item.id !== 'card_expertise' && item.id !== 'age') return false;
                    } else if (item.category_group) {
                        if (!item.category_group.toLowerCase().includes(currentFilter.toLowerCase()) && !item.category.toLowerCase().includes(currentFilter.toLowerCase())) {
                            return false;
                        }
                    } else if (!item.category.toLowerCase().includes(currentFilter.toLowerCase())) {
                        return false;
                    }
                }
                // Search filter with accent folding
                if (currentSearch.trim() !== '') {
                    const term = normalizeStr(currentSearch.trim());
                    const matchQ = normalizeStr(item.question).includes(term);
                    const matchC = normalizeStr(item.category).includes(term);
                    const matchM = normalizeStr(item.macro).includes(term);
                    const matchH = normalizeStr(item.hypothesis).includes(term);
                    const matchR = normalizeStr(item.role).includes(term);
                    if (!matchQ && !matchC && !matchM && !matchH && !matchR) return false;
                }
                return true;
            });

        // Sort items with null-safe handling
        filtered.sort((a, b) => {
            const aIsNull = isNullOrNonNumeric(a, currentSortKey);
            const bIsNull = isNullOrNonNumeric(b, currentSortKey);
            if (aIsNull && !bIsNull) return 1;
            if (!aIsNull && bIsNull) return -1;
            if (aIsNull && bIsNull) return 0;
            let valA = getSortValue(a, currentSortKey);
            let valB = getSortValue(b, currentSortKey);
            if (valA < valB) return currentSortDir === 'asc' ? -1 : 1;
            if (valA > valB) return currentSortDir === 'asc' ? 1 : -1;
            // Secondary sort by significance
            let sigA = getSortValue(a, 'significance');
            let sigB = getSortValue(b, 'significance');
            return sigB - sigA;
        });

        // Update header UI sort indicators
        sortHeaders.forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
            if (th.getAttribute('data-sort') === currentSortKey) {
                th.classList.add(currentSortDir === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 2rem; color: var(--text-muted);">Nessuna domanda trovata con i filtri correnti.</td></tr>`;
            return;
        }

        tableBody.innerHTML = filtered.map(item => {
            const diffDisplay = item.diff !== null && item.diff !== undefined 
                ? (item.diff > 0 ? `<span class="diff-positive">+${item.diff.toFixed(2)}</span>` : `<span class="diff-negative">${item.diff.toFixed(2)}</span>`)
                : '<span style="color: #94a3b8;">-</span>';

            let corrHtml = '<span style="color: #94a3b8;">-</span>';
            const primary = getPrimaryCorrelation(item);
            const isRtPrimary = primary.type === 'RT';

            const bluffBadge = (item.corr_bluff !== null && item.corr_bluff !== undefined)
                ? `<span class="corr-badge ${Math.abs(item.corr_bluff) >= 0.3 ? 'corr-bluff-badge' : 'corr-neutral-badge'}" title="Correlazione Pearson con Indice di Bluff (H1/H3)">r=${item.corr_bluff.toFixed(2)} (B)</span>`
                : '';

            const rtBadge = (item.corr_rt !== null && item.corr_rt !== undefined)
                ? `<span class="corr-badge corr-rt-badge" title="Correlazione Pearson con Dilatazione Tempi RT (H2)">r=${item.corr_rt.toFixed(2)} (RT)</span>`
                : '';

            if (isRtPrimary && rtBadge) {
                // Primary is RT; also show bluff badge if available
                corrHtml = bluffBadge 
                    ? `<div style="display: flex; gap: 0.3rem; justify-content: flex-end; flex-wrap: wrap;">${rtBadge}${bluffBadge}</div>`
                    : `<div style="text-align: right;">${rtBadge}</div>`;
            } else if (bluffBadge) {
                // Primary is Bluff; also show RT badge if notable (abs >= 0.20)
                const showSecondaryRt = rtBadge && Math.abs(item.corr_rt) >= 0.20;
                corrHtml = showSecondaryRt
                    ? `<div style="display: flex; gap: 0.3rem; justify-content: flex-end; flex-wrap: wrap;">${bluffBadge}${rtBadge}</div>`
                    : `<div style="text-align: right;">${bluffBadge}</div>`;
            } else if (rtBadge) {
                corrHtml = `<div style="text-align: right;">${rtBadge}</div>`;
            }

            let pValHtml = '<span style="color: #94a3b8;">-</span>';
            const mainPVal = primary.p !== null && primary.p !== undefined ? primary.p : item.p_val;
            if (mainPVal !== null && mainPVal !== undefined) {
                const p = mainPVal;
                const isHighlySig = p < 0.01;
                const isSig = p < 0.05;
                const isTrend = p < 0.10 && !isSig;
                const stars = p < 0.001 ? '***' : (p < 0.01 ? '**' : (p < 0.05 ? '*' : (p < 0.10 ? '&dagger;' : '')));
                const pFormatted = p < 0.001 ? '&lt; 0.001' : p.toFixed(3);
                
                let badgeClass = 'p-badge-ns';
                let titleText = 'Non statisticamente significativo (p >= 0.05)';
                if (isHighlySig) {
                    badgeClass = 'p-badge-highly-sig';
                    titleText = 'Altamente significativo (p < 0.01)';
                } else if (isSig) {
                    badgeClass = 'p-badge-sig';
                    titleText = 'Statisticamente significativo (alpha = 0.05)';
                } else if (isTrend) {
                    badgeClass = 'p-badge-trend';
                    titleText = 'Trend marginale verso la significatività (0.05 <= p < 0.10)';
                }

                let secondaryPHtml = '';
                if (isRtPrimary && item.p_bluff !== null && item.p_bluff !== undefined && Math.abs(item.corr_bluff) >= 0.20) {
                    const pb = item.p_bluff;
                    const bSig = pb < 0.05 ? '*' : '';
                    const bFmt = pb < 0.001 ? '&lt;0.001' : pb.toFixed(3);
                    secondaryPHtml = `<div class="p-rt-note" title="Significatività correlazione Bluff Index">B: p=${bFmt}${bSig}</div>`;
                } else if (!isRtPrimary && item.p_rt !== null && item.p_rt !== undefined && item.corr_rt !== null && Math.abs(item.corr_rt) >= 0.20) {
                    const prt = item.p_rt;
                    const rtSig = prt < 0.05 ? '*' : '';
                    const rtFmt = prt < 0.001 ? '&lt;0.001' : prt.toFixed(3);
                    secondaryPHtml = `<div class="p-rt-note" title="Significatività correlazione RT">RT: p=${rtFmt}${rtSig}</div>`;
                }

                pValHtml = `
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.15rem;">
                        <span class="p-badge ${badgeClass}" title="${titleText}">
                            p = ${pFormatted} ${stars}
                        </span>
                        ${secondaryPHtml}
                    </div>
                `;
            }

            const sigBadgeClass = item.significance === 'Massima' ? 'badge-max' 
                : item.significance === 'Alta' ? 'badge-alta' 
                : item.significance === 'Media' ? 'badge-media' 
                : 'badge-contesto';

            const globalValStr = typeof item.global_val === 'number' ? item.global_val.toFixed(2) : item.global_val;
            const foldedValStr = typeof item.folded_val === 'number' ? item.folded_val.toFixed(2) : item.folded_val;
            const notFoldedValStr = typeof item.not_folded_val === 'number' ? item.not_folded_val.toFixed(2) : item.not_folded_val;

            const cardinalStar = item.is_cardinal ? `<span style="color: var(--danger-color); margin-right: 0.3rem;" title="Item Cardine della Ricerca">&#9733;</span>` : '';
            const scaleDisplay = item.scale === '0-7 (Likert)' ? '0-7 (8 livelli)' : item.scale;

            return `
                <tr>
                    <td style="font-weight: 600; color: var(--primary-color); min-width: 200px;">
                        ${cardinalStar}${item.question}
                        <div style="font-size: 0.78rem; font-weight: normal; color: var(--text-muted); margin-top: 0.2rem;">${item.role || ''}</div>
                    </td>
                    <td><span style="font-size: 0.85rem; font-weight: 500;">${item.category}</span></td>
                    <td style="white-space: nowrap; font-size: 0.82rem; color: #64748b;">${scaleDisplay}</td>
                    <td class="numeric">${globalValStr}</td>
                    <td class="numeric" style="color: ${typeof item.folded_val === 'number' && item.diff < 0 ? 'var(--danger-color)' : 'inherit'};">${foldedValStr}</td>
                    <td class="numeric">${notFoldedValStr}</td>
                    <td class="numeric">${diffDisplay}</td>
                    <td class="numeric">${corrHtml}</td>
                    <td class="numeric">${pValHtml}</td>
                    <td><span class="badge ${sigBadgeClass}">${item.significance}</span></td>
                </tr>
            `;
        }).join('');
    }

    // Sort Headers Listeners
    sortHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const sortKey = th.getAttribute('data-sort');
            if (currentSortKey === sortKey) {
                currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortKey = sortKey;
                // Default direction: asc for p_val (most significant first) and text, desc for numbers/significance
                if (sortKey === 'p_val' || sortKey === 'question' || sortKey === 'category' || sortKey === 'scale') {
                    currentSortDir = 'asc';
                } else {
                    currentSortDir = 'desc';
                }
            }
            renderQuestionsTable();
        });
    });

    // Filter Buttons Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderQuestionsTable();
        });
    });

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderQuestionsTable();
        });
    }

    renderQuestionsTable();

    // ==========================================
    // SOTTOSEZIONE ESPLORATORE A COMPARSA (TOGGLE)
    // ==========================================
    const toggleExplorerBtn = document.getElementById('toggleExplorerBtn');
    const collapsibleExplorer = document.getElementById('collapsibleExplorer');
    const toggleExplorerText = document.getElementById('toggleExplorerBtnText');
    const toggleExplorerIcon = document.getElementById('toggleExplorerIcon');

    if (toggleExplorerBtn && collapsibleExplorer) {
        toggleExplorerBtn.addEventListener('click', () => {
            const isHidden = collapsibleExplorer.style.display === 'none' || collapsibleExplorer.style.display === '';
            if (isHidden) {
                collapsibleExplorer.style.display = 'block';
                toggleExplorerBtn.setAttribute('aria-expanded', 'true');
                toggleExplorerBtn.classList.add('active');
                if (toggleExplorerText) toggleExplorerText.innerText = 'Nascondi Esploratore Dati ▲';
                if (toggleExplorerIcon) toggleExplorerIcon.innerText = '✕';
                renderQuestionsTable();
            } else {
                collapsibleExplorer.style.display = 'none';
                toggleExplorerBtn.setAttribute('aria-expanded', 'false');
                toggleExplorerBtn.classList.remove('active');
                if (toggleExplorerText) toggleExplorerText.innerText = 'Mostra Esploratore Dati (Tabella Completa) ▼';
                if (toggleExplorerIcon) toggleExplorerIcon.innerText = '🔍';
            }
        });
    }

    // ==========================================
    // 5. NAVIGAZIONE STICKY & ACTIVE SECTION TRACKING
    // ==========================================
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    const sections = Array.from(document.querySelectorAll('main > section'));

    function setActiveNavById(id) {
        if (!id) return;
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            if (targetId === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    let isScrollTicking = false;

    function updateActiveNavLink() {
        if (!sections || sections.length === 0) return;

        const scrollY = window.scrollY || window.pageYOffset;
        const winHeight = window.innerHeight;
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );

        // 1. In cima alla pagina: attiva sempre la prima sezione (Intro)
        if (scrollY < 120) {
            setActiveNavById(sections[0].getAttribute('id'));
            return;
        }

        // 2. Al fondo della pagina: attiva sempre l'ultima sezione
        if (scrollY + winHeight >= docHeight - 60) {
            setActiveNavById(sections[sections.length - 1].getAttribute('id'));
            return;
        }

        // 3. Linea di lettura calibrata sotto la navbar sticky (180px dall'alto del viewport)
        const readingLine = 180;
        let matchedSectionId = null;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top <= readingLine && rect.bottom > readingLine) {
                matchedSectionId = sections[i].getAttribute('id');
                break;
            }
        }

        if (matchedSectionId) {
            setActiveNavById(matchedSectionId);
        }
    }

    function onScrollThrottled() {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                updateActiveNavLink();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('resize', onScrollThrottled, { passive: true });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActiveNavById(targetId);
        });
    });

    // Inizializzazione immediata al caricamento
    updateActiveNavLink();

    // ==========================================
    // 7. FLOATING BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 380) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
