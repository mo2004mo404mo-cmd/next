'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, GraduationCap, MapPin, Stethoscope, Loader2, Save } from 'lucide-react';

interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

interface ProfileData {
  name: string;
  bio: string;
  medicalSchool: string;
  graduationYear: string;
  specialty: string;
  country: string;
}

const SPECIALTIES = [
  'Internal Medicine', 'Surgery', 'Pediatrics', 'OB/GYN',
  'Psychiatry', 'Radiology', 'Emergency Medicine', 'Anesthesiology',
  'Dermatology', 'Neurology', 'Pathology', 'Ophthalmology',
  'Orthopedics', 'Urology', 'Cardiology', 'Oncology', 'Other',
];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'India', 'Australia',
  'Germany', 'France', 'Brazil', 'Japan', 'South Korea', 'Nigeria',
  'Pakistan', 'Egypt', 'Philippines', 'Other',
];

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: '', bio: '', medicalSchool: '', graduationYear: '', specialty: '', country: '',
  });

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch('/api/auth/profile')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.user) {
            setProfile({
              name: data.user.name || '',
              bio: data.user.bio || '',
              medicalSchool: data.user.medicalSchool || '',
              graduationYear: data.user.graduationYear?.toString() || '',
              specialty: data.user.specialty || '',
              country: data.user.country || '',
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleSave = async () => {
    if (!profile.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          medicalSchool: profile.medicalSchool,
          graduationYear: profile.graduationYear ? parseInt(profile.graduationYear) : null,
          specialty: profile.specialty,
          country: profile.country,
        }),
      });

      if (res.ok) {
        toast.success('Profile updated successfully!');
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update profile');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg rounded-2xl border-white/[0.06] p-0 overflow-hidden"
        style={{ background: '#151821' }}
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-bold text-[#e8ecf4] flex items-center gap-2">
            <User className="w-5 h-5 text-[#00e5a0]" />
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-xs text-[#5a6478]">
            Update your personal information and medical education details
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" />
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-4 max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#8b95a8]">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                  className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055]"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#8b95a8]">Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                className="min-h-[80px] text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] resize-none"
                placeholder="A few words about yourself..."
              />
            </div>

            {/* Medical School */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#8b95a8]">Medical School</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  value={profile.medicalSchool}
                  onChange={(e) => setProfile(p => ({ ...p, medicalSchool: e.target.value }))}
                  className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055]"
                  placeholder="e.g. Johns Hopkins School of Medicine"
                />
              </div>
            </div>

            {/* Graduation Year + Specialty */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#8b95a8]">Graduation Year</Label>
                <Input
                  type="number"
                  value={profile.graduationYear}
                  onChange={(e) => setProfile(p => ({ ...p, graduationYear: e.target.value }))}
                  className="h-10 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055]"
                  placeholder="2025"
                  min={1950}
                  max={2040}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#8b95a8]">Specialty</Label>
                <Select value={profile.specialty} onValueChange={(v) => setProfile(p => ({ ...p, specialty: v }))}>
                  <SelectTrigger className="h-10 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent style={{ background: '#1a1e2b', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {SPECIALTIES.map(s => (
                      <SelectItem key={s} value={s} className="text-xs text-[#8b95a8] focus:text-[#e8ecf4] focus:bg-white/[0.04]">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#8b95a8]">Country</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Select value={profile.country} onValueChange={(v) => setProfile(p => ({ ...p, country: v }))}>
                  <SelectTrigger className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4]">
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent style={{ background: '#1a1e2b', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {COUNTRIES.map(c => (
                      <SelectItem key={c} value={c} className="text-xs text-[#8b95a8] focus:text-[#e8ecf4] focus:bg-white/[0.04]">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Footer with save button */}
        <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-xs text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            className="h-9 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs rounded-lg disabled:opacity-50"
          >
            {saving ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />Saving...</>
            ) : (
              <><Save className="w-3.5 h-3.5 mr-1.5" />Save Changes</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
