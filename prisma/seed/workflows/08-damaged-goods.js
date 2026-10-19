// ---------------------------------------------------------------------------
// INV-DMG-001 — Damaged Stock and Quarantine
// Identifying, isolating and recording damaged, leaking or contaminated stock
// and routing it to authorised disposition.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'INV-DMG-001',
  title: 'Damaged Stock and Quarantine',
  description:
    'Identify and isolate damaged or non-conforming stock, apply the correct hold status, and record every stage for traceability.',
  department: 'All operational departments',
  difficulty: 'BEGINNER',
  estimatedMinutes: 15,
  passMark: 85,
  renewalMonths: 12,
  supervisorSignOffRequired: true,

  learningObjectives: [
    'Recognise damaged, leaking or non-conforming stock',
    'Stop handling safely',
    'Protect the area and prevent unsafe exposure',
    'Record the issue with evidence',
    'Apply correct quarantine status',
    'Move stock to the authorised area',
    'Understand supervisor disposition roles',
  ],

  steps: [
    {
      title: 'Stop handling the affected stock',
      objective: 'Prevent further processing of non-conforming stock.',
      content: [
        'Do not continue normal processing when stock is:',
        '• Damaged',
        '• Leaking',
        '• Contaminated',
        '• Unidentified',
        '• Expired',
        '• Recalled',
        '• Missing traceability information',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not continue handling a potentially hazardous item unless trained and authorised.',
      ],
      completionChecks: [
        'Handling stopped',
        'Task paused in the system where applicable',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Protect the area',
      objective: 'Keep people safe and prevent the issue spreading.',
      content: [
        'Keep people away where required.',
        'Use spill-control procedures where trained.',
        'Do not touch unknown substances.',
        'Escalate hazardous-material concerns immediately.',
        'Prevent damaged goods entering available inventory.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never touch, smell or clean an unknown substance without the correct procedure and PPE.',
      ],
      completionChecks: [
        'Area secured or isolated',
        'Spill controls applied where trained',
        'Unknown substances escalated',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Record the issue',
      objective: 'Capture evidence for investigation and supplier claims.',
      content: [
        'Capture:',
        '• Item',
        '• Quantity',
        '• Batch or serial',
        '• Location',
        '• Type of damage',
        '• Suspected cause',
        '• Date and time',
        '• Operator',
        '• Photographs where permitted',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Clear evidence supports safe decisions and supplier claims.',
      ],
      completionChecks: [
        'Damage report completed',
        'Photographs attached where permitted',
        'Location and quantity recorded accurately',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Apply quarantine status',
      objective: 'Link the physical label to a system status.',
      content: [
        'The system status and physical location must agree.',
        '',
        'Possible statuses:',
        '• Damage hold',
        '• Quality inspection',
        '• Recall hold',
        '• Expired stock',
        '• Supplier return',
        '• Disposal pending',
      ].join('\n'),
      expectedMinutes: 2,
      warnings: [
        'Unlabelled held stock can be picked accidentally.',
      ],
      completionChecks: [
        'System status applied',
        'Physical label attached',
        'System and label agree',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Move to the authorised area',
      objective: 'Relocate the stock safely to the correct quarantine area.',
      content: [
        'Only move the stock when it is safe and you are authorised to do so.',
        '',
        'Scan:',
        '• Item or handling unit',
        '• Source location',
        '• Quarantine location',
        '• Reason code',
      ].join('\n'),
      expectedMinutes: 2,
      warnings: [
        'Do not leave quarantined goods in general storage or walkways.',
      ],
      completionChecks: [
        'Item scanned',
        'Source scanned',
        'Quarantine location scanned',
        'Reason code applied',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Supervisor disposition',
      objective: 'Hand over the decision to an authorised person.',
      content: [
        'An authorised person selects:',
        '• Return to available stock',
        '• Repack',
        '• Return to supplier',
        '• Dispose',
        '• Investigate',
        '• Retain for evidence',
        '',
        'The original operator must not independently release quarantined stock.',
      ].join('\n'),
      expectedMinutes: 2,
      warnings: [
        'Only authorised personnel may change stock from hold to available.',
      ],
      completionChecks: [
        'Disposition recorded',
        'Approval obtained from authorised person',
        'No independent release performed',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: true,
    },
  ],

  assessmentQuestions: [
    {
      question: 'What is the first thing to do when damage is found?',
      options: [
        'Try to fix the item',
        'Continue with the task',
        'Stop handling and follow workplace quarantine procedures',
        'Move the item to another location',
      ],
      correctOption: 2,
      explanation:
        'Stop handling immediately. Follow site procedures to protect people and prevent the item re-entering stock.',
    },
    {
      question: 'Can you touch a leaking package if you are unsure of its contents?',
      options: [
        'Yes, if you are wearing gloves',
        'Yes, but only with a colleague present',
        'No. Escalate unknown or hazardous materials immediately',
        'Yes, if you clean it up quickly',
      ],
      correctOption: 2,
      explanation:
        'Unknown substances must never be touched, smelled or cleaned without the correct procedure and PPE.',
    },
    {
      question: 'Who may release quarantined stock back to available inventory?',
      options: [
        'Any warehouse employee',
        'The delivery driver',
        'An authorised person following workplace procedures',
        'The customer',
      ],
      correctOption: 2,
      explanation:
        'Only authorised people may change stock from hold to available. Operators must not release quarantine independently.',
    },
  ],
}