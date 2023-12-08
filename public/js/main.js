document.addEventListener("DOMContentLoaded", function () {
  const muscles = document.querySelectorAll(".muscle-group path");
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const modalDetails = document.getElementById("modal-details");

  const frontSvg = document.querySelector(".screen-divide");
  const backSvg = document.querySelector(
    '.screen-divide[viewBox="280 0 350 800"]'
  );
  const toggleBtn = document.getElementById("toggleView");

  backSvg.classList.add("svg-hidden");

  toggleBtn.addEventListener("click", function () {
    frontSvg.classList.toggle("svg-hidden");
    backSvg.classList.toggle("svg-hidden");
  });

  // Define detailed information for each muscle group
  const muscleData = {
    //back
    "trap’": {
      title: "Trapezius’",
      image: "/public/img/trapezius/trap.jpg",
      details: [
        {
          header: "Standing Dumbbell Shrug",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/Dumbbell-Shrug.gif",
          text: [
            "Step 1: Stand upright, hold dumbbells in hands by sides.",
            "Step 2: Elevate shoulders toward ears, squeezing at the top.",
          ],
        },
        {
          header: "Barbell Upright Row",
          img: "../img/trapezius/uprow.gif",
          text: [
            "Step 1: Grasp barbell with an overhand grip, hands close together.",
            "Step 2: Pull the barbell upward, keeping it close to the body.",
          ],
        },
      ],
    },
    reardelts: {
      title: "Rear Deltoids",
      image: "/public/img/reardelt/reardelt.png",
      details: [
        {
          header: "Dumbbell Reverse Fly",
          img: "https://img.livestrong.com/630x/ppds/a32e5b4f-ca57-46b1-89af-069054c91212.gif",
          text: [
            "Step 1: Lean forward, dumbbells in hands, arms extended downward.",
            "Step 2: Raise arms to the sides, squeezing shoulder blades together.",
          ],
        },
        {
          header: "Wide Grip Pull-Up",
          img: "https://media.giphy.com/media/jVZFKDqkbxDEkbfGUA/giphy.gif",
          text: [
            "Step 1: Hang from a bar with a wide grip.",
            "Step 2: Pull body upward until chin passes bar.",
          ],
        },
      ],
    },
    triceps: {
      title: "Triceps",
      image: "/public/img/triceps/triceps_0.jpg",
      details: [
        {
          header: "Close Grip Bench Press",
          img: "https://media.tenor.com/R3GzxVSDXeAAAAAC/close-grip-barbell-press.gif",
          text: [
            "Step 1: Lie on a bench, hands closer than shoulder-width apart.",
            "Step 2: Lower the bar to the chest and press it upward.",
          ],
        },
        {
          header: "Weighted Tricep Dips",
          img: "https://hips.hearstapps.com/hmg-prod/images/workouts/2017/10/weighteddips-1509375766.gif",
          text: [
            "Step 1: Support yourself between parallel bars.",
            "Step 2: Lower body by bending arms, then push back up.",
          ],
        },
      ],
    },
    lats: {
      title: "Lateral Muscles",
      image: "/public/img/laterals/lats.jpg",
      details: [
        {
          header: "Lat Pulldown",
          img: "https://media.tenor.com/mBPvMzz9Y_kAAAAd/lat-pulldowns.gif",
          text: [
            "Step 1: Sit at a lat pulldown machine, grasp bar overhead.",
            "Step 2: Pull bar down towards chest, squeezing back muscles.",
          ],
        },
        {
          header: "Wide Grip Pull-Up",
          img: "https://media.giphy.com/media/jVZFKDqkbxDEkbfGUA/giphy.gif",
          text: [
            "Step 1: Hang from a bar with a wide grip.",
            "Step 2: Pull body upward until chin passes bar.",
          ],
        },
      ],
    },
    lowerback: {
      title: "Lower Back Muscles",
      image: "/public/img/lowerback/lowerback.jpg",
      details: [
        {
          header: "Superman",
          img: "https://cdn.jefit.com/assets/img/exercises/gifs/94.gif",
          text: [
            "Step 1: Lie face down, arms/legs extended.",
            "Lift arms and legs off the ground, arching back slightly.",
          ],
        },
        {
          header: "Dumbbell Deadlift",
          img: "https://media.tenor.com/kyOyzUcfIpMAAAAC/dumbbell-romanian.gif",
          text: [
            "Step 1: Stand with dumbbells in hands, knees slightly bent.",
            "Step 2: Lower dumbbells towards the ground, then stand back up.",
          ],
        },
      ],
    },
    glute: {
      title: "Glutes",
      image: "/public/img/glutes/glute.jpg",
      details: [
        {
          header: "Barbell Hip Thrust",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/02/Hip-thrust.gif",
          text: [
            "Step 1: Sit on the ground, barbell across hips.",
            "Step 2: Thrust hips upward, squeezing glutes at the top.",
          ],
        },
        {
          header: "Good Mornings",
          img: "https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/dumbbellgoodmorning-1457046257.gif",
          text: [
            "Step 1: Hold a barbell across shoulders, feet shoulder-width apart.",
            "Step 2: Bend forward at hips, then return to upright position.",
          ],
        },
      ],
    },
    hams: {
      title: "Hamstrings",
      image: "/public/img/hamstrings/hams.jpg",
      details: [
        {
          header: "Stiff Leg Deadlift",
          img: "https://i.makeagif.com/media/12-04-2017/0tvOB9.gif",
          text: [
            "Step 1: Hold a barbell with an overhand grip, feet hip-width apart.",
            "Step 2: Hinge at hips, lowering barbell towards the ground.",
          ],
        },
        {
          header: "Seated Leg Curl",
          img: "https://media.tenor.com/GLaVvK15troAAAAC/seated-leg-curl.gif",
          text: [
            "Step 1: Sit on leg curl machine, adjust weight.",
            "Step2: Curl legs toward buttocks by bending knees.",
          ],
        },
      ],
    },
    calf: {
      title: "Calves",
      image: "/public/img/calf/calves_0.jpg",
      details: [
        {
          header: "Seated Calf Raise",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/calf-raise-seated.gif",
          text: [
            "Step 1: Sit on calf raise machine, adjust weight.",
            "Step 2: Push platform by extending ankles, then lower.",
          ],
        },
        {
          header: "Standing Machine Calf Raise",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/calf-raise-standing.gif",
          text: [
            "Step 1: Stand on a calf raise machine, adjust weight.",
            "Step 2: Raise heels by extending ankles, then lower.",
          ],
        },
      ],
    },
    //front
    neck: {
      title: "Neck",
      image: "/public/img/neck/neck.jpg",
      details: [
        {
          header: "Tiger Tail",
          img: "https://gymvisual.com/img/p/1/8/6/8/1/18681.gif",
          text: [
            "Step 1: Position the tiger tail at the base of the neck with one hand on either handle.",
            "Step 2: Slowly roll up and down the length of one side of the neck for 20-30 seconds.",
          ],
        },
        {
          header: "Standing Barbell Curl",
          img: "https://images.ctfassets.net/8urtyqugdt2l/6Upxd3Fxf5jzr21Pi5lGWS/046d039fc6fe0a90edb00d4def561953/how_to_ez_barbell_curl_exercise.gif",
          text: [
            "Step 1: Hold barbell with an underhand grip, arms extended.",
            "Step 2: Curl barbell toward shoulders, squeezing biceps.",
          ],
        },
      ],
    },
    frontdelt: {
      title: "Front Shoulder",
      image: "/public/img/frontdelt/shoulders_0.jpg",
      details: [
        {
          header: "Overhead Press",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/12/Overhead-press-exercise.gif",
          text: [
            "Step 1: Hold dumbbells at shoulder height.",
            "Step 2: Press dumbbells overhead, extending arms.",
          ],
        },
        {
          header: "Seated Dumbbell Press",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/Dumbbell-Incline-Press.gif",
          text: [
            "Step 1: Sit on a bench, hold dumbbells at shoulder height.",
            "Step 2: Press dumbbells overhead, extending arms",
          ],
        },
      ],
    },
    biceps: {
      title: "Biceps",
      image: "/public/img/biceps/bicep.jpg",
      details: [
        {
          header: "Standing Barbell Curl",
          img: "https://images.ctfassets.net/8urtyqugdt2l/6Upxd3Fxf5jzr21Pi5lGWS/046d039fc6fe0a90edb00d4def561953/how_to_ez_barbell_curl_exercise.gif",
          text: [
            "Step 1: Hold barbell with an underhand grip, arms extended.",
            "Step 2: Curl barbell toward shoulders, squeezing biceps.",
          ],
        },
        {
          header: "Incline Dumbbell Curl",
          img: "https://i.makeagif.com/media/8-05-2015/OZGZTL.gif",
          text: [
            "Step 1: Sit on an incline bench, hold dumbbells at sides.",
            "Step 2: Curl dumbbells upward, keeping upper arms still.",
          ],
        },
      ],
    },
    forearms: {
      title: "Forearms",
      image: "/public/img/forearms/forearms_0.jpg",
      details: [
        {
          header: "Reverse Grip Barbell Curl",
          img: "https://synergydotfitnessdotblog.files.wordpress.com/2020/06/img_4962.gif",
          text: [
            "Step 1: Hold barbell with an underhand grip.",
            "Step 2: Curl barbell toward shoulders, focusing on forearms.",
          ],
        },
        {
          header: "Plate Pinch Carry",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2021/01/Plate-Pinch.gif",
          text: [
            "Step 1: Grasp a plate in each hand using just your fingers.",
            "Step 2: While maintaining an active shoulder position, hold the plates by your side and walk for a designated distance or amount of time.",
          ],
        },
      ],
    },
    pecs: {
      title: "Pectorals",
      image: "/public/img/pectorals/chest_0.jpg",
      details: [
        {
          header: "Dumbbell Bench Press",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/Dumbbell-Incline-Press.gif",
          text: [
            "Step 1: Lie on a bench, dumbbells in hand above chest.",
            "Step 2: Lower dumbbells to chest, then press upward.",
          ],
        },
        {
          header: "Chest Dip",
          img: "https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/02/Dips.gif",
          text: [
            "Step 1: Support body between parallel bars.",
            "Step 2: Lower body by bending arms, then push back up.",
          ],
        },
      ],
    },
    abs: {
      title: "Abs",
      image: "/public/img/abs/abs_0.jpg",
      details: [
        {
          header: "Crunches",
          img: "N/a",
          text: ["Crunches"],
        },
      ],
    },
    obliques: {
      title: "Obliques",
      image: "/public/img/obliques/obliques.jpg",
      details: [
        {
          header: "Tall Kneeling Cable Lift",
          img: "https://cdn.muscleandstrength.com/sites/default/files/tall-kneeling-cable-lift.jpg",
          text: [
            "Step 1: Kneel, hold cable handle, rotate torso upward.",
            "Step 2: Pull cable across body, engaging obliques.",
          ],
        },
        {
          header: "Tall Kneeling Cable Chop",
          img: "https://www.functionalmovement.com/exercises/image/4086",
          text: [
            "Step 1: Kneel, hold cable handle, rotate torso downward.",
            "Step 2: Pull cable diagonally, engaging obliques.",
          ],
        },
      ],
    },
    abduc: {
      title: "Abductors",
      image: "/public/img/abductors/abductors.jpg",
      details: [
        {
          header: "Hip Abduction Machine",
          img: "https://cdn.jefit.com/assets/img/exercises/gifs/216.gif",
          text: [
            "Step 1: Setup in an upright position with your back against the pad and your spine neutral.",
            "Step 2: Exhale and push the legs apart as you open the pads.",
          ],
        },
        {
          header: "Cable Hip Abduction",
          img: "https://cdn.jefit.com/assets/img/exercises/gifs/216.gif",
          text: [
            "Step 1: Attach an ankle strap to a low pulley cable machine and set your preferred weight.",
            "Step 2: Stand straight, attach the strap to your left ankle, lift your leg sideways, lower it, and repeat for reps. Then switch sides and repeat the same steps with your right leg.",
          ],
        },
      ],
    },
    adduc: {
      title: "Adductors",
      image: "/public/img/adductors/adduc.jpg",
      details: [
        {
          header: "Deep Squat Pry",
          img: "https://i.makeagif.com/media/7-03-2021/-ygYRc.gif",
          text: [
            "Step 1: Hold a kettlebell at chest height while standing shoulder-width apart.",
            "Step 2: Squat down, moving hips and knees together, then rock side to side while flexing ankles and pushing knees out with elbows. Repeat for desired reps or time.",
          ],
        },
        {
          header: "Machine Adductor",
          img: "https://cdn.jefit.com/assets/img/exercises/gifs/217.gif",
          text: [
            "Step 1: Start upright against the pad, keep your back neutral.",
            "Step 2: Exhale and squeeze the pads together, then return to the starting position. Repeat for desired reps.",
          ],
        },
      ],
    },
    quads: {
      title: "Quadriceps",
      image: "/public/img/quads/quad.jpg",
      details: [
        {
          header: "Leg Press",
          img: "https://media.tenor.com/NDFafSQfq_kAAAAd/leg-press-machine.gif",
          text: [
            "Step 1: Sit on leg press machine, adjust weight.",
            "Step 2: Push platform forward by extending legs.",
          ],
        },
        {
          header: "Machine Hack Squat",
          img: "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/04/hack-squat-machine.gif?fit=600%2C600&ssl=1",
          text: [
            "Step 1: Position body on hack squat machine, adjust weight.",
            "Step 2: Lower platform by bending knees, then extend..",
          ],
        },
      ],
    },
  };

  muscles.forEach(function (muscle) {
    muscle.addEventListener("click", function () {
      const groupId = muscle.parentElement.id;
      const groupData = muscleData[groupId] || {
        title: "General Information",
        image: "/path/to/default-group-image.jpg", // Default image if group not found
        details: [
          {
            header: "General Information about " + groupId,
            img: "/path/to/default-image.jpg",
            text: "General information about " + groupId,
          },
        ],
      };

      showModalWithGroupData(groupData);
    });
  });

  function showModalWithGroupData(groupData) {
    modal.style.display = "block";
    modalDetails.innerHTML = "";

    const groupImage = document.createElement("img");
    groupImage.src = groupData.image;
    groupImage.alt = groupData.title;
    groupImage.style.width = "100%";
    modalDetails.appendChild(groupImage);

    const modalTitle = document.createElement("h1");
    modalTitle.textContent = groupData.title;
    modalDetails.appendChild(modalTitle);

    groupData.details.forEach(function (detail) {
      const detailsElement = document.createElement("details");
      const summary = document.createElement("summary");
      const content = document.createElement("div");
      const img = document.createElement("img");
      const textList = document.createElement("ul");

      summary.textContent = detail.header;
      img.src = detail.img;
      img.alt = detail.header;

      detail.text.forEach(function (listItemText) {
        const listItem = document.createElement("li");
        listItem.textContent = listItemText;
        textList.appendChild(listItem);
      });

      content.appendChild(img);
      content.appendChild(textList);
      detailsElement.appendChild(summary);
      detailsElement.appendChild(content);
      modalDetails.appendChild(detailsElement);
    });
  }

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
