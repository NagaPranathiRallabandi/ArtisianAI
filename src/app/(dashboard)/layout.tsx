
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Wand2 } from 'lucide-react';
import type { ReactNode } from 'react';

function DashboardNav() {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { value: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
        { value: 'narrative-crafter', href: '/narrative-crafter', label: 'AI Narrative Crafter', icon: Wand2 },
    ];

    // Determine the current tab. It will be 'narrative-crafter' if the path starts with that, otherwise 'dashboard'.
    const currentTab = pathname.startsWith('/narrative-crafter') ? 'narrative-crafter' : 'dashboard';

    const handleTabChange = (value: string) => {
        const item = navItems.find(i => i.value === value);
        if (item) {
            router.push(item.href);
        }
    }

    return (
        <>
            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = currentTab === item.value;
                        return (
                            <Link key={item.href} href={item.href} className={cn(
                                "flex flex-col items-center justify-center gap-1 w-full text-sm font-medium",
                                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                            )}>
                                <item.icon className="w-6 h-6" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

             {/* Desktop Tabs */}
             <div className="hidden md:block">
                <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full max-w-3xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        {navItems.map((item) => (
                            <TabsTrigger key={item.value} value={item.value}>
                                <item.icon className="mr-2" />
                                {item.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </>
    );
}


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 pb-24 md:pb-20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-headline">Welcome, Artisan!</h1>
                    <p className="text-muted-foreground mt-1">Manage your craft and story from here.</p>
                </div>
            </div>

            <DashboardNav />

            <div className="max-w-3xl mx-auto">
                {children}
            </div>
        </div>
    );
}
