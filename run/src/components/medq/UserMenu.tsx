'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User, Settings, CreditCard, LogOut, Crown, ChevronDown, Fingerprint,
} from 'lucide-react';

interface UserMenuUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

interface UserMenuProps {
  user: UserMenuUser | null;
  onShowProfile: () => void;
  onSwitchToPricing?: () => void;
  onShowSettings?: () => void;
  onShowDeviceSecurity?: () => void;
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

function getRoleBadge(role: string): { label: string; color: string } {
  switch (role) {
    case 'admin': return { label: 'Admin', color: '#ff5757' };
    case 'educator': return { label: 'Educator', color: '#4fc3f7' };
    case 'premium': return { label: 'Premium', color: '#8b5cf6' };
    case 'pro': return { label: 'Pro', color: '#f59e0b' };
    default: return { label: 'Student', color: '#00e5a0' };
  }
}

export default function UserMenu({ user, onShowProfile, onSwitchToPricing, onShowSettings, onShowDeviceSecurity }: UserMenuProps) {
  if (!user) return null;

  const roleBadge = getRoleBadge(user.role);
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all hover:bg-white/[0.02] active:scale-95 cursor-pointer" />
        }
      >
          {user.image ? (
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={user.image}
                alt={user.name || 'User'}
                fill
                className="object-cover"
                sizes="28px"
                // Avatar is above-the-fold in the user menu trigger — load eagerly.
                loading="eager"
              />
            </div>
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                color: '#0c0e14',
              }}
            >
              {initials}
            </div>
          )}
          <span className="text-xs font-semibold text-[#e8ecf4] max-w-[80px] truncate hidden sm:inline">
            {user.name || 'User'}
          </span>
          <ChevronDown className="w-3 h-3 text-[#5a6478]" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl border-white/[0.06] p-1.5"
        style={{ background: '#1a1e2b' }}
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 rounded-lg cursor-default">
          <div className="flex items-center gap-3">
            {user.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={user.image}
                  alt={user.name || 'User'}
                  fill
                  className="object-cover"
                  sizes="40px"
                  loading="eager"
                />
              </div>
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                  color: '#0c0e14',
                }}
              >
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#e8ecf4] truncate">{user.name || 'User'}</p>
              <p className="text-[10px] text-[#5a6478] truncate">{user.email}</p>
              <span
                className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold"
                style={{
                  background: `${roleBadge.color}15`,
                  color: roleBadge.color,
                  border: `1px solid ${roleBadge.color}30`,
                }}
              >
                <Crown className="w-2.5 h-2.5" />
                {roleBadge.label}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/[0.06]" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onShowProfile}
            className="rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer"
          >
            <User className="w-4 h-4 mr-2" />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onShowSettings}
            className="rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onSwitchToPricing}
            className="rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscription
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onShowDeviceSecurity}
            className="rounded-lg px-3 py-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] focus:text-[#e8ecf4] focus:bg-white/[0.04] cursor-pointer"
          >
            <Fingerprint className="w-4 h-4 mr-2" />
            Device Security
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/[0.06]" />

        <DropdownMenuItem
          onClick={async () => {
            // Use redirect:false so Auth.js does NOT navigate to the built-in
            // /api/auth/signout?csrf=true HTML page. We revoke the session
            // server-side, then navigate manually to '/'.
            // This avoids the "stuck on signout confirmation page" symptom
            // that happens when AUTH_URL doesn't match the current host
            // (CSRF cookie domain mismatch makes the auto-submit form fail).
            try {
              await signOut({ redirect: false });
            } catch (e) {
              // Even if the network call fails, force-navigate to home so the
              // user is not stuck on a broken auth page.
              console.error('signOut failed:', e);
            }
            window.location.href = '/';
          }}
          className="rounded-lg px-3 py-2 text-xs text-[#ff5757] hover:text-[#ff5757] focus:text-[#ff5757] focus:bg-[#ff5757]/10 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
