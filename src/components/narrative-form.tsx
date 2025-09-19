
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateCraftNarrative } from '@/ai/flows/generate-craft-narrative';
import { LoadingSpinner } from './ui/loading-spinner';
import { Wand2 } from 'lucide-react';

const formSchema = z.object({
  craftName: z.string().min(2, { message: 'Craft name is required.' }),
  artisanName: z.string().min(2, { message: 'Artisan name is required.' }),
  materials: z.string().min(10, { message: 'Please describe the materials used.' }),
  techniques: z.string().min(10, { message: 'Please describe the techniques used.' }),
  history: z.string().min(10, { message: 'Please provide some history or origin.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function NarrativeForm() {
  const [narrative, setNarrative] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      craftName: '',
      artisanName: '',
      materials: '',
      techniques: '',
      history: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setNarrative('');
    try {
      const result = await generateCraftNarrative(values);
      setNarrative(result.narrative);
    } catch (error) {
      console.error('Error generating narrative:', error);
      setNarrative('There was an error generating the narrative. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Craft Details</CardTitle>
          <CardDescription>Tell us about your work.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="craftName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Craft Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Hand-thrown Pottery" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="artisanName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artisan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Elena Vargas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materials</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Locally sourced clay, natural glazes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="techniques"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique Techniques</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Single-fire glazing, hand-carved details..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>History / Origin</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A family tradition passed down through generations..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? <LoadingSpinner /> : <><Wand2 className="mr-2"/>Generate Narrative</>}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
            <LoadingSpinner className="mx-auto w-12 h-12"/>
            <p className="mt-4 text-muted-foreground">The AI is crafting your story...</p>
        </div>
      )}

      {narrative && !isLoading && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Generated Narrative</CardTitle>
            <CardDescription>Here is the story of your craft, ready to be shared.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
                <p>{narrative}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
