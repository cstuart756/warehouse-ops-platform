// ---------------------------------------------------------------------------
// INV-CYC-001 — Cycle Count an Inventory Location
// Regular counting of selected locations to maintain inventory accuracy.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'INV-CYC-001',
  title: 'Cycle Count an Inventory Location',
  description:
    'Perform an accurate physical count of a selected location, identify discrepancies, and support inventory control decisions.',
  department: 'Inventory Control',
  difficulty: 'INTERMEDIATE',
  estimatedMinutes: 20,
  passMark: 90,
  renewalMonths: 12,
  supervisorSignOffRequired: false,

  learningObjectives: [
    'Accept and understand the count task',
    'Secure the location before counting',
    'Verify location and item before counting',
    'Count physical stock accurately',
    'Submit counts correctly with evidence',
    'Investigate and document variances',
  ],

  steps: [
    {
      title: 'Accept the count task',
      objective: 'Understand what you are counting and why.',
      content: [
        'Review:',
        '• Location',
        '• Item',
        '• Expected unit of measure',
        '• Batch or serial requirements',
        '• Reason for count',
        '• Whether the count is blind',
        '',
        'For a blind count, the system must not display the expected quantity.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Blind counts must remain independent to be reliable.',
      ],
      completionChecks: [
        'Task reviewed',
        'Count type understood (blind or open)',
        'Traceability requirements identified',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Secure the location',
      objective: 'Prevent stock movements during the count.',
      content: [
        'Where site procedure requires it:',
        '• Pause picking from the location',
        '• Check for open replenishment tasks',
        '• Check for unconfirmed movements',
        '• Prevent stock being moved during the count',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'A moving inventory target produces unreliable results.',
      ],
      completionChecks: [
        'Open tasks checked',
        'Location frozen where required',
        'No movement during count',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Scan the location and item',
      objective: 'Confirm you are counting the correct target.',
      content: [
        'Verify:',
        '• Correct location',
        '• Correct item',
        '• Correct unit',
        '• Correct batch',
        '• Correct stock status',
        '',
        'Record unexpected mixed stock separately.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never count stock from a neighbouring location.',
      ],
      completionChecks: [
        'Location scanned',
        'Item scanned',
        'Unexpected stock recorded separately',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Count the physical stock',
      objective: 'Produce an accurate physical count.',
      content: [
        'Count full containers.',
        'Count open containers.',
        'Convert quantities using the approved pack size.',
        'Record damaged or quarantined stock separately.',
        'Recount before submitting a significant variance.',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Do not estimate quantities when an exact count is possible.',
      ],
      completionChecks: [
        'Full containers counted',
        'Open containers counted',
        'Pack size conversion correct',
        'Damaged stock counted separately',
        'Any significant variance re-counted',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Submit the count',
      objective: 'Enter the count accurately into the system.',
      content: [
        'Enter:',
        '• Quantity',
        '• Unit of measure',
        '• Batch',
        '• Stock condition',
        '• Notes',
        '• Evidence where required',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'An incorrect unit of measure can create a large false variance.',
      ],
      completionChecks: [
        'Quantity entered',
        'Unit correct',
        'Evidence attached where required',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Investigate a variance',
      objective: 'Document why any difference occurred.',
      content: [
        'Review:',
        '• Recent receipts',
        '• Picks',
        '• Replenishments',
        '• Put-away transactions',
        '• Returns',
        '• Damage records',
        '• Nearby locations',
        '• Unit-of-measure errors',
        '',
        'Only an authorised inventory controller should approve an adjustment.',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Do not change inventory merely to force the system to match the first count.',
      ],
      completionChecks: [
        'Transaction history reviewed',
        'Nearby locations checked',
        'Adjustment approved by authorised person',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: true,
    },
  ],

  assessmentQuestions: [
    {
      question: 'What should you verify before confirming a stock transaction?',
      options: [
        'Only the product colour',
        'Only the system quantity',
        'The location, product and physical quantity',
        'The name of the previous employee',
      ],
      correctOption: 2,
      explanation:
        'Location, product and physical quantity must all match before confirming any inventory movement.',
    },
    {
      question: 'What should you do when a cycle-count doesn\'t match?',
      options: [
        'Change the count to match the system',
        'Ignore the difference',
        'Recount and follow the approved procedure',
        'Move the stock to another location',
      ],
      correctOption: 2,
      explanation:
        'Recount first. If the discrepancy is real, follow the investigation and approval procedure.',
    },
    {
      question: 'Why should you never count stock from a neighbouring location?',
      options: [
        'It looks untidy',
        'The count must reflect only the target location',
        'Neighbouring stock is expired',
        'Neighbours always agree',
      ],
      correctOption: 1,
      explanation:
        'Mixing locations creates false variances and undermines inventory control.',
    },
  ],
}