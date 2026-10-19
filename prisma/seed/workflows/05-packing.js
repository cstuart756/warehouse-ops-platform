// ---------------------------------------------------------------------------
// OUT-PACK-001 — Pack and Verify an Order
// Selecting correct packaging, protecting products, and verifying shipments
// before handover to dispatch.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'OUT-PACK-001',
  title: 'Pack and Verify an Order',
  description:
    'Inspect picked products, select suitable packaging, protect the contents, and prepare shipments for dispatch.',
  department: 'Packing',
  difficulty: 'INTERMEDIATE',
  estimatedMinutes: 25,
  passMark: 90,
  renewalMonths: 12,
  supervisorSignOffRequired: false,

  learningObjectives: [
    'Inspect picked products for damage or non-conformance',
    'Select appropriate packaging for the product',
    'Protect contents with correct materials',
    'Apply shipping labels correctly',
    'Verify weights and dimensions before dispatch',
    'Route the completed parcel to the correct dispatch lane',
  ],

  steps: [
    {
      title: 'Scan the order or tote',
      objective: 'Load the correct packing task.',
      content: [
        'The packing screen displays:',
        '• Customer order',
        '• Expected products',
        '• Expected quantities',
        '• Delivery service',
        '• Packaging requirements',
        '• Restricted or fragile status',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Stop if the physical contents do not match the displayed order.',
      ],
      completionChecks: [
        'Order scanned',
        'Expected products reviewed',
        'Any special requirements noted',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Inspect the products',
      objective: 'Confirm every item is suitable for packing.',
      content: [
        'Check for:',
        '• Correct product',
        '• Correct quantity',
        '• Damage',
        '• Contamination',
        '• Leaks',
        '• Incorrect batch',
        '• Missing accessories',
        '• Unacceptable packaging condition',
        '',
        'Do not pack damaged or non-conforming stock.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Damaged products must be isolated and reported.',
      ],
      completionChecks: [
        'Every item inspected',
        'Any non-conforming item moved to hold',
        'Nothing packed that should have been rejected',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Select suitable packaging',
      objective: 'Choose packaging that protects the contents without waste.',
      content: [
        'Consider:',
        '• Product dimensions',
        '• Weight',
        '• Fragility',
        '• Liquid or sharp components',
        '• Void space',
        '• Carrier limits',
        '• Environmental requirements',
        '',
        'Use the smallest approved package that protects the contents adequately.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'The smallest box is not always safe, and the largest box is not always efficient.',
      ],
      completionChecks: [
        'Correct carton size selected',
        'Packaging material approved for product type',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Scan every controlled item',
      objective: 'Capture mandatory traceability data.',
      content: [
        'Depending on the product, capture:',
        '• Item barcode',
        '• Serial number',
        '• Batch number',
        '• Expiry date',
        '• IMEI or asset number',
        '• Quantity',
        '',
        'The order cannot proceed while required tracking data is missing.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never reuse or invent serial or batch information.',
      ],
      completionChecks: [
        'All required scans captured',
        'No substitute or invented data used',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Pack the products',
      objective: 'Pack the order so contents arrive undamaged.',
      content: [
        'Assemble the carton correctly.',
        'Reinforce it where required.',
        'Place heavier products at the bottom.',
        'Separate fragile items.',
        'Add approved void fill.',
        'Prevent movement inside the carton.',
        'Include documentation only where instructed.',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Poor packing can injure handlers and damage customer orders.',
      ],
      completionChecks: [
        'Carton assembled correctly',
        'Heavy items at bottom',
        'Fragile items separated',
        'Void fill added',
        'Contents secure',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Verify weight and dimensions',
      objective: 'Confirm the parcel matches the expected values.',
      content: [
        'Record:',
        '• Actual weight',
        '• Length',
        '• Width',
        '• Height',
        '',
        'Investigate unexpected weight differences before closing the shipment.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'A weight difference can indicate a missing or incorrect item.',
      ],
      completionChecks: [
        'Weight recorded',
        'Dimensions recorded',
        'Any variance investigated',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Seal and label the parcel',
      objective: 'Close and label the parcel for safe transit.',
      content: [
        'Use the approved sealing method.',
        'Remove or cover old labels.',
        'Apply the carrier label to a flat, visible surface.',
        'Keep barcodes unobstructed.',
        'Apply handling labels where genuinely required.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never place a label across an opening edge or damaged surface.',
      ],
      completionChecks: [
        'Approved sealing method used',
        'Old labels removed or covered',
        'Carrier label applied flat',
        'Barcodes unobstructed',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Complete the packing task',
      objective: 'Confirm the parcel is ready for dispatch.',
      content: [
        'Scan the completed parcel into the correct dispatch lane.',
        '',
        'Quality standard — the order must be:',
        '• Complete',
        '• Accurate',
        '• Undamaged',
        '• Securely packaged',
        '• Correctly labelled',
        '• Assigned to the correct carrier service',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not send unresolved exceptions to dispatch.',
      ],
      completionChecks: [
        'Parcel scanned to dispatch lane',
        'Quality standard met',
        'Task marked complete',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
  ],

  assessmentQuestions: [
    {
      question: 'What should happen before an item is packed?',
      options: [
        'Print the carrier label first',
        'Seal the carton immediately',
        'Skip the inspection',
        'Verify the product, quantity, and condition',
      ],
      correctOption: 3,
      explanation:
        'Packing must not proceed until the product, quantity, and condition have been verified.',
    },
    {
      question: 'Why should void space inside a carton be filled?',
      options: [
        'To make the parcel heavier',
        'To reduce postage costs',
        'To prevent product movement and damage during transit',
        'To use more packaging',
      ],
      correctOption: 2,
      explanation:
        'Excess void space allows contents to move and be damaged in transit. Approved void fill prevents this.',
    },
    {
      question: 'What should you do before applying a shipping label?',
      options: [
        'Fold the label',
        'Place it anywhere',
        'Verify the destination details and barcode',
        'Cover previous labels',
      ],
      correctOption: 2,
      explanation:
        'Wrong destination labels cause major service failures. Always verify details before sealing the parcel.',
    },
    {
      question: 'Why might weight differ from expected?',
      options: [
        'It never differs',
        'Only if the box is wrong',
        'It can indicate a missing, incorrect, or extra item',
        'It is unrelated to accuracy',
      ],
      correctOption: 2,
      explanation:
        'Weight is a fast check for missing, incorrect, or extra items. Always investigate unexpected variance.',
    },
  ],
}