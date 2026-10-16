// ---------------------------------------------------------------------------
// INV-PUT-001 — Put-Away Stock
// Moving received stock from the goods-in area to its final storage location.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'INV-PUT-001',
  title: 'Put-Away Stock',
  description:
    'Move received stock safely from the goods-in area to its designated storage location and confirm the transaction.',
  department: 'Inventory',
  difficulty: 'BEGINNER',
  estimatedMinutes: 20,
  passMark: 85,
  renewalMonths: 12,
  supervisorSignOffRequired: false,

  learningObjectives: [
    'Review put-away tasks before travel',
    'Inspect handling units for safe movement',
    'Travel safely through the warehouse',
    'Verify destination locations correctly',
    'Place stock without creating hazards',
    'Confirm the system transaction',
  ],

  steps: [
    {
      title: 'Review the put-away task',
      objective: 'Understand what needs moving and where it must go.',
      content: [
        'Confirm:',
        '• Handling-unit ID',
        '• Item reference',
        '• Quantity',
        '• Batch and expiry details',
        '• Source location',
        '• Suggested destination',
        '• Storage restrictions',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not move stock when task information is incomplete or inconsistent.',
      ],
      completionChecks: [
        'Handling-unit ID confirmed',
        'Destination location confirmed',
        'Any storage restrictions understood',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Inspect the handling unit',
      objective: 'Confirm the pallet or container is safe to move.',
      content: [
        'Check that:',
        '• The pallet or container is stable.',
        '• The load is within equipment capacity.',
        '• The stock label is readable.',
        '• No damage occurred after receipt.',
        '• The item can safely be stored in the proposed location.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never move an unstable or overloaded handling unit.',
      ],
      completionChecks: [
        'Handling unit inspected',
        'Any damage reported',
        'Load within equipment capacity',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Travel safely to the location',
      objective: 'Move the load without endangering people or stock.',
      content: [
        'Use the approved route.',
        'Observe site speed limits.',
        'Keep the load stable.',
        'Maintain visibility.',
        'Sound warnings only where site procedures require them.',
        'Give pedestrians priority according to local traffic rules.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Stop whenever visibility or route safety is compromised.',
      ],
      completionChecks: [
        'Approved route followed',
        'Speed limits observed',
        'Load kept stable throughout travel',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Verify the destination',
      objective: 'Confirm the location is correct before storing stock.',
      content: [
        'Scan the destination location.',
        '',
        'The system must confirm:',
        '• Correct zone',
        '• Correct temperature category',
        '• Sufficient location capacity',
        '• Compatible product class',
        '• Correct rotation rule',
        '• No quarantine restriction',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not override an incompatible or full location without authorised approval.',
        'The system location and physical location must match.',
      ],
      completionChecks: [
        'Location scanned',
        'All system checks passed',
        'No override performed without approval',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Place the stock',
      objective: 'Store the load safely and correctly.',
      content: [
        'Position the load squarely.',
        'Ensure it does not overhang.',
        'Do not damage adjacent stock or racking.',
        'Confirm labels remain visible where required.',
        'Withdraw handling equipment safely.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Poor placement can create falling-object and racking hazards.',
      ],
      completionChecks: [
        'Load placed squarely with no overhang',
        'Adjacent stock and racking protected',
        'Labels visible',
        'Equipment withdrawn safely',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Confirm the transaction',
      objective: 'Complete the put-away in the system.',
      content: [
        'Scan:',
        '• Handling unit',
        '• Item',
        '• Destination',
        '',
        'Enter or confirm the stored quantity.',
        '',
        'Wait for the success message: "Put-away complete. Inventory is now available in location [location code]."',
      ].join('\n'),
      expectedMinutes: 2,
      warnings: [
        'Never assume a movement is complete until the system confirms it.',
      ],
      completionChecks: [
        'Handling unit scanned',
        'Item scanned',
        'Destination scanned',
        'Quantity confirmed',
        'Success message received',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
  ],

  assessmentQuestions: [
    {
      question: 'What should you do if the system rejects the destination location?',
      options: [
        'Force the scan and store anyway',
        'Store the load in the nearest empty location',
        'Stop and obtain authorised approval for an alternative',
        'Leave the load on the forklift',
      ],
      correctOption: 2,
      explanation:
        'Location overrides must be authorised. Storing in a non-compliant location can breach stock rotation, temperature, or safety rules.',
    },
    {
      question: 'Why must the handling unit be inspected before moving?',
      options: [
        'To make the task take longer',
        'To confirm it is stable, within capacity, and safe to move',
        'Only damaged pallets need inspection',
        'Inspecting is optional',
      ],
      correctOption: 1,
      explanation:
        'Unstable or overloaded loads can collapse and cause injury or stock damage during travel.',
    },
    {
      question: 'When is a put-away complete?',
      options: [
        'Once the load is placed on the racking',
        'After the handling equipment is withdrawn',
        'When the system confirms the transaction',
        'When you have told your supervisor',
      ],
      correctOption: 2,
      explanation:
        'A movement is not complete until the system confirms it. Otherwise inventory counts and location data diverge from reality.',
    },
  ],
}