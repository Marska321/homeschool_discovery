import { BookOpen, GraduationCap, HelpCircle, Landmark, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Homeschooling Basics",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
    items: [
      {
        question: "Is homeschooling legal in South Africa?",
        answer:
          "Yes. The South African Schools Act (SASA) allows parents to educate their children at home, provided they register with the relevant provincial Department of Education. The curriculum must meet certain minimum standards, though you have flexibility in how you deliver it.",
      },
      {
        question: "How do I register my child for homeschooling?",
        answer:
          "You need to apply to your provincial Department of Education. The process typically involves submitting an application form, a motivational letter, your proposed curriculum plan, and proof of the parent's ability to educate. Processing times vary by province — allow 1–3 months.",
      },
      {
        question: "At what age must my child start formal schooling?",
        answer:
          "In South Africa, schooling is compulsory from the year a child turns 7 until the age of 15 (or completion of Grade 9). Homeschooling counts as schooling if properly registered.",
      },
      {
        question: "Do I need teaching qualifications to homeschool?",
        answer:
          "No formal teaching qualification is required by law. However, provincial departments may assess your ability to provide education. Many parents use structured curriculum providers which supply lesson plans, materials, and assessments, reducing the need for specialist knowledge.",
      },
      {
        question: "How much does homeschooling cost in South Africa?",
        answer:
          "Costs vary widely — from as little as R5,000/year for basic CAPS materials to R80,000+/year for premium international curricula like Cambridge. Use our True Cost Calculator to estimate your total costs including curriculum fees, exam fees, resources, and extracurriculars.",
      },
    ],
  },
  {
    title: "Curriculum Differences",
    icon: <GraduationCap className="w-5 h-5 text-accent" />,
    items: [
      {
        question: "What is the difference between CAPS and IEB?",
        answer:
          "Both are South African curricula accredited by Umalusi. CAPS is the national standard — broadly focused, more affordable, and widely available. IEB is offered by independent schools and is considered more rigorous with emphasis on critical thinking and problem-solving. Both grant automatic matric exemption.",
      },
      {
        question: "Should I choose Cambridge or a South African curriculum?",
        answer:
          "Cambridge (IGCSE / AS / A-Levels) is globally recognised and offers high subject flexibility. However, for SA university admission you'll need a specific combination of subjects to qualify for USAf exemption. SA curricula (CAPS/IEB) give automatic exemption. Use our Curriculum Head-to-Head tool to compare them side by side.",
      },
      {
        question: "What is the GED and is it accepted in South Africa?",
        answer:
          "The GED (General Educational Development) is an American high school equivalency test. While fast and affordable, USAf no longer grants degree-study exemption for GED holders, meaning most SA universities will not accept it for bachelor's degree entry. It may still work for diploma-level study or international universities.",
      },
      {
        question: "Can I mix subjects from different curricula?",
        answer:
          "International curricula like Cambridge and Pearson Edexcel allow flexible subject combinations. However, for SA university exemption you must meet specific subject requirements. Mixing CAPS with international subjects is generally not possible as they are assessed by different exam bodies.",
      },
      {
        question: "What is Pearson Edexcel and how does it compare to Cambridge?",
        answer:
          "Both are UK-based international curricula with global recognition. Pearson Edexcel offers more exam windows (Jan, May/Jun, Oct/Nov) and modular assessment options. Cambridge is more established in SA with more provider options. Both require USAf exemption for SA degree study.",
      },
    ],
  },
  {
    title: "University & Exemptions",
    icon: <Landmark className="w-5 h-5 text-primary" />,
    items: [
      {
        question: "What is a matric exemption?",
        answer:
          "A matric exemption (also called a bachelor's pass or endorsement) is the minimum requirement for admission to a bachelor's degree at a South African university. For CAPS/IEB, this is granted automatically by Umalusi based on your results. For international qualifications, you must apply to USAf (Universities South Africa) for a certificate of exemption.",
      },
      {
        question: "How do I get USAf exemption with Cambridge or Pearson qualifications?",
        answer:
          "You need to complete specific subject combinations including two languages and certain gateway subjects. The exact requirements are set by USAf and change periodically. Always confirm the latest requirements with your curriculum provider before selecting your subjects — choosing the wrong combination can mean you don't qualify.",
      },
      {
        question: "Will international universities accept a South African matric?",
        answer:
          "Yes, the NSC (CAPS) and IEB matric are accepted by many international universities, though some may require additional entrance exams or bridging courses. Cambridge A-Levels generally have the broadest international acceptance. Check individual university requirements for your country of interest.",
      },
      {
        question: "Can my homeschooled child get into a top SA university?",
        answer:
          "Absolutely. Homeschooled students are admitted to all major SA universities including UCT, Wits, Stellenbosch, and UP. The key requirements are the correct matric exemption and meeting the faculty-specific entry points (APS). Some universities may request a portfolio or additional motivation.",
      },
    ],
  },
  {
    title: "Provider & Platform FAQs",
    icon: <HelpCircle className="w-5 h-5 text-[hsl(var(--terracotta))]" />,
    items: [
      {
        question: "How does Kaleidoscope choose which providers to list?",
        answer:
          "We research and list curriculum providers, online schools, and homeschool support services operating in South Africa. Listings are based on verifiable information. We aim to be comprehensive and unbiased — providers do not pay for basic listings.",
      },
      {
        question: "Are the reviews on Kaleidoscope verified?",
        answer:
          "We encourage honest, first-hand reviews from parents and students who have used the services. While we moderate for spam and inappropriate content, reviews reflect individual experiences and opinions.",
      },
      {
        question: "How accurate is the pricing information?",
        answer:
          "We update pricing regularly based on provider websites and direct communication. However, prices change — especially for international curricula billed in foreign currencies. Always confirm current pricing directly with the provider before enrolling.",
      },
      {
        question: "Can I submit a provider that isn't listed?",
        answer:
          "Yes! We welcome submissions. Use the 'Submit a Provider' link in the footer to suggest a provider we may have missed. We'll review and add qualifying providers to the directory.",
      },
      {
        question: "Is Kaleidoscope free to use?",
        answer:
          "Yes, Kaleidoscope is completely free for parents. Our directory, comparison tools, cost calculator, and community features are all available at no charge. We believe every South African family deserves access to clear, unbiased information about education options.",
      },
    ],
  },
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  useDocumentTitle("FAQ");

  return (
    <>

      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-base md:text-lg">
            Everything you need to know about homeschooling in South Africa — from getting started to university acceptance.
          </p>
        </header>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sections */}
        {filteredSections.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No questions match your search. Try different keywords.
          </p>
        ) : (
          <div className="space-y-8">
            {filteredSections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h2 className="font-serif text-xl text-foreground">{section.title}</h2>
                </div>
                <Accordion type="single" collapsible className="rounded-xl border border-border bg-card overflow-hidden">
                  {section.items.map((item, idx) => (
                    <AccordionItem key={idx} value={`${section.title}-${idx}`} className="border-border">
                      <AccordionTrigger className="px-5 py-4 text-left text-sm font-medium text-foreground hover:no-underline hover:bg-secondary/30">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-xl border border-border bg-secondary/30 px-5 py-4 text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">Disclaimer</p>
          <p>
            Kaleidoscope is an independent information platform and is not affiliated with, endorsed by, or partnered with any curriculum provider, online school, or educational institution listed on this site. All information is provided for general informational purposes only and should not be construed as professional educational, legal, or financial advice. While we strive to keep information accurate and up to date, we make no guarantees regarding completeness or accuracy. Always verify details directly with providers and relevant authorities before making decisions.
          </p>
        </div>
      </div>

    </>
  );
};

export default FAQPage;
