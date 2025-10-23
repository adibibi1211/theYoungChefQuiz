// הגדרת משתנים גלובליים
const nameInput = document.getElementById("userName");
const submitBtn = document.getElementById("submitBtn");
const chefBaby = document.getElementById("chefBaby");
const chefMedium = document.getElementById("chefMedium");
const chefKing = document.getElementById("chefKing");

// פופ-אפ
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupText = document.getElementById("popupText");

// מערכים
const KITCHEN_IDS = ["italian","asian","mexican","american","middle"];
const KITCHEN_IMG_IDS = ["img_italian","img_asian","img_mexican","img_american","img_middle"];
const KITCHEN_NAMES = ["איטלקי","אסייתי","מקסיקני","אמריקאי","מזרח-תיכוני"];
const KITCHEN_POINTS = [2,3,2,1,1];

const VALUE_IDS = ["fast","taste","style","health","money"];
const VALUE_IMG_IDS = ["img_fast","img_taste","img_style","img_health","img_money"];
const VALUE_NAMES = ["מהירות","טעם","עיצוב ההגשה","בריאות","חיסכון"];
const VALUE_POINTS = [1,3,2,2,1];

const LEARN_IDS = ["learn1","learn2","learn3","learn4","learn5"];
const LEARN_IMG_IDS = ["img1","img2","img3","img4","img5"];
const LEARN_NAMES = ["קינוחים מתקדמים ","מנות גורמה ","תבשילים ביתיים ","מאפים צבעוניים ","מנות טבעוניות "];

const FOOD_IDS = ["food1","food2","food3","food4"];
const FOOD_IMG_IDS = ["foodImg1","foodImg2","foodImg3","foodImg4"];
const FOOD_NAMES = ["קינוחים ","סלטים ","מנות עיקריות ","מאפים "];
const FOOD_POINTS = [3,1,3,2];


// עדכון העמוד
function updatePage(){
    let nameFilled = nameInput.value;
    let kitchenChosen = false;
    let valueChosen = false;

    // מטבח
    for(let i=0;i<KITCHEN_IDS.length;i++){
        const radio=document.getElementById(KITCHEN_IDS[i]);
        const img=document.getElementById(KITCHEN_IMG_IDS[i]);
        if(radio.checked){ kitchenChosen=true; img.style.opacity=1; }
        else{ img.style.opacity=0; }
    }

    // ערך
    for(let i=0;i<VALUE_IDS.length;i++){
        const radio=document.getElementById(VALUE_IDS[i]);
        const img=document.getElementById(VALUE_IMG_IDS[i]);
        if(radio.checked){ valueChosen=true; img.style.opacity=1; }
        else{ img.style.opacity=0; }
    }

    // הפעלת כפתור רק כשמולאו כל הנתונים
    if(nameFilled!=="" && kitchenChosen && valueChosen){
        submitBtn.classList.add("active");
    } else {
        submitBtn.classList.remove("active");
    }

    // למידה
    for(let i=0;i<LEARN_IDS.length;i++){
        const box=document.getElementById(LEARN_IDS[i]);
        const img=document.getElementById(LEARN_IMG_IDS[i]);
        if(box.checked){ img.style.opacity=1; } else { img.style.opacity=0.5; }
    }

    // אוכל
    for(let i=0;i<FOOD_IDS.length;i++){
        const box=document.getElementById(FOOD_IDS[i]);
        const img=document.getElementById(FOOD_IMG_IDS[i]);
        if(box.checked){ img.style.opacity=1; } else { img.style.opacity=0.5; }
    }
}


// הצגת סיכום בפופ-אפ

function showSummary(){
    const userName=nameInput.value;
    let kitchen="", value="", learnList="", foodList="", score=0;

    // מטבח
    for(let i=0;i<KITCHEN_IDS.length;i++){
        const radio=document.getElementById(KITCHEN_IDS[i]);
        if(radio.checked){ kitchen=KITCHEN_NAMES[i]; score+=KITCHEN_POINTS[i]; }
    }

    // ערך
    for(let i=0;i<VALUE_IDS.length;i++){
        const radio=document.getElementById(VALUE_IDS[i]);
        if(radio.checked){ value=VALUE_NAMES[i]; score+=VALUE_POINTS[i]; }
    }

    // למידה
    for(let i=0;i<LEARN_IDS.length;i++){
        const box=document.getElementById(LEARN_IDS[i]);
        if(box.checked){ learnList+=LEARN_NAMES[i]; }
    }

    // אוכל
    for(let i=0;i<FOOD_IDS.length;i++){
        const box=document.getElementById(FOOD_IDS[i]);
        if(box.checked){ foodList+=FOOD_NAMES[i]; score+=FOOD_POINTS[i]; }
    }

    if(userName===""||kitchen===""||value===""){
        alert("יש לענות על כל השאלות לפני המשך.");
        return;
    }

    // קביעת סוג השף
    let message="", selectedImg="";
    if(score<=5){ message="שף תינוק"; selectedImg=chefBaby.src; }
    else if(score<=9){ message="שף מתקדם"; selectedImg=chefMedium.src; }
    else { message="שף מלך"; selectedImg=chefKing.src; }

    // הצגת הפופ-אפ
    popupImg.src = selectedImg;
    popupText.innerHTML =
        "<p><strong>" + userName + "</strong>, אתה " + message + "!<br>" +
        "מטבח: " + kitchen + "<br>" +
        "מה חשוב בבישול: " + value + "<br>" +
        "מה תרצה ללמוד: " + learnList + "<br>" +
        "מה אתה מבשל: " + foodList + "</p>";

    popup.style.opacity = 1;
    popup.style.pointerEvents = "auto";
}

// סגירת פופ-אפ
function closePopup(){
    popup.style.opacity = 0;
    popup.style.pointerEvents = "none";
}
function closePopupByBackdrop(event){
    if(event.target===popup){ closePopup(); }
}
