// Velvet Hug 30-Second Sleep Companion Diagnostic Engine
// Benchmarked against Duroflex quiz flow for high-conversion personalization

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is your primary sleeping position?',
    subtitle: 'Your sleep position dictates the angle of your lumbar spine and pressure zones.',
    options: [
      {
        id: 'side',
        label: 'Side Sleeper',
        desc: 'Need contouring around shoulders and hips to keep spine straight',
        icon: 'user-check',
        points: { Reserve: 3, ReservePlus: 3, Signature: 2, Essential: 0 }
      },
      {
        id: 'back',
        label: 'Back Sleeper',
        desc: 'Need gentle lumbar curve support without sagging into the bed',
        icon: 'arrow-up',
        points: { Signature: 3, Essential: 2, Reserve: 2, ReservePlus: 1 }
      },
      {
        id: 'stomach',
        label: 'Stomach Sleeper',
        desc: 'Need firmer support to prevent hyperextension of lower back',
        icon: 'compass',
        points: { Essential: 3, Signature: 2, Reserve: 1, ReservePlus: 0 }
      },
      {
        id: 'combo',
        label: 'Combination (Toss & Turn)',
        desc: 'Need responsive elasticity and zero partner motion transfer',
        icon: 'refresh-cw',
        points: { Reserve: 3, ReservePlus: 3, Signature: 2, Essential: 1 }
      }
    ]
  },
  {
    id: 2,
    question: 'Do you experience any of these sleep discomforts?',
    subtitle: 'Select your most noticeable issue when you wake up in the morning.',
    options: [
      {
        id: 'lower-back',
        label: 'Lower Back & Lumbar Ache',
        desc: 'Waking up with morning stiffness or disc pressure',
        icon: 'activity',
        points: { ReservePlus: 3, Signature: 3, Essential: 1, Reserve: 2 }
      },
      {
        id: 'partner-motion',
        label: 'Disturbed by Partner Tossing',
        desc: 'Every movement wakes you from deep REM sleep',
        icon: 'users',
        points: { Reserve: 4, ReservePlus: 4, Signature: 1, Essential: 0 }
      },
      {
        id: 'sleep-hot',
        label: 'Sleeping Hot & Sweating',
        desc: 'Trapped body heat in humid or warm weather',
        icon: 'sun',
        points: { ReservePlus: 3, Reserve: 3, Signature: 2, Essential: 1 }
      },
      {
        id: 'no-pain',
        label: 'No Pain — Seeking Pure Luxury & Health',
        desc: 'Upgrading to a hotel-grade five-star sleep sanctuary',
        icon: 'star',
        points: { ReservePlus: 4, Reserve: 3, Signature: 2, Essential: 1 }
      }
    ]
  },
  {
    id: 3,
    question: 'What feel do you naturally prefer in a mattress?',
    subtitle: 'From a deep sinking velvet hug to firm orthopedic pushback.',
    options: [
      {
        id: 'plush-soft',
        label: 'Plush & Cloud-Like (3-4/10)',
        desc: 'Cradling embrace with gentle sinking softness',
        icon: 'cloud',
        points: { ReservePlus: 3, Reserve: 2, Signature: 1, Essential: 0 }
      },
      {
        id: 'medium-firm',
        label: 'Medium Firm — The Golden Equilibrium (6-7/10)',
        desc: '85% of people sleep best here — soft top with deep support',
        icon: 'check-circle',
        points: { Signature: 3, Reserve: 3, ReservePlus: 2, Essential: 2 }
      },
      {
        id: 'ortho-firm',
        label: 'Ortho Firm (8-9/10)',
        desc: 'Solid, rigid surface for strong orthopedic spinal discipline',
        icon: 'shield',
        points: { Essential: 3, Signature: 2, Reserve: 0, ReservePlus: 0 }
      }
    ]
  },
  {
    id: 4,
    question: 'Who will be sleeping on this mattress?',
    subtitle: 'Helps calculate weight distribution and edge durability requirements.',
    options: [
      {
        id: 'couple',
        label: 'Two Adults (Couple)',
        desc: 'Requires zero-motion isolation and reinforced edge sitting support',
        icon: 'heart',
        points: { Reserve: 3, ReservePlus: 3, Signature: 1, Essential: 0 }
      },
      {
        id: 'single-adult',
        label: 'Single Adult / Professional',
        desc: 'Personalized muscle recovery and everyday ergonomic vitality',
        icon: 'user',
        points: { Signature: 3, Essential: 2, Reserve: 2, ReservePlus: 1 }
      },
      {
        id: 'parents-seniors',
        label: 'Elderly Parents / Seniors (60+)',
        desc: 'Doctor-certified joint relief and easy edge egress',
        icon: 'feather',
        points: { Signature: 3, Essential: 3, Reserve: 1, ReservePlus: 1 }
      },
      {
        id: 'kids-teens',
        label: 'Kids or Teenagers',
        desc: 'Spine growth support with hygienic hypoallergenic materials',
        icon: 'smile',
        points: { Essential: 3, Signature: 2, Reserve: 0, ReservePlus: 0 }
      }
    ]
  }
];

export function calculateQuizRecommendation(answers) {
  const scores = {
    Essential: 0,
    Signature: 0,
    Reserve: 0,
    ReservePlus: 0
  };

  answers.forEach((ans, index) => {
    const question = QUIZ_QUESTIONS[index];
    if (!question) return;
    const option = question.options.find(o => o.id === ans);
    if (option && option.points) {
      Object.keys(option.points).forEach(tier => {
        scores[tier] += option.points[tier];
      });
    }
  });

  // Find winner
  let highestTier = 'Signature';
  let maxScore = -1;
  Object.keys(scores).forEach(tier => {
    if (scores[tier] > maxScore) {
      maxScore = scores[tier];
      highestTier = tier;
    }
  });

  const tierDetails = {
    ReservePlus: {
      tierName: "Reserve+ — The Founder's Edition (12\")",
      productId: 'vh-reserve-plus',
      price: '₹58,999',
      mrp: '₹84,999',
      discount: '30% OFF Festive Deal',
      whyRecommended: 'Based on your desire for zero motion disturbance, luxurious pressure relief, and ultimate temperature cooling, the 12" Reserve+ with 7-Zone Microcoils and Organic Latex is your definitive sleep companion.',
      doctorNote: 'Dr. Alok Verma says: "The Reserve+ provides maximum spinal decompression and REM cycle continuity."'
    },
    Reserve: {
      tierName: 'Reserve — The Complete Experience (10")',
      productId: 'vh-reserve-10',
      price: '₹38,999',
      mrp: '₹54,999',
      discount: '29% OFF Festive Deal',
      whyRecommended: 'Your profile matches the perfect balance of independent pocket springs and natural latex elasticity. Zero partner disturbance with cooling bamboo airflow.',
      doctorNote: 'Dr. Manan Vora says: "Ideal for active individuals and couples seeking joint relief and ergonomic spinal posture."'
    },
    Signature: {
      tierName: 'Signature — The Deeper Embrace (8")',
      productId: 'vh-signature-8',
      price: '₹24,999',
      mrp: '₹35,999',
      discount: '30% OFF Festive Deal',
      whyRecommended: 'The dual-layer Natural Latex + Adaptive Memory Foam provides balanced contouring and healthy spinal alignment for back & side sleepers alike.',
      doctorNote: 'Recommended for everyday posture protection and morning energy.'
    },
    Essential: {
      tierName: 'Essential — The Everyday Hug (6")',
      productId: 'vh-essential-6',
      price: '₹12,999',
      mrp: '₹18,999',
      discount: '31% OFF Everyday Deal',
      whyRecommended: 'High-density orthopedic Aerocell foam gives you reliable anti-sag firm support at an unbeatable value. Lightweight and easy to set up.',
      doctorNote: 'A solid, durable orthopedic foundation recommended for healthy spinal discipline.'
    }
  };

  return tierDetails[highestTier] || tierDetails.Signature;
}
