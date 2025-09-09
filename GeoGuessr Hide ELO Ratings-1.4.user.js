// ==UserScript==
// @name         GeoGuessr Hide ELO Ratings
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Hides all known ELO ratings in GeoGuessr multiplayer boxes
// @author       Davey
// @match        https://www.geoguessr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Helper: hide numeric content of an element while keeping layout
    function hideNumeric(el) {
        if (el && /^\d+$/.test(el.textContent.trim()) && !el.dataset.hidden) {
            el.style.visibility = 'hidden';
            el.dataset.hidden = 'true';
        }
    }

    function hideRatings() {
        document.querySelectorAll('div.multiplayer_ratingBox__05Gko label').forEach(hideNumeric);
    }

    function hideOverviewRatings() {
        document.querySelectorAll('div.user-stats-overview_card__EPNjC').forEach(card => {
            if (card.textContent.includes('Rating')) {
                card.querySelectorAll('label, h1').forEach(hideNumeric);
            }
        });
    }

    function hideAllDivisionRatings() {
        document.querySelectorAll('[class*="division-header_rating"]').forEach(el => {
            if (el.textContent.includes('Rating')) hideNumeric(el);
        });
    }

    function hideLeaderboardRatings() {
        document.querySelectorAll('[class*="global-teams-leaderboard_columnContent"]').forEach(hideNumeric);
    }

    function hidePreviousWeekRatings() {
        document.querySelectorAll('[class*="previous-team-week-leaderboard_points"]').forEach(el => {
            if (el.textContent.includes('Rating')) hideNumeric(el);
        });
    }

    function hideTeamCardRatings() {
        document.querySelectorAll('[class*="rating_wrapper"]').forEach(wrapper => {
            if (wrapper.textContent.includes('Rating')) {
                wrapper.querySelectorAll('label').forEach(hideNumeric);
            }
        });
    }

    function hideMiniPlayerRatings() {
        document.querySelectorAll('[class*="mini-player-card_statsRoot"]').forEach(card => {
            if (card.textContent.includes('Rating')) {
                const valueEl = card.querySelector('[class*="mini-player-card_value"] h1');
                hideNumeric(valueEl);
            }
        });
    }

    function hideLeaderboardRatings2() {
        document.querySelectorAll('[class*="row_points"] div').forEach(hideNumeric);
    }

    function hidePodiumRatings() {
        document.querySelectorAll('.leaderboard-podium_nameContainer__tS8m_ span div p').forEach(hideNumeric);
    }

    // Initial run
    hideRatings();
    hideOverviewRatings();
    hideAllDivisionRatings();
    hideLeaderboardRatings();
    hidePreviousWeekRatings();
    hideTeamCardRatings();
    hideMiniPlayerRatings();
    hideLeaderboardRatings2();
    hidePodiumRatings();

    // Periodic updates for dynamic content
    const intervals = [
        hideRatings,
        hideOverviewRatings,
        hideAllDivisionRatings,
        hideLeaderboardRatings,
        hidePreviousWeekRatings,
        hideTeamCardRatings,
        hideMiniPlayerRatings,
        hideLeaderboardRatings2,
        hidePodiumRatings
    ];
    intervals.forEach(fn => setInterval(fn, 300));

    // Observe DOM mutations to catch new rating boxes
    new MutationObserver(hideRatings).observe(document.body, { childList: true, subtree: true });
})();
