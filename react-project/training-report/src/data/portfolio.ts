export interface Project {
  id: string;
  title: string;
  company: string;
  period: string;
  context: string;
  result: string;
  tags: string[];
  detail: {
    overview: string;
    problem: string;
    goal: string;
    approach: string[];
    solution: string;
    impact: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'training-mango',
    title: 'Training System Redesign',
    company: 'Mango for Salon (Enrich OS)',
    period: 'Sep 2025 – Present',
    context: 'Built onboarding programs for 50+ staff across Sales, Tech Support, and Marketing from scratch.',
    result: '0% attrition in Marketing cohort',
    tags: ['Training Design', 'SOP', 'Onboarding'],
    detail: {
      overview: 'When I joined Enrich Operating System (Mango for Salon) as HR & Sales Training HRD, there were no structured onboarding systems in place. New hires across departments were learning by doing — leading to inconsistency and early exits.',
      problem: 'With rapid hiring across Sales (30+), Technical Support (20+), and Marketing (3) teams, the organization needed a scalable onboarding framework that worked across different roles and skill levels — without constant manager intervention.',
      goal: 'Design and deliver a complete onboarding system that reduces ramp-up time, sets clear expectations, and creates a consistent experience from day one.',
      approach: [
        'Mapped each role\'s first 30/60/90 days to identify key milestones and knowledge gaps',
        'Authored SOPs and KPI frameworks tailored to each department\'s objectives',
        'Designed onboarding workshops combining product knowledge, skills practice, and performance benchmarks',
        'Built P&L templates adopted across all teams for management reporting',
      ],
      solution: 'A department-specific onboarding program with SOPs, KPI frameworks, and structured workshops — giving each new hire a clear roadmap and measurable checkpoints from day one.',
      impact: [
        '0% attrition in the Marketing cohort (3/3 retained)',
        'Reduced average ramp-up time across Sales and Tech Support teams',
        'Equipment loss rate reduced to 0% through inventory SOP implementation',
        'SOPs and KPI frameworks adopted across all departments',
      ],
    },
  },
  {
    id: 'churn-reduction',
    title: 'Churn Rate Reduction Program',
    company: 'Advance Solutions Technology (Zota Brand)',
    period: 'Jul 2024 – May 2025',
    context: 'Redesigned client engagement workflows for a 12-member team managing 1,800+ merchants.',
    result: 'Churn rate: 20% → 5%',
    tags: ['Process Design', 'Retention', 'Team Leadership'],
    detail: {
      overview: 'At Zota Brand, I led a 12-member team responsible for marketing and retention for 1,800+ merchant accounts. Department churn was at 20% — directly impacting revenue and team morale.',
      problem: 'Client churn was driven by inconsistent follow-up, unclear escalation paths, and a reactive relationship management culture. The team had no structured engagement workflow.',
      goal: 'Cut churn rate significantly and build a sustainable, proactive client relationship system.',
      approach: [
        'Audited existing client touchpoints and identified the top failure patterns leading to churn',
        'Designed a structured client engagement workflow with defined check-in schedules and escalation triggers',
        'Created team KPIs focused on proactive outreach rather than reactive issue resolution',
        'Trained 10 new team members on the new workflow with structured assessment',
      ],
      solution: 'A proactive engagement system with clear touchpoints, escalation workflows, and KPI benchmarks — replacing ad-hoc relationship management with a structured, repeatable process.',
      impact: [
        'Churn rate reduced from 20% to 5% across 1,800+ merchant accounts',
        'Team productivity improved by 40% through workflow redesign',
        '10 new hires trained with 90% pass rate',
        'Monthly P&L reporting system established for senior management',
      ],
    },
  },
  {
    id: 'team-scale-up',
    title: 'Sales Team Scale-Up & City Expansion',
    company: 'Global Liaison (Zota Brand)',
    period: 'Jun 2023 – Jun 2024',
    context: 'Recruited and trained 40 Sales staff; built a 10-person Tech Support team from scratch.',
    result: 'Merchant accounts: 700 → 4,000+',
    tags: ['HR & Recruiting', 'Training', 'Expansion'],
    detail: {
      overview: 'Global Liaison was entering an aggressive growth phase across Vietnam. The challenge: scale the Sales team rapidly without sacrificing quality, while simultaneously building a new Technical Support function.',
      problem: 'The company had 700 merchant accounts and needed to scale to thousands. There was no Technical Support team, a high complaint rate (10% of total calls), and no formal training structure.',
      goal: 'Build the human infrastructure for rapid growth — recruiting, training, and systemizing two distinct teams simultaneously while leading city expansions.',
      approach: [
        'Designed a structured recruiting pipeline for Sales and Tech Support roles',
        'Built and ran training programs for 40 Sales staff covering product, client handling, and KPIs',
        'Created a 10-person Technical Support team from scratch with complaint resolution SOPs',
        'Led office expansion projects into Quy Nhon, Da Nang, and Nha Trang',
      ],
      solution: 'A parallel hiring + training system that allowed the company to scale two teams at once, with city-level expansions supported by pre-trained talent pipelines.',
      impact: [
        'Merchant accounts grew from 700 to 4,000+ in 12 months',
        'Technical Support complaint rate reduced from 10% to 5% of total calls',
        '40 Sales staff recruited and onboarded across multiple cities',
        'Successful office launches in Quy Nhon, Da Nang, and Nha Trang',
      ],
    },
  },
  {
    id: 'revenue-lotte',
    title: 'Category Revenue Growth',
    company: 'Lotte Duty Free – Khanh Hoa',
    period: 'Jan 2020 – Feb 2021',
    context: 'Led targeted upselling strategy for liquor & cigarette category with international clientele.',
    result: 'Category revenue: +35%',
    tags: ['Sales', 'Upselling', 'Revenue Growth'],
    detail: {
      overview: 'At Lotte Duty Free, I managed the liquor and cigarette category, primarily serving Chinese-speaking international customers. The category had clear room to grow through structured upselling.',
      problem: 'Category revenue was underperforming. Sales relied on passive browsing rather than consultative selling. The Covid-19 closure also created a stock liquidation challenge.',
      goal: 'Grow category revenue through structured upselling and protect inventory value during the closure period.',
      approach: [
        'Developed a category-specific upselling script tailored to Chinese-speaking clientele',
        'Built product knowledge into daily team briefings to improve conversion confidence',
        'Coordinated stock sell-off strategy to minimize inventory loss before closure',
        'Trained 2 new employees on category knowledge and upselling techniques',
      ],
      solution: 'A consultative selling approach with language-tailored client engagement and a structured stock liquidation plan during Covid-19.',
      impact: [
        'Category revenue grew by 35% year-on-year',
        '80% of remaining stock sold off during Covid-19 closure — minimizing inventory loss',
        '2 new employees trained and retained as permanent staff',
      ],
    },
  },
];

export interface InsightPost {
  id: string;
  title: string;
  excerpt: string;
  body: string[];
  tag: string;
  readTime: string;
  date: string;
}

export const INSIGHTS: InsightPost[] = [
  {
    id: 'onboarding-that-sticks',
    title: 'How I design onboarding that actually sticks',
    excerpt: "Most onboarding fails not because the content is wrong, but because it's not built around what happens on day one — and day thirty.",
    body: [
      "Most onboarding programs follow the same pattern: dump information in week one, then leave the new hire to figure out the rest. The result is predictable — high early confusion, inconsistent performance, and unnecessary attrition.",
      "What works is designing onboarding backward. Start with day 60 or day 90: what does a successful hire look like by then? What behaviors, outputs, and relationships define success? Once you have that picture, trace back to what needs to happen on day one, day seven, and day thirty.",
      "The other shift that matters is from 'knowledge transfer' to 'confidence building.' New hires don't fail because they lack information — they fail because they don't know how to use it under pressure. Good onboarding creates low-stakes practice before high-stakes moments.",
      "The simplest test: after onboarding, can your new hire explain their role, their first priority, and who to ask for help — without looking anything up? If not, the program has a gap.",
    ],
    tag: 'Training',
    readTime: '3 min',
    date: 'Mar 2026',
  },
  {
    id: 'churn-and-relationships',
    title: 'What reducing churn taught me about relationships',
    excerpt: "Cutting churn from 20% to 5% wasn't about the product. It was about closing the gap between what clients expected and what they actually experienced.",
    body: [
      "When I was tasked with reducing churn across 1,800+ merchant accounts, my first instinct was to look at the product — pricing, features, bugs. But the data told a different story. Most clients who left weren't unhappy with the product. They felt ignored.",
      "The pattern was almost always the same: a client hits a friction point, never quite gets it resolved, and silently starts evaluating alternatives. By the time they cancelled, the decision had already been made weeks earlier.",
      "The fix wasn't complicated — it was consistent. We built a proactive check-in schedule, defined clear escalation paths, and created KPIs around outreach (not just response). Clients who felt seen and followed up stayed, even when things weren't perfect.",
      "The lesson: churn is almost always a relationship problem disguised as a product problem. If you're losing clients, the first question isn't 'what's wrong with the product?' — it's 'where did we stop paying attention?'",
    ],
    tag: 'Operations',
    readTime: '4 min',
    date: 'Feb 2026',
  },
  {
    id: 'kpis-make-teams',
    title: 'Why clear KPIs make better teams',
    excerpt: "A KPI without context is just a number. The teams that perform consistently are the ones who understand the why behind each metric.",
    body: [
      "I've built KPI frameworks for Sales, Customer Success, and Technical Support teams across different companies. The biggest mistake I see: treating KPIs as a surveillance tool rather than a communication tool.",
      "When a team member sees a KPI for the first time and thinks 'I'm being measured,' the relationship with that metric is defensive. When they understand 'this number tells us whether clients are getting what they came for,' the relationship becomes purposeful.",
      "The KPIs I've found most useful connect daily actions to company-level outcomes. Not just 'make 30 calls today' but '30 calls means 5 meaningful conversations, which typically means 1 retained account.' When your team can draw that line, they start self-managing around it.",
      "Clear KPIs also make underperformance easier to address. Instead of 'you're not hitting your numbers,' the conversation becomes 'which part of the process is breaking down?' — a much more productive place to start.",
    ],
    tag: 'Management',
    readTime: '3 min',
    date: 'Jan 2026',
  },
];

export const STRENGTHS = [
  { title: 'SOP & Process Design',     desc: 'Building systems that teams can execute without constant supervision.' },
  { title: 'Training Systems',          desc: 'Structured programs that turn new hires into reliable performers.' },
  { title: 'Operational Optimization',  desc: 'Removing friction across workflows, teams, and client journeys.' },
  { title: 'Execution & Alignment',     desc: 'Bridging strategy to ground-level action — making sure things actually get done.' },
];

export const TIMELINE = [
  { period: 'Sep 2025 – Present',  role: 'HR & Sales Training HRD',   company: 'Mango for Salon (Enrich OS)'               },
  { period: 'Jul 2024 – May 2025', role: 'Customer Services Leader',   company: 'Advance Solutions Technology (Zota Brand)' },
  { period: 'Jun 2023 – Jun 2024', role: 'Training Executive · HRD',  company: 'Global Liaison (Zota Brand)'               },
  { period: 'Feb 2021 – Jun 2023', role: 'Marketing Executive',        company: 'Global Liaison (Zota Brand)'               },
  { period: 'Jan 2020 – Feb 2021', role: 'Sales Executive',            company: 'Lotte Duty Free – Khanh Hoa'              },
  { period: 'Apr 2019 – Dec 2019', role: 'Sales Executive',            company: 'MaxSport – Vincom Nha Trang'               },
];
