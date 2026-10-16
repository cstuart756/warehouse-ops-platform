// ---------------------------------------------------------------------------
// SAFE-IND-001 — Warehouse Safety Induction
// Mandatory first module for every employee. Covers PPE, pedestrian routes,
// hazard recognition, emergency procedures, and incident reporting.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'SAFE-IND-001',
  title: 'Warehouse Safety Induction',
  description:
    'Mandatory induction covering site safety rules, PPE, pedestrian routes, hazard recognition, emergency procedures, and incident reporting.',
  department: 'All departments',
  difficulty: 'BEGINNER',
  estimatedMinutes: 35,
  passMark: 80,
  renewalMonths: 12,
  supervisorSignOffRequired: true,

  learningObjectives: [
    'Identify pedestrian and vehicle routes',
    'Select the correct personal protective equipment',
    'Report hazards, incidents and near misses',
    'Explain emergency and evacuation procedures',
    'Recognise prohibited activities',
  ],

  steps: [
    {
      title: 'Sign in and confirm fitness for work',
      objective: 'Confirm you are fit to work and have signed in correctly.',
      content: [
        'Sign in using the approved attendance system.',
        'Confirm that you are fit to work.',
        'Inform a supervisor immediately if illness, medication, fatigue or another condition may affect safe working.',
        'Store personal belongings in the designated area.',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Never begin safety-critical work while impaired by alcohol, drugs, fatigue or medication that affects alertness.',
      ],
      completionChecks: [
        'Trainee has signed in',
        'Emergency contact information is current',
        'Supervisor has been told about any relevant restrictions',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Wear the required PPE',
      objective: 'Identify and correctly use the PPE required for your work area.',
      content: [
        'Wear safety footwear with toe protection.',
        'Put on the required high-visibility clothing.',
        'Use gloves, eye protection, hearing protection or other PPE where indicated.',
        'Check PPE for damage before use.',
        'Replace damaged or contaminated PPE.',
      ].join('\n'),
      expectedMinutes: 5,
      warnings: [
        'PPE does not remove the hazard. Always follow the safe system of work.',
      ],
      completionChecks: [
        'PPE inspected before use',
        'PPE fitted correctly',
        'Damaged PPE reported and removed from service',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Follow pedestrian routes',
      objective: 'Move safely around vehicles and mobile equipment.',
      content: [
        'Use marked walkways.',
        'Cross vehicle routes only at designated crossing points.',
        'Stop, look and make eye contact with the vehicle operator before crossing.',
        'Do not walk under raised forks or suspended loads.',
        'Do not use a mobile phone while walking in an operational area.',
      ].join('\n'),
      expectedMinutes: 6,
      warnings: [
        'Pedestrians must remain visible and predictable around moving equipment.',
      ],
      completionChecks: [
        'Used marked walkways',
        'Crossed vehicle routes only at designated points',
        'Made eye contact with operators before crossing',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Recognise common hazards',
      objective: 'Identify hazards and take the correct Stop–Protect–Report action.',
      content: [
        'Common hazards include:',
        '• Damaged pallets',
        '• Trailing straps or shrink wrap',
        '• Liquid spills',
        '• Blocked fire exits',
        '• Unstable loads',
        '• Damaged racking',
        '• Moving vehicles',
        '• Exposed sharp objects',
        '• Items stored in pedestrian routes',
        '',
        'Required action — Stop–Protect–Report:',
        '1. Stop the activity where safe.',
        '2. Protect people from entering the area.',
        '3. Report the hazard to the responsible person.',
      ].join('\n'),
      expectedMinutes: 6,
      warnings: [
        'Never ignore a hazard because no one has been injured yet.',
      ],
      completionChecks: [
        'Identified at least three hazards in the training area',
        'Applied the Stop–Protect–Report process',
        'Reported the hazard to the responsible person',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Understand emergency procedures',
      objective: 'Know the alarm signal, nearest safe exit, and assembly point.',
      content: [
        'Locate the nearest alarm point.',
        'Identify the nearest safe emergency exit.',
        'Review the site alarm signal.',
        'Walk to the assigned assembly point.',
        'Lifts must not be used during evacuation unless specifically authorised.',
      ].join('\n'),
      expectedMinutes: 7,
      warnings: [
        'Never block an emergency exit or return for personal belongings.',
      ],
      completionChecks: [
        'Can identify the alarm sound',
        'Can name the assembly point',
        'Understands who to report to',
        'Understands must not re-enter until authorised',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: true,
    },
    {
      title: 'Report incidents and near misses',
      objective: 'Record every incident and near miss promptly and accurately.',
      content: [
        'Record the following for every incident or near miss:',
        '• What happened',
        '• Where it happened',
        '• When it happened',
        '• People involved',
        '• Equipment involved',
        '• Immediate action taken',
        '• Photographs, where permitted',
        '',
        'Rule: A near miss must be reported even when nobody was injured and no property was damaged.',
      ].join('\n'),
      expectedMinutes: 7,
      warnings: [
        'Accurate reporting prevents repeat incidents and supports investigation.',
      ],
      completionChecks: [
        'Completed a sample near-miss report',
        'Understands the difference between an incident and a near miss',
        'Understands why near misses matter',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: true,
    },
  ],

  assessmentQuestions: [
    {
      question: 'What should you do before entering the operational area?',
      options: [
        'Start work immediately',
        'Sign in and confirm you are fit for work',
        'Wait for someone else to sign in for you',
        'Ask a colleague to cover for you',
      ],
      correctOption: 1,
      explanation:
        'You must sign in using the approved attendance system and confirm you are fit to work before entering the operational area.',
    },
    {
      question: 'Can PPE remove every warehouse risk?',
      options: [
        'Yes, if worn correctly',
        'No, PPE is the final layer of protection and does not replace safe systems of work',
        'Only if the risk assessment says so',
        'Only in loading bays',
      ],
      correctOption: 1,
      explanation:
        'PPE is the last line of defence. It reduces harm but never replaces the safe system of work or correct procedures.',
    },
    {
      question: 'A forklift is approaching you. What should you do?',
      options: [
        'Continue walking and assume the operator has seen you',
        'Wave at the driver and keep going',
        'Stop, keep eye contact with the operator, and cross only at a designated point when it is safe',
        'Run across quickly',
      ],
      correctOption: 2,
      explanation:
        'Pedestrians must stop, make eye contact, and cross only at designated crossing points. Never assume the operator has seen you.',
    },
    {
      question: 'What is the first action when you discover a hazard?',
      options: [
        'Report it at the end of your shift',
        'Stop the activity where safe, protect the area, and report the hazard',
        'Ignore it if no one has been hurt',
        'Move the hazard to another area',
      ],
      correctOption: 1,
      explanation:
        'Use the Stop–Protect–Report process. Never ignore a hazard because no one has been injured yet.',
    },
    {
      question: 'Why must every near miss be reported?',
      options: [
        'To assign blame',
        'To delay work',
        'To prevent repeat incidents and improve safety',
        'Only accidents need to be reported',
      ],
      correctOption: 2,
      explanation:
        'Near misses are leading indicators of risk. Reporting them helps prevent future injuries and improves overall safety.',
    },
  ],
}