import { Store } from 'vuex';

import Category from '@/models/Category';
import Tag from '@/models/Tag';
import Alert from '@/models/Alert';
import User from '@/models/User';

export type AppStore = Store<RootState>

export interface RootState {
  language: string;
  alerts?: AlertsState;
  categories?: CategoriesState;
  tags?: TagsState;
  user?: UserState;
  progress?: ProgressState;
  auth?: AuthState;
}

export interface AlertsState {
  alerts: Alert[];
}

export interface CategoriesState {
  categories: Category[];
}

export interface TagsState {
  tags: Tag[];
}

export interface UserState {
  user: User | null;
}

export interface ProgressState {
  isActiveGlobalProgress: boolean;
  progress: Map<string, boolean | undefined>;
}

export interface AuthState {
  accessToken: string | null;
  isRefreshingToken: boolean;
  refreshingTokenPromise: Promise<unknown> | null;
}
