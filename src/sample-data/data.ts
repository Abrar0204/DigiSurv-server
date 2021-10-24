const sampleData = [
  {
    name: 'Maths',
    students: [
      {
        name: 'Student #1',
        role: 'student',
      },
      {
        name: 'Student #2',
        role: 'student',
      },
      {
        name: 'Student #3',
        role: 'student',
      },
      {
        name: 'Student #4',
        role: 'student',
      },
    ],
    proctors: [
      {
        name: 'Proctor #1',
        role: 'proctor',
      },
      {
        name: 'Proctor #2',
        role: 'proctor',
      },
    ],
    questions: [
      {
        question: 'what is 1 + 1 ?',
        options: [
          {
            option: '2',
            isCorrect: true,
          },
          {
            option: '3',
            isCorrect: false,
          },
          {
            option: '4',
            isCorrect: false,
          },
        ],
      },
      {
        question: 'what is 2 + 2 ?',
        options: [
          {
            option: '2',
            isCorrect: false,
          },
          {
            option: '3',
            isCorrect: false,
          },
          {
            option: '4',
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    name: 'Computer Science',
    students: [
      {
        name: 'Student #1',
        role: 'student',
      },
      {
        name: 'Student #2',
        role: 'student',
      },
      {
        name: 'Student #3',
        role: 'student',
      },
      {
        name: 'Student #4',
        role: 'student',
      },
    ],
    proctors: [
      {
        name: 'Proctor #1',
        role: 'proctor',
      },
      {
        name: 'Proctor #2',
        role: 'proctor',
      },
    ],
    questions: [
      {
        question: 'what is full form of CPU ?',
        options: [
          {
            option: 'Central Processing Unit',
            isCorrect: true,
          },
          {
            option: 'Central Parcel Unit',
            isCorrect: false,
          },
          {
            option: 'Computer Processing Unit',
            isCorrect: false,
          },
        ],
      },
      {
        question: 'what is full form of RAM ?',
        options: [
          {
            option: 'Random Arithmatic Memory',
            isCorrect: false,
          },
          {
            option: 'Read Access Memory',
            isCorrect: false,
          },
          {
            option: 'Random Access Memory',
            isCorrect: true,
          },
        ],
      },
    ],
  },
];

export { sampleData };
