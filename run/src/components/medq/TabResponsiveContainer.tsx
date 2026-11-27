'use client';

import { useContext } from 'react';
import type { ComponentProps } from 'react';
import { ResponsiveContainer } from 'recharts';
import { TabVisibilityContext } from './TabVisibilityContext';

export function TabResponsiveContainer(props: ComponentProps<typeof ResponsiveContainer>) {
  const isTabVisible = useContext(TabVisibilityContext);

  return isTabVisible ? <ResponsiveContainer {...props} /> : null;
}