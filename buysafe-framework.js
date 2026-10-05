/* =============================================================================
   BuySafe — single source of truth for the due-diligence methodology.
   Every methodology, "what we check", sample-report and sources block on the
   site renders from THIS object. Edit content here, not in the markup.

   Two business rules are baked in deliberately (owner decisions, Oct 2026):
   1. NO SCORE and NO buy/sell recommendation. BuySafe prepares an evidence
      report; it does not grade a property or tell a buyer to proceed or walk.
      There is intentionally no score, no 0–100, no verdict in this config.
   2. How we're paid is disclosed, not hidden: the report is paid for by the
      buyer; a builder referral fee may apply only if the buyer chooses to buy
      through us. The research is drawn from public records and cited, so the
      findings stand on evidence regardless of how we are paid.

   All check names below are transcribed from the BuySafe Report Framework.
   Nothing here asserts a guarantee, certification, partnership or outcome.
   ============================================================================= */
(function (root) {
  'use strict';

  var BUYSAFE = {
    product: {
      name: 'BuySafe',
      by: 'Evoproptech',
      price: '₹8,499',
      priceNote: 'all-inclusive · GST included',
      oneLine: 'BuySafe checks the risks behind a property using independent, buyer-side research, and gives you one evidence-based report.',
      journey: ['Property', '55+ checks', 'Evidence report', 'Your decision']
    },

    /* Disclosed, per owner decision. Used wherever the site explains payment. */
    payment: {
      short: 'You pay ₹8,499 for the report. If you then buy through us, the builder pays us a referral fee — disclosed upfront, it never changes your price, and you are free to buy on your own.',
      stance: 'Our research is buyer-side and drawn from public records, and every finding is cited, so it stands on evidence however we are paid.'
    },

    /* The six core due-diligence areas (framework §2–§7). Presented as the
       areas a buyer should have checked — NOT as weighted score inputs. */
    pillars: [
      {
        id: 'legal', name: 'Legal & Title',
        summary: 'Who owns the land, whether the title is clear, and whether the records support the project.',
        checks: ['Land title clarity', 'Ownership verification', 'Encumbrance / mortgage', 'Litigation / court cases', 'Development agreement', 'Search report validation', 'NA order verification', 'Land reservation issues']
      },
      {
        id: 'approvals', name: 'Approvals & Compliance',
        summary: 'Whether the project holds the approvals and regulatory status expected for its stage.',
        checks: ['Commencement Certificate (CC)', 'IOD approval', 'Approved plans', 'Environmental clearance', 'Fire NOC', 'Airport NOC', 'Municipal approvals', 'RERA compliance status']
      },
      {
        id: 'builder', name: 'Builder & Reputation',
        summary: "The developer's execution history, beyond the brochure.",
        checks: ['Past project history', 'Delivery track record', 'Delay history', 'Litigation history', 'Financial distress indicators', 'Customer complaints', 'Group company analysis']
      },
      {
        id: 'financial', name: 'Financial Risk',
        summary: 'The available evidence on project funding, debt and financial risk.',
        checks: ['Project funding status', 'Bank approval status', 'Mortgage disclosures', 'Debt exposure', 'Cash-flow risk indicators']
      },
      {
        id: 'construction', name: 'Construction Progress',
        summary: 'What the available evidence shows about actual progress versus what was promised.',
        checks: ['Actual vs promised progress', 'Site verification (where in scope)', 'Construction stage mapping', 'Labour / work activity', 'Delay probability analysis']
      },
      {
        id: 'litigation', name: 'Litigation & Disputes',
        summary: 'Disputes that could affect the project, the developer, or your decision.',
        checks: ['Civil court cases', 'RERA complaints', 'NCLT matters', 'Consumer court matters', 'Land disputes', 'Environmental disputes']
      }
    ],

    /* Additional buyer intelligence (framework §8–§12). Lighter presentation. */
    additional: [
      { id: 'market', name: 'Sales & Market Intelligence', checks: ['Inventory status', 'Price trend analysis', 'Area appreciation potential', 'Oversupply risk', 'Competitor project comparison'] },
      { id: 'buyer-risk', name: 'Buyer Risk Indicators', checks: ['Hidden clause risk', 'Delay risk', 'Approval dependency risk', 'Legal uncertainty risk', 'Builder credibility risk', 'Execution risk'] },
      { id: 'documentation', name: 'Documentation Audit', checks: ['Agreement review', 'Carpet area verification', 'Payment schedule analysis', 'Clause risk assessment', 'Exit / refund clause analysis'] },
      { id: 'site', name: 'Site & Infrastructure', checks: ['Connectivity', 'Flood risk', 'Infrastructure development', 'Metro / highway impact', 'Pollution / noise factors'] },
      { id: 'digital', name: 'Digital & Public Intelligence', checks: ['Google review patterns', 'News sentiment', 'Social media complaints', 'Broker sentiment'] },
      { id: 'basics', name: 'Project Basics', checks: ['Project name', 'Developer name', 'MahaRERA number', 'Location', 'Project type', 'Possession date', 'Land parcel details'] }
    ],

    /* Per-finding status — factual labels describing one check, never an
       overall verdict on the property. Colour is paired with text + icon so it
       never relies on colour alone. */
    statuses: [
      { id: 'verified', label: 'Verified', tone: 'go', note: 'Confirmed against a public record.' },
      { id: 'review', label: 'Review', tone: 'caution', note: 'Worth clarifying before you commit.' },
      { id: 'flag', label: 'Flag raised', tone: 'stop', note: 'A risk we think you should address.' },
      { id: 'na', label: 'Not available', tone: 'muted', note: 'Record not available at the time of checking.' },
      { id: 'napp', label: 'Not applicable', tone: 'muted', note: 'Does not apply to this property.' }
    ],

    /* Future-ready: communicates how well a finding is evidenced. */
    evidenceConfidence: [
      { id: 'high', label: 'High', note: 'Established from a primary public record.' },
      { id: 'medium', label: 'Medium', note: 'Supported, but not fully corroborated.' },
      { id: 'low', label: 'Low', note: 'Indicative only.' },
      { id: 'unavailable', label: 'Evidence unavailable', note: 'Could not be independently established.' }
    ],

    /* Every finding in the report reads in this order. No verdict — guidance. */
    findingPattern: ['What we found', 'Why it matters', 'What to ask or do'],

    /* Public information sources (framework §15). Referenced, not partnered. */
    sources: ['MahaRERA', 'eCourts', 'MCA', 'IGR Maharashtra', 'Municipal portals', 'Revenue records', 'SRA / MHADA', 'NCLT database', 'Consumer court database', 'Google Maps / Earth'],

    /* Kept visible, not buried. Protects the buyer and us. */
    limitations: [
      'BuySafe is independent research, not legal, structural, valuation or investment advice.',
      'Findings reflect the public record as at the date of checking; facts can change afterwards.',
      'Some records may be unavailable, incomplete or contradicted by another source — we say so rather than infer.',
      'BuySafe is not a law firm, a registered valuer, a structural engineer, a SEBI-registered adviser, or a government authority.',
      'BuySafe does not decide the purchase for you. It gives you the evidence to decide.'
    ]
  };

  root.BUYSAFE = BUYSAFE;
  if (typeof module !== 'undefined' && module.exports) module.exports = BUYSAFE;
})(typeof window !== 'undefined' ? window : this);
