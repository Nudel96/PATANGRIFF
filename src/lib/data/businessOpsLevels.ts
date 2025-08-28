import type { LearningLevel } from '$lib/types/learning';

// Business Operations Beginner Levels (2-10)
export const BUSINESS_OPS_BEGINNER_LEVELS: LearningLevel[] = [
	{
		level: 2,
		title: "Defining Your Personal Mission & Values",
		description: "Craft a personal mission statement that guides your business vision and decisions",
		tier: "Beginner",
		unlockRequirement: 50,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "2-1",
				title: "Personal Mission Statement",
				description: "Learn to create a compass for your business and life",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "A personal mission statement is like a compass for your business and life. It defines why you work and what you stand for. Research shows personal missions give focus and motivation. Writing one helps clarify values and long-term purpose."
			},
			{
				id: "2-2",
				title: "Values Assessment",
				description: "Identify your core values and principles",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Core values guide decision-making and behavior. Identify what matters most to you: integrity, growth, freedom, security, etc. Align your business practices with your values for authentic success."
			}
		]
	},
	{
		level: 3,
		title: "Opportunity Recognition & Ideation",
		description: "Learn to generate business ideas by spotting real problems and needs",
		tier: "Beginner",
		unlockRequirement: 110,
		completed: false,
		locked: true,
		totalXP: 65,
		modules: [
			{
				id: "3-1",
				title: "Spotting Opportunities",
				description: "Learn to see solutions where others see problems",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Entrepreneurs see solutions where others see problems. Start by observing your everyday life, skills, or hobbies for unmet needs. Mindset exercises like brainstorming can spark ideas. Every idea is an experiment to be tested."
			},
			{
				id: "3-2",
				title: "Problem Validation",
				description: "Confirm that problems are worth solving",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Not all problems are worth solving. Validate that enough people have the problem, are willing to pay for a solution, and that you can reach them effectively. Use surveys and interviews to validate problems."
			}
		]
	},
	{
		level: 4,
		title: "Business Planning Fundamentals",
		description: "Create structured business plans that guide decision-making",
		tier: "Beginner",
		unlockRequirement: 175,
		completed: false,
		locked: true,
		totalXP: 70,
		modules: [
			{
				id: "4-1",
				title: "Business Plan Components",
				description: "Learn the essential elements of an effective business plan",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "A business plan includes: Executive Summary, Company Description, Market Analysis, Organization & Management, Products/Services, Marketing & Sales, Financial Projections, and Funding Request. Keep it concise but comprehensive."
			},
			{
				id: "4-2",
				title: "Financial Projections",
				description: "Create realistic financial forecasts",
				type: "lesson",
				xpReward: 25,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Financial projections include revenue forecasts, expense budgets, cash flow statements, and break-even analysis. Base projections on research and conservative assumptions. Update regularly as you gather real data."
			}
		]
	},
	{
		level: 5,
		title: "Goal Setting & Productivity Systems",
		description: "Implement systematic approaches to achieving business goals",
		tier: "Beginner",
		unlockRequirement: 245,
		completed: false,
		locked: true,
		totalXP: 65,
		modules: [
			{
				id: "5-1",
				title: "SMART Goals Framework",
				description: "Learn to set Specific, Measurable, Achievable, Relevant, Time-bound goals",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "SMART goals provide clarity and direction. Specific: clearly defined outcomes. Measurable: quantifiable metrics. Achievable: realistic given resources. Relevant: aligned with broader objectives. Time-bound: clear deadlines."
			},
			{
				id: "5-2",
				title: "Productivity Systems",
				description: "Implement systems to maximize efficiency",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Productivity systems like Getting Things Done (GTD), time-blocking, or the Pomodoro Technique help manage tasks and time. Choose a system that fits your work style and stick with it consistently."
			}
		]
	},
	{
		level: 6,
		title: "Customer Development & Validation",
		description: "Learn to understand and validate customer needs",
		tier: "Beginner",
		unlockRequirement: 310,
		completed: false,
		locked: false,
		totalXP: 70,
		modules: [
			{
				id: "6-1",
				title: "Customer Discovery",
				description: "Learn systematic approaches to understanding customers",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Customer discovery involves getting out of the building to understand real customer problems. Use interviews, surveys, and observation to gather insights. Focus on problems, not solutions initially."
			},
			{
				id: "6-2",
				title: "Customer Validation",
				description: "Validate that customers will pay for your solution",
				type: "lesson",
				xpReward: 25,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Customer validation proves that customers will actually buy your solution. Test willingness to pay through pre-orders, pilot programs, or minimum viable products."
			}
		]
	},
	{
		level: 7,
		title: "Basic Marketing & Sales",
		description: "Learn fundamental marketing and sales principles",
		tier: "Beginner",
		unlockRequirement: 380,
		completed: false,
		locked: false,
		totalXP: 75,
		modules: [
			{
				id: "7-1",
				title: "Marketing Fundamentals",
				description: "Understand the 4 Ps of marketing",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "The 4 Ps of marketing are Product, Price, Place, and Promotion. Develop a clear value proposition, set competitive pricing, choose distribution channels, and create promotional strategies."
			},
			{
				id: "7-2",
				title: "Sales Process Basics",
				description: "Learn the fundamentals of selling",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "The sales process includes prospecting, qualifying, presenting, handling objections, and closing. Focus on solving customer problems rather than pushing products."
			}
		]
	},
	{
		level: 8,
		title: "Financial Management Basics",
		description: "Understand basic business financial management",
		tier: "Beginner",
		unlockRequirement: 455,
		completed: false,
		locked: false,
		totalXP: 70,
		modules: [
			{
				id: "8-1",
				title: "Cash Flow Management",
				description: "Learn to manage business cash flow",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Cash flow is the lifeblood of business. Track cash inflows and outflows, maintain cash reserves, and plan for seasonal variations. Cash flow problems kill more businesses than lack of profit."
			},
			{
				id: "8-2",
				title: "Basic Accounting",
				description: "Understand fundamental accounting principles",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Learn the basics of income statements, balance sheets, and cash flow statements. Understand the difference between profit and cash flow. Use accounting to make informed business decisions."
			}
		]
	},
	{
		level: 9,
		title: "Team Building & Leadership",
		description: "Learn to build and lead effective teams",
		tier: "Beginner",
		unlockRequirement: 525,
		completed: false,
		locked: false,
		totalXP: 75,
		modules: [
			{
				id: "9-1",
				title: "Building Your First Team",
				description: "Learn to hire and manage your first employees",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Building a team starts with defining roles clearly. Hire for attitude and cultural fit, train for skills. Create clear job descriptions, fair compensation, and growth opportunities."
			},
			{
				id: "9-2",
				title: "Leadership Fundamentals",
				description: "Develop basic leadership skills",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Leadership is about inspiring others to achieve common goals. Communicate vision clearly, lead by example, provide feedback, and support team development."
			}
		]
	},
	{
		level: 10,
		title: "Legal & Compliance Basics",
		description: "Understand basic legal requirements for business",
		tier: "Beginner",
		unlockRequirement: 600,
		completed: false,
		locked: false,
		totalXP: 65,
		modules: [
			{
				id: "10-1",
				title: "Business Structure & Registration",
				description: "Choose the right business structure",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Choose between sole proprietorship, partnership, LLC, or corporation based on liability, taxes, and growth plans. Register your business and obtain necessary licenses and permits."
			},
			{
				id: "10-2",
				title: "Contracts & Agreements",
				description: "Understand basic contract principles",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Contracts protect your business interests. Include clear terms, payment schedules, deliverables, and dispute resolution. Always get agreements in writing and consider legal review for major contracts."
			}
		]
	}
];

// Business Operations Intermediate Levels (11-20)
export const BUSINESS_OPS_INTERMEDIATE_LEVELS: LearningLevel[] = [
	{
		level: 11,
		title: "Strategic Planning & Vision",
		description: "Develop long-term strategic thinking and planning skills",
		tier: "Intermediate",
		unlockRequirement: 650,
		completed: false,
		locked: true,
		totalXP: 85,
		modules: [
			{
				id: "11-1",
				title: "Strategic Thinking",
				description: "Develop the ability to think strategically about your business",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Strategic thinking involves seeing the big picture, understanding competitive dynamics, and anticipating future trends. Develop frameworks for analyzing opportunities and threats. Think in terms of systems and long-term consequences."
			},
			{
				id: "11-2",
				title: "Vision Development",
				description: "Create a compelling vision for your business future",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "A compelling vision describes where you want your business to be in 5-10 years. It should be inspiring, specific, and achievable. Use your vision to guide strategic decisions and motivate your team."
			}
		]
	},
	{
		level: 12,
		title: "Process Documentation & Systems",
		description: "Create systems that work without constant oversight",
		tier: "Intermediate",
		unlockRequirement: 735,
		completed: false,
		locked: true,
		totalXP: 90,
		modules: [
			{
				id: "12-1",
				title: "Process Mapping",
				description: "Document and optimize your business processes",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Process mapping visualizes how work flows through your business. Identify bottlenecks, redundancies, and improvement opportunities. Document standard operating procedures (SOPs) for consistent execution."
			},
			{
				id: "12-2",
				title: "System Automation",
				description: "Automate repetitive tasks and processes",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Automation reduces errors, saves time, and ensures consistency. Start with simple automations like email templates and scheduling tools. Gradually automate more complex processes as your business grows."
			}
		]
	},
	{
		level: 13,
		title: "Marketing Strategy & Branding",
		description: "Develop comprehensive marketing strategies",
		tier: "Intermediate",
		unlockRequirement: 825,
		completed: false,
		locked: false,
		totalXP: 90,
		modules: [
			{
				id: "13-1",
				title: "Brand Development",
				description: "Create a strong brand identity",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Brand development involves creating a unique identity that resonates with customers. Define brand values, personality, and positioning. Develop consistent visual and messaging elements across all touchpoints."
			},
			{
				id: "13-2",
				title: "Digital Marketing Strategy",
				description: "Master online marketing channels",
				type: "lesson",
				xpReward: 35,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Digital marketing includes SEO, social media, email marketing, and paid advertising. Choose channels based on where your customers spend time. Track metrics and optimize campaigns for better ROI."
			}
		]
	},
	{
		level: 14,
		title: "Sales Management & CRM",
		description: "Build systematic sales processes",
		tier: "Intermediate",
		unlockRequirement: 915,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "14-1",
				title: "Sales Process Optimization",
				description: "Create repeatable sales systems",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Optimize your sales process by mapping the customer journey, identifying bottlenecks, and creating standard procedures. Use CRM systems to track leads and measure conversion rates."
			},
			{
				id: "14-2",
				title: "Customer Relationship Management",
				description: "Build long-term customer relationships",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "CRM is about managing the entire customer lifecycle. Focus on customer retention, upselling, and referrals. Use data to personalize interactions and improve customer satisfaction."
			}
		]
	},
	{
		level: 15,
		title: "Operations Scaling",
		description: "Scale operations efficiently as you grow",
		tier: "Intermediate",
		unlockRequirement: 1000,
		completed: false,
		locked: false,
		totalXP: 95,
		modules: [
			{
				id: "15-1",
				title: "Scaling Systems",
				description: "Build systems that scale with growth",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Scaling requires systems that work without constant oversight. Standardize processes, automate routine tasks, and create clear procedures. Plan for increased volume and complexity."
			},
			{
				id: "15-2",
				title: "Quality Control",
				description: "Maintain quality while scaling",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Quality control becomes critical as you scale. Implement quality checkpoints, train staff on standards, and create feedback loops. Monitor key quality metrics and address issues quickly."
			}
		]
	},
	{
		level: 16,
		title: "Financial Analysis & KPIs",
		description: "Use financial data to drive decisions",
		tier: "Intermediate",
		unlockRequirement: 1095,
		completed: false,
		locked: false,
		totalXP: 90,
		modules: [
			{
				id: "16-1",
				title: "Key Performance Indicators",
				description: "Identify and track critical business metrics",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "KPIs help you measure business performance. Choose metrics that align with your goals: revenue growth, customer acquisition cost, lifetime value, churn rate. Review KPIs regularly and take action on insights."
			},
			{
				id: "16-2",
				title: "Financial Ratio Analysis",
				description: "Analyze business financial health",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Financial ratios reveal business health. Track profitability ratios, liquidity ratios, and efficiency ratios. Compare to industry benchmarks and historical performance to identify trends."
			}
		]
	},
	{
		level: 17,
		title: "Technology & Innovation",
		description: "Leverage technology for competitive advantage",
		tier: "Intermediate",
		unlockRequirement: 1185,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "17-1",
				title: "Technology Strategy",
				description: "Align technology with business goals",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Technology should support business objectives. Evaluate tools based on ROI, scalability, and integration capabilities. Stay current with industry trends but avoid technology for technology's sake."
			},
			{
				id: "17-2",
				title: "Innovation Management",
				description: "Foster innovation within your organization",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Innovation drives competitive advantage. Create processes for generating, evaluating, and implementing new ideas. Encourage experimentation and learn from failures."
			}
		]
	},
	{
		level: 18,
		title: "Partnership & Networking",
		description: "Build strategic partnerships and networks",
		tier: "Intermediate",
		unlockRequirement: 1270,
		completed: false,
		locked: false,
		totalXP: 80,
		modules: [
			{
				id: "18-1",
				title: "Strategic Partnerships",
				description: "Form mutually beneficial business partnerships",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Strategic partnerships can accelerate growth. Look for complementary businesses, shared customer bases, or resource exchanges. Structure partnerships with clear goals, responsibilities, and success metrics."
			},
			{
				id: "18-2",
				title: "Professional Networking",
				description: "Build valuable professional relationships",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Networking is about building genuine relationships. Attend industry events, join professional associations, and engage on social media. Focus on giving value before asking for help."
			}
		]
	},
	{
		level: 19,
		title: "Risk Management",
		description: "Identify and mitigate business risks",
		tier: "Intermediate",
		unlockRequirement: 1350,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "19-1",
				title: "Risk Assessment",
				description: "Identify potential business risks",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Risk assessment involves identifying potential threats to your business. Consider market risks, operational risks, financial risks, and regulatory risks. Evaluate probability and impact of each risk."
			},
			{
				id: "19-2",
				title: "Risk Mitigation Strategies",
				description: "Develop plans to manage identified risks",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Risk mitigation includes prevention, reduction, transfer, and acceptance strategies. Develop contingency plans for major risks. Consider insurance, diversification, and backup systems."
			}
		]
	},
	{
		level: 20,
		title: "Performance Management",
		description: "Optimize team and organizational performance",
		tier: "Intermediate",
		unlockRequirement: 1435,
		completed: false,
		locked: false,
		totalXP: 90,
		modules: [
			{
				id: "20-1",
				title: "Performance Measurement",
				description: "Create systems to measure and track performance",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Performance measurement requires clear goals, metrics, and feedback systems. Set SMART objectives, track progress regularly, and provide constructive feedback. Use data to identify improvement opportunities."
			},
			{
				id: "20-2",
				title: "Performance Improvement",
				description: "Implement strategies to enhance performance",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Performance improvement involves training, coaching, process optimization, and resource allocation. Address performance gaps systematically and celebrate improvements."
			}
		]
	}
];

// Business Operations Professional Levels (21-30)
export const BUSINESS_OPS_PROFESSIONAL_LEVELS: LearningLevel[] = [
	{
		level: 21,
		title: "Advanced Financial Planning",
		description: "Master sophisticated financial planning and analysis",
		tier: "Professional",
		unlockRequirement: 1450,
		completed: false,
		locked: true,
		totalXP: 110,
		modules: [
			{
				id: "21-1",
				title: "Financial Modeling",
				description: "Build sophisticated financial models for planning",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Financial modeling involves creating mathematical representations of your business performance. Build models for scenario planning, valuation, and investment decisions. Use sensitivity analysis to understand key drivers."
			},
			{
				id: "21-2",
				title: "Capital Allocation",
				description: "Optimize how you allocate financial resources",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Capital allocation determines where to invest your limited resources for maximum return. Evaluate opportunities based on ROI, risk, and strategic fit. Develop frameworks for making capital allocation decisions."
			}
		]
	},
	{
		level: 22,
		title: "Leadership Excellence",
		description: "Develop advanced leadership capabilities",
		tier: "Professional",
		unlockRequirement: 1560,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "22-1",
				title: "Transformational Leadership",
				description: "Lead organizational change and transformation",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Transformational leaders inspire others to achieve extraordinary results. Develop compelling vision, communicate effectively, and empower teams. Lead by example and create a culture of excellence."
			},
			{
				id: "22-2",
				title: "Executive Decision Making",
				description: "Make complex strategic decisions under uncertainty",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Executive decision making requires balancing multiple stakeholder interests, incomplete information, and time pressure. Use structured decision frameworks and scenario planning."
			}
		]
	},
	{
		level: 23,
		title: "Organizational Culture",
		description: "Build and maintain strong organizational culture",
		tier: "Professional",
		unlockRequirement: 1675,
		completed: false,
		locked: false,
		totalXP: 110,
		modules: [
			{
				id: "23-1",
				title: "Culture Development",
				description: "Create a strong, positive organizational culture",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Organizational culture drives performance and employee engagement. Define core values, model desired behaviors, and reinforce culture through hiring, training, and recognition."
			},
			{
				id: "23-2",
				title: "Change Management",
				description: "Lead organizational change initiatives",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Change management involves planning, communicating, and implementing organizational changes. Address resistance, provide support, and celebrate milestones."
			}
		]
	},
	{
		level: 24,
		title: "Strategic Partnerships & M&A",
		description: "Execute complex partnership and acquisition strategies",
		tier: "Professional",
		unlockRequirement: 1785,
		completed: false,
		locked: false,
		totalXP: 120,
		modules: [
			{
				id: "24-1",
				title: "Merger & Acquisition Strategy",
				description: "Evaluate and execute M&A opportunities",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "M&A can accelerate growth but requires careful evaluation. Assess strategic fit, financial impact, and integration challenges. Conduct thorough due diligence and plan integration carefully."
			},
			{
				id: "24-2",
				title: "Joint Venture Management",
				description: "Structure and manage complex partnerships",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Joint ventures combine resources and capabilities for mutual benefit. Structure agreements carefully, align incentives, and manage ongoing relationships effectively."
			}
		]
	},
	{
		level: 25,
		title: "Global Business Operations",
		description: "Manage international business operations",
		tier: "Professional",
		unlockRequirement: 1905,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "25-1",
				title: "International Expansion",
				description: "Plan and execute global expansion strategies",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "International expansion requires understanding local markets, regulations, and cultural differences. Develop market entry strategies, adapt products/services, and build local partnerships."
			},
			{
				id: "25-2",
				title: "Cross-Cultural Management",
				description: "Manage diverse, global teams effectively",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Cross-cultural management involves understanding cultural differences and adapting leadership styles. Build inclusive environments and leverage diversity for competitive advantage."
			}
		]
	},
	{
		level: 26,
		title: "Digital Transformation",
		description: "Lead digital transformation initiatives",
		tier: "Professional",
		unlockRequirement: 2020,
		completed: false,
		locked: false,
		totalXP: 125,
		modules: [
			{
				id: "26-1",
				title: "Digital Strategy",
				description: "Develop comprehensive digital transformation strategies",
				type: "lesson",
				xpReward: 75,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Digital transformation involves reimagining business processes, customer experiences, and operating models. Develop digital strategies that create competitive advantage and drive growth."
			},
			{
				id: "26-2",
				title: "Technology Implementation",
				description: "Execute large-scale technology implementations",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Technology implementation requires careful planning, change management, and risk mitigation. Ensure user adoption, data migration, and system integration."
			}
		]
	},
	{
		level: 27,
		title: "Sustainability & ESG",
		description: "Integrate sustainability into business operations",
		tier: "Professional",
		unlockRequirement: 2145,
		completed: false,
		locked: false,
		totalXP: 110,
		modules: [
			{
				id: "27-1",
				title: "ESG Strategy",
				description: "Develop environmental, social, and governance strategies",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "ESG considerations are increasingly important for business success. Develop strategies that address environmental impact, social responsibility, and governance practices."
			},
			{
				id: "27-2",
				title: "Sustainable Operations",
				description: "Implement sustainable business practices",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Sustainable operations reduce environmental impact while maintaining profitability. Implement circular economy principles, reduce waste, and optimize resource usage."
			}
		]
	},
	{
		level: 28,
		title: "Innovation Ecosystem",
		description: "Build innovation capabilities and ecosystems",
		tier: "Professional",
		unlockRequirement: 2255,
		completed: false,
		locked: false,
		totalXP: 120,
		modules: [
			{
				id: "28-1",
				title: "Innovation Strategy",
				description: "Develop systematic innovation capabilities",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Innovation strategy involves creating systematic capabilities for generating, evaluating, and implementing new ideas. Build innovation processes, culture, and partnerships."
			},
			{
				id: "28-2",
				title: "Ecosystem Development",
				description: "Build innovation ecosystems and partnerships",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Innovation ecosystems involve multiple stakeholders working together. Build relationships with universities, startups, suppliers, and customers to drive innovation."
			}
		]
	},
	{
		level: 29,
		title: "Crisis Management & Resilience",
		description: "Build organizational resilience and crisis management capabilities",
		tier: "Professional",
		unlockRequirement: 2375,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "29-1",
				title: "Crisis Preparedness",
				description: "Develop crisis management plans and capabilities",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Crisis preparedness involves identifying potential crises, developing response plans, and building organizational capabilities. Create communication protocols and decision-making frameworks."
			},
			{
				id: "29-2",
				title: "Organizational Resilience",
				description: "Build adaptive and resilient organizations",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Organizational resilience is the ability to adapt and recover from disruptions. Build redundancy, flexibility, and learning capabilities into organizational systems."
			}
		]
	},
	{
		level: 30,
		title: "Business Operations Mastery",
		description: "Integrate all business operations skills into a complete system",
		tier: "Professional",
		unlockRequirement: 2505,
		completed: false,
		locked: true,
		totalXP: 150,
		modules: [
			{
				id: "30-1",
				title: "Operations Integration",
				description: "Integrate all operational elements into a cohesive system",
				type: "lesson",
				xpReward: 80,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Master-level operations integrate strategy, systems, people, and culture into a cohesive whole. Every element supports the others to create sustainable competitive advantage and scalable growth."
			},
			{
				id: "30-2",
				title: "Operations Mastery Assessment",
				description: "Comprehensive evaluation of business operations skills",
				type: "challenge",
				xpReward: 70,
				duration: "120 min",
				completed: false,
				locked: false
			}
		]
	}
];

// Combine all Business Operations levels
export const COMPLETE_BUSINESS_OPS_LEVELS: LearningLevel[] = [
	// Level 1 is defined in learning.ts
	...BUSINESS_OPS_BEGINNER_LEVELS,
	...BUSINESS_OPS_INTERMEDIATE_LEVELS,
	...BUSINESS_OPS_PROFESSIONAL_LEVELS
];
