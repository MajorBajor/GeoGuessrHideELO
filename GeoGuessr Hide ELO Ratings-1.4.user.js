// ==UserScript==
// @name         GeoGuessr Hide ELO Ratings
// @namespace    http://tampermonkey.net/
// @version      1.4.1
// @description  Hides all known ELO ratings in GeoGuessr multiplayer boxes
// @author       Davey
// @match        https://www.geoguessr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideRatings() {
        // Select all multiplayer rating boxes
        const ratingBoxes = document.querySelectorAll('div.multiplayer_ratingBox__05Gko');

        ratingBoxes.forEach(box => {
            // Hide all <label> elements inside the box that are likely ELOs
            const labels = box.querySelectorAll('label');
            labels.forEach(label => {
                // Only hide labels that contain numbers
                if (/^\d+$/.test(label.textContent.trim())) {
                    label.style.visibility = 'hidden'; // keeps layout intact
                }
            });
        });
    }

    function hideOverviewRatings() {
    // Select all stats overview cards
    const cards = document.querySelectorAll('div.user-stats-overview_card__EPNjC');

    cards.forEach(card => {
        // Only process cards that contain the word "Rating"
        if (card.textContent.includes('Rating')) {
            // Hide all <label> and <h1> elements that are numbers
            card.querySelectorAll('label, h1').forEach(el => {
                if (/^\d+$/.test(el.textContent.trim())) {
                    el.style.visibility = 'hidden'; // preserves layout
                }
            });
        }
    });
    }
function hideAllDivisionRatings() {
    // Select all elements whose class contains 'division-header_rating'
    const ratings = document.querySelectorAll('[class*="division-header_rating"]');

    ratings.forEach(el => {
        if (el.textContent.includes('Rating')) {
            el.style.visibility = 'hidden'; // hides the number without shifting layout
        }
    });
}

    function hideLeaderboardRatings() {
    // Match any div whose class contains 'global-teams-leaderboard_columnContent'
    const leaderboardDivs = document.querySelectorAll('[class*="global-teams-leaderboard_columnContent"]');

    leaderboardDivs.forEach(el => {
        // Only hide if it's a number (the actual rating)
        if (/^\d+$/.test(el.textContent.trim())) {
            el.style.visibility = 'hidden'; // hides the number but keeps layout
        }
    });
}
function hidePreviousWeekRatings() {
    // Match divs whose class contains 'previous-team-week-leaderboard_points'
    const ratingDivs = document.querySelectorAll('[class*="previous-team-week-leaderboard_points"]');

    ratingDivs.forEach(el => {
        if (el.textContent.includes('Rating')) {
            el.style.visibility = 'hidden'; // keeps layout intact
        }
    });
}
function hideTeamCardRatings() {
    const wrappers = document.querySelectorAll('[class*="rating_wrapper"]');

    wrappers.forEach(wrapper => {
        // Check if this wrapper contains a label with "Rating"
        if (wrapper.textContent.includes('Rating')) {
            // Hide all numeric labels inside the wrapper
            wrapper.querySelectorAll('label').forEach(el => {
                if (/^\d+$/.test(el.textContent.trim())) {
                    el.style.visibility = 'hidden';
                }
            });
        }
    });
}

    function hideMiniPlayerRatings() {
    const cards = document.querySelectorAll('[class*="mini-player-card_statsRoot"]');

    cards.forEach(card => {
        if (card.textContent.includes('Rating')) {
            const valueEl = card.querySelector('[class*="mini-player-card_value"] h1');
            if (valueEl) {
                valueEl.style.visibility = 'hidden';
            }
        }
    });
}

    function hideLeaderboardRatings2() {
    const rows = document.querySelectorAll('[class*="row_points"]');
    rows.forEach(row => {
        const valueEl = row.querySelector('div');
        if (valueEl && !valueEl.dataset.hidden) { // avoid double-hiding
            valueEl.style.visibility = 'hidden';
            valueEl.dataset.hidden = 'true';
        }
    });
}

    function hidePodiumRatings() {
    const podiumRatings = document.querySelectorAll('.leaderboard-podium_nameContainer__tS8m_ span div p');
    podiumRatings.forEach(p => {
        if (!p.dataset.hidden) {
            p.style.visibility = 'hidden';
            p.dataset.hidden = 'true';
        }
    });
}

// Run periodically in case the podium updates dynamically
setInterval(hidePodiumRatings, 500);


// Run repeatedly for dynamic updates
setInterval(hideLeaderboardRatings2, 300);


// Run repeatedly for dynamic updates
setInterval(hideMiniPlayerRatings, 300);


// Run repeatedly to catch dynamic React updates
setInterval(hideTeamCardRatings, 300);

// Run repeatedly for dynamic updates
setInterval(hidePreviousWeekRatings, 300);


setInterval(hideLeaderboardRatings, 300);

    // Run immediately
    hideRatings();
    setInterval(hideOverviewRatings, 300);
    setInterval(hideAllDivisionRatings, 300);

    // Watch for dynamically added rating boxes
    const observer = new MutationObserver(hideRatings);
    observer.observe(document.body, { childList: true, subtree: true });
})();
