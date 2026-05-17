/* =========================================
   CODEFORCES SOLVED PROBLEM CHECKER
========================================= */

async function checkSolvedProblems() {

    const handle = document
        .getElementById('cf-handle')
        .value
        .trim();

    if (!handle) {

        alert("Please enter your Codeforces handle!");
        return;
    }

    /* Button State */

    const btn = document.querySelector('.user-auth button');

    btn.innerText = "Checking...";
    btn.disabled = true;

    try {

        /* API CALL */

        const response = await fetch(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );

        const data = await response.json();


        /* SUCCESS */

        if (data.status === "OK") {

            const submissions = data.result;


            /* ONLY SOLVED PROBLEMS */

            const solvedProblems = new Set(

                submissions

                    .filter(sub => sub.verdict === "OK")

                    .map(sub =>
                        sub.problem.name
                        .trim()
                        .toLowerCase()
                    )
            );


            /* SELECT ALL ROWS */

            const rows = document.querySelectorAll(
                '.row:not(.header)'
            );


            rows.forEach(row => {

                const link = row.querySelector('a');

                if (link) {

                    const problemName = link.innerText
                        .trim()
                        .toLowerCase();


                    /* MATCH */

                    if (solvedProblems.has(problemName)) {

                        row.classList.add('solved-row');

                    } else {

                        row.classList.remove('solved-row');
                    }
                }
            });


            alert(
                "Progress updated! Solved problems are now green."
            );

        } else {

            alert(
                "Handle not found. Please check the username."
            );
        }

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Failed to connect to Codeforces. Try again later."
        );

    } finally {

        btn.innerText = "Update Progress";
        btn.disabled = false;
    }
}



/* =========================================
   ABOUT CARD OPEN
========================================= */

function openAbout() {

    document
        .getElementById("about-card")
        .style.display = "block";
}



/* =========================================
   ABOUT CARD CLOSE
========================================= */

function closeAbout() {

    document
        .getElementById("about-card")
        .style.display = "none";
}



/* =========================================
   CLOSE WHEN CLICK OUTSIDE
========================================= */

window.addEventListener("click", function(event) {

    const aboutCard =
        document.getElementById("about-card");

    if (event.target === aboutCard) {

        aboutCard.style.display = "none";
    }
});



/* =========================================
   ESC KEY CLOSE
========================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeAbout();
    }
});



/* =========================================
   OPTIONAL SMOOTH LOAD EFFECT
========================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";
});