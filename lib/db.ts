export interface Row_Presses {
  id: string;
  created_at: string;
  side: 'usd' | 'sdsu';
  tag?: string;
}

export interface View_Leaderboard {
  side: 'usd' | 'sdsu';
  tag: string;
  count: number;
}

export interface View_Totals {
  side: 'usd' | 'sdsu';
  count: number;
}