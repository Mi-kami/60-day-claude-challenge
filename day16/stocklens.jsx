import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
} from "recharts";

// ─── Dataset ───────────────────────────────────────────────────────────────
// All figures sourced from training knowledge (approximate, for educational use).
// Prices ~mid-2024. Verify current data independently before any decision.

const STOCKS = {

  // ── NGX ──────────────────────────────────────────────────────────────────
  MTNN: {
    company:"MTN Nigeria Communications", ticker:"MTNN", exchange:"NGX", currency:"₦",
    sector:"Telecoms",
    cmp:"₦195", market_cap:"₦3.97T", w52h:"₦260", w52l:"₦140",
    pe:8.2, sector_pe:12.0, hist_pe:15.0,
    pb:null, sector_pb:2.5,
    ev_ebitda:4.1, sector_ev:6.0,
    de:2.8, interest_cov:2.1, curr_ratio:0.9,
    roe:85, roe_3y:72, roe_5y:65, roce:35, roce_3y:30, roce_5y:27,
    div_yield:12.5,
    valuation:"CHEAP", de_verdict:"LEVERAGED", quality:"Moderate",
    growth:[
      {y:"FY21",rev:22,prof:45},{y:"FY22",rev:18,prof:12},
      {y:"FY23",rev:35,prof:-28},{y:"FY24",rev:25,prof:8},
    ],
    returns:[
      {y:"FY21",roe:62,roce:25},{y:"FY22",roe:75,roce:30},
      {y:"FY23",roe:80,roce:32},{y:"FY24",roe:85,roce:35},
    ],
    ownership:[
      {n:"MTN Group (Promoter)",v:76.0},{n:"FII/Foreign",v:3.2},
      {n:"DII/Domestic Inst.",v:8.1},{n:"Retail/Public",v:12.7},
    ],
    peers:[
      {n:"Airtel Africa",pe:12.1,pb:2.5,roe:18.5,de:1.8,rev_g:14.2},
      {n:"Globacom",pe:null,pb:null,roe:null,de:null,rev_g:null},
      {n:"9Mobile",pe:null,pb:null,roe:null,de:null,rev_g:null},
    ],
    strengths:[
      "Market leader with ~72% subscriber share and 75M+ active users",
      "Strong cash generation — EBITDA margin consistently above 45%",
      "Dividend track record: 12.5% yield maintained despite FX headwinds",
    ],
    watch:[
      "Naira devaluation has materially increased USD-denominated debt burden",
      "Interest coverage at 2.1x — below the 3x healthy threshold",
    ],
    risks:[
      {r:"FX exposure: naira devaluation wiped ~28% off net profit in FY23",s:"HIGH"},
      {r:"Leveraged balance sheet: D/E 2.8, high debt service cost",s:"HIGH"},
      {r:"Regulatory risk: NCC fine history and tariff cap constraints",s:"MEDIUM"},
      {r:"Rising competitor aggression from Airtel Nigeria on pricing",s:"MEDIUM"},
    ],
    summary:"MTN Nigeria leads the telecom sector with dominant market share and high cash generation, but carries significant FX and leverage risk. The FY23 naira devaluation severely impacted profitability. The tariff increase in 2024 has improved the revenue outlook. Valuation looks attractive relative to history but leverage warrants close monitoring.",
    data_confidence:"High", sources:["NGX","Nairametrics","MTN Nigeria Annual Reports"],
  },

  DANGCEM: {
    company:"Dangote Cement PLC", ticker:"DANGCEM", exchange:"NGX", currency:"₦",
    sector:"Building Materials",
    cmp:"₦485", market_cap:"₦8.27T", w52h:"₦612", w52l:"₦350",
    pe:11.5, sector_pe:14.0, hist_pe:16.0,
    pb:3.8, sector_pb:3.0,
    ev_ebitda:6.2, sector_ev:7.5,
    de:0.7, interest_cov:5.2, curr_ratio:1.3,
    roe:32, roe_3y:28, roe_5y:25, roce:22, roce_3y:20, roce_5y:18,
    div_yield:8.5,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY21",rev:18,prof:22},{y:"FY22",rev:30,prof:15},
      {y:"FY23",rev:38,prof:-10},{y:"FY24",rev:32,prof:18},
    ],
    returns:[
      {y:"FY21",roe:24,roce:18},{y:"FY22",roe:27,roce:20},
      {y:"FY23",roe:29,roce:21},{y:"FY24",roe:32,roce:22},
    ],
    ownership:[
      {n:"Aliko Dangote (Promoter)",v:85.7},{n:"FII/Foreign",v:4.5},
      {n:"DII/Domestic Inst.",v:3.8},{n:"Retail/Public",v:6.0},
    ],
    peers:[
      {n:"BUA Cement",pe:14.2,pb:3.5,roe:18.0,de:0.5,rev_g:25.0},
      {n:"Lafarge Africa",pe:9.8,pb:2.1,roe:12.5,de:0.3,rev_g:30.0},
      {n:"CCNN",pe:8.5,pb:2.0,roe:15.0,de:0.4,rev_g:20.0},
    ],
    strengths:[
      "Largest cement producer in Africa — 51.6 MTPA installed capacity",
      "Pan-African operations in 10 countries providing revenue diversification",
      "Strong promoter backing with 85.7% Dangote family stake",
    ],
    watch:[
      "High energy costs (gas and coal) remain a structural margin pressure",
      "FX headwinds on imported inputs given naira depreciation",
    ],
    risks:[
      {r:"Energy cost inflation directly compresses EBITDA margins",s:"HIGH"},
      {r:"FX risk on imported fuel and equipment costs",s:"HIGH"},
      {r:"Infrastructure constraints limit volume growth in some markets",s:"MEDIUM"},
      {r:"High promoter concentration (85.7%) limits free float liquidity",s:"LOW"},
    ],
    summary:"Dangote Cement is Africa's largest cement producer with strong fundamentals, conservative leverage, and consistent dividend payments. FX and energy cost pressures impacted FY23 profits but the company's scale advantage and pricing power remain intact. Valuation is below historical average, presenting a reasonable entry for long-term investors.",
    data_confidence:"High", sources:["NGX","Nairametrics","Dangote Cement Annual Reports"],
  },

  GTCO: {
    company:"Guaranty Trust Holding Company", ticker:"GTCO", exchange:"NGX", currency:"₦",
    sector:"Banking",
    cmp:"₦42", market_cap:"₦1.24T", w52h:"₦52", w52l:"₦28",
    pe:3.2, sector_pe:4.5, hist_pe:6.0,
    pb:1.1, sector_pb:0.8,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:28, roe_3y:22, roe_5y:20, roce:18, roce_3y:15, roce_5y:13,
    div_yield:15.2,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Strong",
    growth:[
      {y:"FY21",rev:12,prof:18},{y:"FY22",rev:20,prof:25},
      {y:"FY23",rev:185,prof:320},{y:"FY24",rev:55,prof:40},
    ],
    returns:[
      {y:"FY21",roe:18,roce:12},{y:"FY22",roe:20,roce:14},
      {y:"FY23",roe:25,roce:17},{y:"FY24",roe:28,roce:18},
    ],
    ownership:[
      {n:"Institutional/Founders",v:35.5},{n:"FII/Foreign",v:28.0},
      {n:"DII/Domestic Inst.",v:18.5},{n:"Retail/Public",v:18.0},
    ],
    peers:[
      {n:"Zenith Bank",pe:2.8,pb:0.9,roe:25.0,de:null,rev_g:180.0},
      {n:"Access Holdings",pe:2.1,pb:0.6,roe:18.0,de:null,rev_g:150.0},
      {n:"UBA",pe:2.2,pb:0.5,roe:20.0,de:null,rev_g:160.0},
    ],
    strengths:[
      "Best-in-class cost-to-income ratio (~35%) among Nigerian banks",
      "Strong brand, premium customer base, and superior digital platform",
      "Consistently high ROE (28%) and exceptional dividend yield (15%+)",
    ],
    watch:[
      "FX revaluation gains inflated FY23 profits — underlying earnings normalisation expected",
      "Ongoing transition to HoldCo structure creates short-term operational complexity",
    ],
    risks:[
      {r:"Asset quality deterioration risk in a high-inflation, high-rate environment",s:"MEDIUM"},
      {r:"FX revaluation gains are non-recurring — profit base will moderate",s:"HIGH"},
      {r:"Regulatory capital requirement increases (CBN recapitalisation exercise)",s:"MEDIUM"},
      {r:"Competition from fintechs (Flutterwave, Kuda) on retail deposits",s:"LOW"},
    ],
    summary:"GTCO is Nigeria's most efficient bank with industry-leading ROE and cost ratios. FY23 profits were massively inflated by FX revaluation gains following naira devaluation; normalised earnings will be significantly lower. The stock trades at an attractive P/B and dividend yield for a quality franchise, but investors should anchor to normalised earnings power.",
    data_confidence:"High", sources:["NGX","CBN","GTCO Annual Reports"],
  },

  AIRTELAFRI: {
    company:"Airtel Africa PLC", ticker:"AIRTELAFRI", exchange:"NGX/LSE", currency:"$",
    sector:"Telecoms",
    cmp:"$1.32 (₦108 on NGX)", market_cap:"$2.6B", w52h:"$1.85", w52l:"$0.95",
    pe:12.1, sector_pe:13.5, hist_pe:18.0,
    pb:2.5, sector_pb:2.8,
    ev_ebitda:4.8, sector_ev:6.0,
    de:1.8, interest_cov:3.2, curr_ratio:1.0,
    roe:18.5, roe_3y:17.0, roe_5y:15.0, roce:14.5, roce_3y:13.0, roce_5y:11.5,
    div_yield:5.2,
    valuation:"FAIR", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:22,prof:55},{y:"FY22",rev:18,prof:20},
      {y:"FY23",rev:15,prof:-45},{y:"FY24",rev:8,prof:12},
    ],
    returns:[
      {y:"FY21",roe:15,roce:11},{y:"FY22",roe:17,roce:13},
      {y:"FY23",roe:16,roce:12},{y:"FY24",roe:18.5,roce:14.5},
    ],
    ownership:[
      {n:"Bharti Airtel (Promoter)",v:56.6},{n:"FII/Foreign Inst.",v:28.5},
      {n:"DII/Domestic Inst.",v:8.5},{n:"Retail/Public",v:6.4},
    ],
    peers:[
      {n:"MTN Nigeria",pe:8.2,pb:null,roe:85.0,de:2.8,rev_g:25.0},
      {n:"Safaricom",pe:15.0,pb:5.5,roe:30.0,de:0.5,rev_g:8.0},
      {n:"Vodacom",pe:14.5,pb:3.5,roe:22.0,de:1.5,rev_g:6.0},
    ],
    strengths:[
      "Pan-African presence in 14 high-growth markets with 150M+ subscribers",
      "Mobile money (Airtel Money) growing rapidly — 38M+ registered users",
      "Strong Bharti Airtel backing providing financial and operational support",
    ],
    watch:[
      "Multiple African currency depreciations hurt USD-reported revenues",
      "Nigeria — largest market — facing structural economic headwinds",
    ],
    risks:[
      {r:"Multi-currency depreciation across operating markets reduces USD revenues",s:"HIGH"},
      {r:"Regulatory risk: tower taxes, service levies across 14 jurisdictions",s:"MEDIUM"},
      {r:"Nigeria (30%+ of revenue) facing persistent macro and FX challenges",s:"HIGH"},
      {r:"Capital intensity of 5G and data network rollout increases debt",s:"MEDIUM"},
    ],
    summary:"Airtel Africa offers pan-African telecom exposure with growing mobile money optionality, but multi-currency headwinds have significantly pressured USD-reported results. The mobile money business is a key long-term value driver. Valuation is fair relative to sector but the FX environment remains a near-term overhang.",
    data_confidence:"High", sources:["NGX","LSE","Airtel Africa Annual Reports"],
  },

  ZENITHBANK: {
    company:"Zenith Bank PLC", ticker:"ZENITHBANK", exchange:"NGX", currency:"₦",
    sector:"Banking",
    cmp:"₦37", market_cap:"₦1.16T", w52h:"₦46", w52l:"₦24",
    pe:2.8, sector_pe:4.5, hist_pe:5.5,
    pb:0.9, sector_pb:0.8,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:25, roe_3y:20, roe_5y:18, roce:16, roce_3y:13, roce_5y:11,
    div_yield:14.0,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Strong",
    growth:[
      {y:"FY21",rev:10,prof:8},{y:"FY22",rev:18,prof:22},
      {y:"FY23",rev:180,prof:202},{y:"FY24",rev:60,prof:45},
    ],
    returns:[
      {y:"FY21",roe:16,roce:10},{y:"FY22",roe:19,roce:12},
      {y:"FY23",roe:22,roce:14},{y:"FY24",roe:25,roce:16},
    ],
    ownership:[
      {n:"Institutional/Founders",v:28.0},{n:"FII/Foreign",v:30.0},
      {n:"DII/Domestic Inst.",v:22.0},{n:"Retail/Public",v:20.0},
    ],
    peers:[
      {n:"GTCO",pe:3.2,pb:1.1,roe:28.0,de:null,rev_g:55.0},
      {n:"Access Holdings",pe:2.1,pb:0.6,roe:18.0,de:null,rev_g:150.0},
      {n:"UBA",pe:2.2,pb:0.5,roe:20.0,de:null,rev_g:160.0},
    ],
    strengths:[
      "Tier-1 bank with Nigeria's largest depositor base by customer count",
      "Consistent dividend payer with 14% yield and strong capital ratios",
      "Diversified revenue mix across corporate, retail, and treasury",
    ],
    watch:[
      "FX revaluation gains were the primary driver of exceptional FY23 profits",
      "Needs capital raise under CBN recapitalisation directive by 2026",
    ],
    risks:[
      {r:"Normalisation of FX gains will significantly reduce reported profits",s:"HIGH"},
      {r:"NPL ratio creep risk in a high-rate, high-inflation environment",s:"MEDIUM"},
      {r:"CBN recapitalisation requirement may dilute existing shareholders",s:"MEDIUM"},
      {r:"Competition from digital banks on low-cost retail deposits",s:"LOW"},
    ],
    summary:"Zenith Bank is one of Nigeria's strongest Tier-1 banks with a track record of solid returns and dividends. FY23 profits were exceptional due to FX revaluation — investors should focus on normalised earnings. The bank trades at a discount to book value, which is unusual for a franchise of this quality.",
    data_confidence:"High", sources:["NGX","CBN","Zenith Bank Annual Reports"],
  },

  ACCESSCORP: {
    company:"Access Holdings PLC", ticker:"ACCESSCORP", exchange:"NGX", currency:"₦",
    sector:"Banking",
    cmp:"₦19.5", market_cap:"₦694B", w52h:"₦24", w52l:"₦13",
    pe:2.1, sector_pe:4.5, hist_pe:5.0,
    pb:0.6, sector_pb:0.8,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:18, roe_3y:15, roe_5y:13, roce:12, roce_3y:10, roce_5y:9,
    div_yield:10.5,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:14,prof:10},{y:"FY22",rev:22,prof:15},
      {y:"FY23",rev:150,prof:210},{y:"FY24",rev:55,prof:38},
    ],
    returns:[
      {y:"FY21",roe:12,roce:8},{y:"FY22",roe:14,roce:9},
      {y:"FY23",roe:16,roce:10},{y:"FY24",roe:18,roce:12},
    ],
    ownership:[
      {n:"Institutional/Founders",v:32.0},{n:"FII/Foreign",v:22.0},
      {n:"DII/Domestic Inst.",v:25.0},{n:"Retail/Public",v:21.0},
    ],
    peers:[
      {n:"GTCO",pe:3.2,pb:1.1,roe:28.0,de:null,rev_g:55.0},
      {n:"Zenith Bank",pe:2.8,pb:0.9,roe:25.0,de:null,rev_g:60.0},
      {n:"UBA",pe:2.2,pb:0.5,roe:20.0,de:null,rev_g:160.0},
    ],
    strengths:[
      "Africa's largest bank by customers (60M+) after Diamond Bank merger",
      "Fast-growing non-bank subsidiaries (insurance, payments) under HoldCo",
      "Strong cross-border trade finance and pan-African network",
    ],
    watch:[
      "Lower ROE than Tier-1 peers due to integration costs and diversification drag",
      "HoldCo restructuring adds short-term complexity to earnings visibility",
    ],
    risks:[
      {r:"FX revaluation gains inflated profits — normalised returns are moderate",s:"HIGH"},
      {r:"Integration risk from multiple acquisitions across Africa",s:"MEDIUM"},
      {r:"CBN recapitalisation requirement: largest capital raise needed among peers",s:"HIGH"},
      {r:"Asset quality risk in retail and SME lending segments",s:"MEDIUM"},
    ],
    summary:"Access Holdings is Nigeria's largest bank by customer base with an ambitious pan-African expansion strategy. Profitability metrics trail GTCO and Zenith on efficiency. FX gains inflated FY23 profits materially. The group's non-bank subsidiaries represent a long-term diversification play but add near-term complexity.",
    data_confidence:"Moderate", sources:["NGX","CBN","Access Holdings Annual Reports"],
  },

  UBA: {
    company:"United Bank for Africa PLC", ticker:"UBA", exchange:"NGX", currency:"₦",
    sector:"Banking",
    cmp:"₦22", market_cap:"₦751B", w52h:"₦28", w52l:"₦14",
    pe:2.2, sector_pe:4.5, hist_pe:5.0,
    pb:0.5, sector_pb:0.8,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:20, roe_3y:16, roe_5y:14, roce:13, roce_3y:10, roce_5y:9,
    div_yield:12.5,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:12,prof:15},{y:"FY22",rev:20,prof:25},
      {y:"FY23",rev:160,prof:280},{y:"FY24",rev:52,prof:42},
    ],
    returns:[
      {y:"FY21",roe:13,roce:9},{y:"FY22",roe:16,roce:10},
      {y:"FY23",roe:18,roce:12},{y:"FY24",roe:20,roce:13},
    ],
    ownership:[
      {n:"Founders/Institutional",v:30.0},{n:"FII/Foreign",v:24.0},
      {n:"DII/Domestic Inst.",v:26.0},{n:"Retail/Public",v:20.0},
    ],
    peers:[
      {n:"GTCO",pe:3.2,pb:1.1,roe:28.0,de:null,rev_g:55.0},
      {n:"Zenith Bank",pe:2.8,pb:0.9,roe:25.0,de:null,rev_g:60.0},
      {n:"Access Holdings",pe:2.1,pb:0.6,roe:18.0,de:null,rev_g:55.0},
    ],
    strengths:[
      "True pan-African bank — operations in 20 African countries + US/UK/France",
      "Largest African bank by geographic reach, strong trade finance franchise",
      "Consistently pays dividends; strong FY23 earnings on FX revaluation",
    ],
    watch:[
      "Profitability per geography is uneven — some African subsidiaries drag returns",
      "Nigerian operations dominate earnings, creating concentration risk",
    ],
    risks:[
      {r:"Multi-country FX exposure: operations in 20 currencies, many volatile",s:"HIGH"},
      {r:"FX revaluation gains non-recurring; normalised profits significantly lower",s:"HIGH"},
      {r:"CBN recapitalisation: UBA will need significant capital raise",s:"MEDIUM"},
      {r:"Uneven profitability across African subsidiaries reduces blended ROE",s:"MEDIUM"},
    ],
    summary:"UBA's pan-African footprint is its greatest differentiator — no Nigerian bank matches its geographic reach. FY23 profits were exceptional due to FX gains. The stock trades at 0.5x book which is deep value for a bank of this franchise quality. Normalised earnings recovery will be the key re-rating catalyst.",
    data_confidence:"Moderate", sources:["NGX","CBN","UBA Annual Reports"],
  },

  SEPLAT: {
    company:"Seplat Energy PLC", ticker:"SEPLAT", exchange:"NGX/LSE", currency:"$",
    sector:"Oil & Gas",
    cmp:"$1.85 (₦151 on NGX)", market_cap:"$1.1B", w52h:"$2.20", w52l:"$1.30",
    pe:5.5, sector_pe:8.0, hist_pe:9.0,
    pb:1.2, sector_pb:1.5,
    ev_ebitda:3.8, sector_ev:5.0,
    de:0.8, interest_cov:4.5, curr_ratio:1.8,
    roe:15, roe_3y:12, roe_5y:10, roce:12, roce_3y:10, roce_5y:8,
    div_yield:6.8,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:35,prof:120},{y:"FY22",rev:55,prof:85},
      {y:"FY23",rev:-5,prof:-30},{y:"FY24",rev:12,prof:22},
    ],
    returns:[
      {y:"FY21",roe:8,roce:6},{y:"FY22",roe:14,roce:10},
      {y:"FY23",roe:12,roce:9},{y:"FY24",roe:15,roce:12},
    ],
    ownership:[
      {n:"ABCH/Founders",v:36.4},{n:"FII/Foreign",v:38.5},
      {n:"DII/Domestic Inst.",v:12.0},{n:"Retail/Public",v:13.1},
    ],
    peers:[
      {n:"Oando",pe:null,pb:null,roe:null,de:null,rev_g:null},
      {n:"Conoil",pe:8.0,pb:1.0,roe:8.0,de:0.3,rev_g:18.0},
      {n:"TotalEnergies Mktg Nig",pe:10.0,pb:2.5,roe:18.0,de:0.2,rev_g:25.0},
    ],
    strengths:[
      "Dual-listed (NGX + LSE) with strong institutional investor base",
      "MPNU acquisition (ExxonMobil's Nigerian upstream) transforms scale 3-5x",
      "Conservative balance sheet: D/E 0.8, interest coverage 4.5x",
    ],
    watch:[
      "MPNU deal completion risk and integration execution uncertainty",
      "Oil theft and pipeline vandalism remain chronic operational risks",
    ],
    risks:[
      {r:"Oil price volatility directly drives revenue and profit swings",s:"HIGH"},
      {r:"Pipeline sabotage and crude oil theft: structural operational risk in Nigeria",s:"HIGH"},
      {r:"MPNU acquisition financing could stretch balance sheet",s:"MEDIUM"},
      {r:"Gas transition risk: heavy reliance on fossil fuel assets",s:"LOW"},
    ],
    summary:"Seplat is Nigeria's leading indigenous E&P company with a transformational acquisition of ExxonMobil's Nigerian onshore assets pending. If completed, this deal materially re-rates the company's scale and production profile. The balance sheet is conservative and valuation is cheap relative to reserves. Execution risk on the deal is the key watch item.",
    data_confidence:"Moderate", sources:["NGX","LSE","Seplat Annual Reports"],
  },

  BUAFOODS: {
    company:"BUA Foods PLC", ticker:"BUAFOODS", exchange:"NGX", currency:"₦",
    sector:"Consumer Goods (FMCG)",
    cmp:"₦360", market_cap:"₦6.48T", w52h:"₦425", w52l:"₦260",
    pe:22.5, sector_pe:18.0, hist_pe:20.0,
    pb:8.5, sector_pb:4.0,
    ev_ebitda:14.2, sector_ev:10.0,
    de:0.4, interest_cov:8.5, curr_ratio:1.5,
    roe:35, roe_3y:30, roe_5y:25, roce:28, roce_3y:24, roce_5y:20,
    div_yield:2.8,
    valuation:"EXPENSIVE", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY21",rev:32,prof:38},{y:"FY22",rev:45,prof:50},
      {y:"FY23",rev:80,prof:75},{y:"FY24",rev:55,prof:48},
    ],
    returns:[
      {y:"FY21",roe:22,roce:18},{y:"FY22",roe:28,roce:22},
      {y:"FY23",roe:32,roce:26},{y:"FY24",roe:35,roce:28},
    ],
    ownership:[
      {n:"BUA Group (Abdul Samad Rabiu)",v:94.7},{n:"FII/Foreign",v:1.5},
      {n:"DII/Domestic Inst.",v:1.8},{n:"Retail/Public",v:2.0},
    ],
    peers:[
      {n:"Nestlé Nigeria",pe:45.0,pb:15.0,roe:80.0,de:0.2,rev_g:55.0},
      {n:"Dangote Sugar",pe:10.5,pb:3.0,roe:28.0,de:0.6,rev_g:60.0},
      {n:"Flour Mills Nigeria",pe:12.0,pb:2.0,roe:18.0,de:1.2,rev_g:45.0},
    ],
    strengths:[
      "Vertically integrated: controls sugar, flour, and pasta supply chains end-to-end",
      "High ROE (35%) and ROCE (28%) reflecting strong pricing power",
      "Resilient FMCG demand — food staples insulated from economic downturns",
    ],
    watch:[
      "P/E of 22.5x is above sector average — premium valuation leaves little room for error",
      "Extremely high promoter concentration (94.7%) limits institutional interest",
    ],
    risks:[
      {r:"FX-driven input cost inflation for imported raw materials",s:"HIGH"},
      {r:"Valuation premium (P/E 22.5x vs sector 18x) prices in continued outperformance",s:"MEDIUM"},
      {r:"Near-monopoly promoter stake (94.7%) raises governance concerns",s:"MEDIUM"},
      {r:"Consumer purchasing power squeeze in Nigeria could hit volumes",s:"MEDIUM"},
    ],
    summary:"BUA Foods is one of Nigeria's strongest FMCG franchises with excellent returns and a vertically integrated supply chain. The stock trades at a premium valuation relative to peers — justified by superior growth and margins but leaving limited margin of safety. The extremely high promoter concentration is a governance flag worth monitoring.",
    data_confidence:"Moderate", sources:["NGX","BUA Foods Annual Reports"],
  },

  FBNH: {
    company:"FBN Holdings PLC", ticker:"FBNH", exchange:"NGX", currency:"₦",
    sector:"Banking",
    cmp:"₦24", market_cap:"₦857B", w52h:"₦32", w52l:"₦16",
    pe:2.5, sector_pe:4.5, hist_pe:5.0,
    pb:0.7, sector_pb:0.8,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:22, roe_3y:16, roe_5y:12, roce:14, roce_3y:10, roce_5y:8,
    div_yield:8.5,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:8,prof:12},{y:"FY22",rev:18,prof:20},
      {y:"FY23",rev:170,prof:250},{y:"FY24",rev:50,prof:40},
    ],
    returns:[
      {y:"FY21",roe:10,roce:7},{y:"FY22",roe:14,roce:9},
      {y:"FY23",roe:18,roce:12},{y:"FY24",roe:22,roce:14},
    ],
    ownership:[
      {n:"Institutional/Founders",v:35.0},{n:"FII/Foreign",v:20.0},
      {n:"DII/Domestic Inst.",v:25.0},{n:"Retail/Public",v:20.0},
    ],
    peers:[
      {n:"GTCO",pe:3.2,pb:1.1,roe:28.0,de:null,rev_g:55.0},
      {n:"Zenith Bank",pe:2.8,pb:0.9,roe:25.0,de:null,rev_g:60.0},
      {n:"UBA",pe:2.2,pb:0.5,roe:20.0,de:null,rev_g:52.0},
    ],
    strengths:[
      "Nigeria's oldest and most recognisable bank brand — strong retail franchise",
      "Large balance sheet supporting corporate and infrastructure financing",
      "Significant FX revaluation gains boosted capital position in FY23",
    ],
    watch:[
      "Historical governance and management stability issues have impacted investor confidence",
      "ROE still trails top-tier peers (GTCO, Zenith) despite recent improvement",
    ],
    risks:[
      {r:"Governance track record: management changes and regulatory scrutiny",s:"HIGH"},
      {r:"Asset quality risk: legacy NPL issues require sustained management",s:"HIGH"},
      {r:"CBN recapitalisation requirement adds capital dilution pressure",s:"MEDIUM"},
      {r:"FX gains non-recurring — normalised profitability much lower",s:"HIGH"},
    ],
    summary:"FBN Holdings owns First Bank, Nigeria's oldest financial institution. After years of governance challenges, the bank has stabilised and improving returns are visible. FX gains boosted FY23 profits significantly. The stock trades cheap but the governance discount is partially warranted. Improvement in asset quality and leadership stability will be key re-rating triggers.",
    data_confidence:"Moderate", sources:["NGX","CBN","FBN Holdings Annual Reports"],
  },

  // ── NSE / BSE ─────────────────────────────────────────────────────────────
  RELIANCE: {
    company:"Reliance Industries Limited", ticker:"RELIANCE", exchange:"NSE/BSE", currency:"₹",
    sector:"Conglomerate (Telecom, Retail, O&G, Green Energy)",
    cmp:"₹2,920", market_cap:"₹19.8L Cr", w52h:"₹3,218", w52l:"₹2,220",
    pe:28.5, sector_pe:22.0, hist_pe:25.0,
    pb:2.4, sector_pb:2.0,
    ev_ebitda:14.2, sector_ev:12.0,
    de:0.4, interest_cov:9.5, curr_ratio:1.2,
    roe:9.5, roe_3y:8.8, roe_5y:9.2, roce:8.5, roce_3y:8.0, roce_5y:8.3,
    div_yield:0.3,
    valuation:"EXPENSIVE", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:52,prof:25},{y:"FY23",rev:24,prof:12},
      {y:"FY24",rev:8,prof:7},{y:"FY25",rev:9,prof:8},
    ],
    returns:[
      {y:"FY22",roe:9.0,roce:8.2},{y:"FY23",roe:9.2,roce:8.4},
      {y:"FY24",roe:9.4,roce:8.5},{y:"FY25",roe:9.5,roce:8.5},
    ],
    ownership:[
      {n:"Mukesh Ambani (Promoter)",v:50.6},{n:"FII/Foreign",v:23.5},
      {n:"DII/Domestic Inst.",v:14.8},{n:"Retail/Public",v:11.1},
    ],
    peers:[
      {n:"Tata Consultancy",pe:32.0,pb:15.0,roe:55.0,de:0.0,rev_g:8.0},
      {n:"HDFC Bank",pe:18.0,pb:3.0,roe:16.5,de:null,rev_g:25.0},
      {n:"Infosys",pe:26.0,pb:8.5,roe:32.0,de:0.0,rev_g:5.0},
    ],
    strengths:[
      "India's largest company by market cap — unmatched scale across O&G, retail, telecom",
      "Jio (telecom) and JioMart (retail) create powerful consumer data flywheel",
      "Green energy pivot with ₹75,000 Cr investment plan — future growth engine",
    ],
    watch:[
      "ROE of 9.5% is below the 15% threshold despite massive capital deployed",
      "Conglomerate discount risk — multiple businesses reduce valuation clarity",
    ],
    risks:[
      {r:"Low capital efficiency: ROE 9.5% below ideal for the premium multiple",s:"MEDIUM"},
      {r:"Oil-to-chemicals business exposed to global crude price volatility",s:"MEDIUM"},
      {r:"Jio Financial Services entry into banking/NBFC adds regulatory risk",s:"LOW"},
      {r:"Succession planning — Mukesh Ambani's central role creates key-man risk",s:"LOW"},
    ],
    summary:"Reliance Industries is India's most powerful conglomerate with dominant positions in telecoms, retail, and energy. The ongoing pivot to green energy and digital services is the long-term growth narrative. ROE is modest for the premium valuation, reflecting massive reinvestment. The stock is best held for long-term compounding rather than near-term earnings growth.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","Reliance Annual Reports"],
  },

  TCS: {
    company:"Tata Consultancy Services", ticker:"TCS", exchange:"NSE/BSE", currency:"₹",
    sector:"IT Services",
    cmp:"₹4,120", market_cap:"₹15.0L Cr", w52h:"₹4,592", w52l:"₹3,592",
    pe:32.0, sector_pe:28.0, hist_pe:30.0,
    pb:15.2, sector_pb:10.0,
    ev_ebitda:22.5, sector_ev:20.0,
    de:0.0, interest_cov:null, curr_ratio:2.8,
    roe:55, roe_3y:50, roe_5y:48, roce:55, roce_3y:50, roce_5y:48,
    div_yield:1.5,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:18,prof:14},{y:"FY23",rev:17,prof:10},
      {y:"FY24",rev:4,prof:9},{y:"FY25",rev:5,prof:8},
    ],
    returns:[
      {y:"FY22",roe:46,roce:46},{y:"FY23",roe:52,roce:52},
      {y:"FY24",roe:54,roce:54},{y:"FY25",roe:55,roce:55},
    ],
    ownership:[
      {n:"Tata Sons (Promoter)",v:72.5},{n:"FII/Foreign",v:14.2},
      {n:"DII/Domestic Inst.",v:8.5},{n:"Retail/Public",v:4.8},
    ],
    peers:[
      {n:"Infosys",pe:26.0,pb:8.5,roe:32.0,de:0.0,rev_g:5.0},
      {n:"Wipro",pe:24.0,pb:4.5,roe:18.0,de:0.0,rev_g:1.0},
      {n:"HCL Technologies",pe:26.0,pb:7.0,roe:24.0,de:0.0,rev_g:6.0},
    ],
    strengths:[
      "Zero debt balance sheet — ₹55,000 Cr+ cash, entirely self-funded",
      "Industry-leading ROE (55%) and ROCE (55%) sustained over 5+ years",
      "Largest IT employer in India (600,000+ employees) — scale moat",
    ],
    watch:[
      "Revenue growth has slowed significantly (4-5% in FY24-25) vs double-digits historically",
      "BFSI vertical (40%+ of revenue) sensitive to global banking IT spending cuts",
    ],
    risks:[
      {r:"Revenue growth slowdown: US/Europe client discretionary IT spend cuts",s:"HIGH"},
      {r:"AI/automation risk to traditional IT services delivery model",s:"MEDIUM"},
      {r:"Currency risk: 85%+ revenue in USD/GBP/EUR, costs in INR",s:"LOW"},
      {r:"Attrition and talent cost inflation in senior technology roles",s:"LOW"},
    ],
    summary:"TCS is the gold standard of Indian IT — exceptional returns, zero debt, and 50+ years of execution. The near-term challenge is revenue growth recovery after a global tech spend slowdown. AI adoption poses a structural question to the traditional offshore IT model. The premium valuation reflects franchise quality but growth re-acceleration is needed for further re-rating.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","TCS Annual Reports"],
  },

  INFY: {
    company:"Infosys Limited", ticker:"INFY", exchange:"NSE/BSE", currency:"₹",
    sector:"IT Services",
    cmp:"₹1,820", market_cap:"₹7.5L Cr", w52h:"₹2,006", w52l:"₹1,358",
    pe:26.0, sector_pe:28.0, hist_pe:26.0,
    pb:8.5, sector_pb:10.0,
    ev_ebitda:18.5, sector_ev:20.0,
    de:0.0, interest_cov:null, curr_ratio:2.5,
    roe:32, roe_3y:30, roe_5y:29, roce:32, roce_3y:30, roce_5y:29,
    div_yield:2.8,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:20,prof:18},{y:"FY23",rev:15,prof:9},
      {y:"FY24",rev:2,prof:10},{y:"FY25",rev:5,prof:8},
    ],
    returns:[
      {y:"FY22",roe:28,roce:28},{y:"FY23",roe:30,roce:30},
      {y:"FY24",roe:31,roce:31},{y:"FY25",roe:32,roce:32},
    ],
    ownership:[
      {n:"Founders/Promoter",v:14.8},{n:"FII/Foreign",v:32.5},
      {n:"DII/Domestic Inst.",v:35.8},{n:"Retail/Public",v:16.9},
    ],
    peers:[
      {n:"TCS",pe:32.0,pb:15.2,roe:55.0,de:0.0,rev_g:5.0},
      {n:"Wipro",pe:24.0,pb:4.5,roe:18.0,de:0.0,rev_g:1.0},
      {n:"HCL Technologies",pe:26.0,pb:7.0,roe:24.0,de:0.0,rev_g:6.0},
    ],
    strengths:[
      "Strong free cash flow generation — FCF yield ~4% consistently",
      "High-quality AI/cloud capability building through Infosys Cobalt platform",
      "Generous capital return policy: dividends + buybacks consistently high",
    ],
    watch:[
      "Revenue growth guide has been revised down multiple times in FY24",
      "Lower promoter stake vs TCS creates less long-term alignment concern",
    ],
    risks:[
      {r:"Revenue growth stagnation in key BFSI and Retail verticals",s:"HIGH"},
      {r:"AI disruption to traditional application development and maintenance",s:"MEDIUM"},
      {r:"CEO transition risk and periodic management stability questions",s:"LOW"},
      {r:"USD revenue exposure to INR appreciation over the long term",s:"LOW"},
    ],
    summary:"Infosys is India's second-largest IT services firm with a strong AI and cloud strategy. The company has been more conservative on guidance than TCS. Trades at a slight discount to TCS on most multiples despite comparable service quality. Strong FCF generation and shareholder returns make it a dependable compounder in the IT sector.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","Infosys Annual Reports"],
  },

  HDFCBANK: {
    company:"HDFC Bank Limited", ticker:"HDFCBANK", exchange:"NSE/BSE", currency:"₹",
    sector:"Private Banking",
    cmp:"₹1,740", market_cap:"₹13.3L Cr", w52h:"₹1,880", w52l:"₹1,363",
    pe:18.0, sector_pe:16.0, hist_pe:22.0,
    pb:3.0, sector_pb:2.5,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:16.5, roe_3y:16.0, roe_5y:16.2, roce:14.5, roce_3y:14.0, roce_5y:14.2,
    div_yield:1.0,
    valuation:"FAIR", de_verdict:"MODERATE", quality:"Strong",
    growth:[
      {y:"FY22",rev:10,prof:18},{y:"FY23",rev:22,prof:20},
      {y:"FY24",rev:30,prof:33},{y:"FY25",rev:8,prof:10},
    ],
    returns:[
      {y:"FY22",roe:16.0,roce:14.0},{y:"FY23",roe:16.2,roce:14.2},
      {y:"FY24",roe:16.8,roce:14.8},{y:"FY25",roe:16.5,roce:14.5},
    ],
    ownership:[
      {n:"Institutional (post-merger)",v:25.8},{n:"FII/Foreign",v:47.5},
      {n:"DII/Domestic Inst.",v:20.5},{n:"Retail/Public",v:6.2},
    ],
    peers:[
      {n:"ICICI Bank",pe:18.5,pb:3.5,roe:18.5,de:null,rev_g:22.0},
      {n:"Kotak Mahindra Bank",pe:22.0,pb:4.0,roe:15.0,de:null,rev_g:18.0},
      {n:"Axis Bank",pe:14.0,pb:2.2,roe:18.0,de:null,rev_g:20.0},
    ],
    strengths:[
      "India's largest private bank by market cap with impeccable asset quality",
      "Consistent 20%+ EPS CAGR sustained over 20+ years pre-merger",
      "Low NPA ratios — best asset quality management in Indian banking",
    ],
    watch:[
      "Post HDFC merger, LDR is elevated — needs deposit mobilisation to sustain loan growth",
      "P/B has de-rated from 4x+ to 3x post-merger — re-rating needs ROE improvement",
    ],
    risks:[
      {r:"Deposit growth lagging loan growth post HDFC merger — NIM pressure",s:"HIGH"},
      {r:"Size creates inherent constraints on the growth trajectory going forward",s:"MEDIUM"},
      {r:"Rural/affordable housing exposure via HDFC adds different risk profile",s:"LOW"},
      {r:"High FII ownership (47.5%) creates outflow risk in global risk-off periods",s:"MEDIUM"},
    ],
    summary:"HDFC Bank is India's premier private bank with two decades of consistent performance. The merger with HDFC Limited has created execution complexity — elevated LDR and deposit mobilisation pressure are the key near-term challenges. The stock has underperformed the market post-merger. Resolution of the balance sheet normalisation will be the primary re-rating trigger.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","HDFC Bank Annual Reports"],
  },

  ICICIBANK: {
    company:"ICICI Bank Limited", ticker:"ICICIBANK", exchange:"NSE/BSE", currency:"₹",
    sector:"Private Banking",
    cmp:"₹1,220", market_cap:"₹8.6L Cr", w52h:"₹1,362", w52l:"₹970",
    pe:18.5, sector_pe:16.0, hist_pe:18.0,
    pb:3.5, sector_pb:2.5,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:18.5, roe_3y:16.8, roe_5y:14.5, roce:16.0, roce_3y:14.5, roce_5y:12.5,
    div_yield:0.8,
    valuation:"FAIR", de_verdict:"MODERATE", quality:"Strong",
    growth:[
      {y:"FY22",rev:12,prof:25},{y:"FY23",rev:28,prof:35},
      {y:"FY24",rev:22,prof:28},{y:"FY25",rev:14,prof:15},
    ],
    returns:[
      {y:"FY22",roe:14.5,roce:12.5},{y:"FY23",roe:17.0,roce:14.5},
      {y:"FY24",roe:18.2,roce:15.8},{y:"FY25",roe:18.5,roce:16.0},
    ],
    ownership:[
      {n:"Government/Institutions",v:22.5},{n:"FII/Foreign",v:46.0},
      {n:"DII/Domestic Inst.",v:24.0},{n:"Retail/Public",v:7.5},
    ],
    peers:[
      {n:"HDFC Bank",pe:18.0,pb:3.0,roe:16.5,de:null,rev_g:8.0},
      {n:"Kotak Mahindra Bank",pe:22.0,pb:4.0,roe:15.0,de:null,rev_g:18.0},
      {n:"Axis Bank",pe:14.0,pb:2.2,roe:18.0,de:null,rev_g:20.0},
    ],
    strengths:[
      "ROE has structurally improved from 12% to 18.5% over 5 years — best-in-class improvement",
      "Digital leadership: iMobile app with 20M+ users and best-in-class API banking",
      "Diversified revenue: retail, corporate, SME, and subsidiaries (ICICI Prudential, Lombard)",
    ],
    watch:[
      "Unsecured retail credit growth needs close monitoring for NPL buildup",
      "High FII ownership (46%) creates sensitivity to global capital flows",
    ],
    risks:[
      {r:"Rapid unsecured lending growth — personal loans and credit cards — adds NPA risk",s:"MEDIUM"},
      {r:"Global risk-off events trigger disproportionate FII selling due to high FII ownership",s:"MEDIUM"},
      {r:"Increasing competitive intensity from HDFC Bank, Kotak in retail deposits",s:"LOW"},
      {r:"Technology infrastructure investment needed to sustain digital leadership",s:"LOW"},
    ],
    summary:"ICICI Bank has engineered one of India's most impressive banking turnarounds — ROE has gone from sub-10% to 18.5% over a decade. Management quality is excellent and digital strategy is best-in-class. Currently trades at a slight premium to HDFC Bank on P/B, which is justified by superior ROE trajectory. A core holding for India financial sector exposure.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","ICICI Bank Annual Reports"],
  },

  HINDUNILVR: {
    company:"Hindustan Unilever Limited", ticker:"HINDUNILVR", exchange:"NSE/BSE", currency:"₹",
    sector:"FMCG",
    cmp:"₹2,520", market_cap:"₹5.9L Cr", w52h:"₹2,786", w52l:"₹2,172",
    pe:55.0, sector_pe:48.0, hist_pe:65.0,
    pb:12.5, sector_pb:10.0,
    ev_ebitda:38.0, sector_ev:32.0,
    de:0.0, interest_cov:null, curr_ratio:1.8,
    roe:18.5, roe_3y:17.5, roe_5y:16.5, roce:18.5, roce_3y:17.5, roce_5y:16.5,
    div_yield:1.5,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:10,prof:12},{y:"FY23",rev:16,prof:8},
      {y:"FY24",rev:0,prof:2},{y:"FY25",rev:4,prof:5},
    ],
    returns:[
      {y:"FY22",roe:17.0,roce:17.0},{y:"FY23",roe:17.5,roce:17.5},
      {y:"FY24",roe:18.0,roce:18.0},{y:"FY25",roe:18.5,roce:18.5},
    ],
    ownership:[
      {n:"Unilever (Promoter)",v:61.9},{n:"FII/Foreign",v:15.5},
      {n:"DII/Domestic Inst.",v:16.8},{n:"Retail/Public",v:5.8},
    ],
    peers:[
      {n:"Nestlé India",pe:72.0,pb:58.0,roe:115.0,de:0.0,rev_g:8.0},
      {n:"Dabur India",pe:48.0,pb:10.0,roe:22.0,de:0.0,rev_g:6.0},
      {n:"Marico",pe:46.0,pb:12.0,roe:36.0,de:0.0,rev_g:5.0},
    ],
    strengths:[
      "200+ brands across 14 categories — extraordinary product diversification",
      "Rural India distribution reach: 7M+ retail outlets, unmatched in FMCG",
      "Zero debt with strong FCF generation and consistent 100% dividend payout",
    ],
    watch:[
      "Volume growth has been flat to low in recent years — market share pressure",
      "D2C/e-commerce brands (Minimalist, Mama Earth) eroding premium segments",
    ],
    risks:[
      {r:"Flat volume growth in urban India as new-age D2C brands gain share",s:"HIGH"},
      {r:"Raw material cost (palm oil, crude) volatility pressures margins",s:"MEDIUM"},
      {r:"Premium multiple (P/E 55x) requires consistent earnings delivery",s:"MEDIUM"},
      {r:"Rural stress from agricultural income volatility impacts mass products",s:"LOW"},
    ],
    summary:"HUL is India's most dominant FMCG franchise, best compared to a slow-moving, incredibly durable compounding machine. Volume growth has been uninspiring recently. The premium valuation reflects franchise quality and stability rather than growth expectations. Best suited for conservative, long-term portfolios seeking quality with stability.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","HUL Annual Reports"],
  },

  WIPRO: {
    company:"Wipro Limited", ticker:"WIPRO", exchange:"NSE/BSE", currency:"₹",
    sector:"IT Services",
    cmp:"₹480", market_cap:"₹2.5L Cr", w52h:"₹583", w52l:"₹402",
    pe:24.0, sector_pe:28.0, hist_pe:23.0,
    pb:4.5, sector_pb:10.0,
    ev_ebitda:16.5, sector_ev:20.0,
    de:0.0, interest_cov:null, curr_ratio:2.8,
    roe:18.0, roe_3y:17.5, roe_5y:16.5, roce:18.0, roce_3y:17.5, roce_5y:16.5,
    div_yield:0.2,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Moderate",
    growth:[
      {y:"FY22",rev:28,prof:15},{y:"FY23",rev:15,prof:2},
      {y:"FY24",rev:0,prof:5},{y:"FY25",rev:1,prof:8},
    ],
    returns:[
      {y:"FY22",roe:17.0,roce:17.0},{y:"FY23",roe:17.2,roce:17.2},
      {y:"FY24",roe:17.8,roce:17.8},{y:"FY25",roe:18.0,roce:18.0},
    ],
    ownership:[
      {n:"Azim Premji (Promoter)",v:72.9},{n:"FII/Foreign",v:10.5},
      {n:"DII/Domestic Inst.",v:11.2},{n:"Retail/Public",v:5.4},
    ],
    peers:[
      {n:"TCS",pe:32.0,pb:15.2,roe:55.0,de:0.0,rev_g:5.0},
      {n:"Infosys",pe:26.0,pb:8.5,roe:32.0,de:0.0,rev_g:5.0},
      {n:"HCL Technologies",pe:26.0,pb:7.0,roe:24.0,de:0.0,rev_g:6.0},
    ],
    strengths:[
      "Zero debt balance sheet with ₹20,000 Cr+ in cash and investments",
      "Strong AI/cloud capabilities via consulting-led deals",
      "Azim Premji Foundation — strong governance and philanthropic reputation",
    ],
    watch:[
      "Revenue growth consistently lags TCS, Infosys, and HCL — execution gap persists",
      "Margin improvement has been slower than peers despite cost rationalisation",
    ],
    risks:[
      {r:"Structural growth underperformance vs Tier-1 peers raises positioning questions",s:"HIGH"},
      {r:"Consulting-heavy model is expensive to maintain and harder to scale",s:"MEDIUM"},
      {r:"AI-driven disruption to Wipro's core services delivery model",s:"MEDIUM"},
      {r:"Limited inorganic growth optionality vs historical pace of acquisitions",s:"LOW"},
    ],
    summary:"Wipro is a well-governed, financially sound IT services company that consistently underperforms TCS and Infosys on revenue growth and margins. The stock's discount to peers is partially justified. New CEO's strategic reset and focus on consulting is sensible but will take time. A long-term value play within Indian IT rather than a growth story.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","Wipro Annual Reports"],
  },

  BHARTIARTL: {
    company:"Bharti Airtel Limited", ticker:"BHARTIARTL", exchange:"NSE/BSE", currency:"₹",
    sector:"Telecoms",
    cmp:"₹1,620", market_cap:"₹9.6L Cr", w52h:"₹1,779", w52l:"₹1,050",
    pe:78.0, sector_pe:45.0, hist_pe:80.0,
    pb:10.5, sector_pb:5.0,
    ev_ebitda:12.5, sector_ev:10.0,
    de:1.8, interest_cov:3.5, curr_ratio:0.8,
    roe:14.0, roe_3y:10.5, roe_5y:7.5, roce:12.0, roce_3y:9.0, roce_5y:6.5,
    div_yield:0.5,
    valuation:"EXPENSIVE", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY22",rev:15,prof:null},{y:"FY23",rev:20,prof:800},
      {y:"FY24",rev:8,prof:95},{y:"FY25",rev:10,prof:40},
    ],
    returns:[
      {y:"FY22",roe:5.0,roce:4.5},{y:"FY23",roe:8.5,roce:7.5},
      {y:"FY24",roe:12.0,roce:10.0},{y:"FY25",roe:14.0,roce:12.0},
    ],
    ownership:[
      {n:"Sunil Mittal/Promoters",v:55.9},{n:"FII/Foreign",v:25.5},
      {n:"DII/Domestic Inst.",v:12.8},{n:"Retail/Public",v:5.8},
    ],
    peers:[
      {n:"Reliance Jio (unlisted)",pe:null,pb:null,roe:null,de:null,rev_g:null},
      {n:"Vodafone Idea",pe:null,pb:null,roe:null,de:null,rev_g:null},
      {n:"BSNL (unlisted)",pe:null,pb:null,roe:null,de:null,rev_g:null},
    ],
    strengths:[
      "India's second-largest telecom — strong ARPU expansion via tariff hikes",
      "5G rollout progressing rapidly — network quality improving vs Jio",
      "Africa operations (Airtel Africa) provide diversification and growth",
    ],
    watch:[
      "P/E of 78x is extremely high — premium is priced for continued strong ARPU growth",
      "D/E of 1.8 and heavy capex cycle limits near-term free cash flow",
    ],
    risks:[
      {r:"Intense competition from Jio (Reliance) on pricing and network quality",s:"HIGH"},
      {r:"Heavy capex requirement for 5G rollout strains free cash flow",s:"HIGH"},
      {r:"Vodafone Idea collapse risk could trigger regulatory complications",s:"MEDIUM"},
      {r:"AGR dues and regulatory levies remain an overhang",s:"MEDIUM"},
    ],
    summary:"Bharti Airtel is India's premium telecom franchise with accelerating ARPU and improving return ratios. The 5G buildout and tariff hike cycle are key value drivers. Trades at a very high multiple justified by strong ARPU expansion visibility. The competitive duopoly (Jio-Airtel) actually works in Airtel's favour long-term — fewer competitors, stronger pricing power.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","Airtel Annual Reports"],
  },

  ITC: {
    company:"ITC Limited", ticker:"ITC", exchange:"NSE/BSE", currency:"₹",
    sector:"FMCG / Cigarettes / Hotels / Agri",
    cmp:"₹440", market_cap:"₹5.5L Cr", w52h:"₹528", w52l:"₹390",
    pe:28.0, sector_pe:32.0, hist_pe:30.0,
    pb:7.5, sector_pb:8.0,
    ev_ebitda:18.5, sector_ev:22.0,
    de:0.0, interest_cov:null, curr_ratio:2.2,
    roe:28.0, roe_3y:26.5, roe_5y:25.0, roce:28.0, roce_3y:26.5, roce_5y:25.0,
    div_yield:3.8,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:18,prof:22},{y:"FY23",rev:22,prof:20},
      {y:"FY24",rev:4,prof:8},{y:"FY25",rev:5,prof:7},
    ],
    returns:[
      {y:"FY22",roe:24.5,roce:24.5},{y:"FY23",roe:26.0,roce:26.0},
      {y:"FY24",roe:27.0,roce:27.0},{y:"FY25",roe:28.0,roce:28.0},
    ],
    ownership:[
      {n:"Institutional (BAT via NV Group)",v:29.6},{n:"FII/Foreign",v:40.8},
      {n:"DII/Domestic Inst.",v:24.2},{n:"Retail/Public",v:5.4},
    ],
    peers:[
      {n:"Godfrey Phillips",pe:22.0,pb:6.5,roe:30.0,de:0.0,rev_g:18.0},
      {n:"VST Industries",pe:20.0,pb:5.5,roe:28.0,de:0.0,rev_g:10.0},
      {n:"HUL",pe:55.0,pb:12.5,roe:18.5,de:0.0,rev_g:4.0},
    ],
    strengths:[
      "Near-monopoly in India's cigarette industry with massive cash generation",
      "Zero debt, ₹35,000 Cr+ cash reserves funding FMCG and hotels investment",
      "Structurally improving FMCG business (Aashirvaad, Sunfeast, Bingo) building scale",
    ],
    watch:[
      "Cigarettes segment (70%+ of profits) faces long-term regulatory and ESG headwinds",
      "Hotels and paperboards segments are capital intensive with lower returns",
    ],
    risks:[
      {r:"ESG-driven institutional selling due to tobacco exposure",s:"MEDIUM"},
      {r:"Government excise duty increases on cigarettes — recurring regulatory risk",s:"MEDIUM"},
      {r:"FMCG investment drag: still loss-making in some categories vs HUL",s:"LOW"},
      {r:"Hotels segment: high capex, cyclical demand exposure",s:"LOW"},
    ],
    summary:"ITC is India's most controversial quality stock — exceptional cash generation from its near-monopoly cigarette business, but saddled with tobacco ESG concerns. The FMCG and hotels businesses are still in investment mode. Trades at a discount to HUL despite comparable returns — the tobacco discount persists. A value play for investors willing to look past the ESG label.",
    data_confidence:"High", sources:["NSE","BSE","Screener.in","ITC Annual Reports"],
  },

  ADANIPORTS: {
    company:"Adani Ports and SEZ Limited", ticker:"ADANIPORTS", exchange:"NSE/BSE", currency:"₹",
    sector:"Infrastructure / Ports",
    cmp:"₹1,380", market_cap:"₹2.98L Cr", w52h:"₹1,621", w52l:"₹1,017",
    pe:32.0, sector_pe:28.0, hist_pe:30.0,
    pb:6.5, sector_pb:4.0,
    ev_ebitda:18.5, sector_ev:15.0,
    de:1.2, interest_cov:4.2, curr_ratio:0.9,
    roe:20.5, roe_3y:18.0, roe_5y:15.5, roce:15.5, roce_3y:13.5, roce_5y:11.5,
    div_yield:0.6,
    valuation:"FAIR", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY22",rev:28,prof:35},{y:"FY23",rev:25,prof:22},
      {y:"FY24",rev:22,prof:38},{y:"FY25",rev:12,prof:14},
    ],
    returns:[
      {y:"FY22",roe:15.5,roce:11.5},{y:"FY23",roe:17.0,roce:12.5},
      {y:"FY24",roe:19.0,roce:14.5},{y:"FY25",roe:20.5,roce:15.5},
    ],
    ownership:[
      {n:"Adani Family (Promoter)",v:65.9},{n:"FII/Foreign",v:17.5},
      {n:"DII/Domestic Inst.",v:11.5},{n:"Retail/Public",v:5.1},
    ],
    peers:[
      {n:"JSW Infrastructure",pe:58.0,pb:8.5,roe:14.0,de:0.4,rev_g:30.0},
      {n:"Gujarat Pipavav",pe:22.0,pb:3.5,roe:18.0,de:0.0,rev_g:12.0},
      {n:"Essar Ports",pe:null,pb:null,roe:null,de:null,rev_g:null},
    ],
    strengths:[
      "India's largest commercial port operator with 25%+ of total port cargo",
      "Long-term concession-based revenue provides visibility and pricing power",
      "Vertically integrated logistics: ports + rail + warehousing + SEZ",
    ],
    watch:[
      "Hindenburg short-seller report (2023) raised governance questions — still an overhang",
      "High promoter holding (65.9%) and group-level leverage concerns",
    ],
    risks:[
      {r:"Governance and related-party transaction risks following Hindenburg report",s:"HIGH"},
      {r:"Group-level Adani conglomerate leverage could create cross-contagion risk",s:"HIGH"},
      {r:"Project execution risk on large greenfield port expansions",s:"MEDIUM"},
      {r:"Container traffic sensitivity to global trade slowdown",s:"MEDIUM"},
    ],
    summary:"Adani Ports is India's dominant port operator with genuine business quality — long-term concessions, pricing power, and logistics integration. The Hindenburg episode created a governance discount that partially persists. Business fundamentals remain solid with consistent cargo volume growth. The promoter concentration and group-level leverage are legitimate risks that keep the valuation below pure-quality peers.",
    data_confidence:"Moderate", sources:["NSE","BSE","Screener.in","Adani Ports Annual Reports"],
  },

  // ── Global ────────────────────────────────────────────────────────────────
  AAPL: {
    company:"Apple Inc.", ticker:"AAPL", exchange:"NASDAQ", currency:"$",
    sector:"Consumer Technology",
    cmp:"$213", market_cap:"$3.28T", w52h:"$237", w52l:"$165",
    pe:34.0, sector_pe:28.0, hist_pe:30.0,
    pb:52.0, sector_pb:15.0,
    ev_ebitda:24.5, sector_ev:20.0,
    de:1.5, interest_cov:35.0, curr_ratio:1.07,
    roe:155, roe_3y:142, roe_5y:128, roce:55, roce_3y:50, roce_5y:45,
    div_yield:0.5,
    valuation:"FAIR", de_verdict:"MODERATE", quality:"Strong",
    growth:[
      {y:"FY22",rev:8,prof:5},{y:"FY23",rev:-3,prof:-3},
      {y:"FY24",rev:2,prof:10},{y:"FY25e",rev:5,prof:8},
    ],
    returns:[
      {y:"FY22",roe:145,roce:50},{y:"FY23",roe:150,roce:52},
      {y:"FY24",roe:153,roce:54},{y:"FY25e",roe:155,roce:55},
    ],
    ownership:[
      {n:"Vanguard Group",v:9.2},{n:"BlackRock",v:7.0},
      {n:"Berkshire Hathaway",v:5.8},{n:"Other Inst./Retail",v:78.0},
    ],
    peers:[
      {n:"Microsoft",pe:36.0,pb:13.0,roe:38.0,de:0.3,rev_g:15.0},
      {n:"Alphabet (Google)",pe:24.0,pb:7.5,roe:28.0,de:0.0,rev_g:14.0},
      {n:"Samsung Electronics",pe:17.0,pb:1.6,roe:10.0,de:0.0,rev_g:5.0},
    ],
    strengths:[
      "World's most valuable brand — iPhone ecosystem with 2B+ active devices",
      "Services revenue ($100B+ annual run rate) growing at 14% — high-margin recurring",
      "Extraordinary capital returns: $90B+ buybacks annually reducing share count",
    ],
    watch:[
      "iPhone revenue growth has been flat to declining — hardware saturation",
      "China revenue (18% of total) faces geopolitical and competitive risk",
    ],
    risks:[
      {r:"China market risk: both manufacturing concentration and revenue exposure",s:"HIGH"},
      {r:"Antitrust pressure on App Store fees (30% cut) in US, EU, globally",s:"HIGH"},
      {r:"iPhone replacement cycles lengthening — hardware revenue stagnation",s:"MEDIUM"},
      {r:"AI monetisation unclear — Siri historically behind Google/OpenAI",s:"MEDIUM"},
    ],
    summary:"Apple is the world's most dominant consumer tech franchise with an unparalleled ecosystem moat. Services is the key growth driver and margin expander. The China risk (manufacturing + revenues) is the most significant near-term overhang. Trading at 34x is reasonable for a high-quality compounder with $100B+ annual buybacks supporting EPS growth.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  MSFT: {
    company:"Microsoft Corporation", ticker:"MSFT", exchange:"NASDAQ", currency:"$",
    sector:"Cloud / Software / AI",
    cmp:"$420", market_cap:"$3.12T", w52h:"$468", w52l:"$310",
    pe:36.0, sector_pe:28.0, hist_pe:32.0,
    pb:13.0, sector_pb:12.0,
    ev_ebitda:27.5, sector_ev:22.0,
    de:0.3, interest_cov:55.0, curr_ratio:1.3,
    roe:38.0, roe_3y:42.0, roe_5y:40.0, roce:32.0, roce_3y:35.0, roce_5y:33.0,
    div_yield:0.7,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:18,prof:19},{y:"FY23",rev:7,prof:-1},
      {y:"FY24",rev:16,prof:22},{y:"FY25e",rev:15,prof:16},
    ],
    returns:[
      {y:"FY22",roe:44.0,roce:37.0},{y:"FY23",roe:38.0,roce:32.0},
      {y:"FY24",roe:36.0,roce:30.0},{y:"FY25e",roe:38.0,roce:32.0},
    ],
    ownership:[
      {n:"Vanguard Group",v:9.0},{n:"BlackRock",v:7.5},
      {n:"State Street",v:4.2},{n:"Other Inst./Retail",v:79.3},
    ],
    peers:[
      {n:"Apple",pe:34.0,pb:52.0,roe:155.0,de:1.5,rev_g:5.0},
      {n:"Alphabet",pe:24.0,pb:7.5,roe:28.0,de:0.0,rev_g:14.0},
      {n:"Amazon",pe:42.0,pb:10.0,roe:22.0,de:0.5,rev_g:12.0},
    ],
    strengths:[
      "Azure cloud growing 30%+ — #2 cloud behind AWS with accelerating AI workloads",
      "OpenAI partnership (49% stake effectively) positions MSFT at the centre of AI",
      "Office 365 + Dynamics: 300M+ commercial seats, recurring subscription moat",
    ],
    watch:[
      "Activision integration ($69B acquisition) is a complex, expensive distraction",
      "AI Copilot monetisation is in early stages — ROI for enterprise customers unclear",
    ],
    risks:[
      {r:"Antitrust scrutiny on cloud bundling practices in EU and US",s:"MEDIUM"},
      {r:"OpenAI dependency — if relationship breaks down, AI narrative weakens",s:"MEDIUM"},
      {r:"Cloud growth deceleration risk if enterprise AI spend disappoints",s:"LOW"},
      {r:"Gaming market cyclicality (Xbox, Activision) adds revenue volatility",s:"LOW"},
    ],
    summary:"Microsoft is arguably the best-positioned mega-cap for the AI era — Azure + OpenAI + Copilot across 300M+ Office seats. Revenue and margin trajectory are strongly positive. The premium valuation (36x) is justified by the quality, diversification, and AI positioning. One of the most consistent large-cap compounders globally.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  GOOGL: {
    company:"Alphabet Inc. (Google)", ticker:"GOOGL", exchange:"NASDAQ", currency:"$",
    sector:"Digital Advertising / Cloud / AI",
    cmp:"$175", market_cap:"$2.16T", w52h:"$207", w52l:"$130",
    pe:24.0, sector_pe:28.0, hist_pe:25.0,
    pb:7.5, sector_pb:12.0,
    ev_ebitda:18.5, sector_ev:22.0,
    de:0.0, interest_cov:null, curr_ratio:2.1,
    roe:28.0, roe_3y:25.0, roe_5y:22.0, roce:25.0, roce_3y:22.0, roce_5y:19.0,
    div_yield:0.5,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:10,prof:-21},{y:"FY23",rev:9,prof:23},
      {y:"FY24",rev:14,prof:36},{y:"FY25e",rev:13,prof:15},
    ],
    returns:[
      {y:"FY22",roe:22.0,roce:19.0},{y:"FY23",roe:24.0,roce:21.0},
      {y:"FY24",roe:27.0,roce:24.0},{y:"FY25e",roe:28.0,roce:25.0},
    ],
    ownership:[
      {n:"Vanguard Group",v:8.5},{n:"BlackRock",v:7.0},
      {n:"Founders (Page/Brin)",v:10.5},{n:"Other Inst./Retail",v:74.0},
    ],
    peers:[
      {n:"Microsoft",pe:36.0,pb:13.0,roe:38.0,de:0.3,rev_g:15.0},
      {n:"Meta Platforms",pe:26.0,pb:8.0,roe:34.0,de:0.0,rev_g:22.0},
      {n:"Amazon",pe:42.0,pb:10.0,roe:22.0,de:0.5,rev_g:12.0},
    ],
    strengths:[
      "92% search market share — the most dominant digital advertising franchise",
      "Google Cloud growing 28%+ — approaching AWS/Azure with strong AI integration",
      "$100B+ net cash on balance sheet — pristine financial position",
    ],
    watch:[
      "AI chatbots (ChatGPT, Perplexity) threaten core search advertising model",
      "YouTube monetisation efficiency still trails Meta's Reels on ROI for advertisers",
    ],
    risks:[
      {r:"AI search disruption risk — ChatGPT/Perplexity threatening query volume",s:"HIGH"},
      {r:"Antitrust: DOJ ruling that Google illegally monopolised search — remedy TBD",s:"HIGH"},
      {r:"Regulatory pressure on advertising data practices in EU (GDPR, DSA)",s:"MEDIUM"},
      {r:"Other Bets (Waymo, DeepMind) are long-dated and capital intensive",s:"LOW"},
    ],
    summary:"Alphabet trades at the cheapest valuation among Mag-7 peers despite owning the world's dominant search engine, a top-3 cloud platform, and YouTube. The AI disruption risk to search is real but overstated near-term. The DOJ antitrust ruling is the most significant structural risk. At 24x earnings with $100B+ cash, Alphabet looks attractively valued for quality.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  AMZN: {
    company:"Amazon.com Inc.", ticker:"AMZN", exchange:"NASDAQ", currency:"$",
    sector:"E-commerce / Cloud / Logistics",
    cmp:"$195", market_cap:"$2.06T", w52h:"$230", w52l:"$153",
    pe:42.0, sector_pe:30.0, hist_pe:100.0,
    pb:10.0, sector_pb:12.0,
    ev_ebitda:20.0, sector_ev:22.0,
    de:0.5, interest_cov:12.0, curr_ratio:1.0,
    roe:22.0, roe_3y:12.0, roe_5y:14.0, roce:18.0, roce_3y:10.0, roce_5y:11.0,
    div_yield:0.0,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:9,prof:-200},{y:"FY23",rev:12,prof:null},
      {y:"FY24",rev:11,prof:225},{y:"FY25e",rev:11,prof:20},
    ],
    returns:[
      {y:"FY22",roe:-2.0,roce:-1.5},{y:"FY23",roe:8.0,roce:6.5},
      {y:"FY24",roe:18.0,roce:14.5},{y:"FY25e",roe:22.0,roce:18.0},
    ],
    ownership:[
      {n:"Jeff Bezos",v:9.5},{n:"Vanguard Group",v:8.2},
      {n:"BlackRock",v:6.5},{n:"Other Inst./Retail",v:75.8},
    ],
    peers:[
      {n:"Microsoft",pe:36.0,pb:13.0,roe:38.0,de:0.3,rev_g:15.0},
      {n:"Alphabet",pe:24.0,pb:7.5,roe:28.0,de:0.0,rev_g:14.0},
      {n:"Walmart",pe:32.0,pb:8.0,roe:18.0,de:0.5,rev_g:5.0},
    ],
    strengths:[
      "AWS is the #1 cloud platform globally — $100B+ annual revenue, 30%+ EBIT margin",
      "Prime membership flywheel: 200M+ subscribers drive repeat e-commerce",
      "Advertising business: $50B+ and growing 20%+ — high-margin, undervalued asset",
    ],
    watch:[
      "E-commerce margins remain thin — profitability driven almost entirely by AWS",
      "Significant capex cycle ($75B+ in 2024) for AI/data centre buildout",
    ],
    risks:[
      {r:"Antitrust risk on e-commerce marketplace practices (FTC lawsuit)",s:"HIGH"},
      {r:"AWS market share erosion risk from Azure (Microsoft) and Google Cloud",s:"MEDIUM"},
      {r:"Massive capex commitment ($75B+) for AI infrastructure — execution risk",s:"MEDIUM"},
      {r:"Labour and logistics cost inflation in e-commerce fulfilment network",s:"LOW"},
    ],
    summary:"Amazon is really two companies: AWS (the profit engine) and e-commerce (the volume engine). The dramatic profitability recovery in FY23-24 — from near-zero to strong margins — has re-rated the stock significantly. AWS + Advertising together generate high-margin cash flows that support the e-commerce investment. The AI capex cycle is the key near-term watch item.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  NVDA: {
    company:"NVIDIA Corporation", ticker:"NVDA", exchange:"NASDAQ", currency:"$",
    sector:"Semiconductors / AI Infrastructure",
    cmp:"$118", market_cap:"$2.9T", w52h:"$153", w52l:"$76",
    pe:38.0, sector_pe:35.0, hist_pe:60.0,
    pb:40.0, sector_pb:15.0,
    ev_ebitda:30.0, sector_ev:25.0,
    de:0.4, interest_cov:85.0, curr_ratio:4.5,
    roe:123, roe_3y:80, roe_5y:55, roce:95, roce_3y:62, roce_5y:42,
    div_yield:0.03,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY23",rev:1,prof:-55},{y:"FY24",rev:122,prof:580},
      {y:"FY25",rev:114,prof:145},{y:"FY26e",rev:55,prof:45},
    ],
    returns:[
      {y:"FY23",roe:22.0,roce:18.0},{y:"FY24",roe:85.0,roce:65.0},
      {y:"FY25",roe:120.0,roce:92.0},{y:"FY26e",roe:123.0,roce:95.0},
    ],
    ownership:[
      {n:"Jensen Huang (Founder-CEO)",v:3.5},{n:"Vanguard Group",v:8.8},
      {n:"BlackRock",v:7.2},{n:"Other Inst./Retail",v:80.5},
    ],
    peers:[
      {n:"AMD",pe:45.0,pb:4.5,roe:4.0,de:0.1,rev_g:13.0},
      {n:"Intel",pe:null,pb:1.0,roe:-5.0,de:0.8,rev_g:-3.0},
      {n:"Broadcom",pe:32.0,pb:10.0,roe:25.0,de:1.2,rev_g:44.0},
    ],
    strengths:[
      "Monopoly on AI training GPUs — H100/H200/Blackwell have no credible competitor",
      "CUDA software ecosystem creates an unbreakable switching cost moat",
      "Data centre revenue growing 100%+ — supply cannot keep up with demand",
    ],
    watch:[
      "Revenue base is now so large that maintaining current growth rates is mathematically harder",
      "Customer concentration: Microsoft, Google, Meta, Amazon = ~40% of revenue",
    ],
    risks:[
      {r:"AI investment cycle could slow — hyperscaler capex cuts would hit NVDA first",s:"HIGH"},
      {r:"China export restrictions prevent sales to world's second-largest AI market",s:"HIGH"},
      {r:"AMD, Google TPUs, AWS Trainium building credible GPU alternatives",s:"MEDIUM"},
      {r:"Valuation leaves no room for execution miss — any guidance cut is punished heavily",s:"MEDIUM"},
    ],
    summary:"NVIDIA is the infrastructure backbone of the AI revolution. The CUDA moat and GPU supply shortage gave NVIDIA a once-in-a-generation pricing power moment. Growth will mathematically slow from triple-digits but the structural demand for AI compute remains intact. Trading at 38x forward earnings — cheap relative to growth but sensitive to any AI investment slowdown signal.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  TSLA: {
    company:"Tesla Inc.", ticker:"TSLA", exchange:"NASDAQ", currency:"$",
    sector:"Electric Vehicles / Energy / AI",
    cmp:"$250", market_cap:"$800B", w52h:"$300", w52l:"$138",
    pe:65.0, sector_pe:15.0, hist_pe:100.0,
    pb:14.0, sector_pb:5.0,
    ev_ebitda:35.0, sector_ev:12.0,
    de:0.1, interest_cov:45.0, curr_ratio:1.8,
    roe:13.0, roe_3y:22.0, roe_5y:18.0, roce:12.0, roce_3y:20.0, roce_5y:16.0,
    div_yield:0.0,
    valuation:"EXPENSIVE", de_verdict:"SAFE", quality:"Moderate",
    growth:[
      {y:"FY22",rev:51,prof:128},{y:"FY23",rev:19,prof:-23},
      {y:"FY24",rev:-1,prof:-52},{y:"FY25e",rev:12,prof:30},
    ],
    returns:[
      {y:"FY22",roe:28.0,roce:25.0},{y:"FY23",roe:22.0,roce:20.0},
      {y:"FY24",roe:13.0,roce:12.0},{y:"FY25e",roe:15.0,roce:13.5},
    ],
    ownership:[
      {n:"Elon Musk",v:13.0},{n:"Vanguard Group",v:7.8},
      {n:"BlackRock",v:5.5},{n:"Other Inst./Retail",v:73.7},
    ],
    peers:[
      {n:"BYD",pe:18.0,pb:3.5,roe:18.0,de:0.4,rev_g:42.0},
      {n:"Rivian",pe:null,pb:1.5,roe:-55.0,de:0.8,rev_g:8.0},
      {n:"Lucid Group",pe:null,pb:1.2,roe:-120.0,de:0.5,rev_g:25.0},
    ],
    strengths:[
      "Largest EV brand globally with best charging network (Supercharger, now open-standard)",
      "Software/OTA advantage: continuous vehicle improvement without dealership",
      "Energy storage (Megapack) is a high-growth, high-margin business still undervalued",
    ],
    watch:[
      "Automotive margins have declined sharply — price war with BYD is structural",
      "Valuation (P/E 65x) is priced on FSD/Robotaxi and Optimus robot — not cars",
    ],
    risks:[
      {r:"BYD and Chinese EV makers taking global market share with lower-priced vehicles",s:"HIGH"},
      {r:"FSD (Full Self Driving) regulatory approval and liability risk remains unresolved",s:"HIGH"},
      {r:"Elon Musk brand risk — political controversies damaging Tesla brand globally",s:"HIGH"},
      {r:"Robotaxi and Optimus timelines are highly uncertain — priced in at current valuation",s:"MEDIUM"},
    ],
    summary:"Tesla is the most polarising stock in global markets — priced as a tech/AI company (P/E 65x) but reporting like a maturing automaker with declining margins. The Robotaxi and Optimus optionality are real but far-future. The core auto business faces structural margin pressure from BYD. For Tesla bulls, the bet is on FSD/robotics; for bears, on automotive commoditisation. Both views are defensible.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  META: {
    company:"Meta Platforms Inc.", ticker:"META", exchange:"NASDAQ", currency:"$",
    sector:"Social Media / Digital Advertising / AI",
    cmp:"$550", market_cap:"$1.38T", w52h:"$638", w52l:"$415",
    pe:26.0, sector_pe:28.0, hist_pe:22.0,
    pb:8.0, sector_pb:10.0,
    ev_ebitda:20.0, sector_ev:20.0,
    de:0.0, interest_cov:null, curr_ratio:2.7,
    roe:34.0, roe_3y:28.0, roe_5y:24.0, roce:30.0, roce_3y:25.0, roce_5y:21.0,
    div_yield:0.3,
    valuation:"FAIR", de_verdict:"SAFE", quality:"Strong",
    growth:[
      {y:"FY22",rev:-1,prof:-41},{y:"FY23",rev:16,prof:69},
      {y:"FY24",rev:22,prof:59},{y:"FY25e",rev:16,prof:18},
    ],
    returns:[
      {y:"FY22",roe:18.0,roce:16.0},{y:"FY23",roe:25.0,roce:22.0},
      {y:"FY24",roe:32.0,roce:28.0},{y:"FY25e",roe:34.0,roce:30.0},
    ],
    ownership:[
      {n:"Mark Zuckerberg",v:13.6},{n:"Vanguard Group",v:8.5},
      {n:"BlackRock",v:6.8},{n:"Other Inst./Retail",v:71.1},
    ],
    peers:[
      {n:"Alphabet",pe:24.0,pb:7.5,roe:28.0,de:0.0,rev_g:14.0},
      {n:"Snap",pe:null,pb:4.5,roe:-25.0,de:0.2,rev_g:15.0},
      {n:"Pinterest",pe:28.0,pb:4.5,roe:12.0,de:0.0,rev_g:16.0},
    ],
    strengths:[
      "3B+ daily active users across Facebook, Instagram, WhatsApp — unmatched scale",
      "Reels monetisation gap closed with YouTube — advertising efficiency improving",
      "AI ad targeting (Advantage+) driving superior advertiser ROI vs competitors",
    ],
    watch:[
      "Reality Labs (VR/AR) burning $15B+ annually with unclear commercial timeline",
      "Teen/young adult user engagement declining on Facebook in Western markets",
    ],
    risks:[
      {r:"Reality Labs: $15B+ annual losses with no near-term commercial return",s:"HIGH"},
      {r:"Regulatory risk: EU DSA/DMA fines, US FTC antitrust breakup risk",s:"HIGH"},
      {r:"AI-generated content/misinformation risk requires expensive content moderation",s:"MEDIUM"},
      {r:"TikTok ban/ban reversal uncertainty affects competitive dynamics",s:"LOW"},
    ],
    summary:"Meta executed one of the great corporate turnarounds — from 2022's 'Year of Efficiency' crisis to 2024's best-performing Mag-7. Advertising is strong, AI-driven efficiency is real, and Reels has been successfully monetised. The Reality Labs drag is the main objection. Trades at a discount to other digital ad peers on a clean earnings basis, which looks attractive.",
    data_confidence:"High", sources:["NASDAQ","SEC filings","Bloomberg"],
  },

  BP: {
    company:"BP PLC", ticker:"BP", exchange:"LSE", currency:"£",
    sector:"Integrated Oil & Gas",
    cmp:"£4.05", market_cap:"£61B", w52h:"£5.38", w52l:"£3.82",
    pe:8.5, sector_pe:10.0, hist_pe:12.0,
    pb:1.0, sector_pb:1.2,
    ev_ebitda:4.5, sector_ev:5.5,
    de:0.5, interest_cov:6.5, curr_ratio:1.1,
    roe:11.5, roe_3y:14.0, roe_5y:9.5, roce:9.5, roce_3y:11.5, roce_5y:7.5,
    div_yield:5.8,
    valuation:"CHEAP", de_verdict:"SAFE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:30,prof:null},{y:"FY22",rev:38,prof:180},
      {y:"FY23",rev:-20,prof:-60},{y:"FY24",rev:-5,prof:-28},
    ],
    returns:[
      {y:"FY21",roe:8.5,roce:7.0},{y:"FY22",roe:20.0,roce:16.5},
      {y:"FY23",roe:13.0,roce:10.5},{y:"FY24",roe:11.5,roce:9.5},
    ],
    ownership:[
      {n:"BlackRock",v:7.2},{n:"Vanguard Group",v:5.8},
      {n:"Norges Bank (Norway)",v:5.0},{n:"Other Inst./Retail",v:82.0},
    ],
    peers:[
      {n:"Shell",pe:10.0,pb:1.3,roe:13.5,de:0.3,rev_g:-10.0},
      {n:"TotalEnergies",pe:10.5,pb:1.4,roe:14.0,de:0.4,rev_g:-8.0},
      {n:"ExxonMobil",pe:13.0,pb:2.0,roe:15.5,de:0.2,rev_g:5.0},
    ],
    strengths:[
      "5.8% dividend yield — one of the highest among FTSE 100 mega-caps",
      "Significant gas portfolio provides lower-carbon transition bridge asset",
      "Strategic pivot to renewables/EV charging through BP Pulse network",
    ],
    watch:[
      "Green energy strategy U-turn in 2024 — pulled back from renewables targets, credibility risk",
      "High capex requirement balancing legacy oil production maintenance with renewables",
    ],
    risks:[
      {r:"Oil price sensitivity: BP earnings highly correlated to Brent crude prices",s:"HIGH"},
      {r:"Energy transition strategy inconsistency — flip-flopped on renewables targets",s:"HIGH"},
      {r:"Legacy liabilities: Deepwater Horizon legal costs still lingering",s:"MEDIUM"},
      {r:"Political risk: windfall tax exposure in UK and Europe",s:"MEDIUM"},
    ],
    summary:"BP is one of the cheapest major oil companies by valuation metrics. The 5.8% dividend is attractive and well-covered. The credibility issue is BP's muddled energy transition strategy — management pulled back from ambitious renewables targets, undermining ESG positioning without fully committing to pure oil/gas. Trades at a discount to Shell and TotalEnergies, partly justified.",
    data_confidence:"High", sources:["LSE","BP Annual Reports","Bloomberg"],
  },

  HSBC: {
    company:"HSBC Holdings PLC", ticker:"HSBC", exchange:"LSE/HKEX", currency:"$",
    sector:"International Banking",
    cmp:"$9.80 (£7.70)", market_cap:"$165B", w52h:"$10.50", w52l:"$6.58",
    pe:8.0, sector_pe:10.0, hist_pe:12.0,
    pb:1.0, sector_pb:1.0,
    ev_ebitda:null, sector_ev:null,
    de:null, interest_cov:null, curr_ratio:null,
    roe:14.5, roe_3y:11.0, roe_5y:7.5, roce:12.0, roce_3y:9.0, roce_5y:6.0,
    div_yield:7.2,
    valuation:"CHEAP", de_verdict:"MODERATE", quality:"Moderate",
    growth:[
      {y:"FY21",rev:8,prof:null},{y:"FY22",rev:25,prof:90},
      {y:"FY23",rev:30,prof:78},{y:"FY24",rev:-5,prof:-10},
    ],
    returns:[
      {y:"FY21",roe:5.5,roce:4.5},{y:"FY22",roe:9.5,roce:8.0},
      {y:"FY23",roe:14.0,roce:11.5},{y:"FY24",roe:14.5,roce:12.0},
    ],
    ownership:[
      {n:"Ping An Insurance",v:8.0},{n:"BlackRock",v:5.5},
      {n:"Vanguard Group",v:4.2},{n:"Other Inst./Retail",v:82.3},
    ],
    peers:[
      {n:"Standard Chartered",pe:7.5,pb:0.6,roe:8.5,de:null,rev_g:15.0},
      {n:"Barclays",pe:6.5,pb:0.5,roe:10.5,de:null,rev_g:8.0},
      {n:"JPMorgan Chase",pe:12.0,pb:2.0,roe:17.0,de:null,rev_g:8.0},
    ],
    strengths:[
      "World's largest trade finance bank — unique cross-border connectivity",
      "Dominant Hong Kong/Asia position — benefits from Asia growth story",
      "7.2% dividend yield with $3B+ buyback programme ongoing",
    ],
    watch:[
      "Pivot to Asia strategy creates concentration in China/HK — geopolitical risk",
      "Western market exits reduce diversification that historically justified premium",
    ],
    risks:[
      {r:"China/HK geopolitical risk: HSBC's dominant exposure to the highest-risk bilateral",s:"HIGH"},
      {r:"Rate cut cycle will compress NIM — significant portion of profits are NII",s:"HIGH"},
      {r:"Ping An's persistent activist pressure to break up the company",s:"MEDIUM"},
      {r:"Regulatory risk: compliance costs remain a significant drag at $3B+ annually",s:"MEDIUM"},
    ],
    summary:"HSBC is one of the world's largest banks trading at 1x book with a 7.2% dividend — superficially cheap. The bet is on Asia growth and trade finance. The risk is concentrated China/HK geopolitical exposure. Management's simplification strategy (exiting non-core markets) is sensible. Rate cuts will pressure NIM from 2025. A yield play with geopolitical tail risk attached.",
    data_confidence:"High", sources:["LSE","HKEX","HSBC Annual Reports","Bloomberg"],
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────
const ALL_TICKERS = Object.keys(STOCKS);
const PIE_C   = ["#2563eb","#0891b2","#16a34a","#d97706","#7c3aed","#9ca3af"];
const VCfg = {
  CHEAP:     {bg:"#dbeafe",c:"#1e40af",l:"CHEAP"},
  FAIR:      {bg:"#f3f4f6",c:"#374151",l:"FAIR"},
  EXPENSIVE: {bg:"#fff7ed",c:"#9a3412",l:"EXPENSIVE"},
  SAFE:      {bg:"#dcfce7",c:"#166534",l:"SAFE"},
  MODERATE:  {bg:"#fef9c3",c:"#854d0e",l:"MODERATE"},
  LEVERAGED: {bg:"#fee2e2",c:"#991b1b",l:"LEVERAGED"},
  Strong:    {bg:"#dcfce7",c:"#166534",l:"STRONG"},
  Moderate:  {bg:"#fef9c3",c:"#854d0e",l:"MODERATE"},
  Weak:      {bg:"#fee2e2",c:"#991b1b",l:"WEAK"},
  HIGH:      {bg:"#fee2e2",c:"#991b1b",l:"HIGH"},
  MEDIUM:    {bg:"#fef9c3",c:"#854d0e",l:"MEDIUM"},
  LOW:       {bg:"#dcfce7",c:"#166534",l:"LOW"},
};

function Badge({v,lg}){
  const cfg=VCfg[v]||{bg:"#f3f4f6",c:"#374151",l:String(v)};
  return <span style={{background:cfg.bg,color:cfg.c,borderRadius:4,fontWeight:600,
    whiteSpace:"nowrap",padding:lg?"4px 12px":"2px 8px",fontSize:lg?12:11}}>{cfg.l}</span>;
}
function MC({label,val,sub,verdict}){
  return(
    <div style={{background:"#f9fafb",borderRadius:8,padding:"12px 14px",border:"1px solid #e5e7eb",minWidth:0}}>
      <div style={{fontSize:11,color:"#9ca3af",marginBottom:4,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}</div>
      <div style={{fontSize:18,fontWeight:700,color:"#111827",lineHeight:1.2}}>{val??"-"}</div>
      {sub&&<div style={{fontSize:11,color:"#6b7280",marginTop:3}}>{sub}</div>}
      {verdict&&<div style={{marginTop:5}}><Badge v={verdict}/></div>}
    </div>
  );
}
const TTP={contentStyle:{fontSize:12,borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",boxShadow:"none"}};
const ST={fontSize:11,fontWeight:600,color:"#374151",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"};

function ValChart({d}){
  const rows=[
    d.pe!=null&&{m:"P/E",Cur:d.pe,Sec:d.sector_pe??undefined,"5Y":d.hist_pe??undefined},
    d.pb!=null&&{m:"P/B",Cur:d.pb,Sec:d.sector_pb??undefined},
    d.ev_ebitda!=null&&{m:"EV/EBITDA",Cur:d.ev_ebitda,Sec:d.sector_ev??undefined},
  ].filter(Boolean);
  if(!rows.length)return null;
  return(
    <div>
      <div style={ST}>Valuation vs Benchmarks</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={rows} margin={{top:4,right:8,left:-22,bottom:4}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
          <XAxis dataKey="m" tick={{fontSize:11,fill:"#6b7280"}}/>
          <YAxis tick={{fontSize:10,fill:"#9ca3af"}}/>
          <Tooltip {...TTP}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          <Bar dataKey="Cur" name="Current" fill="#2563eb" radius={[3,3,0,0]}/>
          <Bar dataKey="Sec" name="Sector"  fill="#94a3b8" radius={[3,3,0,0]}/>
          <Bar dataKey="5Y"  name="5Y Avg"  fill="#cbd5e1" radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
function GrowthChart({growth}){
  if(!growth?.length)return null;
  return(
    <div>
      <div style={ST}>Revenue &amp; Profit Growth (YoY %)</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={growth} margin={{top:4,right:8,left:-22,bottom:4}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
          <XAxis dataKey="y" tick={{fontSize:11,fill:"#6b7280"}}/>
          <YAxis tick={{fontSize:10,fill:"#9ca3af"}} unit="%"/>
          <Tooltip {...TTP} formatter={v=>`${v}%`}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          <Bar dataKey="rev"  name="Revenue Growth" fill="#2563eb" radius={[3,3,0,0]}/>
          <Bar dataKey="prof" name="Profit Growth"  fill="#16a34a" radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
function ReturnsChart({returns}){
  if(!returns?.length)return null;
  return(
    <div>
      <div style={ST}>ROE &amp; ROCE Trend (%)</div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={returns} margin={{top:4,right:8,left:-22,bottom:4}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6"/>
          <XAxis dataKey="y" tick={{fontSize:11,fill:"#6b7280"}}/>
          <YAxis tick={{fontSize:10,fill:"#9ca3af"}} unit="%"/>
          <Tooltip {...TTP} formatter={v=>`${v}%`}/>
          <Legend wrapperStyle={{fontSize:11}}/>
          <Line type="monotone" dataKey="roe"  name="ROE"  stroke="#2563eb" strokeWidth={2} dot={{r:3}}/>
          <Line type="monotone" dataKey="roce" name="ROCE" stroke="#16a34a" strokeWidth={2} dot={{r:3}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
function OwnershipChart({ownership}){
  if(!ownership?.length)return null;
  return(
    <div>
      <div style={ST}>Ownership Breakdown</div>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <PieChart width={145} height={145}>
          <Pie data={ownership} cx={67} cy={67} innerRadius={38} outerRadius={60} dataKey="v" nameKey="n" paddingAngle={2}>
            {ownership.map((_,i)=><Cell key={i} fill={PIE_C[i%PIE_C.length]}/>)}
          </Pie>
          <Tooltip formatter={v=>`${v}%`} {...TTP}/>
        </PieChart>
        <div style={{flex:1}}>
          {ownership.map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
              <div style={{width:8,height:8,borderRadius:2,background:PIE_C[i%PIE_C.length],flexShrink:0}}/>
              <div style={{fontSize:11,color:"#374151",flex:1,lineHeight:1.3}}>{item.n}</div>
              <div style={{fontSize:11,fontWeight:600,color:"#111827"}}>{item.v}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Report: Single stock ──────────────────────────────────────────────────
function ReportView({d}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontSize:21,fontWeight:700,color:"#111827"}}>{d.company}</div>
          <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>{d.ticker} · {d.exchange} · {d.sector}</div>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
          {d.valuation&&<Badge v={d.valuation} lg/>}
          {d.quality  &&<Badge v={d.quality}   lg/>}
          <span style={{fontSize:11,color:"#9ca3af",background:"#f9fafb",padding:"3px 10px",borderRadius:99,border:"1px solid #e5e7eb"}}>Confidence: {d.data_confidence}</span>
        </div>
      </div>

      {/* Snapshot cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
        <MC label="CMP"        val={d.cmp}   sub={`52W: ${d.w52l} – ${d.w52h}`}/>
        <MC label="Market Cap" val={d.market_cap}/>
        <MC label="P/E Ratio"  val={d.pe}    sub={d.sector_pe?`Sector: ${d.sector_pe}`:null} verdict={d.valuation}/>
        <MC label="P/B Ratio"  val={d.pb}    sub={d.sector_pb?`Sector: ${d.sector_pb}`:null}/>
        <MC label="D/E Ratio"  val={d.de}    verdict={d.de_verdict}/>
        <MC label="ROE"        val={d.roe!=null?`${d.roe}%`:null} sub={d.roe_3y?`3Y avg: ${d.roe_3y}%`:null}/>
        <MC label="ROCE"       val={d.roce!=null?`${d.roce}%`:null} sub={d.roce_3y?`3Y avg: ${d.roce_3y}%`:null}/>
        {d.div_yield!=null&&<MC label="Div. Yield" val={`${d.div_yield}%`}/>}
      </div>

      {/* Charts */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem"}}>
        <ValChart d={d}/>
        <OwnershipChart ownership={d.ownership}/>
        <GrowthChart growth={d.growth}/>
        <ReturnsChart returns={d.returns}/>
      </div>

      {/* Strengths / Watch */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"14px 16px"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#15803d",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>✅ Strengths</div>
          {d.strengths.map((s,i)=><div key={i} style={{fontSize:13,color:"#166534",marginBottom:5,lineHeight:1.5}}>• {s}</div>)}
        </div>
        <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"14px 16px"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#b45309",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>⚠️ Watch-points</div>
          {d.watch.map((w,i)=><div key={i} style={{fontSize:13,color:"#92400e",marginBottom:5,lineHeight:1.5}}>• {w}</div>)}
        </div>
      </div>

      {/* Risks */}
      <div>
        <div style={ST}>Risk Factors</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {d.risks.map((r,i)=>{
            const bg={HIGH:"#fef2f2",MEDIUM:"#fffbeb",LOW:"#f0fdf4"};
            const br={HIGH:"#fecaca",MEDIUM:"#fde68a",LOW:"#bbf7d0"};
            return(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 12px",
                borderRadius:8,background:bg[r.s]||"#f9fafb",border:`1px solid ${br[r.s]||"#e5e7eb"}`}}>
                <Badge v={r.s}/>
                <div style={{fontSize:13,color:"#374151",flex:1,lineHeight:1.5}}>{r.r}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peers */}
      {d.peers?.length>0&&(
        <div>
          <div style={ST}>Peer Comparison</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr style={{background:"#f9fafb"}}>
                {["Company","P/E","P/B","ROE %","D/E","Rev Growth %"].map(h=>(
                  <th key={h} style={{padding:"7px 10px",textAlign:"left",color:"#6b7280",fontWeight:500,borderBottom:"1px solid #e5e7eb",fontSize:12,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {d.peers.map((p,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #f3f4f6"}}>
                    <td style={{padding:"7px 10px",fontWeight:500,color:"#111827"}}>{p.n}</td>
                    <td style={{padding:"7px 10px",color:"#374151"}}>{p.pe??"-"}</td>
                    <td style={{padding:"7px 10px",color:"#374151"}}>{p.pb??"-"}</td>
                    <td style={{padding:"7px 10px",color:"#374151"}}>{p.roe!=null?`${p.roe}%`:"-"}</td>
                    <td style={{padding:"7px 10px",color:"#374151"}}>{p.de??"-"}</td>
                    <td style={{padding:"7px 10px",color:p.rev_g>0?"#16a34a":p.rev_g<0?"#dc2626":"#374151"}}>{p.rev_g!=null?`${p.rev_g}%`:"-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,padding:"14px 16px"}}>
        <div style={{fontSize:11,fontWeight:600,color:"#475569",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>Analyst Summary</div>
        <div style={{fontSize:14,color:"#334155",lineHeight:1.75}}>{d.summary}</div>
      </div>

      <div style={{fontSize:11,color:"#9ca3af",lineHeight:1.6,borderTop:"1px solid #f3f4f6",paddingTop:10}}>
        Sources: {d.sources?.join(", ")||"Training knowledge"} · Approximate figures — verify current data independently. Not investment advice. Not a buy/sell/hold recommendation.
      </div>
    </div>
  );
}

// ─── Report: Compare view ──────────────────────────────────────────────────
function CompareView({a,b}){
  const rows=[
    {label:"CMP",          va:a.cmp,         vb:b.cmp},
    {label:"Market Cap",   va:a.market_cap,   vb:b.market_cap},
    {label:"P/E",          va:a.pe,  bga:a.valuation,   vb:b.pe,  bgb:b.valuation},
    {label:"P/B",          va:a.pb,           vb:b.pb},
    {label:"EV/EBITDA",    va:a.ev_ebitda,    vb:b.ev_ebitda},
    {label:"D/E",          va:a.de,  bga:a.de_verdict,  vb:b.de,  bgb:b.de_verdict},
    {label:"ROE %",        va:a.roe!=null?`${a.roe}%`:null,  vb:b.roe!=null?`${b.roe}%`:null},
    {label:"ROCE %",       va:a.roce!=null?`${a.roce}%`:null, vb:b.roce!=null?`${b.roce}%`:null},
    {label:"Div. Yield",   va:a.div_yield!=null?`${a.div_yield}%`:null, vb:b.div_yield!=null?`${b.div_yield}%`:null},
    {label:"Quality",      va:null, bga:a.quality,       vb:null, bgb:b.quality},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"130px 1fr 1fr",gap:10}}>
        <div/>
        {[a,b].map((s,i)=>(
          <div key={i} style={{background:i===0?"#eff6ff":"#f0fdf4",border:`1px solid ${i===0?"#bfdbfe":"#bbf7d0"}`,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#111827"}}>{s.company}</div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{s.ticker} · {s.exchange}</div>
            <div style={{marginTop:6}}><Badge v={s.quality} lg/></div>
          </div>
        ))}
      </div>
      <div style={{border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
        {rows.map((r,i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"130px 1fr 1fr",background:i%2===0?"#fff":"#f9fafb",borderBottom:"1px solid #f3f4f6"}}>
            <div style={{padding:"8px 12px",fontSize:12,color:"#6b7280",fontWeight:500,alignSelf:"center"}}>{r.label}</div>
            {[{val:r.va,bg:r.bga},{val:r.vb,bg:r.bgb}].map((cell,j)=>(
              <div key={j} style={{padding:"8px 12px",fontSize:13,fontWeight:600,color:"#111827",alignSelf:"center",display:"flex",alignItems:"center",gap:6}}>
                {cell.val??"-"}
                {cell.bg&&<Badge v={cell.bg}/>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
        <OwnershipChart ownership={a.ownership}/>
        <OwnershipChart ownership={b.ownership}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}}>
        <GrowthChart growth={a.growth}/>
        <GrowthChart growth={b.growth}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {[{title:`${a.company} — Risks`,risks:a.risks},{title:`${b.company} — Risks`,risks:b.risks}].map((sec,idx)=>(
          <div key={idx}>
            <div style={ST}>{sec.title}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {sec.risks.map((r,i)=>{
                const bg={HIGH:"#fef2f2",MEDIUM:"#fffbeb",LOW:"#f0fdf4"};
                const br={HIGH:"#fecaca",MEDIUM:"#fde68a",LOW:"#bbf7d0"};
                return(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 10px",borderRadius:8,background:bg[r.s],border:`1px solid ${br[r.s]}`}}>
                    <Badge v={r.s}/>
                    <div style={{fontSize:12,color:"#374151",flex:1,lineHeight:1.5}}>{r.r}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        {[{title:`Where ${a.company} leads`,items:a.strengths,col:"#eff6ff",brd:"#bfdbfe",tc:"#1e40af"},
          {title:`Where ${b.company} leads`,items:b.strengths,col:"#f0fdf4",brd:"#bbf7d0",tc:"#166534"}].map((sec,i)=>(
          <div key={i} style={{background:sec.col,border:`1px solid ${sec.brd}`,borderRadius:10,padding:"14px 16px"}}>
            <div style={{fontSize:11,fontWeight:600,color:sec.tc,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.04em"}}>{sec.title}</div>
            {sec.items.map((item,j)=><div key={j} style={{fontSize:13,color:"#374151",marginBottom:5,lineHeight:1.5}}>• {item}</div>)}
          </div>
        ))}
      </div>
      <div style={{fontSize:11,color:"#9ca3af",lineHeight:1.6,borderTop:"1px solid #f3f4f6",paddingTop:10}}>
        Approximate figures from training knowledge. Verify current data independently. Not investment advice.
      </div>
    </div>
  );
}

// ─── Modes & examples ──────────────────────────────────────────────────────
const MODES=[
  {id:"quick",   label:"Quick Take",  icon:"⚡"},
  {id:"deep",    label:"Deep Dive",   icon:"🔬"},
  {id:"pros",    label:"Pros & Cons", icon:"⚖️"},
  {id:"compare", label:"Compare",     icon:"↔️"},
];
const EXAMPLES=[
  {label:"🇳🇬 NGX",     tickers:["MTNN","DANGCEM","GTCO","AIRTELAFRI","ZENITHBANK","SEPLAT"]},
  {label:"🇮🇳 NSE/BSE", tickers:["RELIANCE","TCS","INFY","HDFCBANK","ICICIBANK","ITC"]},
  {label:"🌍 Global",   tickers:["AAPL","MSFT","GOOGL","NVDA","META","BP"]},
];

// ─── Main ──────────────────────────────────────────────────────────────────
export default function StockLens(){
  const [mode,setMode]=useState("quick");
  const [t1,setT1]=useState("");
  const [t2,setT2]=useState("");
  const [report,setReport]=useState(null);
  const [error,setError]=useState("");

  const changeMode=(m)=>{setMode(m);setReport(null);setError("");};

  const lookup=(ticker)=>{
    const key=ticker.trim().toUpperCase();
    return STOCKS[key]||null;
  };

  const run=(ticker1Override,ticker2Override,modeOverride)=>{
    const am=modeOverride||mode;
    const k1=(ticker1Override||t1).trim().toUpperCase();
    const k2=(ticker2Override||t2).trim().toUpperCase();
    setError(""); setReport(null);

    if(am==="compare"){
      const da=lookup(k1), db=lookup(k2);
      if(!da&&!db){setError(`Neither "${k1}" nor "${k2}" found. Available: ${ALL_TICKERS.join(", ")}`);return;}
      if(!da){setError(`"${k1}" not in dataset. Available NGX/NSE/Global tickers: ${ALL_TICKERS.join(", ")}`);return;}
      if(!db){setError(`"${k2}" not in dataset. Available tickers: ${ALL_TICKERS.join(", ")}`);return;}
      setReport({type:"compare",a:da,b:db});
    } else {
      const d=lookup(k1);
      if(!d){
        setError(`"${k1}" not in dataset. Available tickers: ${ALL_TICKERS.join(", ")}`);
        return;
      }
      setReport({type:"single",d,mode:am});
    }
  };

  const canRun=t1.trim().length>0&&(mode!=="compare"||t2.trim().length>0);

  return(
    <div style={{fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",maxWidth:920,margin:"0 auto",padding:"0 0 2rem",color:"#111827"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:14,borderBottom:"1px solid #f3f4f6",paddingBottom:"1rem",marginBottom:"1.25rem"}}>
        <div style={{width:42,height:42,borderRadius:10,background:"#f9fafb",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>📊</div>
        <div>
          <div style={{fontSize:20,fontWeight:700}}>StockLens</div>
          <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>Fundamental research · 30 stocks · NGX · NSE/BSE · NYSE · NASDAQ · LSE</div>
        </div>
        <span style={{marginLeft:"auto",fontSize:11,color:"#9ca3af",background:"#f9fafb",border:"1px solid #e5e7eb",padding:"3px 10px",borderRadius:99,whiteSpace:"nowrap",flexShrink:0}}>Not investment advice</span>
      </div>

      {/* Mode tabs */}
      <div style={{display:"flex",gap:6,marginBottom:"1rem",flexWrap:"wrap"}}>
        {MODES.map(m=>(
          <button key={m.id} onClick={()=>changeMode(m.id)} style={{fontSize:13,padding:"6px 14px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6,
            border:mode===m.id?"1.5px solid #2563eb":"1px solid #e5e7eb",
            background:mode===m.id?"#eff6ff":"#fff",
            color:mode===m.id?"#1d4ed8":"#6b7280"}}>
            <span>{m.icon}</span><span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap"}}>
        <input value={t1} onChange={e=>setT1(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}
          placeholder={mode==="compare"?"Stock A ticker — e.g. MTNN or TCS":"Ticker — e.g. MTNN, RELIANCE, AAPL, BP"}
          style={{flex:1,minWidth:200,padding:"9px 13px",fontSize:14,border:"1px solid #e5e7eb",borderRadius:8,outline:"none",fontFamily:"inherit",color:"#111827",background:"#fff"}}/>
        {mode==="compare"&&(
          <input value={t2} onChange={e=>setT2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}
            placeholder="Stock B ticker — e.g. DANGCEM or INFY"
            style={{flex:1,minWidth:200,padding:"9px 13px",fontSize:14,border:"1px solid #e5e7eb",borderRadius:8,outline:"none",fontFamily:"inherit",color:"#111827",background:"#fff"}}/>
        )}
        <button onClick={()=>run()} disabled={!canRun} style={{padding:"9px 20px",borderRadius:8,fontSize:14,fontFamily:"inherit",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8,
          border:"1px solid #d1d5db",background:!canRun?"#f9fafb":"#111827",color:!canRun?"#9ca3af":"#fff",cursor:!canRun?"not-allowed":"pointer"}}>
          🔍 Research
        </button>
      </div>

      {/* Error */}
      {error&&(
        <div style={{padding:"10px 14px",borderRadius:8,fontSize:13,marginBottom:"1rem",background:"#fef2f2",color:"#991b1b",border:"1px solid #fecaca",lineHeight:1.6}}>
          ⚠️ {error}
        </div>
      )}

      {/* Report */}
      {report&&(
        <div style={{border:"1px solid #e5e7eb",borderRadius:12,padding:"1.5rem",background:"#fff"}}>
          {report.type==="compare"
            ?<CompareView a={report.a} b={report.b}/>
            :<ReportView d={report.d}/>
          }
        </div>
      )}

      {/* Compare mode hint */}
      {mode==="compare"&&!report&&(
        <div style={{fontSize:12,color:"#6b7280",background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"8px 14px",marginBottom:"0.75rem",display:"flex",alignItems:"center",gap:8}}>
          <span>↔️</span>
          <span>
            {!t1.trim()
              ? "Pick or type Stock A, then pick or type Stock B, then click Research."
              : !t2.trim()
              ? <><strong style={{color:"#2563eb"}}>{t1.toUpperCase()}</strong> selected as Stock A — now pick or type Stock B.</>
              : <><strong style={{color:"#2563eb"}}>{t1.toUpperCase()}</strong> vs <strong style={{color:"#16a34a"}}>{t2.toUpperCase()}</strong> — click Research to compare.</>
            }
          </span>
        </div>
      )}

      {/* Empty state */}
      {!report&&!error&&(
        <div style={{padding:"2rem 1.5rem",textAlign:"center",color:"#9ca3af",border:"1px dashed #e5e7eb",borderRadius:12}}>
          <div style={{fontSize:36,marginBottom:10}}>📈</div>
          <div style={{fontSize:15,fontWeight:500,color:"#6b7280",marginBottom:4}}>30 stocks across 3 markets — instant, no API</div>
          <div style={{fontSize:12,marginBottom:"1.5rem"}}>
            {mode==="compare"
              ? "Click a stock to set Stock A, then click another for Stock B"
              : "Type a ticker or click any stock below"}
          </div>
          {EXAMPLES.map(group=>(
            <div key={group.label} style={{marginBottom:12}}>
              <div style={{fontSize:11,color:"#9ca3af",marginBottom:7,textTransform:"uppercase",letterSpacing:"0.05em"}}>{group.label}</div>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                {group.tickers.map(ex=>(
                  <button key={ex} onClick={()=>{
                    if(mode==="compare"){
                      // Fill slot A first, then slot B, then auto-run
                      if(!t1.trim()){
                        setT1(ex);
                      } else {
                        // t1 already set — fill t2 and run immediately with explicit values
                        setT2(ex);
                        run(t1, ex, "compare");
                      }
                    } else {
                      setT1(ex);
                      run(ex, "", mode);
                    }
                  }}
                    style={{
                      fontSize:12,padding:"5px 13px",borderRadius:6,cursor:"pointer",fontFamily:"inherit",fontWeight:500,
                      border: mode==="compare"&&t1.trim()&&ex.toUpperCase()===t1.toUpperCase()
                        ? "1.5px solid #2563eb"
                        : "1px solid #e5e7eb",
                      background: mode==="compare"&&t1.trim()&&ex.toUpperCase()===t1.toUpperCase()
                        ? "#eff6ff"
                        : "#f9fafb",
                      color: mode==="compare"&&t1.trim()&&ex.toUpperCase()===t1.toUpperCase()
                        ? "#1d4ed8"
                        : "#374151",
                    }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
