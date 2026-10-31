export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  source: 'Paper I' | 'Paper II';
  section: 'A' | 'B';
  importance: 'High' | 'Medium' | 'Low';
  estimatedDays: number;
}

export interface DayTask {
  day: number;
  topicId: string;
  tasks: string[];
}

export interface WeeklySchedule {
  week: number;
  phase: number;
  phaseName: string;
  title: string;
  focus: string;
  days: DayTask[];
}

export const syllabusTopics: Record<string, StudyTopic> = {
  // Paper I - Section A: Governance & Management (50 Marks)
  'gov-1': { id: 'gov-1', title: 'Governance & Global Systems', description: 'Meaning, features, dimensions, global, corporate, federal, provincial & local governance; New Public Governance.', source: 'Paper I', section: 'A', importance: 'High', estimatedDays: 3 },
  'pub-admin': { id: 'pub-admin', title: 'Public & Personnel Administration', description: 'Concepts, Personnel Admin elements, Financial Admin, Budget prep, execution, monitoring & audit.', source: 'Paper I', section: 'A', importance: 'High', estimatedDays: 4 },
  'mgmt-sys': { id: 'mgmt-sys', title: 'Management Dynamics & Leadership', description: 'Time, resource, change, technology, conflict, crisis mgmt, leadership styles, motivation, team work, CSR.', source: 'Paper I', section: 'A', importance: 'High', estimatedDays: 4 },
  'proj-mgmt': { id: 'proj-mgmt', title: 'Project Management & Planning', description: 'CPM/PERT network models, HR & resource scheduling, project justification, monitoring, MIS & ERP systems.', source: 'Paper I', section: 'A', importance: 'High', estimatedDays: 3 },
  'fin-analysis': { id: 'fin-analysis', title: 'Financial Metrics & Feasibility', description: 'Benefit-Cost Ratio (BCR), IRR, NPV, Payback period, MARR, tariff structure & financial models.', source: 'Paper I', section: 'A', importance: 'High', estimatedDays: 3 },
  'ethics': { id: 'ethics', title: 'Ethics, Morality & Public Service', description: 'Ethics determinants, public service values (integrity, empathy), corruption control & public accountability.', source: 'Paper I', section: 'A', importance: 'Medium', estimatedDays: 3 },

  // Paper I - Section B: Acts, Policies, Power Sector & Grid (50 Marks)
  'const-act': { id: 'const-act', title: 'Constitution & Institutional Acts', description: 'Constitution of Nepal 2072, NEA Act 2041, NEA Employee & Financial bylaws, Good Governance Act 2064.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 5 },
  'procurement': { id: 'procurement', title: 'Public Procurement Framework', description: 'Public Procurement Act 2063 & Regulation 2064, PPMO rules, SBDs for ICB/NCB/EPC.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 3 },
  'elec-act': { id: 'elec-act', title: 'Electricity Acts & Regulation', description: 'Electricity Act 2049 & Regulation 2050, Electricity Regulatory Commission (ERC) Act 2074.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 4 },
  'water-env-act': { id: 'water-env-act', title: 'Water Resources & Environment Laws', description: 'National Water Resources Policy 2075, Land Acquisition Act 2034, EPA 2076 & EPR 2077, Hydropower Policy 2058.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 3 },
  'power-sector': { id: 'power-sector', title: 'Power Sector Evolution & NEA Restructuring', description: 'History, generation mix, private sector/IPP participation, PPA, PDA, CDP of NEA, federal restructuring.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 4 },
  'power-trends': { id: 'power-trends', title: 'Power Sector Trends & Cross-Border Trade', description: 'Energy security, BBIN/SAARC trade, Energy banking, power exchange, cross-border transmission & wheeling.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 4 },
  'grid-ops': { id: 'grid-ops', title: 'Grid Operations & Stability', description: 'Active/Reactive power management, system stability, control & protection challenges in complex systems.', source: 'Paper I', section: 'B', importance: 'High', estimatedDays: 3 },

  // Paper II - Section A: Core Electrical Engineering (50 Marks)
  'ee-fundamentals': { id: 'ee-fundamentals', title: 'Electrical Circuits & Transient Analysis', description: 'Active/reactive power, power factor improvement, 3-phase star/delta, RL/RC/RLC transients, Op-Amps.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 4 },
  'control-power-elec': { id: 'control-power-elec', title: 'Control Systems & Power Electronics', description: 'Feedback control, PID, stability (Routh/Bode/Root Locus), MOSFET/IGBT/Thyristor, PWM inverters, FACTS.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 4 },
  'ee-machines': { id: 'ee-machines', title: 'Electrical Machines & Transformers', description: 'Power/Distribution Transformers, Synchronous machines, Induction machines, DC machines, PMSG, synchronous condensers.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 6 },
  'power-plants': { id: 'power-plants', title: 'Hydroelectric & Renewable Power Plants', description: 'Hydro plant layouts, Pelton/Francis/Kaplan turbines, governor systems, diesel plants, solar PV, wind, MPPT.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 5 },
  'trans-dist': { id: 'trans-dist', title: 'Power Transmission & Distribution Lines', description: 'Line parameters, SIL, skin/proximity effect, HVDC, HTLS conductors, substation layouts (SAS/SCADA), ABC cables.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 5 },
  'power-sys-analysis': { id: 'power-sys-analysis', title: 'Power System Analysis & Faults', description: 'Symmetrical/unsymmetrical faults, Z-bus formulation, N-R/Decoupled load flow, transient stability, swing equation.', source: 'Paper II', section: 'A', importance: 'High', estimatedDays: 5 },

  // Paper II - Section B: High Voltage, Economics, Reliability & Contracts (50 Marks)
  'high-voltage': { id: 'high-voltage', title: 'High Voltage Engineering & Overvoltages', description: 'Corona phenomenon, insulation coordination, lightning & switching surges, MOV arresters, dielectric tests.', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 5 },
  'eng-economics': { id: 'eng-economics', title: 'Engineering Economics & Tariff Design', description: 'Capital investment appraisal, cash flow, IRR, NPV, sensitivity/breakeven, ToD & ABT utility tariff systems.', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 4 },
  'reliability': { id: 'reliability', title: 'Power System Reliability & Risk Assessment', description: 'Binomial & Markov models, Hierarchical levels (HL-I/II/III), LOLP, LOLE, EENS, SAIFI, SAIDI, CAIDI.', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 4 },
  'contract-mgmt': { id: 'contract-mgmt', title: 'Contract Management & Procurement SBDs', description: 'FIDIC contracts (Red/Yellow/Silver), PPMO/WB/ADB standards, EPC contract documents, dispute settlement.', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 3 },
  'elec-market': { id: 'elec-market', title: 'Electricity Markets & Power Pool', description: 'ISO/DSO, Power balancing, Locational Marginal Pricing (LMP), ancillary services, transmission pricing, hedging.', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 3 },
  'treaties-manuals': { id: 'treaties-manuals', title: 'International Treaties & Technical Manuals', description: 'Koshi, Gandak & Mahakali treaties, PPA/PDA structures, EMP/EIA guidelines, safety & test standards (IEC/IEEE).', source: 'Paper II', section: 'B', importance: 'High', estimatedDays: 3 },
};

export const schedule: WeeklySchedule[] = [
  // ==================== PHASE 1: WEEKS 1 - 3 (Governance, Management, Ethics & Fundamentals) ====================
  {
    week: 1,
    phase: 1,
    phaseName: 'Phase I: Governance & Foundation',
    title: 'Governance & Public Administration',
    focus: 'Paper I (Sec A: 1 & 2) - Foundations of State, Governance & Public Administration',
    days: [
      { day: 1, topicId: 'gov-1', tasks: ['Understand Meaning, Features & Dimensions of Governance', 'Analyze Global Governance Architecture and International Institutions'] },
      { day: 2, topicId: 'gov-1', tasks: ['Examine Corporate Governance Systems & Board Responsibilities', 'Study Federal, Provincial and Local Level Governance Dynamics in Nepal'] },
      { day: 3, topicId: 'gov-1', tasks: ['New Public Governance (NPG) vs NPM paradigms', 'Draft Comparative Matrix: Traditional Admin vs Modern Governance'] },
      { day: 4, topicId: 'pub-admin', tasks: ['Core Concepts and Principles of Public Administration', 'Personnel Administration: Human Resource Planning, Job Analysis & Staffing'] },
      { day: 5, topicId: 'pub-admin', tasks: ['Personnel Admin: Performance Appraisal, Career Path, Rewards & Discipline', 'Financial Administration: Principles and Budget Cycle Stages'] },
      { day: 6, topicId: 'pub-admin', tasks: ['Budget Implementation, Mid-term Evaluation & Performance Auditing', 'Public Expenditure Management & Fiscal Discipline in Utilities'] },
      { day: 7, topicId: 'pub-admin', tasks: ['Write 2 Sample 10-Mark Questions on Governance & Personnel Admin', 'Comprehensive Revision of Week 1 Key Terminology'] },
    ]
  },
  {
    week: 2,
    phase: 1,
    phaseName: 'Phase I: Governance & Foundation',
    title: 'Management Systems & Project Planning',
    focus: 'Paper I (Sec A: 3) - Contemporary Management Concepts, Leadership & Project Execution',
    days: [
      { day: 8, topicId: 'mgmt-sys', tasks: ['Time, Resource, Change & Technology Management in Modern Utilities', 'Information, Performance & Grievance Handling Mechanisms'] },
      { day: 9, topicId: 'mgmt-sys', tasks: ['Team Building, Conflict Resolution, Stress & Disaster Management', 'Participative Management and Stakeholder Engagement Strategies'] },
      { day: 10, topicId: 'mgmt-sys', tasks: ['Leadership Theories & Styles (Transformational, Situational)', 'Motivation Theories (Maslow, Herzberg, Vroom) & Decision Making Models'] },
      { day: 11, topicId: 'mgmt-sys', tasks: ['Strategic Management, Corporate Planning & SWOT Analysis', 'Corporate Social Responsibility (CSR) Framework & Managerial Competencies'] },
      { day: 12, topicId: 'proj-mgmt', tasks: ['Project Planning & Scheduling: CPM / PERT Network Construction', 'Critical Path Calculation, Float/Slack, Resource Leveling & Crashing'] },
      { day: 13, topicId: 'proj-mgmt', tasks: ['Project Monitoring, Feedback Control Cycle & Cash Flow Management', 'Management Information Systems (MIS) & Enterprise Resource Planning (ERP)'] },
      { day: 14, topicId: 'proj-mgmt', tasks: ['Solve 2 CPM/PERT Numerical Problems with Network Diagrams', 'Week 2 Structured Review on Management & Project Systems'] },
    ]
  },
  {
    week: 3,
    phase: 1,
    phaseName: 'Phase I: Governance & Foundation',
    title: 'Ethics, Professionalism & Circuit Theory',
    focus: 'Paper I (Sec A: 4 & 5) + Paper II (Sec A: 1) - Moral Infrastructure & Electrical Fundamentals',
    days: [
      { day: 15, topicId: 'ethics', tasks: ['Essence, Determinants, Consequences and Dimensions of Ethics', 'Human Values, Norms, Perceptions & Code of Conduct in Public Service'] },
      { day: 16, topicId: 'ethics', tasks: ['Public Accountability, Responsibility and Delegation of Authority', 'Anti-Corruption Measures, CIAA Mechanism & Compliance Safeguards'] },
      { day: 17, topicId: 'ethics', tasks: ['Foundational Values: Integrity, Impartiality, Empathy, Compassion', 'Write Case Studies on Ethical Dilemmas faced by Utility Managers'] },
      { day: 18, topicId: 'ee-fundamentals', tasks: ['Active, Reactive and Apparent Power Computations & Power Triangle', 'Power Factor: Causes of Low PF, Economic Impact & Correction Methods'] },
      { day: 19, topicId: 'ee-fundamentals', tasks: ['Three-Phase Systems: Balanced vs Unbalanced Star/Delta Networks', 'Voltage/Current Relations, Neutral Current & 2-Wattmeter Method Analysis'] },
      { day: 20, topicId: 'ee-fundamentals', tasks: ['Transient Response of RL, RC and RLC Circuits (DC & AC Excitation)', 'Operational Amplifiers: Inverting, Non-Inverting, Difference & Zero-Crossing'] },
      { day: 21, topicId: 'ee-fundamentals', tasks: ['Solve 5 Numerical Problems on 3-Phase Power & RLC Transients', 'Phase 1 Milestone Assessment: Governance & Circuit Theory'] },
    ]
  },

  // ==================== PHASE 2: WEEKS 4 - 6 (Controls, Power Electronics, Machines, Plants & Lines) ====================
  {
    week: 4,
    phase: 2,
    phaseName: 'Phase II: Machines, Plants & Grid Hardware',
    title: 'Controls, Power Electronics & FACTS',
    focus: 'Paper II (Sec A: 1.5 - 1.9) - Automatic Control, Inverters, Cycloconverters & FACTS',
    days: [
      { day: 22, topicId: 'control-power-elec', tasks: ['Automatic Feedback Control: Block Diagrams, Transfer Functions & Sensors', 'Time Domain Analysis: Step Response, Damping Ratio, Rise/Settling Time'] },
      { day: 23, topicId: 'control-power-elec', tasks: ['Stability Criteria: Routh-Hurwitz, Nyquist Stability Criterion, Bode Plots', 'Root Locus Technique & Design of PID Controllers for Power Systems'] },
      { day: 24, topicId: 'control-power-elec', tasks: ['Power Semiconductor Devices: Diodes, Power MOSFETs, IGBTs, Thyristors', 'GTOs, TRIACs Characteristics, Safe Operating Area (SOA) & Protection'] },
      { day: 25, topicId: 'control-power-elec', tasks: ['Switched Mode Converters: Rectifiers, Buck/Boost DC-DC Converters', 'Voltage Source Inverters (VSI), Sinusoidal PWM & Dynamic Control'] },
      { day: 26, topicId: 'control-power-elec', tasks: ['AC-AC Converters: 1-Phase & 3-Phase AC Voltage Regulators', '1-Phase and 3-Phase Cycloconverters: Topology & Harmonic Analysis'] },
      { day: 27, topicId: 'control-power-elec', tasks: ['Flexible AC Transmission Systems (FACTS): Principles of Shunt/Series Devices', 'Operational Comparison: STATCOM, SVC, TCSC, SSSC & UPFC for Stability'] },
      { day: 28, topicId: 'control-power-elec', tasks: ['Solve 3 Control Stability & Inverter Modulation Problems', 'Weekly Review of Control Systems & Power Electronics'] },
    ]
  },
  {
    week: 5,
    phase: 2,
    phaseName: 'Phase II: Machines, Plants & Grid Hardware',
    title: 'Electrical Machines & Transformers',
    focus: 'Paper II (Sec A: 2) - Power Transformers, Synchronous, Induction & DC Machines',
    days: [
      { day: 29, topicId: 'ee-machines', tasks: ['Power & Distribution Transformers: Construction, Core/Winding Layouts', 'Losses, Efficiency Optimization, All-day Efficiency & Voltage Regulation'] },
      { day: 30, topicId: 'ee-machines', tasks: ['Transformer 3-Phase Connections (Y-Y, Y-Δ, Δ-Δ, Open-Δ), Grounding Methods', 'Parallel Operation Conditions, Load Sharing, Harmonics & Inrush Currents'] },
      { day: 31, topicId: 'ee-machines', tasks: ['Auto-transformers, Instrument Transformers (CT/PT Accuracy Classes)', 'Dry-Type Transformers at High Voltage: Trends, 3-Core vs 1-Core Units'] },
      { day: 32, topicId: 'ee-machines', tasks: ['Synchronous Machines: Construction, Salient vs Cylindrical Rotor Types', 'Equivalent Circuits, SCR, Voltage Regulation (EMF/MMF/Potier Methods)'] },
      { day: 33, topicId: 'ee-machines', tasks: ['Synchronous Generator Stability, Parallel Operation, Hunting & Dampers', 'Excitation Systems, AVR, Synchronous Condensers & PMSG in Wind/Hydro'] },
      { day: 34, topicId: 'ee-machines', tasks: ['Induction Motors: Equivalent Circuit, Torque-Speed Curve, Starting/Speed Control', 'Induction Generator Controllers (IGC) & DC Machines (Starters, Speed Control)'] },
      { day: 35, topicId: 'ee-machines', tasks: ['Solve 4 Machine Numericals (Transformer Parallel Ops, Sync Reactance)', 'Comprehensive Summary Notes on Electrical Machines'] },
    ]
  },
  {
    week: 6,
    phase: 2,
    phaseName: 'Phase II: Machines, Plants & Grid Hardware',
    title: 'Power Plants & Generation Dynamics',
    focus: 'Paper II (Sec A: 3) + Paper I (Sec B: 7.1-7.4) - Hydro, Diesel, Solar, Wind & Planning',
    days: [
      { day: 36, topicId: 'power-plants', tasks: ['Hydroelectric Power Plants: Merits, Site Selection & Classification (RoR, PRoR, Storage)', 'Components: Intake, Forebay, Headrace Tunnel, Surge Tank, Penstock, Tailrace'] },
      { day: 37, topicId: 'power-plants', tasks: ['Water Turbines: Pelton, Francis, Kaplan & Crossflow Classification', 'Specific Speed, Efficiency Curves, Cavitation Phenomenon & Turbine Selection'] },
      { day: 38, topicId: 'power-plants', tasks: ['Hydro Alternator Characteristics, Unit Sizing, Plant Auxiliaries', 'Turbine Governing Mechanisms: Electro-Hydraulic Governors & Speed Droop'] },
      { day: 39, topicId: 'power-plants', tasks: ['Salient Features of Major Nepalese Hydro Plants (Kulekhani, Upper Tamakoshi, etc.)', 'Diesel Electric Power Plants: Layout, Thermal Efficiency, Merits & Demerits'] },
      { day: 40, topicId: 'power-plants', tasks: ['Renewable Energy: Solar PV, Wind, Micro-Hydro, Geothermal & Grid Interconnection', 'Maximum Power Point Tracking (MPPT): Perturb & Observe, Incremental Conductance'] },
      { day: 41, topicId: 'power-plants', tasks: ['Generation Planning Indices: Plant Capacity Factor, Plant Use Factor', 'Load Factor, Diversity Factor, Loss of Load Probability (LOLP) Interrelationships'] },
      { day: 42, topicId: 'power-plants', tasks: ['Solve 3 Plant Sizing & Hydro-Energy Generation Numericals', 'Phase 2 Milestone Review: Machines & Generation Technology'] },
    ]
  },

  // ==================== PHASE 3: WEEKS 7 - 9 (T&D, System Analysis, High Voltage & Economics) ====================
  {
    week: 7,
    phase: 3,
    phaseName: 'Phase III: Analysis, High Voltage & Economics',
    title: 'Transmission, Distribution & Protection',
    focus: 'Paper II (Sec A: 4) - Line Performance, Substation Schemes, Distribution & Relaying',
    days: [
      { day: 43, topicId: 'trans-dist', tasks: ['Transmission System Planning: Choice of Voltage, Route Survey, Right of Way (RoW)', 'Surge Impedance Loading (SIL), Skin Effect, Proximity Effect, Ferranti Effect'] },
      { day: 44, topicId: 'trans-dist', tasks: ['High-Temperature Low-Sag (HTLS) Conductors & Performance Comparison', 'HVDC Transmission: Topologies, Monopolar/Bipolar, Inverters, AC vs DC Trade-offs'] },
      { day: 45, topicId: 'trans-dist', tasks: ['Principles of Power System Protection, Instrument Transformers & Trip Coils', 'Circuit Breakers (SF6, Vacuum, Air Blast) & Protective Relay Operating Principles'] },
      { day: 46, topicId: 'trans-dist', tasks: ['Generator, Transformer, Busbar & Line Protection Schemes (Differential, Distance)', 'Overcurrent Grading, Distance Relay Zones (Zone 1/2/3) & Auto-Reclose'] },
      { day: 47, topicId: 'trans-dist', tasks: ['Substation Layouts & Busbar Schemes (Single, Double Bus, One-and-a-Half Breaker)', 'Substation Automation Systems (SAS/SCADA) & Gas Insulated Substations (GIS)'] },
      { day: 48, topicId: 'trans-dist', tasks: ['Distribution Layouts (Radial, Ring Main, Loop), Voltage Selection, ABC Cables', 'Load Characteristics: Load Duration Curves, Demand Factor & Area Load Forecasting'] },
      { day: 49, topicId: 'trans-dist', tasks: ['Draw Complete Single Line Diagrams (SLD) & Protection Coordination Matrix', 'Weekly Review of Transmission & Protection Engineering'] },
    ]
  },
  {
    week: 8,
    phase: 3,
    phaseName: 'Phase III: Analysis, High Voltage & Economics',
    title: 'Power System Analysis & High Voltage',
    focus: 'Paper II (Sec A: 5 & Sec B: 6) - Faults, Load Flow, Stability, Corona & Overvoltages',
    days: [
      { day: 50, topicId: 'power-sys-analysis', tasks: ['Symmetrical & Unsymmetrical Faults (LG, LL, LLG, LLL) using Symmetrical Components', 'Z-Bus Building Algorithm & Sequence Network Interconnections for Faults'] },
      { day: 51, topicId: 'power-sys-analysis', tasks: ['Load Flow Algorithms: Gauss-Seidel, Newton-Raphson (N-R), Fast Decoupled, DC Power Flow', 'Economic Load Dispatch with/without Transmission Losses & Penalty Factor'] },
      { day: 52, topicId: 'power-sys-analysis', tasks: ['Power System Stability: Steady-State, Dynamic & Transient Stability Analysis', 'Swing Equation for Multi-Machine Systems, Equal Area Criterion & Critical Clearing Angle'] },
      { day: 53, topicId: 'high-voltage', tasks: ['Corona Phenomenon: Disruptive Critical Voltage, Visual Critical Voltage, Loss Equations', 'Factors Influencing Corona, Radio/Audio Interference & Mitigation Methods'] },
      { day: 54, topicId: 'high-voltage', tasks: ['Overvoltage Transients: Lightning, Switching Surges, Temporary Overvoltages', 'Sub-Synchronous Resonance (SSR), Ferro-Resonance & Surge Arresters (MOV)'] },
      { day: 55, topicId: 'high-voltage', tasks: ['Insulation Coordination: BIL, SIL, Insulator String Design, String Efficiency', 'Dielectric Breakdown Mechanisms (Gas/Liquid/Solid) & High Voltage Testing (IEC/IEEE)'] },
      { day: 56, topicId: 'power-sys-analysis', tasks: ['Solve 3 Fault Analysis & Equal Area Stability Numerical Problems', 'Weekly Review of System Calculations & High Voltage Physics'] },
    ]
  },
  {
    week: 9,
    phase: 3,
    phaseName: 'Phase III: Analysis, High Voltage & Economics',
    title: 'Engineering Economics & Tariffs',
    focus: 'Paper II (Sec B: 7) + Paper I (Sec A: 3.7.3) - Feasibility Appraisal & Utility Billing Models',
    days: [
      { day: 57, topicId: 'eng-economics', tasks: ['Characteristics of Capital Investments, Sources of Funds & Cash Flow Diagrams', 'Time Value of Money: Single Payment, Uniform Series, Gradient Discounting Formulas'] },
      { day: 58, topicId: 'eng-economics', tasks: ['Project Evaluation Criteria: Net Present Value (NPV), Internal Rate of Return (IRR)', 'Benefit-Cost Ratio (BCR), Simple/Discounted Payback Period, MARR Selection'] },
      { day: 59, topicId: 'eng-economics', tasks: ['Incremental Investment Analysis for Mutually Exclusive Hydropower Alternatives', 'Sensitivity Analysis, Break-Even Analysis & Risk Analysis under Inflation'] },
      { day: 60, topicId: 'eng-economics', tasks: ['Capital Rationing under Budget Constraints & Multi-Project Prioritization', 'Hydropower Investment Models: Public-Private Partnerships (PPP), BOOT, EPC-F'] },
      { day: 61, topicId: 'eng-economics', tasks: ['Utility Power Billing & Tariff Structures: Fixed Charges, Demand Charges, Energy Charges', 'Time-of-Day (ToD) Tariffs, Availability Based Tariff (ABT), Low Power Factor Surcharges'] },
      { day: 62, topicId: 'eng-economics', tasks: ['Review Current NEA Tariff Schedules for Domestic, Industrial & Commercial Consumers', 'Regulatory Roles of Electricity Regulatory Commission (ERC) in Tariff Fixation'] },
      { day: 63, topicId: 'eng-economics', tasks: ['Solve 4 Full Financial Appraisal Problems (IRR, NPV, BCR, Tariff Computation)', 'Phase 3 Milestone Assessment: High Voltage & Financial Economics'] },
    ]
  },

  // ==================== PHASE 4: WEEKS 10 - 12 (Reliability, Law, Markets, Treaties & Full Mocks) ====================
  {
    week: 10,
    phase: 4,
    phaseName: 'Phase IV: Reliability, Legal & Final Simulation',
    title: 'Reliability, Risk & Contracts',
    focus: 'Paper II (Sec B: 8 & 9) - System Reliability Indices, FIDIC Contracts & Procurement SBDs',
    days: [
      { day: 64, topicId: 'reliability', tasks: ['Power System Reliability Concepts: Engineering & Economic Trade-Offs', 'Probability Distributions, Binomial Distribution & Markov State-Space Transition Models'] },
      { day: 65, topicId: 'reliability', tasks: ['Hierarchical Levels (HL-I, HL-II, HL-III) & Generation Reliability: LOLP, LOLE, EENS, ECOST', 'Tie-Line Impact on Interconnected Reliability & Composite System Reliability'] },
      { day: 66, topicId: 'reliability', tasks: ['Distribution System Reliability Indices: SAIFI, SAIDI, CAIDI, ASAI Computation', 'Effect of Sectionalizing Switches, Auto-Reclosers & Transformer Redundancy'] },
      { day: 67, topicId: 'contract-mgmt', tasks: ['Contract Document Preparation, Technical Specifications & Conditions of Contract', 'FIDIC Contract Suites: Red Book (Construction), Yellow (Plant/DB), Silver (EPC/Turnkey)'] },
      { day: 68, topicId: 'contract-mgmt', tasks: ['Standard Bidding Documents (SBD) for ICB and NCB in NEA Hydropower/Substation Projects', 'Public Procurement Monitoring Office (PPMO), World Bank & ADB Procurement Standards'] },
      { day: 69, topicId: 'contract-mgmt', tasks: ['Contractual Dispute Resolution: Engineer Determination, Dispute Boards (DAB), Arbitration', 'PPA (Power Purchase Agreement) & PDA Key Clauses: Liquidated Damages, Force Majeure'] },
      { day: 70, topicId: 'reliability', tasks: ['Solve 3 Reliability Index Numericals (SAIFI/SAIDI & Markov Two-State Units)', 'Weekly Review of Reliability & Contract Management'] },
    ]
  },
  {
    week: 11,
    phase: 4,
    phaseName: 'Phase IV: Reliability, Legal & Final Simulation',
    title: 'Constitution, Acts & Environment Laws',
    focus: 'Paper I (Sec B: 6) + Paper II (Sec B: 11 & 12) - Nepali Legal Mandates & Treaties',
    days: [
      { day: 71, topicId: 'const-act', tasks: ['Constitution of Nepal 2072: Fundamental Rights, Directive Principles, Natural Resource Rights', 'Nepal Electricity Authority Act, 2041: Powers, Duties, Corporate Board & Finances'] },
      { day: 72, topicId: 'elec-act', tasks: ['Electricity Act, 2049 & Electricity Regulation, 2050: Licensing, Surveys, Tariffs, Royalty', 'Electricity Regulatory Commission Act, 2074: Objectives, Powers, Dispute Settlement'] },
      { day: 73, topicId: 'const-act', tasks: ['NEA Employee Service Bylaws 2075: Code of Conduct, Appointments, Leaves, Discipline', 'NEA Financial Administration Bylaws 2074 & Electricity Distribution Bylaws 2078'] },
      { day: 74, topicId: 'procurement', tasks: ['Public Procurement Act 2063 & Regulation 2064: Thresholds, Bidding Methods, Evaluation', 'Good Governance Act 2064 & Prevention of Corruption Act 2059: Institutional Mechanisms'] },
      { day: 75, topicId: 'water-env-act', tasks: ['National Water Resources Policy 2075, Hydropower Policy 2058 & Land Acquisition Act 2034', 'Environment Protection Act 2076 & EPR 2077: EIA, IEE, EMP Preparation for Hydro Projects'] },
      { day: 76, topicId: 'treaties-manuals', tasks: ['International Water Treaties: Koshi Agreement, Gandak Agreement, Mahakali Treaty Analysis', 'Safety Guidelines for Generation, Transmission & Distribution; IEC/ISO/IEEE Standards'] },
      { day: 77, topicId: 'const-act', tasks: ['Draft Answers to 4 Frequent 10-Mark Law & Policy Questions in Nepali/English', 'Comprehensive Legal & Regulatory Synthesis'] },
    ]
  },
  {
    week: 12,
    phase: 4,
    phaseName: 'Phase IV: Reliability, Legal & Final Simulation',
    title: 'Power Sector Trends & Full Mocks',
    focus: 'Paper I (Sec B: 7-9) + Paper II (Sec B: 10) + Final 3-Hour Simulation Exams',
    days: [
      { day: 78, topicId: 'power-sector', tasks: ['Energy Supply & Demand Trends in Nepal: Peak Demand, Wet vs Dry Season Imbalance', 'Private Sector Hydropower Development: IPP Contributions, ROR Saturation, Storage Needs'] },
      { day: 79, topicId: 'power-sector', tasks: ['NEA Corporate Structure, Subsidiary Companies, Operational Performance & Restructuring', 'NEA Corporate Development Plan (CDP) & Road to Regional Clean Energy Leadership'] },
      { day: 80, topicId: 'power-trends', tasks: ['Cross-Border Electricity Trade: India (IEX, Bilateral), Bangladesh, BBIN Power Grid', 'Energy Banking, Wheeling Charges, Open Access, Transmission Pricing & Regional Power Pool'] },
      { day: 81, topicId: 'elec-market', tasks: ['Electricity Market Mechanisms: ISO vs DSO, Ancillary Services, Locational Marginal Pricing (LMP)', 'Active/Reactive Power Management & Grid Code Compliance in Complex Networks'] },
      { day: 82, topicId: 'gov-1', tasks: ['FULL-DRESS SIMULATION 1: Paper I (Governance & Management - 100 Marks, 3 Hours)', 'Self-Evaluation against Model Answer Schema & Time Management Review'] },
      { day: 83, topicId: 'ee-machines', tasks: ['FULL-DRESS SIMULATION 2: Paper II (Service Related Knowledge - 100 Marks, 3 Hours)', 'Technical Calculation Verification & Diagrammatic Presentation Audit'] },
      { day: 84, topicId: 'power-sector', tasks: ['Final High-Yield Quick Formula & Legal Section Revision', 'Exam Day Readiness Strategy, Confidence Protocol & Master Schedule Complete'] },
    ]
  },
];

export const actsAndBylaws = [
  { id: 'act-1', title: 'Constitution of Nepal (2072)', role: 'Fundamental Law & Natural Resource Authority', link: '#', section: 'Art. 51, 59, 251' },
  { id: 'act-2', title: 'Nepal Electricity Authority Act, 2041', role: 'NEA Charter, Powers & Governance', link: '#', section: 'Sections 1-28' },
  { id: 'act-3', title: 'Electricity Act, 2049 & Regulation, 2050', role: 'Power Sector Licensing, Rights & Royalties', link: '#', section: 'Sections 3-24' },
  { id: 'act-4', title: 'Electricity Regulatory Commission Act, 2074', role: 'Tariff Setting, Market Regulation & Standards', link: '#', section: 'Sections 13-22' },
  { id: 'act-5', title: 'Public Procurement Act, 2063 & Rules, 2064', role: 'Tendering, ICB/NCB & EPC Contract Rules', link: '#', section: 'Sections 11-58' },
  { id: 'act-6', title: 'NEA Employee Service Bylaws, 2075', role: 'Staff Code of Conduct, Appointments & Discipline', link: '#', section: 'Chapters 1-14' },
  { id: 'act-7', title: 'NEA Financial Administration Bylaws, 2074', role: 'Budgeting, Disbursements, Authority & Audit', link: '#', section: 'Chapters 1-12' },
  { id: 'act-8', title: 'NEA Electricity Distribution Bylaws, 2078', role: 'Consumer Metering, Supply & Billing Rules', link: '#', section: 'Chapters 1-9' },
  { id: 'act-9', title: 'Good Governance Act, 2064 & Rules, 2065', role: 'Administrative Transparency & Citizen Charter', link: '#', section: 'Sections 6-25' },
  { id: 'act-10', title: 'Prevention of Corruption Act, 2059', role: 'Integrity Enforcement & Sanctions', link: '#', section: 'Sections 3-38' },
  { id: 'act-11', title: 'Land Acquisition Act, 2034', role: 'Right-of-Way & Project Land Compensation', link: '#', section: 'Sections 4-37' },
  { id: 'act-12', title: 'Environment Protection Act, 2076 & EPR, 2077', role: 'EIA, IEE, EMP & Environmental Clearances', link: '#', section: 'Sections 3-15' },
  { id: 'act-13', title: 'National Water Resources Policy, 2075', role: 'Basin Planning, Hydro Priorities & Multipurpose', link: '#', section: 'Policy Guidelines' },
  { id: 'act-14', title: 'Hydropower Development Policy, 2058', role: 'Private Investment Incentives & Royalties', link: '#', section: 'Policy Provisions' },
  { id: 'act-15', title: 'FIDIC Conditions of Contract (Red/Yellow/Silver)', role: 'Standard International EPC & Plant Contracts', link: '#', section: 'Clauses 1-20' },
  { id: 'act-16', title: 'Mahakali, Koshi & Gandak Treaties', role: 'Bilateral Water Rights & Power Sharing Protocols', link: '#', section: 'Treaty Articles' },
];
