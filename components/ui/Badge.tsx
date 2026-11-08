import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'outline' | 'glass';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'gold', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full tracking-wide',
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3.5 py-1 text-xs',
        variant === 'gold' && 'bg-[#C8A96E]/15 text-[#C8A96E] border border-[#C8A96E]/20',
        variant === 'green' && 'bg-[#2D6A4F]/20 text-[#40916C] border border-[#2D6A4F]/30',
        variant === 'outline' && 'border border-[#2a2a2a] text-[#A8A8A0]',
        variant === 'glass' && 'glass text-[#F5F5F0]',
        className
      )}
    >
      {children}
    </span>
  );
}
