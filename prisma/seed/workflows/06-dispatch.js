// ---------------------------------------------------------------------------
// OUT-DSP-001 — Dispatch Carrier Collection
// Loading approved shipments onto carrier vehicles and completing the
// collection handover.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'OUT-DSP-001',
  title: 'Dispatch Carrier Collection',
  description:
    'Load verified shipments onto the correct carrier vehicle in the approved sequence and complete an accurate collection handover.',
  department: 'Dispatch',
  difficulty: 'INTERMEDIATE',
  estimatedMinutes: 20,
  passMark: 85,
  renewalMonths: 12,
  supervisorSignOffRequired: true,

  learningObjectives: [
    'Review the dispatch schedule and special requirements',
    'Inspect the loading area before loading begins',
    'Verify every shipment is on the correct carrier and route',
    'Load in the approved sequence using correct restraints',
    'Reconcile the load against expected shipments',
    'Complete the carrier handover with accurate records',
  ],

  steps: [
    {
      title: 'Review the dispatch schedule',
      objective: 'Understand what needs loading and when.',
      content: [
        'Check:',
        '• Carrier',
        '• Trailer or vehicle',
        '• Route',
        '• Collection time',
        '• Dock door',
        '• Shipment count',
        '• Priority orders',
        '• Dangerous-goods or special requirements',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Loading the wrong carrier can cause major service failures.',
      ],
      completionChecks: [
        'Schedule reviewed',
        'Special requirements understood',
        'Collection plan confirmed',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Inspect the loading area',
      objective: 'Confirm the dock is safe before loading begins.',
      content: [
        'Confirm:',
        '• The dock is clear.',
        '• Lighting is adequate.',
        '• The vehicle is correctly positioned.',
        '• Required restraint systems are applied.',
        '• Pedestrian access is controlled.',
        '• Loading equipment is serviceable.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not enter or load an unsecured vehicle.',
      ],
      completionChecks: [
        'Dock inspected',
        'Vehicle secured',
        'Pedestrian controls in place',
        'Equipment serviceable',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Verify each shipment',
      objective: 'Confirm every shipment belongs on this carrier.',
      content: [
        'Scan each pallet, cage or parcel.',
        '',
        'The system must confirm:',
        '• Correct carrier',
        '• Correct route',
        '• Shipment is packed and released',
        '• No quality hold',
        '• No missing documentation',
        '• No duplicate loading scan',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Never load goods that remain on hold.',
      ],
      completionChecks: [
        'Every shipment scanned',
        'No holds or missing documents',
        'No duplicate scans',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Load in the approved sequence',
      objective: 'Load the vehicle safely with correct weight distribution.',
      content: [
        'Follow the route or unloading sequence.',
        '',
        'Ensure:',
        '• Heavy freight is suitably positioned',
        '• Loads are stable',
        '• Fragile stock is protected',
        '• Weight is distributed appropriately',
        '• Required load restraints are used',
        '• Goods do not obstruct safe closure',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Unsafe loading can shift during transport and injure people during unloading.',
      ],
      completionChecks: [
        'Load sequence followed',
        'Weight distributed safely',
        'Restraints applied',
        'Doors can close safely',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Reconcile the load',
      objective: 'Confirm nothing is missing or extra before closing.',
      content: [
        'Compare:',
        '• Expected shipments',
        '• Scanned shipments',
        '• Missing shipments',
        '• Unexpected shipments',
        '• Total handling units',
        '',
        'A dispatch cannot be closed while unexplained differences remain.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not close a load with unexplained differences.',
      ],
      completionChecks: [
        'Expected vs scanned compared',
        'Every discrepancy investigated',
        'Load reconciled',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Complete the handover',
      objective: 'Record the collection accurately.',
      content: [
        'Record:',
        '• Driver or carrier acknowledgement',
        '• Vehicle registration',
        '• Seal number, where used',
        '• Departure time',
        '• Shipment count',
        '• Exceptions',
        '• Operator identity',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Accurate handover records support traceability and claims.',
      ],
      completionChecks: [
        'Driver acknowledged',
        'Vehicle details recorded',
        'Departure time logged',
        'Any exceptions noted',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: true,
    },
  ],

  assessmentQuestions: [
    {
      question: 'When may quarantined stock be loaded onto a vehicle?',
      options: [
        'Whenever normal stock is unavailable',
        'At the end of the shift',
        'Only when it has been formally released from quarantine',
        'When the packaging looks undamaged',
      ],
      correctOption: 2,
      explanation:
        'Goods on hold must never be loaded until they have been formally released by an authorised person.',
    },
    {
      question: 'Why do we scan every shipment before loading?',
      options: [
        'To delay the process',
        'To confirm carrier, route, release, and absence of holds',
        'Only high-value shipments need scanning',
        'Scanning is optional if the load looks correct',
      ],
      correctOption: 1,
      explanation:
        'The scan verifies carrier, route, release status, documentation, and absence of quality holds.',
    },
    {
      question: 'What must happen before closing a load?',
      options: [
        'Nothing, just close the doors',
        'Wait until tomorrow',
        'Resolve every reconciliation difference',
        'Ask the driver to sign',
      ],
      correctOption: 2,
      explanation:
        'A load cannot be closed with unexplained differences — every missing, extra, or duplicated shipment must be investigated.',
    },
  ],
}