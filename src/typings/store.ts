import Category from '@/models/Category';
import Tag from '@/models/Tag';
import Alert from '@/models/Alert';
import User from '@/models/User';

export interface CommonState {
  language: string;
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
  user: User;
}
