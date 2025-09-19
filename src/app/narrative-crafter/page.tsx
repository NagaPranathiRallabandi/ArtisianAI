
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { NarrativeForm } from './narrative-form';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function NarrativeCrafterPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If no user is logged in, redirect to the login page
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <LoadingSpinner className="w-12 h-12"/>
        </div>
    );
  }

  if (!user) {
    // This will be briefly shown before the redirect happens
    return null;
  }
  
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
