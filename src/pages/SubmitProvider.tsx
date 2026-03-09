import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  providerName: z.string().trim().min(2, "Provider name is required").max(100),
  website: z.string().trim().url("Please enter a valid URL").max(255).or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  curricula: z.string().trim().max(200).optional(),
  grades: z.string().trim().max(100).optional(),
  pricing: z.string().trim().max(100).optional(),
  location: z.string().trim().max(100).optional(),
  description: z.string().trim().min(10, "Please provide a brief description (at least 10 characters)").max(1000),
  submitterName: z.string().trim().min(2, "Your name is required").max(100),
  submitterEmail: z.string().trim().email("Please enter a valid email").max(255),
  relationship: z.string().min(1, "Please select your relationship"),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = [
  { value: "online-school", label: "Online School" },
  { value: "curriculum-provider", label: "Curriculum Provider" },
  { value: "curriculum", label: "Curriculum" },
  { value: "christian", label: "Christian / Faith-Based" },
  { value: "alternative", label: "Alternative / Eclectic" },
];

const RELATIONSHIPS = [
  { value: "parent", label: "Parent / Guardian using this provider" },
  { value: "owner", label: "Owner / Staff member of this provider" },
  { value: "community", label: "Community member recommending it" },
];

const SubmitProvider = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerName: "",
      website: "",
      category: "",
      curricula: "",
      grades: "",
      pricing: "",
      location: "",
      description: "",
      submitterName: "",
      submitterEmail: "",
      relationship: "",
    },
  });

  const onSubmit = (_data: FormValues) => {
    setSubmitted(true);
  };

  useDocumentTitle("Submit a Provider");

  if (submitted) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center max-w-lg">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-serif text-3xl text-foreground mb-3">Thank you!</h1>
        <p className="text-muted-foreground">
          Your provider submission has been received. Our team will review it and add it to the directory if it meets our listing criteria. This usually takes 3–5 business days.
        </p>
        <Button className="mt-8" onClick={() => setSubmitted(false)}>
          Submit another provider
        </Button>
      </div>
    );
  }

  return (
    <>

      <div className="container mx-auto px-4 py-10 max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Submit a <span className="text-primary">Provider</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-base">
            Know a homeschool provider that should be listed on Kaleidoscope? Tell us about them and we'll review the submission.
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            {/* Provider details */}
            <h2 className="font-serif text-lg text-foreground border-b border-border pb-2">Provider Details</h2>

            <FormField control={form.control} name="providerName" render={({ field }) => (
              <FormItem>
                <FormLabel>Provider Name *</FormLabel>
                <FormControl><Input placeholder="e.g. Brainline Learning World" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl><Input placeholder="https://www.example.co.za" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="curricula" render={({ field }) => (
                <FormItem>
                  <FormLabel>Curricula Offered</FormLabel>
                  <FormControl><Input placeholder="e.g. CAPS, Cambridge" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField control={form.control} name="grades" render={({ field }) => (
                <FormItem>
                  <FormLabel>Grades</FormLabel>
                  <FormControl><Input placeholder="e.g. R–12" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="pricing" render={({ field }) => (
                <FormItem>
                  <FormLabel>Approx. Pricing</FormLabel>
                  <FormControl><Input placeholder="e.g. R2,500/mo" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl><Input placeholder="e.g. Nationwide" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl><Textarea placeholder="Tell us what makes this provider noteworthy — what they offer, who they serve, and why they should be listed." rows={4} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submitter details */}
            <h2 className="font-serif text-lg text-foreground border-b border-border pb-2 pt-2">Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="submitterName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name *</FormLabel>
                  <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="submitterEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email *</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="relationship" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Relationship to This Provider *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {RELATIONSHIPS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Provider
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Submissions are reviewed manually. We reserve the right to decline listings that don't meet our criteria. Your email will only be used if we need to follow up.
            </p>
          </form>
        </Form>
      </div>

    </>
  );
};

export default SubmitProvider;
