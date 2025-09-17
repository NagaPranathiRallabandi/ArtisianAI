import { NarrativeForm } from './narrative-form';

export default function NarrativeCrafterPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            AI Narrative Crafter
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Let our AI help you weave a compelling story about your craft. Fill in the details below to generate a unique narrative that connects with your audience.
          </p>
        </div>

        <NarrativeForm />
      </div>
    </div>
  );
}
