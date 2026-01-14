"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download, Search, Check, MoreHorizontal, Mail, Phone, Building, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Lead {
    id: string;
    email: string;
    name?: string;
    company?: string;
    description: string;
    status: 'new' | 'contacted' | 'closed';
    created_at: string;
}

const STATUS_CONFIG = {
    new: { label: 'New', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    closed: { label: 'Closed', className: 'bg-green-100 text-green-700 border-green-200' }
};

export default function AdminLeadsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) fetchLeads();
    }, [user, authLoading, router]);

    const fetchLeads = async () => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
        try {
            const { error } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', leadId);

            if (error) throw error;
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
            setSelectedLead(null);
        } catch (error) {
            console.error('Error updating lead:', error);
            alert('Failed to update lead status');
        }
    };

    const exportCSV = () => {
        const headers = ['Date', 'Email', 'Name', 'Company', 'Description', 'Status'];
        const rows = filteredLeads.map(l => [
            new Date(l.created_at).toLocaleDateString(),
            l.email,
            l.name || '',
            l.company || '',
            `"${(l.description || '').replace(/"/g, '""')}"`,
            l.status
        ]);

        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = !search ||
            lead.email.toLowerCase().includes(search.toLowerCase()) ||
            lead.name?.toLowerCase().includes(search.toLowerCase()) ||
            lead.company?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Lead Manager</h1>
                    <p className="text-muted-foreground">Track and manage incoming inquiries.</p>
                </div>
                <Button variant="outline" onClick={exportCSV} className="gap-2">
                    <Download className="h-4 w-4" /> Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b flex flex-col sm:flex-row gap-4 bg-slate-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-9 bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'new', 'contacted', 'closed'].map(status => (
                            <Button
                                key={status}
                                variant={statusFilter === status ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setStatusFilter(status)}
                                className="capitalize"
                            >
                                {status === 'all' ? 'All' : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label}
                            </Button>
                        ))}
                    </div>
                    <Badge variant="secondary" className="font-mono ml-auto hidden md:flex">
                        {filteredLeads.length} Lead{filteredLeads.length !== 1 ? 's' : ''}
                    </Badge>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Request</th>
                                <th className="px-6 py-3 w-32">Status</th>
                                <th className="px-6 py-3 w-20">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        {leads.length === 0 ? "No leads captured yet." : "No leads match your filters."}
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                                            {new Date(lead.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            })}
                                            <br />
                                            <span className="text-slate-400">
                                                {new Date(lead.created_at).toLocaleTimeString('en-IN', {
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                                {lead.email}
                                            </div>
                                            {(lead.name || lead.company) && (
                                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                                                    {lead.name && <span className="flex items-center gap-1"><User className="h-3 w-3" />{lead.name}</span>}
                                                    {lead.company && <span className="flex items-center gap-1"><Building className="h-3 w-3" />{lead.company}</span>}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-sm text-slate-600 line-clamp-2">
                                                {lead.description || <span className="italic text-slate-400">No details provided</span>}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant="outline"
                                                className={STATUS_CONFIG[lead.status]?.className || ''}
                                            >
                                                {STATUS_CONFIG[lead.status]?.label || lead.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>

                                                {selectedLead?.id === lead.id && (
                                                    <div className="absolute right-0 top-10 z-10 bg-white border rounded-lg shadow-lg py-1 min-w-[150px]">
                                                        {(['new', 'contacted', 'closed'] as const).map(status => (
                                                            <button
                                                                key={status}
                                                                onClick={() => updateLeadStatus(lead.id, status)}
                                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${lead.status === status ? 'text-primary font-medium' : ''}`}
                                                            >
                                                                {lead.status === status && <Check className="h-3 w-3" />}
                                                                Mark as {STATUS_CONFIG[status].label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
