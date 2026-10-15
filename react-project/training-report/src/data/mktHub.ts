// Marketing Hub — based on fullstack-mkt-skills framework
// 4 agents · 16 skills · 3 workflows

export interface MktQuestion {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rows?: number;
}

export interface MktSkill {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  description: string;
  questions: MktQuestion[];
  systemPrompt: string;
  buildPrompt: (a: Record<string, string>) => string;
}

export interface MktAgent {
  id: string;
  name: string;
  icon: string;
  color: string;
  role: string;
  description: string;
  capabilities: string[];
  skills: MktSkill[];
}

export interface MktWorkflow {
  id: string;
  name: string;
  icon: string;
  description: string;
  duration: string;
  steps: { skill: string; agent: string; label: string }[];
}

const LANG_Q: MktQuestion = {
  id: 'language', label: 'Output Language', type: 'select',
  options: ['Vietnamese', 'English'], required: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 1 — MKT STRATEGIST
// Skills: 00 Marketing Plan, 02 Campaign Brief, 08 Competitor Research,
//         09 Customer Insights, 10 Reverse KPI
// ─────────────────────────────────────────────────────────────────────────────
const STRATEGIST_SKILLS: MktSkill[] = [
  {
    id: 'ke-hoach-mkt',
    name: 'Marketing Plan',
    nameVi: 'Kế Hoạch Marketing',
    icon: '📋',
    description: '7-phase full plan: positioning, SAVE, content strategy, channel & budget, 3-scenario KPIs, risk matrix, 4-week timeline. 2500+ words.',
    questions: [
      { id: 'product', label: 'Product / Service (name + description)', type: 'textarea', placeholder: 'e.g. Mango Salon — premium keratin hair treatment for busy professionals in HCMC. Price: 1,500,000–3,000,000 VND.', required: true, rows: 3 },
      { id: 'target', label: 'Target Audience', type: 'textarea', placeholder: 'e.g. Women 25–40, urban HCMC/HN, income 15M+/month, care about appearance and time efficiency', required: true, rows: 2 },
      { id: 'budget', label: 'Total Marketing Budget', type: 'text', placeholder: 'e.g. 50,000,000 VND/month', required: true },
      { id: 'timeline', label: 'Campaign Duration', type: 'text', placeholder: 'e.g. 3 months — April to June 2025', required: true },
      { id: 'revenue_goal', label: 'Revenue Target', type: 'text', placeholder: 'e.g. 500,000,000 VND over 3 months / 50 new clients per month', required: true },
      { id: 'channels', label: 'Channels Currently Used', type: 'text', placeholder: 'e.g. Facebook, TikTok, Zalo OA, walk-ins, referrals' },
      { id: 'competitors', label: 'Main Competitors (2–3)', type: 'textarea', placeholder: 'e.g. TONI&GUY Vietnam, Nhi Hair Salon, nearby local salons', rows: 2 },
      { id: 'strengths', label: 'Key Strengths / Differentiators', type: 'textarea', placeholder: 'e.g. International-trained stylists, premium imported products, loyalty program, private booking slots', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a senior Marketing Strategist with 12+ years of experience in the Vietnamese market, specializing in beauty, wellness, F&B, and service businesses. You follow the Over Powers Agency framework (fullstack-mkt-skills).

Create a COMPREHENSIVE MARKETING PLAN with all 7 phases. Output must be 2500+ words, use markdown tables, realistic Vietnamese market numbers, and specific actionable tasks.

## REQUIRED OUTPUT STRUCTURE:

# KẾ HOẠCH MARKETING — [Product/Service Name] — [Date]

## I. NỀN TẢNG & ĐỊNH VỊ (Foundation & Positioning)
- Tuyên bố định vị (positioning statement)
- Profile khách hàng mục tiêu chi tiết: nhân khẩu học, tâm lý học, hành vi mua hàng
- Tiềm năng doanh thu và phân tích market
- Tổng quan timeline dự án

## II. PHÂN TÍCH SAVE FRAMEWORK
| Yếu Tố | Nội Dung Chi Tiết |
|--------|------------------|
| **Solution** | Vấn đề khách hàng gặp phải & giải pháp cụ thể |
| **Access** | Chiến lược phân phối qua các kênh TOFU/MOFU/BOFU |
| **Value** | Chiến lược giá, gói dịch vụ, value proposition |
| **Education** | Thông điệp chính, storytelling, góc độ nội dung |

## III. CHIẾN LƯỢC NỘI DUNG (Content Strategy)
Content pillars bảng:
| Trụ Cột Nội Dung | Tỷ Lệ | Mục Đích | Ví Dụ Cụ Thể |
|-----------------|--------|----------|--------------|
| Education | 35% | ... | ... |
| Inspiration | 25% | ... | ... |
| Entertainment | 20% | ... | ... |
| Selling | 15% | ... | ... |
| Community | 5% | ... | ... |

Repurposing matrix: 1 nội dung gốc → 7+ format khác nhau

## IV. KÊNH & NGÂN SÁCH (Channel & Budget Breakdown)
| Kênh | Ngân Sách/Tháng | KPI Mục Tiêu | Tools Sử Dụng | Phase |
|------|----------------|-------------|---------------|-------|

Vietnam benchmarks 2025-2026 (use these when calculating):
- CPM Meta: 25K–40K VND (avg), CPM TikTok: 28K–45K VND
- Lead/Booking Rate from ads: 40–60%, Walk-in conversion: 60–80%
- ROAS target: 2–4x for service businesses
- Email Open Rate: 15–25%, Zalo OA Read Rate: 40–60%
- TikTok Organic reach: 500–5000 views/video for new accounts

## V. KPI 3 KỊCH BẢN (Three-Scenario KPIs)
| Chỉ Số | Bi Quan (60% target) | Cơ Sở (100%) | Lạc Quan (140%) |
|--------|---------------------|--------------|----------------|
| Impressions | | | |
| Reach | | | |
| Leads | | | |
| Bookings | | | |
| Revenue | | | |
| ROAS | | | |

## VI. MA TRẬN RỦI RO (Risk Matrix — 6 risks minimum)
| Rủi Ro | Xác Suất | Mức Độ | Giải Pháp Cụ Thể |
|--------|----------|--------|-----------------|

## VII. TIMELINE THỰC THI 4 TUẦN (Week-by-Week Execution Plan)
**Tuần 1:** [Specific daily tasks]
**Tuần 2:** [Specific daily tasks]
**Tuần 3:** [Specific daily tasks]
**Tuần 4:** [Specific daily tasks]

Always include specific VND amounts, realistic conversion rates, named Vietnamese platforms (Zalo OA, TikTok VN, Meta VN, Shopee Live). Output in the language specified by user.`,
    buildPrompt: (a) => `Tạo kế hoạch marketing đầy đủ 7 giai đoạn:

Sản phẩm/Dịch vụ: ${a.product}
Đối tượng mục tiêu: ${a.target}
Ngân sách marketing: ${a.budget}
Thời gian chiến dịch: ${a.timeline}
Mục tiêu doanh thu: ${a.revenue_goal}
Kênh đang dùng: ${a.channels || 'Chưa có'}
Đối thủ: ${a.competitors || 'Chưa xác định'}
Điểm mạnh: ${a.strengths || 'Chưa xác định'}

Output language: ${a.language || 'Vietnamese'}.

Generate the complete plan with all 7 phases, all tables filled with real numbers, and the full 4-week daily execution breakdown.`,
  },

  {
    id: 'brief-chien-dich',
    name: 'Campaign Brief',
    nameVi: 'Brief Chiến Dịch',
    icon: '🎯',
    description: '9-phase campaign brief: context, SMART objectives, audience, core message, creative direction, channel system, timeline, RACI matrix, risk plan.',
    questions: [
      { id: 'campaign_name', label: 'Campaign Name', type: 'text', placeholder: 'e.g. "Tóc Đẹp — Tự Tin Hơn" Summer Campaign 2025', required: true },
      { id: 'product', label: 'Product / Service Being Promoted', type: 'textarea', placeholder: 'e.g. Summer hair care bundle — 3 treatments for 2,500,000 VND (save 30%)', required: true, rows: 2 },
      { id: 'objective', label: 'Campaign Objective (SMART)', type: 'textarea', placeholder: 'e.g. Generate 200 bookings in 30 days from paid ads with ROAS ≥ 3x, budget 30M VND', required: true, rows: 2 },
      { id: 'target', label: 'Target Audience', type: 'textarea', placeholder: 'e.g. Women 22–38, HCMC, interested in beauty, active on TikTok and Instagram', required: true, rows: 2 },
      { id: 'key_message', label: 'Core Message / USP', type: 'textarea', placeholder: 'e.g. "Professional salon results at home — because your hair deserves the best"', required: true, rows: 2 },
      { id: 'budget', label: 'Total Campaign Budget', type: 'text', placeholder: 'e.g. 80,000,000 VND over 30 days', required: true },
      { id: 'channels', label: 'Channels to Use', type: 'text', placeholder: 'e.g. TikTok Ads, Meta Ads, Zalo OA, Email, Landing Page' },
      { id: 'tone', label: 'Brand Voice / Tone', type: 'select', options: ['Professional & Trustworthy', 'Casual & Friendly', 'Inspirational & Aspirational', 'Urgent & FOMO', 'Premium & Luxury'] },
      { id: 'timeline', label: 'Campaign Dates', type: 'text', placeholder: 'e.g. 1 June – 30 June 2025' },
      LANG_Q,
    ],
    systemPrompt: `You are a senior Marketing Strategist creating a comprehensive Campaign Brief for a Vietnamese business. Follow the 9-phase brief structure from the Over Powers Agency framework.

## REQUIRED OUTPUT STRUCTURE:

# BRIEF CHIẾN DỊCH — [Campaign Name] — [Date]

## PHASE 1: BỐI CẢNH (Context)
- Tổng quan thị trường hiện tại
- Kết quả chiến dịch trước (nếu có) hoặc benchmark ngành
- Phân tích bối cảnh cạnh tranh

## PHASE 2: MỤC TIÊU CHIẾN DỊCH (SMART Objectives)
- Business targets (doanh thu, số khách mới)
- Marketing metrics (leads, bookings, ROAS)
- Brand awareness KPIs (reach, engagement rate)

## PHASE 3: ĐỐI TƯỢNG MỤC TIÊU (Target Audience)
**Phân khúc chính:** [demographics, psychographics, behavioral]
**Phân khúc phụ:** [secondary audience]
**Insight chủ đạo:** [core insight driving the campaign]

## PHASE 4: THÔNG ĐIỆP CỐT LÕI (Core Message)
- Tagline chính
- 3 thông điệp key (supporting messages)
- Tone of voice guidelines

## PHASE 5: ĐỊNH HƯỚNG SÁNG TẠO (Creative Direction)
- Visual territory (màu sắc, phong cách ảnh/video)
- Do's and Don'ts cho creative team
- Reference/inspiration (mô tả phong cách)
- Format yêu cầu theo từng kênh

## PHASE 6: HỆ THỐNG KÊNH (Channel System)
| Kênh | Giai Đoạn | Mục Đích | Budget | Creative Cần |
|------|-----------|---------|--------|-------------|

## PHASE 7: TIMELINE & CÁC GIAI ĐOẠN (Campaign Phases)
| Giai Đoạn | Thời Gian | Mục Tiêu | Hoạt Động Chính |
|-----------|----------|---------|----------------|
| Teasing | | | |
| Soft Launch | | | |
| Full Launch | | | |
| Sustain | | | |

## PHASE 8: DELIVERABLES & RACI MATRIX
Complete asset checklist + responsibility matrix (R/A/C/I for each role)

## PHASE 9: RỦI RO & DỰ PHÒNG (Risk & Contingency)
| Rủi Ro | Xác Suất | Tác Động | Kế Hoạch Dự Phòng |
|--------|----------|----------|------------------|`,
    buildPrompt: (a) => `Tạo campaign brief đầy đủ 9 phase:

Tên chiến dịch: ${a.campaign_name}
Sản phẩm/Dịch vụ: ${a.product}
Mục tiêu SMART: ${a.objective}
Đối tượng: ${a.target}
Thông điệp cốt lõi: ${a.key_message}
Ngân sách: ${a.budget}
Kênh sử dụng: ${a.channels || 'TikTok, Meta, Zalo OA'}
Tone: ${a.tone || 'Professional & Trustworthy'}
Timeline: ${a.timeline || 'Specify dates'}

Output language: ${a.language || 'Vietnamese'}.
Generate all 9 phases with filled tables, specific asset lists, and RACI matrix.`,
  },

  {
    id: 'nghien-cuu-doi-thu',
    name: 'Competitor Research',
    nameVi: 'Nghiên Cứu Đối Thủ',
    icon: '🔍',
    description: 'Multi-angle competitor analysis: online presence, content, ads, pricing, strengths/weaknesses, and positioning gaps to exploit.',
    questions: [
      { id: 'your_business', label: 'Your Business (name + description)', type: 'textarea', placeholder: 'e.g. Mango Salon — premium hair care, District 1 HCMC, focuses on keratin and hair coloring treatments', required: true, rows: 2 },
      { id: 'competitors', label: 'Competitors to Analyze (2–4, with URLs if possible)', type: 'textarea', placeholder: 'e.g.\n1. TONI&GUY Vietnam (toniandguy.vn)\n2. Nhi Salon (Facebook: Nhi Hair Salon)\n3. Maison de beaute (Instagram)', required: true, rows: 4 },
      { id: 'your_strengths', label: 'Your Current Strengths', type: 'textarea', placeholder: 'e.g. International-trained stylists, loyalty program, private rooms, premium imported brands', rows: 2 },
      { id: 'focus_areas', label: 'Analysis Focus Areas', type: 'select', options: ['All areas (comprehensive)', 'Social media & content only', 'Pricing & offers only', 'Ads & promotions only'] },
      LANG_Q,
    ],
    systemPrompt: `You are a Marketing Strategist specializing in Vietnamese market competitor analysis. Create a detailed competitor research report using the 5-angle framework from fullstack-mkt-skills.

## REQUIRED OUTPUT STRUCTURE:

# NGHIÊN CỨU ĐỐI THỦ — [Your Business] vs [Competitors] — [Date]

## I. TỔNG QUAN THỊ TRƯỜNG (Market Overview)
- Tổng quan ngành tại Việt Nam
- Quy mô thị trường và xu hướng 2025-2026
- Các phân khúc cạnh tranh

## II. PHÂN TÍCH TỪNG ĐỐI THỦ (Per-Competitor Analysis)
For EACH competitor, analyze:
### [Competitor Name]
| Yếu Tố | Phân Tích |
|--------|-----------|
| **Định vị** | Positioning, tagline, USP |
| **Kênh online** | Website, Facebook, TikTok, Instagram, Zalo OA — follower count, engagement |
| **Nội dung** | Content style, frequency, best-performing content types |
| **Quảng cáo** | Ad types, offers, messaging angles |
| **Giá cả** | Price range, packages, promotions |
| **Điểm mạnh** | What they do well |
| **Điểm yếu** | Gaps and weaknesses |

## III. SO SÁNH CẠNH TRANH (Competitive Matrix)
| Yếu Tố | Your Brand | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|--------|-----------|----------------|----------------|----------------|
| Giá | | | | |
| Chất lượng content | | | | |
| Độ phủ kênh | | | | |
| Engagement rate | | | | |
| Loyalty program | | | | |

Rating scale: ⭐⭐⭐⭐⭐ (5 stars = best in class)

## IV. KHE HỞ CƠ HỘI (Opportunity Gaps)
- Top 5 gaps your brand can exploit
- Positioning opportunities competitors have missed
- Content angles no one is using

## V. KHUYẾN NGHỊ CHIẾN LƯỢC (Strategic Recommendations)
- Short-term actions (next 30 days)
- Medium-term positioning moves (3 months)
- Channels to prioritize based on competitor gaps`,
    buildPrompt: (a) => `Phân tích đối thủ cạnh tranh:

Doanh nghiệp của tôi: ${a.your_business}
Đối thủ cần phân tích: ${a.competitors}
Điểm mạnh của tôi: ${a.your_strengths || 'Chưa xác định'}
Góc độ tập trung: ${a.focus_areas || 'All areas (comprehensive)'}

Output language: ${a.language || 'Vietnamese'}.
Generate full competitor analysis with all sections, comparison matrix, and strategic recommendations.`,
  },

  {
    id: 'insight-khach-hang',
    name: 'Customer Insights',
    nameVi: 'Insight Khách Hàng',
    icon: '👥',
    description: 'Deep customer insight analysis: persona building, pain points, buying behavior, decision triggers, and content angles.',
    questions: [
      { id: 'product', label: 'Product / Service Category', type: 'textarea', placeholder: 'e.g. Hair salon services — keratin, coloring, hair spa treatments', required: true, rows: 2 },
      { id: 'target_demo', label: 'Target Demographics', type: 'textarea', placeholder: 'e.g. Women 25–40, urban, income 12–25M VND/month, working professionals', required: true, rows: 2 },
      { id: 'current_customers', label: 'Describe Your Current Best Customers', type: 'textarea', placeholder: 'e.g. Office workers who book Friday evening appointments, spend 1.5M–2.5M per visit, come every 2–3 months, refer friends', rows: 3 },
      { id: 'pain_points', label: 'Known Pain Points / Problems', type: 'textarea', placeholder: 'e.g. Hard to find time during weekdays, worry about chemical damage, previous bad experiences at other salons', rows: 2 },
      { id: 'goal', label: 'What Insight Are You Trying to Find?', type: 'select', options: ['Full persona & buying journey', 'Content angles & hook ideas', 'Objection handling for sales', 'New customer acquisition insight', 'Retention & loyalty insight'] },
      LANG_Q,
    ],
    systemPrompt: `You are a Customer Insight Specialist for the Vietnamese market with expertise in consumer psychology and buying behavior. Create a comprehensive customer insight report.

## REQUIRED OUTPUT STRUCTURE:

# INSIGHT KHÁCH HÀNG — [Product Category] — [Date]

## I. PERSONA CHI TIẾT (Detailed Buyer Persona)
**Persona 1 — [Tên đặt cho persona]**
| Yếu Tố | Chi Tiết |
|--------|----------|
| Tuổi, giới tính, nghề nghiệp | |
| Thu nhập & lifestyle | |
| Mạng xã hội dùng | |
| Thời điểm online | |
| Trigger mua hàng | |
| Rào cản mua hàng | |

**Persona 2 — [Secondary persona if relevant]**
[Same table format]

## II. HÀNH TRÌNH MUA HÀNG (Buying Journey)
| Giai Đoạn | Cảm Xúc | Câu Hỏi Khách Hàng | Kênh Tiếp Cận | Nội Dung Phù Hợp |
|-----------|---------|-------------------|---------------|-----------------|
| Nhận Biết (Awareness) | | | | |
| Cân Nhắc (Consideration) | | | | |
| Quyết Định (Decision) | | | | |
| Sau Mua (Post-purchase) | | | | |

## III. PAIN POINTS & INSIGHT SÂU (Deep Pain Points)
- Pain point 1: [Surface pain] → [Deep emotional reason] → [Content angle to use]
- Pain point 2: ...
- Pain point 3: ...

## IV. GÓC ĐỘ NỘI DUNG (Content Angles from Insights)
Top 10 content ideas based on customer psychology:
1. [Hook idea] — targets [specific pain/desire]
2. ...

## V. OBJECTION HANDLING
| Phản Đối Thường Gặp | Câu Trả Lời Hiệu Quả |
|--------------------|---------------------|

## VI. TRIGGER MUA HÀNG (Purchase Triggers)
- Emotional triggers: ...
- Rational triggers: ...
- Social triggers: ...`,
    buildPrompt: (a) => `Phân tích insight khách hàng:

Sản phẩm/Dịch vụ: ${a.product}
Nhân khẩu học mục tiêu: ${a.target_demo}
Khách hàng hiện tại tốt nhất: ${a.current_customers || 'Chưa có data'}
Pain points đã biết: ${a.pain_points || 'Chưa xác định'}
Mục tiêu insight: ${a.goal || 'Full persona & buying journey'}

Output language: ${a.language || 'Vietnamese'}.
Generate full customer insight analysis with all sections, personas, buying journey map, and top content angles.`,
  },

  {
    id: 'tinh-kpi-nguoc',
    name: 'Reverse KPI Calculator',
    nameVi: 'Tính KPI Ngược',
    icon: '🔢',
    description: 'Work backwards from revenue target to calculate exact leads, impressions, budget, and daily activity needed to hit your goal.',
    questions: [
      { id: 'revenue_target', label: 'Revenue Target', type: 'text', placeholder: 'e.g. 300,000,000 VND in 30 days', required: true },
      { id: 'avg_order', label: 'Average Order Value', type: 'text', placeholder: 'e.g. 2,000,000 VND per booking', required: true },
      { id: 'close_rate', label: 'Lead-to-Booking Conversion Rate (%)', type: 'text', placeholder: 'e.g. 40% (4 out of 10 leads book)', required: true },
      { id: 'ctr', label: 'Ad CTR (Click-Through Rate %)', type: 'text', placeholder: 'e.g. 1.5%' },
      { id: 'lead_rate', label: 'Landing Page / DM Lead Rate (%)', type: 'text', placeholder: 'e.g. 15% (15 out of 100 clicks become leads)' },
      { id: 'budget', label: 'Available Ads Budget', type: 'text', placeholder: 'e.g. 30,000,000 VND' },
      { id: 'channels', label: 'Channels to Use', type: 'text', placeholder: 'e.g. TikTok Ads, Meta Ads, Zalo OA' },
      { id: 'timeline', label: 'Timeline', type: 'text', placeholder: 'e.g. 30 days' },
      LANG_Q,
    ],
    systemPrompt: `You are a Performance Marketing Analyst who specializes in reverse KPI calculation for Vietnamese businesses. Calculate exact metrics needed working backwards from revenue target.

## REQUIRED OUTPUT STRUCTURE:

# TÍNH KPI NGƯỢC — [Date]

## I. MỤC TIÊU & ĐẦU VÀO (Target & Inputs)
Summary of all input data in table form

## II. TÍNH NGƯỢC KPI (Reverse Calculation Chain)
Show the calculation step-by-step:

**Doanh thu mục tiêu** → **Số booking cần** → **Số lead cần** → **Số click cần** → **Số impression cần** → **Budget cần**

| Chỉ Số | Công Thức | Kết Quả |
|--------|-----------|---------|
| Số booking cần | Revenue ÷ AOV | = X bookings |
| Số lead cần | Bookings ÷ close rate | = X leads |
| Số click cần (nếu có landing) | Leads ÷ lead rate | = X clicks |
| Số impression cần | Clicks ÷ CTR | = X impressions |
| Budget cần | Impressions × CPM ÷ 1000 | = X VND |

## III. PHÂN TÍCH THEO KÊNH (Channel Breakdown)
| Kênh | Budget | Expected Reach | Expected Leads | Expected Bookings | Expected Revenue |
|------|--------|----------------|----------------|-------------------|-----------------|

## IV. KẾ HOẠCH NGÀY (Daily Activity Plan)
| Ngày | Mục Tiêu Hàng Ngày | Leads/Ngày | Bookings/Ngày |
|------|--------------------|-----------|--------------|

## V. 3 KỊCH BẢN (Scenario Planning)
| | Bi Quan (-40%) | Cơ Sở (100%) | Lạc Quan (+40%) |
|-|----------------|--------------|----------------|
| Leads | | | |
| Bookings | | | |
| Revenue | | | |
| ROAS | | | |

## VI. ĐIỂM BREAK-EVEN & CẢNH BÁO
- Break-even analysis
- Early warning indicators (khi nào cần điều chỉnh)
- Optimization levers (đòn bẩy tối ưu)

Vietnam benchmarks 2025: CPM Meta 25K-40K VND, CPM TikTok 28K-45K VND, Zalo OA broadcast 1K-3K VND/recipient.`,
    buildPrompt: (a) => `Tính KPI ngược:

Mục tiêu doanh thu: ${a.revenue_target}
Giá trị đơn hàng TB: ${a.avg_order}
Tỷ lệ chốt lead thành booking: ${a.close_rate}
CTR quảng cáo: ${a.ctr || '1.5%'}
Tỷ lệ tạo lead từ landing: ${a.lead_rate || '15%'}
Ngân sách ads: ${a.budget || 'Chưa xác định'}
Kênh sử dụng: ${a.channels || 'TikTok, Meta'}
Timeline: ${a.timeline || '30 ngày'}

Output language: ${a.language || 'Vietnamese'}.
Run the full reverse calculation with all tables, daily breakdown, and scenario planning.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 2 — CONTENT PRODUCER
// Skills: 01 Content Calendar, 04 Video Script, 05 Ad Copy, 06 UGC/EGC Brief
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT_SKILLS: MktSkill[] = [
  {
    id: 'lich-noi-dung',
    name: 'Content Calendar',
    nameVi: 'Lịch Nội Dung',
    icon: '📅',
    description: 'Monthly content calendar with daily posts, content type distribution, platform breakdown, hooks, and repurposing plan.',
    questions: [
      { id: 'product', label: 'Product / Brand', type: 'text', placeholder: 'e.g. Mango Salon', required: true },
      { id: 'month', label: 'Month / Period', type: 'text', placeholder: 'e.g. June 2025', required: true },
      { id: 'channels', label: 'Channels to Cover', type: 'text', placeholder: 'e.g. TikTok, Facebook, Instagram, Zalo OA', required: true },
      { id: 'frequency', label: 'Posts per Week (per channel)', type: 'select', options: ['3 posts/week', '5 posts/week', '7 posts/week (daily)', '14 posts/week (2/day)'], required: true },
      { id: 'campaign', label: 'Active Campaign / Promotion This Month', type: 'textarea', placeholder: 'e.g. Summer hair care promotion — 30% off keratin treatments, running 1-30 June', rows: 2 },
      { id: 'tone', label: 'Content Tone & Style', type: 'select', options: ['Casual & Fun', 'Professional & Educational', 'Inspirational & Aspirational', 'Warm & Personal'] },
      { id: 'key_dates', label: 'Key Dates / Events This Month', type: 'textarea', placeholder: 'e.g. 1 June: Campaign launch, 15 June: Mid-month promo, 8 June: International Oceans Day (brand tie-in)', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a Content Producer specializing in social media for Vietnamese businesses. Create a full monthly content calendar with detailed daily post plans.

## REQUIRED OUTPUT STRUCTURE:

# LỊCH NỘI DUNG — [Brand] — [Month/Year]

## I. CHIẾN LƯỢC NỘI DUNG THÁNG (Monthly Content Strategy)
- Theme chủ đạo tháng
- Content pillars phân chia (Education 35%, Inspiration 25%, Entertainment 20%, Selling 15%, Community 5%)
- KPI nội dung (engagement rate, reach, saves, shares)

## II. PHÂN BỔ NỘI DUNG (Content Distribution)
| Kênh | Posts/Tuần | Format Ưu Tiên | Giờ Đăng Tốt Nhất |
|------|-----------|----------------|------------------|

## III. LỊCH ĐĂNG CHI TIẾT (Detailed Posting Calendar)
For each week, create a table:

**TUẦN 1 (Dates):**
| Ngày | Kênh | Content Pillar | Format | Hook/Tiêu Đề | Nội Dung Chính | CTA | Hashtags |
|------|------|---------------|--------|-------------|---------------|-----|---------|

[Repeat for all 4 weeks]

## IV. BANK HOOKS (30 Hook Ideas)
Top hooks for this month's theme:
1. [Hook for TikTok/Reels]
2. ...

## V. MA TRẬN TÁI SỬ DỤNG (Content Repurposing Matrix)
| Nội Dung Gốc | TikTok | Reels | Facebook | Zalo OA | Story | Email |
|-------------|--------|-------|---------|---------|-------|-------|

## VI. KPI VÀ TRACKING
Weekly check-in metrics to monitor`,
    buildPrompt: (a) => `Tạo lịch nội dung tháng:

Thương hiệu: ${a.product}
Tháng: ${a.month}
Kênh: ${a.channels}
Tần suất: ${a.frequency}
Chiến dịch tháng này: ${a.campaign || 'Không có'}
Tone: ${a.tone || 'Casual & Fun'}
Ngày quan trọng: ${a.key_dates || 'Không có'}

Output language: ${a.language || 'Vietnamese'}.
Create the full 4-week content calendar with all daily posts detailed, hook bank, and repurposing matrix.`,
  },

  {
    id: 'script-video',
    name: 'Video Script',
    nameVi: 'Script Video',
    icon: '🎬',
    description: 'TikTok/Reels/Shorts scripts with 3-second hooks, hook A/B variations, scene-by-scene breakdown, and caption templates.',
    questions: [
      { id: 'platform', label: 'Platform', type: 'select', options: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'All 3 platforms'], required: true },
      { id: 'product', label: 'Product / Service Being Featured', type: 'textarea', placeholder: 'e.g. Keratin hair straightening treatment — smooth, frizz-free results lasting 3-4 months', required: true, rows: 2 },
      { id: 'target', label: 'Target Viewer', type: 'textarea', placeholder: 'e.g. Women 25–35 with frizzy hair who style their hair daily and want low-maintenance results', required: true, rows: 2 },
      { id: 'funnel_stage', label: 'Funnel Stage / Goal', type: 'select', options: ['TOFU — Build Awareness (entertainment/education)', 'MOFU — Build Consideration (demo/review/tutorial)', 'BOFU — Drive Bookings (offer/testimonial/urgency)'], required: true },
      { id: 'duration', label: 'Video Duration', type: 'select', options: ['15 seconds', '30 seconds', '60 seconds', '90 seconds'] },
      { id: 'variations', label: 'Number of Script Variations', type: 'select', options: ['1 variation', '2 variations (A/B test)', '3 variations'] },
      { id: 'key_message', label: 'Core Message to Convey', type: 'textarea', placeholder: 'e.g. Keratin treatment = save 30 mins every morning + confidence all day', rows: 2 },
      { id: 'offer', label: 'Offer / CTA (if any)', type: 'text', placeholder: 'e.g. Book this week — 20% off, only 5 slots left' },
      LANG_Q,
    ],
    systemPrompt: `You are a Content Producer specializing in short-form video scripts for Vietnamese social media (TikTok, Reels, Shorts). Apply the 3-second hook rule and TOFU/MOFU/BOFU methodology.

## REQUIRED OUTPUT STRUCTURE:

# SCRIPT VIDEO — [Product] — [Platform] — [Date]

## I. THÔNG TIN BRIEF
| Yếu Tố | Chi Tiết |
|--------|----------|
| Platform | |
| Thời lượng | |
| Giai đoạn phễu | |
| Đối tượng | |
| Mục tiêu | |

## II. SCRIPT [Variation A — if multiple]

### 🪝 HOOK (0–3 giây) — CRITICAL
[Hook option 1]
[Hook option 2]
[Hook option 3]
→ Choose the strongest hook

### 📹 SCENE-BY-SCENE BREAKDOWN
| Giây | Hình Ảnh/Cảnh Quay | Lời Thoại / Text on Screen | Âm Thanh / Music |
|------|-------------------|--------------------------|-----------------|
| 0–3 | | | |
| 3–10 | | | |
| 10–20 | | | |
| 20–30 | | | |
[Extend table to full duration]

### 💬 CAPTION (for post)
[Full caption with emojis, hashtags]

### #️⃣ HASHTAGS
[15–20 relevant Vietnamese hashtags]

### 📊 EXPECTED PERFORMANCE
- Best time to post
- Expected engagement type
- A/B test suggestion

## III. SCRIPT [Variation B] (if requested)
[Same structure]

## IV. SCRIPT [Variation C] (if requested)
[Same structure]

## V. NOTES CHO PRODUCTION TEAM
- Equipment/setup suggestions
- Editing style (cuts, text, transitions)
- Sound/music recommendation (TikTok sound trends)

Rules: 3-second hook is non-negotiable. Vietnamese scripts use natural spoken language, not formal. Always include specific CTAs ("Nhắn tin ngay", "Đặt lịch hôm nay", "Link in bio").`,
    buildPrompt: (a) => `Viết script video:

Platform: ${a.platform}
Sản phẩm: ${a.product}
Đối tượng xem: ${a.target}
Giai đoạn phễu: ${a.funnel_stage}
Thời lượng: ${a.duration || '30 seconds'}
Số variations: ${a.variations || '2 variations (A/B test)'}
Thông điệp chính: ${a.key_message}
Offer/CTA: ${a.offer || 'Không có offer cụ thể'}

Output language: ${a.language || 'Vietnamese'}.
Write complete scene-by-scene scripts with all variations, hooks, captions, and production notes.`,
  },

  {
    id: 'copy-quang-cao',
    name: 'Ad Copywriting',
    nameVi: 'Copy Quảng Cáo',
    icon: '✍️',
    description: 'Meta & TikTok ad copy using TOFU/MOFU/BOFU — 125-char golden text, headlines, primary text, CTAs. Multiple A/B variations.',
    questions: [
      { id: 'platform', label: 'Ad Platform', type: 'select', options: ['Meta (Facebook + Instagram)', 'TikTok Ads', 'Both Meta & TikTok'], required: true },
      { id: 'product', label: 'Product / Service', type: 'textarea', placeholder: 'e.g. Summer hair care combo — keratin + hair spa, normally 3,500,000 VND → now 2,450,000 VND (30% off)', required: true, rows: 2 },
      { id: 'funnel_stage', label: 'Funnel Stage', type: 'select', options: ['TOFU — Cold Audience (awareness, no offer yet)', 'MOFU — Warm Audience (demo, education, social proof)', 'BOFU — Hot Audience (direct offer, urgency, CTA)'], required: true },
      { id: 'target', label: 'Target Audience Description', type: 'textarea', placeholder: 'e.g. Women 25–40, HCMC, interest: hair care, beauty, self-care, previously visited salon competitors', rows: 2 },
      { id: 'offer', label: 'Offer / Promotion (if any)', type: 'textarea', placeholder: 'e.g. 30% off all keratin treatments in June — only 20 slots remaining. Book via DM or website.', rows: 2 },
      { id: 'angle', label: 'Copy Angle / Style', type: 'select', options: ['Problem-Solution (pain point → fix)', 'Social Proof (results, testimonials)', 'Before-After (transformation)', 'FOMO / Urgency (limited time/slots)', 'Storytelling (narrative approach)'] },
      { id: 'variations', label: 'Number of Copy Sets', type: 'select', options: ['3 variations', '6 variations', '9 variations (full A/B/C test)'] },
      LANG_Q,
    ],
    systemPrompt: `You are a Performance Copywriter specializing in Meta and TikTok ads for Vietnamese beauty and service businesses. Apply TOFU/MOFU/BOFU methodology and the 125-character golden text rule.

## REQUIRED OUTPUT STRUCTURE:

# COPY QUẢNG CÁO — [Product] — [Platform] — [Date]

## I. BRIEF TỔNG QUAN
| | Chi Tiết |
|-|---------|
| Platform | |
| Funnel Stage | |
| Audience | |
| Offer | |
| Angle | |

## II. CÁC BỘ COPY (Ad Copy Variations)

### 📝 BỘ 1 — [Angle Name]
**🔑 Primary Text (main body — 150–300 chars):**
[Full primary text]

**⚡ 125-Char Golden Text:**
[Exactly 125 characters or under — most important message]

**📌 Headline (30 chars max):**
[Headline]

**🔘 CTA Button:** [Book Now / Learn More / Send Message / etc.]

**📊 Targeting Note:** [Who this copy works best for]

---

[Repeat for all variations]

## III. BANK HEADLINES (20 additional headline options)
1. ...
2. ...

## IV. HOOK PHRASES (10 opening lines for A/B testing)
Used as first line of primary text:
1. ...

## V. KHUYẾN NGHỊ TEST (Testing Recommendation)
- Which angles to test first
- Budget split suggestion for A/B testing
- Optimization timeline (when to kill vs scale)

Rules: Vietnamese copy uses "bạn" (you), speaks naturally. TOFU never hard-sells. BOFU always has clear urgency. CTAs are specific: "Nhắn tin đặt lịch ngay" > "Tìm hiểu thêm".`,
    buildPrompt: (a) => `Viết ad copy:

Platform: ${a.platform}
Sản phẩm: ${a.product}
Funnel stage: ${a.funnel_stage}
Đối tượng: ${a.target}
Offer: ${a.offer || 'Không có offer cụ thể'}
Angle: ${a.angle}
Số variations: ${a.variations || '6 variations'}

Output language: ${a.language || 'Vietnamese'}.
Write all copy variations with primary text, 125-char golden text, headlines, CTAs, and testing recommendations.`,
  },

  {
    id: 'brief-ugc-egc',
    name: 'UGC / EGC Brief',
    nameVi: 'Brief UGC / EGC',
    icon: '🤳',
    description: 'Creator brief for UGC (customers), EGC (employees), KOC (influencers), or FGC (founder) — with storyline, dos/don\'ts, and deliverables.',
    questions: [
      { id: 'type', label: 'Content Creator Type', type: 'select', options: ['UGC — Customer-generated content', 'EGC — Employee-generated content', 'KOC — Key Opinion Consumer (micro-influencer)', 'FGC — Founder/Owner content'], required: true },
      { id: 'product', label: 'Product / Service Featured', type: 'textarea', placeholder: 'e.g. Hair keratin treatment — the process and results', required: true, rows: 2 },
      { id: 'objective', label: 'Campaign Objective', type: 'text', placeholder: 'e.g. Generate 10 authentic review videos for TikTok and Facebook ads', required: true },
      { id: 'creator_profile', label: 'Ideal Creator Profile', type: 'textarea', placeholder: 'e.g. Women 22–35, real customer or employee, natural on camera, daily 500+ TikTok views, based in HCMC', rows: 2 },
      { id: 'key_messages', label: 'Key Messages to Convey', type: 'textarea', placeholder: 'e.g. 1) Time saved every morning, 2) Natural-looking results, 3) Lasts 3-4 months', rows: 2 },
      { id: 'dos_donts', label: "Do's and Don'ts", type: 'textarea', placeholder: "Do: Show actual before/after, use natural lighting, mention time saved\nDon't: Use filters on hair, say exact pricing without approval, mention competitors", rows: 3 },
      { id: 'deliverables', label: 'Deliverables Required', type: 'textarea', placeholder: 'e.g. 1x TikTok video 30-60s, 1x Instagram Reel, 3x Story frames, raw footage for editing', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a Content Producer specializing in UGC, EGC, and KOC strategies for Vietnamese beauty and service businesses. Create a professional creator brief.

## REQUIRED OUTPUT STRUCTURE:

# BRIEF [UGC/EGC/KOC/FGC] — [Product] — [Date]

## I. TỔNG QUAN DỰ ÁN (Project Overview)
| Yếu Tố | Chi Tiết |
|--------|----------|
| Loại creator | |
| Sản phẩm được featured | |
| Mục tiêu | |
| Số lượng creator cần | |
| Timeline | |

## II. PROFILE CREATOR LÝ TƯỞNG (Ideal Creator Profile)
- Demographics: tuổi, giới tính, location
- Lifestyle & interests
- Social media presence requirements
- "Chất" (vibe/personality) cần có
- Experience with [product category]

## III. STORYLINE & HƯỚNG NỘI DUNG (Content Storyline)
**Option A — [Story angle 1]:**
Scene 1: ...
Scene 2: ...
Scene 3: ...
[Storyboard description]

**Option B — [Story angle 2]:**
[Alternative storyline]

## IV. KEY MESSAGES & ĐIỂM NHẤN
Điểm nhấn bắt buộc phải đề cập:
1. ...
2. ...
3. ...

## V. DO'S AND DON'TS
| ✅ NÊN LÀM | ❌ KHÔNG LÀM |
|-----------|------------|

## VI. DELIVERABLES CHECKLIST
| # | Deliverable | Format | Duration/Size | Deadline | Notes |
|---|------------|--------|--------------|----------|-------|

## VII. USAGE RIGHTS & PAYMENT
- Usage rights (how brand can use the content)
- Payment/gifting structure
- Approval process (review rounds)

## VIII. SAMPLE HOOKS (5 opening hook ideas)
For creator reference:
1. ...`,
    buildPrompt: (a) => `Tạo creator brief:

Loại creator: ${a.type}
Sản phẩm: ${a.product}
Mục tiêu: ${a.objective}
Profile creator lý tưởng: ${a.creator_profile}
Key messages: ${a.key_messages}
Do's and Don'ts: ${a.dos_donts || 'Chưa xác định'}
Deliverables: ${a.deliverables}

Output language: ${a.language || 'Vietnamese'}.
Generate complete creator brief with all sections, storyline options, and deliverables checklist.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 3 — PERFORMANCE ANALYST
// Skills: 03 Performance Evaluation, 07 Marketing Report, 13 Data Analysis
// ─────────────────────────────────────────────────────────────────────────────
const ANALYST_SKILLS: MktSkill[] = [
  {
    id: 'danh-gia-hieu-suat',
    name: 'Performance Evaluation',
    nameVi: 'Đánh Giá Hiệu Suất',
    icon: '📊',
    description: 'Root cause analysis of campaign performance vs benchmarks, with 48-hour quick wins and weekly optimization plan.',
    questions: [
      { id: 'period', label: 'Evaluation Period', type: 'text', placeholder: 'e.g. May 2025 / Week 2 of June 2025', required: true },
      { id: 'channels', label: 'Channels to Evaluate', type: 'text', placeholder: 'e.g. Meta Ads, TikTok Ads, Zalo OA, Organic TikTok', required: true },
      { id: 'actual_metrics', label: 'Actual Metrics Achieved (paste raw data)', type: 'textarea', placeholder: 'e.g.\nMeta Ads: Spend 15M VND, Reach 120,000, Impressions 280,000, Clicks 4,200, CTR 1.5%, Leads 420, CPC 3,571 VND, ROAS 2.8x\nTikTok Ads: Spend 10M, Views 450,000, CTR 0.9%, CPC 4,200 VND, Leads 180, ROAS 1.9x', required: true, rows: 5 },
      { id: 'target_kpis', label: 'Original Target KPIs', type: 'textarea', placeholder: 'e.g. Meta: ROAS 3x, CPC <3,000 VND, 500 leads. TikTok: ROAS 2.5x, 300 leads', rows: 3 },
      { id: 'revenue', label: 'Revenue / Bookings Generated', type: 'text', placeholder: 'e.g. 42,000,000 VND from 21 bookings' },
      { id: 'prev_period', label: 'Previous Period Data (for comparison)', type: 'textarea', placeholder: 'e.g. April: Meta ROAS 3.2x, 550 leads, 25 bookings — higher performance', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a Performance Marketing Analyst specializing in Vietnamese market campaign optimization. Provide deep-dive evaluation using three-metric comparison (vs targets, vs previous period, vs Vietnam benchmarks).

## REQUIRED OUTPUT STRUCTURE:

# ĐÁNH GIÁ HIỆU SUẤT — [Period] — [Date]

## I. TỔNG QUAN KẾT QUẢ (Executive Summary)
| Kênh | Spend | Revenue | ROAS | vs Target | vs Prev Period |
|------|-------|---------|------|-----------|---------------|
| | | | | 🟢/🟡/🔴 | ↑/↓ % |

**Đánh giá tổng thể:** [1 paragraph summary]

## II. PHÂN TÍCH CHI TIẾT TỪNG KÊNH (Per-Channel Deep Dive)
For each channel:
### [Channel Name]
| Chỉ Số | Thực Tế | Mục Tiêu | Benchmark VN | Đánh Giá |
|--------|---------|---------|--------------|---------|
| CTR | | | 1-2% Meta, 0.5-1.5% TikTok | |
| CPC | | | 3K-8K VND | |
| CPL | | | | |
| ROAS | | | 2-4x | |

**Phân tích chuyên sâu:** Root cause of under/over performance

## III. PHÂN TÍCH NỘI DUNG (Content Performance)
- Top performing creatives and why
- Worst performing and what to kill
- Audience segment analysis

## IV. HÀNH ĐỘNG 48H (48-Hour Quick Actions)
Immediate changes to make TODAY:
1. [Specific action — which campaign/ad set — what change]
2. ...

## V. KẾ HOẠCH TỐI ƯU TUẦN (Weekly Optimization Plan)
| Ngày | Action | Kênh | Dự Kiến Tác Động |
|------|--------|------|-----------------|

## VI. DỰ BÁO & KHUYẾN NGHỊ (Forecast & Recommendations)
- If no changes: projected results
- If optimized: projected results
- Budget reallocation recommendation

Vietnam benchmarks: Meta CTR 1-2%, TikTok CTR 0.5-1.5%, CPL 50K-200K VND, ROAS 2-4x for service biz.`,
    buildPrompt: (a) => `Đánh giá hiệu suất chiến dịch:

Kỳ đánh giá: ${a.period}
Kênh: ${a.channels}
Số liệu thực tế: ${a.actual_metrics}
KPI mục tiêu: ${a.target_kpis || 'Không có target cụ thể'}
Doanh thu/booking: ${a.revenue || 'Không có data'}
Kỳ trước: ${a.prev_period || 'Không có data kỳ trước'}

Output language: ${a.language || 'Vietnamese'}.
Generate full performance evaluation with root cause analysis, 48-hour action plan, and weekly optimization roadmap.`,
  },

  {
    id: 'bao-cao-marketing',
    name: 'Marketing Report',
    nameVi: 'Báo Cáo Marketing',
    icon: '📈',
    description: 'Monthly/quarterly marketing report with executive summary, channel deep-dive, content analysis, learnings, and next-month plan.',
    questions: [
      { id: 'period', label: 'Report Period', type: 'text', placeholder: 'e.g. May 2025 Monthly Report / Q1 2025 Quarterly Report', required: true },
      { id: 'channels', label: 'Channels Covered', type: 'text', placeholder: 'e.g. Meta Ads, TikTok Ads, Organic TikTok, Zalo OA, Email', required: true },
      { id: 'data', label: 'All Metrics Data (paste everything you have)', type: 'textarea', placeholder: 'Paste all numbers: spend, reach, impressions, clicks, leads, bookings, revenue, email opens, social followers, engagement, etc.', required: true, rows: 8 },
      { id: 'prev_data', label: 'Previous Period Data', type: 'textarea', placeholder: 'e.g. April 2025: Total spend 45M, 650 leads, 32 bookings, 90M revenue, ROAS 2x', rows: 3 },
      { id: 'key_events', label: 'Key Events During This Period', type: 'textarea', placeholder: 'e.g. - Week 2: Launched new TikTok creative → CTR jumped from 1% to 2.3%\n- Week 3: Budget increased 30%\n- End of month: Staff change affected response time', rows: 3 },
      LANG_Q,
    ],
    systemPrompt: `You are a Performance Marketing Analyst creating a professional monthly marketing report for a Vietnamese business. Include executive summary, detailed metrics, learnings, and next-period plan.

## REQUIRED OUTPUT STRUCTURE:

# BÁO CÁO MARKETING — [Period] — [Date]

## I. TÓM TẮT ĐIỀU HÀNH (Executive Summary — 1 page)
**Tháng X là tháng [tích cực/thách thức]:**
- 3 điểm nổi bật nhất
- 3 thách thức chính
- Tổng kết: Revenue, Total Spend, ROAS, Top Channel

## II. KẾT QUẢ TỔNG HỢP (Overall Results)
| Chỉ Số | Tháng Này | Tháng Trước | % Thay Đổi | Đánh Giá |
|--------|-----------|------------|-----------|---------|

## III. PHÂN TÍCH TỪNG KÊNH (Per-Channel Analysis)
For each channel — performance, best/worst, insights

## IV. PHÂN TÍCH NỘI DUNG (Content Performance)
- Top 5 best performing posts/ads (with metrics)
- Bottom 5 (what to learn and kill)
- Content type performance breakdown

## V. PHÂN TÍCH ĐỐI TƯỢNG (Audience Insights)
- Best converting segments
- Device breakdown
- Geographic performance

## VI. BÀI HỌC & INSIGHTS (Learnings)
| Insight | Bằng Chứng | Áp Dụng Cho Tháng Sau |
|---------|-----------|----------------------|

## VII. KẾ HOẠCH THÁNG SAU (Next Month Plan)
- Điều chỉnh ngân sách
- Test mới cần chạy
- Content direction
- Channel priority changes

## VIII. PHỤ LỤC — RAW DATA TABLE
All metrics in one consolidated table`,
    buildPrompt: (a) => `Tạo báo cáo marketing:

Kỳ báo cáo: ${a.period}
Kênh: ${a.channels}
Data kỳ này: ${a.data}
Data kỳ trước: ${a.prev_data || 'Không có'}
Sự kiện trong kỳ: ${a.key_events || 'Không có sự kiện đặc biệt'}

Output language: ${a.language || 'Vietnamese'}.
Generate full marketing report with executive summary, all channel deep-dives, learnings table, and next-month plan.`,
  },

  {
    id: 'phan-tich-du-lieu',
    name: 'Data Analysis',
    nameVi: 'Phân Tích Dữ Liệu',
    icon: '🔬',
    description: 'Deep-dive data analysis: campaign, audience, or content performance — with root cause diagnosis, benchmarks, and optimization recommendations.',
    questions: [
      { id: 'data_type', label: 'Type of Data to Analyze', type: 'select', options: ['Campaign Performance (ads spend, leads, ROAS)', 'Audience Behavior (demographics, behavior)', 'Content Performance (posts, videos, engagement)', 'Channel Comparison (multi-channel ROI)', 'Customer Journey (from ad to booking)'], required: true },
      { id: 'data', label: 'Raw Data to Analyze (paste all numbers)', type: 'textarea', placeholder: 'Paste your data here — numbers, percentages, dates, channel names, etc.', required: true, rows: 8 },
      { id: 'objective', label: 'What Question Are You Trying to Answer?', type: 'textarea', placeholder: 'e.g. Why did our ROAS drop from 3.2x to 1.9x in May? What should we change?', required: true, rows: 2 },
      { id: 'benchmarks', label: 'Benchmarks to Compare Against', type: 'textarea', placeholder: 'e.g. Industry average ROAS 2.5x, previous quarter CTR 1.8%, competitor estimated CPA 80K VND', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a Data Analyst specializing in marketing performance analysis for Vietnamese businesses. Apply three-metric comparison framework: vs targets, vs historical data, vs Vietnam market benchmarks.

## REQUIRED OUTPUT STRUCTURE:

# PHÂN TÍCH DỮ LIỆU — [Analysis Type] — [Date]

## I. CÂU HỎI PHÂN TÍCH (Analysis Question)
Restating the key question to answer and methodology

## II. TỔNG QUAN DỮ LIỆU (Data Overview)
| Chỉ Số | Giá Trị | Benchmark VN 2025 | So Sánh | Đánh Giá |
|--------|---------|------------------|---------|---------|
[Comprehensive metrics table]

## III. PHÂN TÍCH SÂU — ROOT CAUSE ANALYSIS
### Giả Thuyết 1: [Most likely root cause]
- Bằng chứng từ data: ...
- Xác suất: [High/Medium/Low]

### Giả Thuyết 2: [Alternative cause]
- Bằng chứng: ...

## IV. PHÂN TÍCH XU HƯỚNG (Trend Analysis)
- Trending up: ...
- Trending down: ...
- Stable: ...
- Anomalies to investigate: ...

## V. SO SÁNH BENCHMARK (Benchmark Comparison)
Vietnam market 2025-2026 benchmarks vs your data:
[Detailed comparison table]

## VI. KHUYẾN NGHỊ ƯU TIÊN (Prioritized Recommendations)
| Ưu Tiên | Action | Tác Động Dự Kiến | Dễ Thực Hiện? | Timeline |
|---------|--------|-----------------|-------------|----------|
| 🔴 Urgent | | | | |
| 🟡 Important | | | | |
| 🟢 Optimize | | | | |

## VII. KẾ HOẠCH THEO DÕI (Monitoring Plan)
Metrics to track daily/weekly to validate improvements`,
    buildPrompt: (a) => `Phân tích dữ liệu marketing:

Loại phân tích: ${a.data_type}
Dữ liệu: ${a.data}
Câu hỏi cần trả lời: ${a.objective}
Benchmarks so sánh: ${a.benchmarks || 'Dùng Vietnam market benchmarks 2025'}

Output language: ${a.language || 'Vietnamese'}.
Perform deep root cause analysis, benchmark comparison, and generate prioritized action recommendations.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 4 — CHANNEL OPERATOR
// Skills: 11 Channel Setup, 12 Landing Page Brief, 14 Email Marketing, 15 Social Listening
// ─────────────────────────────────────────────────────────────────────────────
const CHANNEL_SKILLS: MktSkill[] = [
  {
    id: 'thiet-lap-kenh',
    name: 'Channel Setup',
    nameVi: 'Thiết Lập Kênh',
    icon: '⚙️',
    description: 'Step-by-step setup checklist for TikTok, Facebook Page, Zalo OA, Email, or Landing Page — with tracking, automation, and first-30-days plan.',
    questions: [
      { id: 'channel', label: 'Channel to Set Up', type: 'select', options: ['TikTok Business Account + Ads', 'Facebook Page + Meta Business Suite', 'Zalo Official Account (Zalo OA)', 'Email Marketing (Brevo/Mailchimp)', 'Landing Page Brief', 'TikTok Shop'], required: true },
      { id: 'business', label: 'Business Name & Industry', type: 'text', placeholder: 'e.g. Mango Salon — hair & beauty salon, HCMC', required: true },
      { id: 'target', label: 'Target Audience', type: 'textarea', placeholder: 'e.g. Women 22–45, HCMC, interested in hair care and beauty treatments', rows: 2 },
      { id: 'goal', label: 'Primary Goal for This Channel', type: 'text', placeholder: 'e.g. Generate 50 leads/month from TikTok Ads' },
      { id: 'existing', label: 'Existing Assets (what you already have)', type: 'textarea', placeholder: 'e.g. Logo files, brand colors (#1F3D2B green), 20 product photos, 5 customer review videos', rows: 2 },
      { id: 'budget', label: 'Setup Budget (for ads/tools)', type: 'text', placeholder: 'e.g. 10,000,000 VND/month for ads + tools' },
      LANG_Q,
    ],
    systemPrompt: `You are a Channel Operations Specialist who sets up marketing channels for Vietnamese businesses A-to-Z. Create a comprehensive setup checklist and 30-day launch plan.

## REQUIRED OUTPUT STRUCTURE:

# THIẾT LẬP KÊNH — [Channel] — [Business] — [Date]

## I. TỔNG QUAN SETUP (Setup Overview)
- Mục tiêu kênh
- Timeline setup (bao nhiêu ngày)
- Resources cần có
- Tools & accounts cần tạo

## II. CHECKLIST SETUP (Phase-by-Phase Checklist)

### Phase 1: Chuẩn Bị (Days 1-2)
- [ ] Task 1 (specific action)
- [ ] Task 2
...

### Phase 2: Thiết Lập Cơ Bản (Days 2-5)
- [ ] Task 1
...

### Phase 3: Cấu Hình Nâng Cao (Days 5-7)
Tracking, automation, integrations:
- [ ] Setup [Platform Pixel/Tracking]
- [ ] Connect [CRM/Sheet integration]
- [ ] Setup [Chatbot/Auto-reply]
...

### Phase 4: Test & Launch (Days 7-10)
- [ ] QA checklist
- [ ] Soft launch test

## III. THIẾT LẬP TRACKING & AUTOMATION
| Tool | Purpose | Setup Steps | Notes |
|------|---------|------------|-------|
| Pixel/Analytics | | | |
| Auto-reply | | | |
| CRM Integration | | | |

## IV. KẾ HOẠCH 30 NGÀY ĐẦU (First 30 Days Plan)
| Tuần | Mục Tiêu | Activities | KPI Check |
|------|---------|-----------|----------|
| Tuần 1 | | | |
| Tuần 2 | | | |
| Tuần 3 | | | |
| Tuần 4 | | | |

## V. PROFILE & BIO TEMPLATE
[Ready-to-use bio/description copy for the channel]

## VI. CÀI ĐẶT KỸ THUẬT (Technical Settings Checklist)
Specific technical configurations needed for the channel`,
    buildPrompt: (a) => `Tạo kế hoạch thiết lập kênh:

Kênh cần setup: ${a.channel}
Doanh nghiệp: ${a.business}
Đối tượng: ${a.target}
Mục tiêu kênh: ${a.goal || 'Tăng khách hàng mới'}
Assets có sẵn: ${a.existing || 'Chưa có gì'}
Ngân sách: ${a.budget || 'Chưa xác định'}

Output language: ${a.language || 'Vietnamese'}.
Generate complete channel setup guide with all checklists, tracking configuration, automation setup, and 30-day launch plan.`,
  },

  {
    id: 'brief-landing-page',
    name: 'Landing Page Brief',
    nameVi: 'Brief Landing Page',
    icon: '🖥️',
    description: 'Full landing page brief for developers: structure, copy for every section, CTA hierarchy, form design, mobile-first specs, and tracking setup.',
    questions: [
      { id: 'campaign', label: 'Campaign / Purpose', type: 'text', placeholder: 'e.g. June summer hair promo — capture leads for keratin treatment campaign', required: true },
      { id: 'product', label: 'Product / Service on the Page', type: 'textarea', placeholder: 'e.g. Summer Keratin Package — 2,450,000 VND (was 3,500,000), includes keratin treatment + hair spa + blow-out', required: true, rows: 2 },
      { id: 'target', label: 'Target Visitor', type: 'textarea', placeholder: 'e.g. Warm audience from TikTok ads, women 25-40 who clicked the "save 30 mins every morning" ad', rows: 2 },
      { id: 'cta', label: 'Primary CTA / Goal', type: 'text', placeholder: 'e.g. Submit name + phone number to receive confirmation call from salon', required: true },
      { id: 'offer', label: 'Offer / Incentive', type: 'textarea', placeholder: 'e.g. 30% off this week only, only 20 slots remaining, free consultation included', rows: 2 },
      { id: 'selling_points', label: 'Top 5 Selling Points', type: 'textarea', placeholder: '1. Results last 3-4 months\n2. International-trained stylists\n3. Premium imported products\n4. Private booking slots\n5. 200+ 5-star reviews', rows: 4 },
      { id: 'style', label: 'Visual Style', type: 'select', options: ['Clean & Minimal (white space, elegant)', 'Bold & High-Energy (strong colors, big CTAs)', 'Premium & Luxury (dark, gold accents)', 'Warm & Friendly (soft tones, approachable)'] },
      LANG_Q,
    ],
    systemPrompt: `You are a Channel Operator creating a complete landing page brief for a developer/designer. Include copy for every section, UX structure, mobile-first specs, and tracking requirements.

## REQUIRED OUTPUT STRUCTURE:

# BRIEF LANDING PAGE — [Campaign] — [Date]

## I. THÔNG TIN TỔNG QUAN (Brief Overview)
| Yếu Tố | Chi Tiết |
|--------|----------|
| Mục đích | |
| Primary CTA | |
| Target visitor | |
| Traffic source | |
| Mobile-first | ✅ Yes (70%+ traffic on mobile) |

## II. CẤU TRÚC TRANG (Page Structure)
Section-by-section breakdown:

### Section 1: HERO (Above the fold — most critical)
- Headline: [Exact copy]
- Subheadline: [Exact copy]
- Hero image/video: [Description]
- Primary CTA button: [Button text + color]
- Trust indicator: [e.g. "200+ happy customers"]

### Section 2: PAIN POINT (Problem Agitation)
- Hook: [Copy]
- 3 pain points listed: [Copy]

### Section 3: SOLUTION (Your Service)
- Transition: [Copy]
- Service description: [Copy]
- 3 key benefits with icons: [Copy for each]

### Section 4: SOCIAL PROOF
- Testimonials format: [text + photo / video]
- Star rating display
- Before/after images (if applicable)

### Section 5: OFFER (The Deal)
- Offer headline: [Copy]
- Original price + discounted price
- What's included: [Bullet list]
- Scarcity element: [Copy — slots, time limit]

### Section 6: FORM / CTA
- Form fields: [Name, Phone, ...?]
- Form headline: [Copy]
- Submit button: [Text]
- Trust elements below form: [Copy]

### Section 7: FAQ
5 most common questions + answers

## III. COPY CHO TỪNG SECTION (Ready-to-Use Copy)
Full copywriting for every section listed above

## IV. THIẾT KẾ & KỸ THUẬT (Design & Tech Specs)
- Color palette
- Font recommendations
- Mobile breakpoint specs
- Loading speed requirements (<3 seconds)
- Form → [where leads go: Sheets/CRM/Email]
- Tracking: Meta Pixel, TikTok Pixel, GA4 events to fire

## V. A/B TEST SUGGESTIONS
3 elements to A/B test on launch`,
    buildPrompt: (a) => `Tạo brief landing page:

Chiến dịch: ${a.campaign}
Sản phẩm: ${a.product}
Đối tượng truy cập: ${a.target}
CTA chính: ${a.cta}
Offer: ${a.offer || 'Không có offer cụ thể'}
Selling points: ${a.selling_points}
Style: ${a.style}

Output language: ${a.language || 'Vietnamese'}.
Write complete landing page brief with all section copy ready to use, tech specs, and A/B test plan.`,
  },

  {
    id: 'email-marketing',
    name: 'Email Marketing',
    nameVi: 'Email Marketing',
    icon: '📧',
    description: 'Complete email sequence: subject lines, full email copy, send timing, automation triggers, and open rate optimization.',
    questions: [
      { id: 'type', label: 'Email Sequence Type', type: 'select', options: ['Welcome Sequence (new subscribers)', 'Promotional Campaign (limited offer)', 'Re-engagement (inactive subscribers)', 'Post-purchase / Follow-up', 'Monthly Newsletter', 'Lead Nurture Sequence'], required: true },
      { id: 'product', label: 'Product / Service Featured', type: 'textarea', placeholder: 'e.g. Keratin hair treatment at Mango Salon — 2,450,000 VND, 3-4 month results', required: true, rows: 2 },
      { id: 'segment', label: 'Email List Segment', type: 'textarea', placeholder: 'e.g. Previous customers who visited in the last 6 months but haven\'t booked in 3 months', rows: 2 },
      { id: 'num_emails', label: 'Number of Emails in Sequence', type: 'select', options: ['3 emails', '5 emails', '7 emails', '10 emails'] },
      { id: 'goal', label: 'Goal of the Sequence', type: 'text', placeholder: 'e.g. Re-activate 20% of dormant customers to book within 14 days', required: true },
      { id: 'tone', label: 'Email Tone', type: 'select', options: ['Professional & Informative', 'Warm & Personal (from founder)', 'Urgent & FOMO', 'Casual & Friendly', 'Premium & Exclusive'] },
      LANG_Q,
    ],
    systemPrompt: `You are an Email Marketing Specialist for Vietnamese businesses, using Brevo or similar tools. Create a complete email sequence with full copy for every email.

## REQUIRED OUTPUT STRUCTURE:

# EMAIL SEQUENCE — [Type] — [Date]

## I. TỔNG QUAN SEQUENCE (Sequence Overview)
| | Chi Tiết |
|-|---------|
| Loại sequence | |
| Mục tiêu | |
| Số lượng email | |
| Timeline gửi | |
| Success metric | |

## II. EMAIL [1] — [Purpose]
**Gửi lúc:** [Trigger or Day X]

**Subject Line (A/B options):**
- Option A: [Subject — with emoji]
- Option B: [Alternative subject]

**Preview Text:** [35-90 chars]

**Email Body:**
[Full email copy — use natural Vietnamese, include personalization tags like {{first_name}}]

**CTA Button:** [Button text] → [Link destination]

**P.S. Line:** [Optional — adds urgency or personal touch]

---

[Repeat for all emails in sequence]

## III. AUTOMATION SETTINGS (Brevo/Mailchimp Config)
| Email # | Trigger | Delay | Condition |
|---------|---------|-------|-----------|

## IV. A/B TESTING PLAN
- Subject line tests for Email 1 & 3
- CTA button text tests
- Send time optimization

## V. TIPS TỐI ƯU OPEN RATE
- Best send times for Vietnamese audience
- Subject line formulas that work
- List hygiene recommendations

Vietnam Email benchmarks 2025: Open Rate 15-25%, CTR 2-5%, Unsubscribe <0.5%. Zalo OA message read rate: 40-60%.`,
    buildPrompt: (a) => `Tạo email sequence:

Loại sequence: ${a.type}
Sản phẩm: ${a.product}
Phân khúc list: ${a.segment || 'Tất cả subscribers'}
Số emails: ${a.num_emails || '5 emails'}
Mục tiêu: ${a.goal}
Tone: ${a.tone || 'Warm & Personal'}

Output language: ${a.language || 'Vietnamese'}.
Write complete email sequence with all emails, subject line A/B options, automation settings, and optimization tips.`,
  },

  {
    id: 'social-listening',
    name: 'Social Listening',
    nameVi: 'Social Listening',
    icon: '👂',
    description: 'Brand monitoring report: sentiment analysis, trending topics, competitor mentions, crisis alerts, and content opportunities from the conversation.',
    questions: [
      { id: 'brand', label: 'Brand / Business Name', type: 'text', placeholder: 'e.g. Mango Salon', required: true },
      { id: 'competitors', label: 'Competitors to Monitor', type: 'textarea', placeholder: 'e.g. TONI&GUY Vietnam, Nhi Salon, The Hair Salon', rows: 2 },
      { id: 'channels', label: 'Channels to Monitor', type: 'text', placeholder: 'e.g. TikTok, Facebook, Instagram, Google Reviews, Foody, Zalo' },
      { id: 'period', label: 'Monitoring Period', type: 'text', placeholder: 'e.g. May 2025 / Last 30 days' },
      { id: 'keywords', label: 'Keywords & Topics to Track', type: 'textarea', placeholder: 'e.g. "salon keratin TPHCM", "tóc đẹp", "làm tóc quận 1", your brand name, service types', rows: 3 },
      { id: 'concerns', label: 'Specific Concerns / What Triggered This Report?', type: 'textarea', placeholder: 'e.g. We noticed some negative comments last week, or: want to find content opportunities', rows: 2 },
      LANG_Q,
    ],
    systemPrompt: `You are a Social Listening Analyst for Vietnamese brands. Create a comprehensive brand monitoring report with sentiment analysis, competitive intelligence, crisis assessment, and content opportunity discovery.

## REQUIRED OUTPUT STRUCTURE:

# SOCIAL LISTENING REPORT — [Brand] — [Period] — [Date]

## I. TỔNG QUAN (Executive Summary)
- Overall sentiment score: [🟢 Positive / 🟡 Neutral / 🔴 Negative]
- Total mentions estimated
- Crisis risk level: [Low/Medium/High]
- Top opportunity discovered

## II. PHÂN TÍCH SENTIMENT (Sentiment Analysis)
| Kênh | Tổng Đề Cập | Tích Cực | Trung Lập | Tiêu Cực | Sentiment Score |
|------|------------|---------|----------|---------|----------------|

Common positive themes: [List]
Common negative themes: [List]
Neutral/informational mentions: [List]

## III. PHÂN TÍCH ĐỐI THỦ (Competitor Monitoring)
For each competitor:
### [Competitor Name]
- Recent campaigns or promotions detected
- Content performing well for them
- Customer feedback about them
- Opportunities from their weaknesses

## IV. XU HƯỚNG & CHỦ ĐỀ HOT (Trending Topics)
- Trending topics in [industry] on TikTok VN
- Hashtags gaining momentum
- Content formats people are loving
- Seasonal/event tie-in opportunities

## V. CẢNH BÁO RỦI RO (Crisis Alerts)
| Rủi Ro Phát Hiện | Mức Độ | Hành Động Cần Làm Ngay |
|-----------------|--------|----------------------|

## VI. CƠ HỘI NỘI DUNG (Content Opportunities)
Top 10 content ideas based on listening:
1. [Opportunity] — based on [evidence]
2. ...

## VII. KHUYẾN NGHỊ (Recommendations)
- Community management responses needed
- Content strategy adjustments
- PR/reputation actions if needed
- Monitoring schedule going forward`,
    buildPrompt: (a) => `Tạo social listening report:

Thương hiệu: ${a.brand}
Đối thủ cần theo dõi: ${a.competitors}
Kênh giám sát: ${a.channels || 'TikTok, Facebook, Instagram'}
Kỳ giám sát: ${a.period}
Keywords: ${a.keywords}
Mối quan tâm cụ thể: ${a.concerns || 'Tổng quan toàn diện'}

Output language: ${a.language || 'Vietnamese'}.
Generate full social listening report with sentiment analysis, competitor intelligence, crisis assessment, and content opportunities.`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT: All 4 Agents
// ─────────────────────────────────────────────────────────────────────────────
export const AGENTS: MktAgent[] = [
  {
    id: 'mktstrat',
    name: 'MKT Strategist',
    icon: '🧭',
    color: '#1F3D2B',
    role: 'Marketing Strategist & Planner',
    description: 'Full marketing plans, campaign briefs, competitor research, customer insights, and KPI calculations. Expert in Vietnam market strategy.',
    capabilities: ['Full 7-phase marketing plans', 'Campaign briefs with RACI', 'Competitor multi-angle analysis', 'Customer persona & insight building', 'Reverse KPI calculation'],
    skills: STRATEGIST_SKILLS,
  },
  {
    id: 'mktcontent',
    name: 'Content Producer',
    icon: '🎬',
    color: '#2d5a3f',
    role: 'Content Creator & Strategist',
    description: 'Monthly content calendars, TikTok/Reels scripts, Meta & TikTok ad copy, and UGC/EGC creator briefs using TOFU/MOFU/BOFU methodology.',
    capabilities: ['Monthly content calendars', 'TikTok / Reels / Shorts scripts', 'Meta & TikTok ad copywriting', 'UGC, EGC, KOC creator briefs', '3-second hook optimization'],
    skills: CONTENT_SKILLS,
  },
  {
    id: 'mktanalyst',
    name: 'Performance Analyst',
    icon: '📊',
    color: '#1a4a6b',
    role: 'Performance Marketing Analyst',
    description: 'Campaign performance evaluation, monthly reports, and deep-dive data analysis with root cause diagnosis and 48-hour action plans.',
    capabilities: ['Campaign performance deep-dive', 'Monthly marketing reports', 'Root cause analysis', '48-hour optimization actions', 'Three-scenario forecasting'],
    skills: ANALYST_SKILLS,
  },
  {
    id: 'mktchannels',
    name: 'Channel Operator',
    icon: '⚙️',
    color: '#5a3a1a',
    role: 'Channel Operations Specialist',
    description: 'A-to-Z channel setup (TikTok, Facebook, Zalo OA, Email), landing page briefs, email sequences, and social listening reports.',
    capabilities: ['Channel setup A-to-Z', 'Landing page briefs (dev-ready)', 'Email marketing sequences', 'Social listening & monitoring', 'Tracking & automation setup'],
    skills: CHANNEL_SKILLS,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// WORKFLOWS
// ─────────────────────────────────────────────────────────────────────────────
export const WORKFLOWS: MktWorkflow[] = [
  {
    id: 'campaign-launch',
    name: 'Campaign Launch',
    icon: '🚀',
    description: 'Full 14-21 day campaign launch: research → strategy → content → channels → go live.',
    duration: '14–21 days',
    steps: [
      { skill: 'nghien-cuu-doi-thu', agent: 'mktstrat', label: 'Competitor Research' },
      { skill: 'insight-khach-hang', agent: 'mktstrat', label: 'Customer Insights' },
      { skill: 'ke-hoach-mkt', agent: 'mktstrat', label: 'Marketing Plan' },
      { skill: 'brief-chien-dich', agent: 'mktstrat', label: 'Campaign Brief' },
      { skill: 'script-video', agent: 'mktcontent', label: 'Video Scripts' },
      { skill: 'copy-quang-cao', agent: 'mktcontent', label: 'Ad Copy' },
      { skill: 'brief-ugc-egc', agent: 'mktcontent', label: 'UGC/EGC Brief' },
      { skill: 'thiet-lap-kenh', agent: 'mktchannels', label: 'Channel Setup' },
      { skill: 'brief-landing-page', agent: 'mktchannels', label: 'Landing Page' },
    ],
  },
  {
    id: 'monthly-cycle',
    name: 'Monthly Cycle',
    icon: '🔄',
    description: 'Monthly review + planning cycle: performance analysis → report → next month plan.',
    duration: '3–5 days',
    steps: [
      { skill: 'danh-gia-hieu-suat', agent: 'mktanalyst', label: 'Performance Evaluation' },
      { skill: 'bao-cao-marketing', agent: 'mktanalyst', label: 'Monthly Report' },
      { skill: 'ke-hoach-mkt', agent: 'mktstrat', label: 'Next Month Plan' },
      { skill: 'lich-noi-dung', agent: 'mktcontent', label: 'Content Calendar' },
    ],
  },
  {
    id: 'content-production',
    name: 'Content Production',
    icon: '🎨',
    description: 'Weekly content production sprint: calendar → scripts → ad copy → creator briefs.',
    duration: '1–2 days',
    steps: [
      { skill: 'lich-noi-dung', agent: 'mktcontent', label: 'Content Calendar' },
      { skill: 'script-video', agent: 'mktcontent', label: 'Video Scripts' },
      { skill: 'copy-quang-cao', agent: 'mktcontent', label: 'Ad Copy' },
      { skill: 'brief-ugc-egc', agent: 'mktcontent', label: 'Creator Briefs' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Multi-provider AI config
// ─────────────────────────────────────────────────────────────────────────────
export type MktProvider = 'claude' | 'gemini' | 'groq' | 'openai';

export const MKT_PROVIDER_STORAGE = 'mkt-provider';

// Keep old keys for backwards compat (Claude was the original)
export const MKT_API_KEY_STORAGE = 'mkt-claude-api-key';
export const MKT_MODEL_STORAGE   = 'mkt-claude-model';

export interface MktProviderConfig {
  id: MktProvider;
  name: string;
  icon: string;
  badge: string;
  badgeFree: boolean;
  keyLabel: string;
  keyPlaceholder: string;
  keyHint: string;
  models: { id: string; label: string }[];
}

export const PROVIDERS: MktProviderConfig[] = [
  {
    id: 'claude', name: 'Claude', icon: '✦', badge: 'Paid', badgeFree: false,
    keyLabel: 'Anthropic API Key', keyPlaceholder: 'sk-ant-api03-...', keyHint: 'console.anthropic.com',
    models: [
      { id: 'claude-sonnet-4-6',        label: 'Sonnet 4.6 — Fast & Smart (recommended)' },
      { id: 'claude-haiku-4-5-20251001', label: 'Haiku 4.5 — Cheapest'                   },
      { id: 'claude-opus-4-6',           label: 'Opus 4.6 — Most Powerful'                },
    ],
  },
  {
    id: 'gemini', name: 'Gemini', icon: '✳', badge: 'Free tier', badgeFree: true,
    keyLabel: 'Google AI Studio Key', keyPlaceholder: 'AIzaSy...', keyHint: 'aistudio.google.com',
    models: [
      { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash — Free & Fast (recommended)' },
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash — Latest'                    },
      { id: 'gemini-1.5-pro',   label: 'Gemini 1.5 Pro — High Quality'                },
    ],
  },
  {
    id: 'groq', name: 'Groq', icon: '⚡', badge: 'Free tier', badgeFree: true,
    keyLabel: 'Groq API Key', keyPlaceholder: 'gsk_...', keyHint: 'console.groq.com',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B — Best Quality (recommended)' },
      { id: 'llama-3.1-8b-instant',    label: 'Llama 3.1 8B — Fastest'                     },
      { id: 'mixtral-8x7b-32768',      label: 'Mixtral 8x7B — Creative'                    },
    ],
  },
  {
    id: 'openai', name: 'ChatGPT', icon: '◉', badge: 'Paid', badgeFree: false,
    keyLabel: 'OpenAI API Key', keyPlaceholder: 'sk-...', keyHint: 'platform.openai.com',
    models: [
      { id: 'gpt-4o',      label: 'GPT-4o — Smart & Fast (recommended)' },
      { id: 'gpt-4o-mini', label: 'GPT-4o mini — Cheapest'              },
      { id: 'gpt-4-turbo', label: 'GPT-4 Turbo — High Quality'          },
    ],
  },
];

export function getActiveProvider(): MktProvider {
  return (sessionStorage.getItem(MKT_PROVIDER_STORAGE) ?? 'claude') as MktProvider;
}

export function getProviderKey(provider: MktProvider): string {
  if (provider === 'claude') return sessionStorage.getItem(MKT_API_KEY_STORAGE) ?? '';
  return sessionStorage.getItem(`mkt-key-${provider}`) ?? '';
}

export function getProviderModel(provider: MktProvider): string {
  const p = PROVIDERS.find(pr => pr.id === provider)!;
  const stored = provider === 'claude'
    ? sessionStorage.getItem(MKT_MODEL_STORAGE)
    : sessionStorage.getItem(`mkt-model-${provider}`);
  return stored ?? p.models[0].id;
}

export function setProviderKey(provider: MktProvider, key: string): void {
  if (provider === 'claude') sessionStorage.setItem(MKT_API_KEY_STORAGE, key);
  else sessionStorage.setItem(`mkt-key-${provider}`, key);
}

export function setProviderModel(provider: MktProvider, model: string): void {
  if (provider === 'claude') sessionStorage.setItem(MKT_MODEL_STORAGE, model);
  else sessionStorage.setItem(`mkt-model-${provider}`, model);
}

// ─────────────────────────────────────────────────────────────────────────────
// Unified AI call — routes to the right provider
// ─────────────────────────────────────────────────────────────────────────────
export async function callAI(
  provider: MktProvider,
  apiKey: string,
  model: string,
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  if (provider === 'claude')  return _callClaude(apiKey, model, systemPrompt, userMessage);
  if (provider === 'gemini')  return _callGemini(apiKey, model, systemPrompt, userMessage);
  if (provider === 'groq')    return _callOAICompat('https://api.groq.com/openai/v1/chat/completions', apiKey, model, systemPrompt, userMessage);
  if (provider === 'openai')  return _callOAICompat('https://api.openai.com/v1/chat/completions',      apiKey, model, systemPrompt, userMessage);
  throw new Error('Unknown provider');
}

// Kept for any legacy call sites
export async function callClaude(
  apiKey: string, model: string, systemPrompt: string, userMessage: string,
): Promise<string> {
  return _callClaude(apiKey, model, systemPrompt, userMessage);
}

async function _callClaude(apiKey: string, model: string, systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ model, max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: userMessage }] }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
  }
  const data = await res.json() as { content: { type: string; text: string }[] };
  return data.content.find(c => c.type === 'text')?.text ?? '';
}

async function _callGemini(apiKey: string, model: string, systemPrompt: string, userMessage: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
  }
  const data = await res.json() as { candidates: { content: { parts: { text: string }[] } }[] };
  return data.candidates[0]?.content?.parts[0]?.text ?? '';
}

async function _callOAICompat(endpoint: string, apiKey: string, model: string, systemPrompt: string, userMessage: string): Promise<string> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model, max_tokens: 4096,
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
  }
  const data = await res.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content ?? '';
}
