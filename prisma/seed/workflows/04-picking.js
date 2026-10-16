// ---------------------------------------------------------------------------
// OUT-PICK-001 — Pick a Customer Order
// Selecting correct item, quantity, batch and destination tote while
// maintaining inventory accuracy.
// ---------------------------------------------------------------------------

module.exports = {
  code: 'OUT-PICK-001',
  title: 'Pick a Customer Order',
  description:
    'Select the correct item, quantity, batch and destination tote while maintaining inventory accuracy and customer service standards.',
  department: 'Outbound',
  difficulty: 'BEGINNER',
  estimatedMinutes: 25,
  passMark: 90,
  renewalMonths: 12,
  supervisorSignOffRequired: false,

  learningObjectives: [
    'Accept pick tasks you are trained and authorised for',
    'Prepare picking equipment correctly',
    'Navigate to the correct location',
    'Verify the item before picking',
    'Count accurately and handle shortages correctly',
    'Confirm destination and complete the pick',
  ],

  steps: [
    {
      title: 'Accept the pick task',
      objective: 'Confirm you can complete the task safely and legally.',
      content: [
        'Review:',
        '• Order number',
        '• Pick zone',
        '• Priority',
        '• Carrier cut-off',
        '• Number of order lines',
        '• Required equipment',
        '• Special handling instructions',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Do not accept a task when you are not trained or authorised for the required equipment or area.',
      ],
      completionChecks: [
        'Task details reviewed',
        'Correct equipment available',
        'Authorised for the zone and equipment',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Prepare the picking equipment',
      objective: 'Confirm everything works before you start.',
      content: [
        'Check:',
        '• Scanner battery',
        '• Device connection',
        '• Tote or pallet condition',
        '• Labels',
        '• Required PPE',
        '• Handling aids',
        '• Clear travel route',
      ].join('\n'),
      expectedMinutes: 2,
      warnings: [
        'Faulty equipment should be reported and removed from use.',
      ],
      completionChecks: [
        'Scanner powered on and connected',
        'Tote or pallet inspected',
        'PPE worn correctly',
        'Route clear',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Travel to the displayed location',
      objective: 'Navigate to the pick location without relying on memory.',
      content: [
        'Follow the device sequence. Do not rely only on memory.',
        '',
        'At the location, compare:',
        '• Aisle',
        '• Bay',
        '• Level',
        '• Position',
        '',
        'Scan the location before touching the stock.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'A location scan prevents picking from the wrong position.',
      ],
      completionChecks: [
        'Device sequence followed',
        'Aisle, bay, level and position verified',
        'Location scanned before touching stock',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Verify the item',
      objective: 'Confirm the item is exactly what the order requires.',
      content: [
        'Scan the item barcode.',
        '',
        'Confirm:',
        '• Product description',
        '• Unit of measure',
        '• Pack size',
        '• Batch',
        '• Expiry date',
        '• Serial number, where required',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never pick an item because the packaging "looks similar." The location and product barcode must both match.',
      ],
      completionChecks: [
        'Item barcode scanned',
        'Product description matches',
        'Batch and expiry acceptable',
        'Serial captured where required',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Pick and count the quantity',
      objective: 'Select the exact quantity and place it in the correct tote.',
      content: [
        'Count the required units.',
        'Use the correct unit of measure.',
        'Place them carefully in the assigned tote or pallet.',
        'Recount high-value, controlled or easily miscounted items.',
        'Confirm the quantity on the device.',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Quantity errors directly affect customers and inventory accuracy.',
      ],
      completionChecks: [
        'Quantity counted correctly',
        'Unit of measure correct',
        'Items placed carefully in tote',
        'Quantity confirmed on device',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Handle a shortage',
      objective: 'Record a shortage accurately without disrupting the system.',
      content: [
        'When stock is missing:',
        '1. Recheck the exact location.',
        '2. Check for stock placed behind or beneath another product without disturbing unsafe loads.',
        '3. Count the remaining stock.',
        '4. Select Short Pick.',
        '5. Enter the quantity found.',
        '6. Choose the appropriate reason code.',
        '7. Do not take stock from another location unless the system instructs you.',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Never conceal a shortage by entering the expected quantity.',
      ],
      completionChecks: [
        'Location rechecked',
        'Remaining stock counted',
        'Short Pick recorded correctly',
        'Reason code selected',
      ],
      requiresVideo: true,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Confirm the destination container',
      objective: 'Link the picked item to the correct order tote.',
      content: [
        'Scan the destination tote, carton or pallet.',
        '',
        'The system must prevent:',
        '• Mixing incompatible orders',
        '• Placing an item in the wrong tote',
        '• Exceeding container limits',
        '• Completing a line without a destination scan',
      ].join('\n'),
      expectedMinutes: 3,
      warnings: [
        'Every item must be linked to the correct destination container.',
      ],
      completionChecks: [
        'Destination tote scanned',
        'System accepted the link',
        'No mixing warnings',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
    {
      title: 'Complete the pick',
      objective: 'Finish the task with all checks satisfied.',
      content: [
        'Move the completed unit to the correct consolidation or packing location.',
        '',
        'Final check:',
        '• Correct order',
        '• Correct number of lines',
        '• Correct destination',
        '• No unconfirmed shortage',
        '• Container label attached',
        '• Task completed on the device',
      ].join('\n'),
      expectedMinutes: 4,
      warnings: [
        'Do not leave completed orders in an unapproved area.',
      ],
      completionChecks: [
        'Order confirmed complete',
        'Lines match',
        'Container labelled',
        'Task closed on device',
      ],
      requiresVideo: false,
      requiresConfirmation: true,
      requiresSupervisorSignOff: false,
    },
  ],

  assessmentQuestions: [
    {
      question: 'Before picking a product, what should always be verified?',
      options: [
        'Product colour only',
        'Previous order',
        'Location, barcode and product details',
        'Shelf appearance',
      ],
      correctOption: 2,
      explanation:
        'Both the location and the item barcode must match before you touch the stock. "Looks similar" is not acceptable.',
    },
    {
      question: 'What should you do if fewer products are available than requested?',
      options: [
        'Guess the quantity',
        'Substitute another item without approval',
        'Follow workplace procedures, record the shortage and notify the appropriate person',
        'Ignore the shortage',
      ],
      correctOption: 2,
      explanation:
        'Never conceal a shortage by entering the expected quantity. Follow the Short Pick procedure.',
    },
    {
      question: 'Why are batch and serial numbers important?',
      options: [
        'Decoration',
        'Faster walking routes',
        'Product traceability and accurate inventory control',
        'Warehouse appearance',
      ],
      correctOption: 2,
      explanation:
        'Batch and serial capture supports traceability, warranty, recall, and compliance.',
    },
    {
      question: 'A scanner shows the wrong product at a location. What should you do?',
      options: [
        'Pick it anyway',
        'Report the mismatch and do not pick the item',
        'Ignore the scanner',
        'Take the item to a supervisor after the shift',
      ],
      correctOption: 1,
      explanation:
        'Scanner mismatches indicate stock or data issues. Do not pick — report immediately.',
    },
  ],
}