document.addEventListener('DOMContentLoaded', function() {
  const muscles = document.querySelectorAll('.muscle-group path');
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const modalDetails = document.getElementById("modal-details");

  const frontSvg = document.querySelector('.screen-divide');
  const backSvg = document.querySelector('.screen-divide[viewBox="280 0 350 800"]');
  const toggleBtn = document.getElementById('toggleView');

  backSvg.classList.add('svg-hidden');

  toggleBtn.addEventListener('click', function() {
      frontSvg.classList.toggle('svg-hidden');
      backSvg.classList.toggle('svg-hidden');
  });

 // Define detailed information for each muscle group
 const muscleData = {
  //back
  'trap’': {
    title: 'Trapezius’',
    image: '../img/trapezius/trap.jpg', 
    details: [
      {
        header: 'Standing Dumbbell Shrug',
        img: '../img/trapezius/shrug.gif',
        text: ['Step 1: Stand upright, hold dumbbells in hands by sides.', 
        'Step 2: Elevate shoulders toward ears, squeezing at the top.']
      },
      {
        header: 'Barbell Upright Row',
        img: '../img/trapezius/uprow.gif',
        text: ['Step 1: Grasp barbell with an overhand grip, hands close together.',
        'Step 2: Pull the barbell upward, keeping it close to the body.']
      }
    ]
  },
  'reardelts': {
    title: 'Rear Deltoids',
    image: '../img/reardelt/reardelt.png', 
    details: [
      {
        header: 'Dumbbell Reverse Fly',
        img: '../img/reardelt/reardeltfly.gif',
        text: ['Step 1: Lean forward, dumbbells in hands, arms extended downward.',
        'Step 2: Raise arms to the sides, squeezing shoulder blades together.']
      },
      {
          header: 'Wide Grip Pull-Up',
          img: '../img/reardelt/pullupwide.gif',
          text: ['Step 1: Hang from a bar with a wide grip.',
          'Step 2: Pull body upward until chin passes bar.']
        },
    ]
  },
  'triceps': {
      title: 'Triceps',
      image: '../img/triceps/triceps_0.jpg', 
      details: [
        {
          header: 'Close Grip Bench Press',
          img: '../img/triceps/pressclose.gif',
          text: ['Step 1: Lie on a bench, hands closer than shoulder-width apart.',
          'Step 2: Lower the bar to the chest and press it upward.']
        },
        {
            header: 'Weighted Tricep Dips',
            img: '../img/triceps/dipw.gif',
            text: ['Step 1: Support yourself between parallel bars.',
            'Step 2: Lower body by bending arms, then push back up.']
          },
      ]
    },
    'lats': {
      title: 'Lateral Muscles',
      image: '../img/laterals/lats.jpg', 
      details: [
        {
          header: 'Lat Pulldown',
          img: '../img/laterals/latpull.gif',
          text: ['Step 1: Sit at a lat pulldown machine, grasp bar overhead.',
          'Step 2: Pull bar down towards chest, squeezing back muscles.']
        },
        {
          header: 'Wide Grip Pull-Up',
          img: '../img/laterals/pulat.gif',
          text: ['Step 1: Hang from a bar with a wide grip.',
          'Step 2: Pull body upward until chin passes bar.']
          },
      ]
    },
    'lowerback': {
      title: 'Lower Back Muscles',
      image: '../img/lowerback/lowerback.jpg', 
      details: [
        {
          header: 'Superman',
          img: '../img/lowerback/super.gif',
          text: ['Step 1: Lie face down, arms/legs extended.',
          'Lift arms and legs off the ground, arching back slightly.']
        },
        {
          header: 'Dumbbell Deadlift',
          img: '../img/lowerback/dumbd.gif',
          text: ['Step 1: Stand with dumbbells in hands, knees slightly bent.',
          'Step 2: Lower dumbbells towards the ground, then stand back up.']
          },
      ]
    },
    'glute': {
      title: 'Glutes',
      image: '../img/glutes/glute.jpg', 
      details: [
        {
          header: 'Barbell Hip Thrust',
          img: '../img/glutes/barbhip.gif',
          text: ['Step 1: Sit on the ground, barbell across hips.', 
          'Step 2: Thrust hips upward, squeezing glutes at the top.']
        },
        {
          header: 'Good Mornings',
          img: '../img/glutes/standgm.gif',
          text: ['Step 1: Hold a barbell across shoulders, feet shoulder-width apart.',
          'Step 2: Bend forward at hips, then return to upright position.']
          },
      ]
    },
    'hams': {
      title: 'Hamstrings',
      image: '../img/hamstrings/hams.jpg', 
      details: [
        {
          header: 'Stiff Leg Deadlift',
          img: '../img/hamstrings/seatleg.gif',
          text: ['Step 1: Hold a barbell with an overhand grip, feet hip-width apart.',
          'Step 2: Hinge at hips, lowering barbell towards the ground.']
        },
        {
          header: 'Seated Leg Curl',
          img: '../img/hamstrings/stiffleg.gif',
          text: ['Step 1: Sit on leg curl machine, adjust weight.',
          'Step2: Curl legs toward buttocks by bending knees.']
          },
      ]
    },
    'calf': {
      title: 'Calves',
      image: '../img/calf/calves_0.jpg', 
      details: [
        {
          header: 'Seated Calf Raise',
          img: '../img/calf/seatedca.gif',
          text: ['Step 1: Sit on calf raise machine, adjust weight.',
          'Step 2: Push platform by extending ankles, then lower.']
        },
        {
          header: 'Standing Machine Calf Raise',
          img: '../img/calf/standingma.gif',
          text: ['Step 1: Stand on a calf raise machine, adjust weight.',
          'Step 2: Raise heels by extending ankles, then lower.']
          },
      ]
    },
    //front
    'neck': {
      title: 'Neck',
      image: '../img/neck/neck.jpg', 
      details: [
        {
          header: 'Tiger Tail',
          img: '../img/neck/tigert.gif',
          text: ['Step 1: Position the tiger tail at the base of the neck with one hand on either handle.',
          'Step 2: Slowly roll up and down the length of one side of the neck for 20-30 seconds.']
        },
        {
          header: 'Standing Barbell Curl',
          img: '../img/neck/standbarb.gif',
          text: ['Step 1: Hold barbell with an underhand grip, arms extended.',
          'Step 2: Curl barbell toward shoulders, squeezing biceps.']
          },
      ]
    },
    'frontdelt': {
      title: 'Front Shoulder',
      image: '../img/frontdelt/shoulders_0.jpg', 
      details: [
        {
          header: 'Overhead Press',
          img: '../img/frontdelt/opress.gif',
          text: ['Step 1: Hold dumbbells at shoulder height.',
          'Step 2: Press dumbbells overhead, extending arms.']
        },
        {
          header: 'Seated Dumbbell Press',
          img: '../img/frontdelt/seatpress.gif',
          text: ['Step 1: Sit on a bench, hold dumbbells at shoulder height.',
          'Step 2: Press dumbbells overhead, extending arms']
          },
      ]
    },
    'biceps': {
      title: 'Biceps',
      image: '../img/biceps/bicep.jpg', 
      details: [
        {
          header: 'Standing Barbell Curl',
          img: '../img/biceps/standingbarbellcurl.gif',
          text: ['Step 1: Hold barbell with an underhand grip, arms extended.',
          'Step 2: Curl barbell toward shoulders, squeezing biceps.']
        },
        {
          header: 'Incline Dumbbell Curl',
          img: '../img/biceps/incdumb.gif',
          text: ['Step 1: Sit on an incline bench, hold dumbbells at sides.',
          'Step 2: Curl dumbbells upward, keeping upper arms still.']
          },
      ]
    },
    'forearms': {
      title: 'Forearms',
      image: '../img/forearms/forearms_0.jpg', 
      details: [
        {
          header: 'Reverse Grip Barbell Curl',
          img: '../img/forearms/rgbarbcurl.gif',
          text: ['Step 1: Hold barbell with an underhand grip.',
          'Step 2: Curl barbell toward shoulders, focusing on forearms.']
        },
        {
          header: 'Plate Pinch Carry',
          img: '../img/forearms/platpin.gif',
          text: ['Step 1: Grasp a plate in each hand using just your fingers.',
          'Step 2: While maintaining an active shoulder position, hold the plates by your side and walk for a designated distance or amount of time.']
          },
      ]
    },
    'pecs': {
      title: 'Pectorals',
      image: '../img/pectorals/chest_0.jpg', 
      details: [
        {
          header: 'Dumbbell Bench Press',
          img: '../img/pectorals/press.gif',
          text: ['Step 1: Lie on a bench, dumbbells in hand above chest.',
          'Step 2: Lower dumbbells to chest, then press upward.']
        },
        {
          header: 'Chest Dip',
          img: '../img/pectorals/dips.gif',
          text: ['Step 1: Support body between parallel bars.',
          'Step 2: Lower body by bending arms, then push back up.']
          },
      ]
    },
    'abs': {
      title: 'Abs',
      image: '../img/abs/abs_0.jpg', 
      details: [
        {
          header: 'Crunches',
          img: 'N/a',
          text: ['Crunches']
        }
      ]
    },
    'obliques': {
      title: 'Obliques',
      image: '../img/obliques/oblique.jpg', 
      details: [
        {
          header: 'Tall Kneeling Cable Lift',
          img: '../img/obliques/tallkneellift.gif',
          text: ['Step 1: Kneel, hold cable handle, rotate torso upward.',
          'Step 2: Pull cable across body, engaging obliques.']
        },
        {
          header: 'Tall Kneeling Cable Chop',
          img: '../img/obliques/tallkneel.gif',
          text: ['Step 1: Kneel, hold cable handle, rotate torso downward.',
          'Step 2: Pull cable diagonally, engaging obliques.']
          },
      ]
    },
    'abduc': {
      title: 'Abductors',
      image: '../img/abductors/abductors.jpg', 
      details: [
        {
          header: 'Hip Abduction Machine',
          img: '../img/abductors/cableabduction.gif',
          text: ['Step 1: Setup in an upright position with your back against the pad and your spine neutral.',
          'Step 2: Exhale and push the legs apart as you open the pads.']
        },
        {
          header: 'Cable Hip Abduction',
          img: '../img/abductors/cablehip.gif',
          text: ['Step 1: Attach an ankle strap to a low pulley cable machine and set your preferred weight.',
          'Step 2: Stand straight, attach the strap to your left ankle, lift your leg sideways, lower it, and repeat for reps. Then switch sides and repeat the same steps with your right leg.']
          },
      ]
    },
    'adduc': {
      title: 'Adductors',
      image: '../img/adductors/adduc.jpg', 
      details: [
        {
          header: 'Deep Squat Pry',
          img: '../img/adductors/deepsquat.gif',
          text: ['Step 1: Hold a kettlebell at chest height while standing shoulder-width apart.',
          'Step 2: Squat down, moving hips and knees together, then rock side to side while flexing ankles and pushing knees out with elbows. Repeat for desired reps or time.']
        },
        {
          header: 'Machine Adductor',
          img: '../img/adductors/machineadd.gif',
          text: ['Step 1: Start upright against the pad, keep your back neutral.',
          'Step 2: Exhale and squeeze the pads together, then return to the starting position. Repeat for desired reps.']
          },
      ]
    },
    'quads': {
      title: 'Quadriceps',
      image: '../img/quads/quad.jpg', 
      details: [
        {
          header: 'Leg Press',
          img: '../img/quads/lpress.gif',
          text: ['Step 1: Sit on leg press machine, adjust weight.',
          'Step 2: Push platform forward by extending legs.']
        },
        {
          header: 'Machine Hack Squat',
          img: '../img/quads/hacksq.gif',
          text: ['Step 1: Position body on hack squat machine, adjust weight.',
          'Step 2: Lower platform by bending knees, then extend..']
          },
      ]
    }
};

  muscles.forEach(function(muscle) {
    muscle.addEventListener('click', function() {
      const groupId = muscle.parentElement.id;
      const groupData = muscleData[groupId] || {
        title: 'General Information',
        image: '/path/to/default-group-image.jpg', // Default image if group not found
        details: [{
          header: 'General Information about ' + groupId,
          img: '/path/to/default-image.jpg',
          text: 'General information about ' + groupId
        }]
      };

      showModalWithGroupData(groupData);
    });
  });

  function showModalWithGroupData(groupData) {
    modal.style.display = "block";
    modalDetails.innerHTML = '';
  
    const groupImage = document.createElement("img");
    groupImage.src = groupData.image;
    groupImage.alt = groupData.title;
    groupImage.style.width = '100%';
    modalDetails.appendChild(groupImage);
  
    const modalTitle = document.createElement("h1");
    modalTitle.textContent = groupData.title;
    modalDetails.appendChild(modalTitle);
  
    groupData.details.forEach(function(detail) {
      const detailsElement = document.createElement("details");
      const summary = document.createElement("summary");
      const content = document.createElement("div");
      const img = document.createElement("img");
      const textList = document.createElement("ul");
  
      summary.textContent = detail.header;
      img.src = detail.img;
      img.alt = detail.header;
  
      detail.text.forEach(function(listItemText) {
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

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
