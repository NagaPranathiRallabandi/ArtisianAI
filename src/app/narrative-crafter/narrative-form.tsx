'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { generateNarrativeAction, type FormState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Bot } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoadingSpinner className="mr-2" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2" />
          Generate Narrative
        </>
      )}
    </Button>
  );
}

export function NarrativeForm() {
  const [state, formAction] = useActionState(generateNarrativeAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="artisanName">Artisan Name</Label>
                <Input id="artisanName" name="artisanName" placeholder="e.g., Elena Vargas" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="craftName">Craft Name</Label>
                <Input id="craftName" name="craftName" placeholder="e.g., Rustic Pottery" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="materials">Materials Used</Label>
              <Input id="materials" name="materials" placeholder="e.g., Stoneware clay, natural glazes" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techniques">Unique Techniques</Label>
              <Textarea id="techniques" name="techniques" placeholder="Describe the special methods you use..." required rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="history">History / Origin</Label>
              <Textarea id="history" name="history" placeholder="Share the story behind your craft..." required rows={3} />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      {state.success && state.narrative && (
        <Card className="mt-8 bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Bot className="text-primary"/>
              Your AI-Crafted Narrative
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg text-foreground/90 whitespace-pre-wrap">
              {state.narrative}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
