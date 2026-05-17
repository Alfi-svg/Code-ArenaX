async function checkSolvedProblems() {
    const handle = document.getElementById('cf-handle').value.trim();
    
    if (!handle) {
        alert("Please enter your Codeforces handle!");
        return;
    }

    // Button state update
    const btn = document.querySelector('.user-auth button');
    btn.innerText = "Checking...";
    btn.disabled = true;

    try {
        // Codeforces API call
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await response.json();

        if (data.status === "OK") {
            const submissions = data.result;
            
            // Shudhu shei problem gulo nibo jeta 'OK' (Solved)
            // Name gulo lower case kore ekta Set-e rakhchi fast search er jonno
            const solvedProblems = new Set(
                submissions
                    .filter(sub => sub.verdict === "OK")
                    .map(sub => sub.problem.name.toLowerCase())
            );

            // HTML er sob problem row gulo dhorchi
            const rows = document.querySelectorAll('.row:not(.header)');
            
            rows.forEach(row => {
                const link = row.querySelector('a');
                if (link) {
                    const problemName = link.innerText.trim().toLowerCase();
                    
                    // Jodi API theke pawa name er sathe mile jay
                    if (solvedProblems.has(problemName)) {
                        row.classList.add('solved-row');
                    } else {
                        row.classList.remove('solved-row');
                    }
                }
            });

            alert("Progress updated! Solved problems are now green.");
        } else {
            alert("Handle not found. Please check the username.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to Codeforces. Try again later.");
    } finally {
        btn.innerText = "Update Progress";
        btn.disabled = false;
    }
}