let totalScans = 0;
let highRisk = 0;
let mediumRisk = 0;
let lowRisk = 0;

function analyzeEmail() {

    const email = document.getElementById("emailText").value.toLowerCase();

    const phishingWords = [
        "urgent",
        "verify",
        "password",
        "click here",
        "bank",
        "otp",
        "winner",
        "gift",
        "limited time",
        "account suspended"
    ];

    let score = 0;
    let detectedWords = [];
    let suspiciousLinks = [];

    phishingWords.forEach(word => {

        if(email.includes(word)){

            score += 10;
            detectedWords.push(word);

        }

    });

    const links = email.match(/https?:\/\/[^\s]+/g);

    if(links){

        suspiciousLinks = links;
        score += 20;

    }

    let riskLevel = "";
    let color = "";
    let recommendation = "";

    if(score <= 30){

        riskLevel = "🟢 LOW RISK";
        color = "lightgreen";
        recommendation = "Email appears safe.";

        lowRisk++;

    }

    else if(score <= 60){

        riskLevel = "🟡 MEDIUM RISK";
        color = "yellow";
        recommendation = "Be careful before clicking any links.";

        mediumRisk++;

    }

    else{

        riskLevel = "🔴 HIGH RISK";
        color = "#ff4d4d";
        recommendation = "Do NOT click any links. Report this email immediately.";

        highRisk++;

    }

    totalScans++;

    document.getElementById("totalScans").innerHTML = totalScans;
    document.getElementById("highRisk").innerHTML = highRisk;
    document.getElementById("mediumRisk").innerHTML = mediumRisk;
    document.getElementById("lowRisk").innerHTML = lowRisk;

    document.getElementById("result").innerHTML = `

        <h2 style="color:${color};">${riskLevel}</h2>

        <h3>Risk Score : ${score}%</h3>

        <hr>

        <h3>Detected Keywords</h3>

        <p>${detectedWords.length ? detectedWords.join(", ") : "None"}</p>

        <h3>Suspicious Links</h3>

        <p>${suspiciousLinks.length ? suspiciousLinks.join("<br>") : "No Links Found"}</p>

        <h3>Security Recommendation</h3>

        <p>${recommendation}</p>

    `;

}

function clearEmail(){

    document.getElementById("emailText").value = "";

    document.getElementById("result").innerHTML = "";

}